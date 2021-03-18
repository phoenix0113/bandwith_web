import socketIO from 'socket.io';
import * as jwtAuth from 'socketio-jwt-auth';
import { Algorithm, sign as signToken } from 'jsonwebtoken';
import { parse as urlParse } from 'url';
import { parse as queryParse } from 'querystring';
import { Server, Socket as SocketClient } from 'socket.io';
import { conf } from '../config';
import {
  ACTIONS,
  ERROR,
  CLIENT_ONLY_ACTIONS,
  NotificationEventData,
  JoinLobbyResponse,
  ErrorData,
  SocketClientCallData,
  CallInput,
  CallParticipants,
  StreamStartData,
  Kinds,
  StreamKindsCallData,
  StreamStopRequest,
  StreamStopData,
  StreamStartRequest,
  CallStatusFromInitiator,
  CallStatusFromReceiver,
  JoinLobbyRequest,
  MakeLobbyCallRequest,
  MakeLobbyCallResponse,
  LobbyCallEventData,
  LOBBY_ROOM,
  SendInvitationRequest,
  SendInvitationAcceptedRequest,
  SendRemovedFromContactsRequest,
  JoinAsViewerErrors,
  JoinAsViewerRequest,
  JoinAsViewerResponse,
  ViewerJoinedEventData,
  MixerLayoutData,
  SendCommentRequest,
  UserStatus,
  UserStatusEventData,
  SendMissedCallNotificationRequest,
  JoinRecordingCommentsRoomRequest,
  LeaveRecordingCommentsRoomRequest,
  AppStatus,
  CallDetectorStatus,
  // @ts-ignore
} from '../../../client/src/shared/socket';
import {
  ALL_USERS_ARE_UNAVAILABLE,
  USER_IS_BUSY,
  NOT_ABLE_TO_FIND_PARTICIPANT,
  USER_IS_OFFLINE,
  // @ts-ignore
} from '../../../client/src/shared/errors';
// @ts-ignore
import { createInvitationAcceptedNotification } from '../../../client/src/shared/utils';
import { CloudApi } from 'avcore';
import {
  UsersService,
  ContactsService,
  NotificationsService,
  StreamMixer,
  RoomCommentsService,
  CallRecordingService,
} from '../services';
import { Comment } from '../../../client/src/shared/interfaces';

type ApiRequest = (json: {}, socket?: Socket) => {} | void;
interface Socket extends SocketClient {
  streams?: { [stream: string]: Kinds };
  self_name: string;
  self_id: string;
  self_image: string;
  status: UserStatus;
}

type DatabaseId = string;
type CallId = string;
interface CallSockets {
  participants: Array<string>;
  viewers: Array<string>;
}

const DISCONNECT_FROM_CALL_TIMEOUT = 1000 * 120; // user has 2 minutes to reconnect
const disconnectFromCallTimeouts: Map<DatabaseId, NodeJS.Timeout> = new Map();

export class SocketServer implements Record<ACTIONS, ApiRequest> {
  private readonly io: Server;
  private lobby: Map<DatabaseId, Socket> = new Map();
  private calls: Map<CallId, CallSockets> = new Map();
  mixers: Map<string, StreamMixer> = new Map();
  private activeCallUsers: Map<CallId, number> = new Map();
  static hangRecords: Map<string, NodeJS.Timeout> = new Map();

  constructor(server) {
    const socketServer = this;
    this.io = socketIO(server);
    const generateId = this.io.engine['generateId'];
    this.io.engine['generateId'] = (req) => {
      const { query } = urlParse(req.url!);
      if (query) {
        const { socketId } = queryParse(query);
        if (socketId) {
          return socketId.toString();
        }
      }
      return generateId(req);
    };
    this.io.use(
      jwtAuth.authenticate(conf.auth, function (payload, done) {
        return done(null, payload.name);
      })
    );
    this.io.on('connection', (socket: Socket) => {
      SocketServer.socketLog(
        'connected',
        socket,
        Object.keys(socketServer.io.sockets.connected)
      );

      for (const action of Object.values(ACTIONS)) {
        socket.on(action, async (json, callback) => {
          if (typeof json === 'string') {
            json = JSON.parse(json);
          }
          SocketServer.socketLog(
            'got message',
            socket,
            action,
            JSON.stringify(json)
          );
          let response = (data) => {
            if (!callback) {
              SocketServer.socketError(
                'no ackres',
                socket,
                action,
                JSON.stringify(data)
              );
              return;
            }
            callback(data);
            SocketServer.socketLog(
              'sent message',
              socket,
              action,
              JSON.stringify(data) || 'void'
            );
          };
          let error = (errorId: ERROR, error?) => {
            response({
              errorId: errorId || ERROR.UNKNOWN,
              error: error,
            } as ErrorData);
          };
          try {
            response(await socketServer[action](json, socket));
          } catch (err) {
            if (err) {
              SocketServer.socketError(
                'error',
                socket,
                action,
                JSON.stringify(err)
              );
            }
            error(err.errorId, err.message);
          }
        });
      }
      socket.on('disconnecting', async () => {
        socket.status = 'offline';

        if (this.lobby.has(socket.self_id)) {
          console.log(
            `Removing ${socket.self_name} from lobby due to disconnect...`
          );
          this.lobby.delete(socket.self_id);

          this.sendNewUserStatusToLobby(socket);
        }

        SocketServer.socketLog('disconnecting', socket, socket.rooms);

        console.info(
          '> onDisconnectingHandler timeout was created. It can be cleared in 2 minutes if client socket will be reconnected'
        );

        disconnectFromCallTimeouts.set(
          socket.self_id,
          setTimeout(
            () => this.onDisconnectingHandler(socket),
            DISCONNECT_FROM_CALL_TIMEOUT
          )
        );

        // for (const roomId in socket.rooms) {
        //   if (roomId.startsWith(SocketServer.callRoom())) {
        //     const callId: string = roomId.substr(
        //       SocketServer.callRoom().length
        //     );
        //     await socketServer[ACTIONS.LEAVE_CALL]({ callId }, socket);
        //     console.log(ACTIONS.LEAVE_CALL, 'by disconnecting');
        //   }
        // }
      });
      socket.on('disconnect', async () => {
        SocketServer.socketLog(
          'disconnected',
          socket,
          Object.keys(socketServer.io.sockets.connected)
        );
      });
    });
  }
  async onDisconnectingHandler(socket: Socket) {
    console.info(
      "> onDisconnectingHandler timeout handler. It can't be cleared anymore"
    );

    disconnectFromCallTimeouts.delete(socket.self_id);

    for (const roomId in socket.rooms) {
      if (roomId.startsWith(SocketServer.callRoom())) {
        const callId: string = roomId.substr(SocketServer.callRoom().length);
        await SocketServer[ACTIONS.LEAVE_CALL]({ callId }, socket);
        console.log(ACTIONS.LEAVE_CALL, 'by disconnecting');
      }
    }
  }
  static trowError(errorId: ERROR, message?: string): never {
    throw { errorId, message };
  }
  static socketLog(action, socket: Socket, ...args) {
    console.info(action, socket.id, socket.request.user, ...args);
  }
  static socketError(action, socket: Socket, ...args) {
    console.error(action, socket.id, socket.request.user, ...args);
  }
  [ACTIONS.JOIN_LOBBY](
    { self_id, self_name, self_image }: JoinLobbyRequest,
    socket: Socket
  ): JoinLobbyResponse {
    socket.self_name = self_name;
    socket.self_id = self_id;
    socket.self_image = self_image;
    socket.status = 'online';
    this.sendNewUserStatusToLobby(socket);

    const timer = disconnectFromCallTimeouts.get(self_id);
    if (timer) {
      console.log('> onDisconnectingHandler timeout was cleared');
      clearTimeout(timer);
      disconnectFromCallTimeouts.delete(self_id);
    }

    const onlineUsers: Array<string> = [];
    const busyUsers: Array<string> = [];
    this.lobby.forEach((value, key) => {
      if (value.status === 'online') onlineUsers.push(key);
      if (value.status === 'busy') busyUsers.push(key);
    });

    socket.join(LOBBY_ROOM);
    this.lobby.set(self_id, socket);

    console.log(
      `> ${socket.id} joined room ${LOBBY_ROOM} with creds: ${socket.self_id}|${socket.self_name}`
    );

    return { onlineUsers, busyUsers };
  }

  [ACTIONS.MAKE_LOBBY_CALL](
    { call_id, _id, isRandomCall }: MakeLobbyCallRequest,
    socket: Socket
  ): MakeLobbyCallResponse {
    console.log(`> Trying to make a specific call to ${_id}`);

    let participant = this.lobby.get(_id);

    /**
     * It's possible that by the time of receiving this event
     * selected user joined the room ('busy' status)
     * or closed an app ("offline" status or no socket at all)
     * In case of a specific call (call to a friend), we immediately
     * throwing an error
     * If the call was random, trying to search for a new participant
     */
    if (!isRandomCall) {
      if (!participant || participant.status === 'offline') {
        console.log(`> ${USER_IS_OFFLINE}. Throwing an error...`);
        throw new Error(USER_IS_OFFLINE);
      } else if (participant.status === 'busy') {
        console.log(`> ${USER_IS_BUSY}. Throwing an error...`);
        throw new Error(USER_IS_BUSY);
      }
    } else {
      if (!participant || participant.status !== 'online') {
        participant = this.getRandomOnlineUserFromLobby(socket.self_id);
      }
    }

    const eventData: LobbyCallEventData = {
      caller_name: socket.self_name,
      caller_id: socket.self_id,
      caller_image: socket.self_image,
      caller_socket: socket.id,
      call_id,
    };

    console.log('> MakeLobbyCall event data: ', eventData);

    socket.to(participant.id).emit(CLIENT_ONLY_ACTIONS.LOBBY_CALL, eventData);

    return {
      participant_id: participant.self_id,
      participant_name: participant.self_name,
      participant_image: participant.self_image,
      participant_socket: participant.id,
    };
  }
  /**
   * Method will try to find a participant for 5 times.
   * If none was found, will throw an error
   */
  private getRandomOnlineUserFromLobby(callerId: string): Socket {
    let attempts = 0;
    let selectedSocket: Socket | undefined = undefined;

    /**
     * Trying to find an online user's socket
     * If there's no socket it means user is not in the lobby anymore
     * If socket has status "busy" he has already joined some call
     */
    do {
      selectedSocket = this.tryGetOnlineUserSocket(callerId);
      attempts += 1;
    } while (
      (!selectedSocket || selectedSocket.status === 'busy') &&
      attempts < 5
    );

    if (!selectedSocket || selectedSocket.status === 'busy') {
      console.log(`> ${NOT_ABLE_TO_FIND_PARTICIPANT}`);
      throw Error(NOT_ABLE_TO_FIND_PARTICIPANT);
    }

    return selectedSocket;
  }
  private tryGetOnlineUserSocket(callerId: string): Socket | undefined {
    const onlineUsersIds: Array<string> = [];

    this.lobby.forEach((value, key) => {
      if (value.status === 'online' && key !== callerId) {
        onlineUsersIds.push(key);
      }
    });

    if (!onlineUsersIds) {
      throw Error(ALL_USERS_ARE_UNAVAILABLE);
    }

    const randomUserId =
      onlineUsersIds[Math.floor(Math.random() * onlineUsersIds.length)];

    /**
     * At the time of return, socket by `randomUserId` may be already
     * - `offline`, thus doesn't exist in the lobby -> undefined
     * - have statys `busy`, thus ain't suitable for calling
     * Both of those cases are handled by calleer method
     */
    return this.lobby.get(randomUserId);
  }
  async [ACTIONS.SEND_INVITATION](
    { target_id, notification }: SendInvitationRequest,
    socket: Socket
  ): Promise<void> {
    const targetSocket = this.lobby.get(target_id);

    try {
      const mutualInvitationId = await NotificationsService.defineMutualInvitations(
        target_id,
        notification.user._id
      );

      if (mutualInvitationId) {
        this.acceptMutualContactRequest(
          { target_id, notification },
          socket,
          mutualInvitationId,
          targetSocket
        );
      } else {
        const { _id } = await NotificationsService.createNotification(
          notification,
          target_id
        );

        const eventData: NotificationEventData = {
          _id,
          ...notification,
        };

        if (targetSocket) {
          socket
            .to(targetSocket.id)
            .emit(CLIENT_ONLY_ACTIONS.NOTIFICATION, eventData);
        } else {
          console.log(
            'Target user is not in the lobby. "Friend invitation" notification won\'t be send'
          );
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
  async [ACTIONS.SEND_INVITATION_ACCEPTED](
    { notification, target_id }: SendInvitationAcceptedRequest,
    socket: Socket
  ): Promise<void> {
    const { _id } = await NotificationsService.createNotification(
      notification,
      target_id
    );

    const targetSocket = this.lobby.get(target_id);
    if (targetSocket) {
      const eventData: NotificationEventData = {
        _id,
        ...notification,
      };

      socket
        .to(targetSocket.id)
        .emit(CLIENT_ONLY_ACTIONS.NOTIFICATION, eventData);
    } else {
      console.log(
        'Target user is not in the lobby. "Invitation accepted" notification won\'t be send'
      );
    }
  }
  [ACTIONS.SEND_REMOVED_FROM_CONTACTS](
    { notification, target_id }: SendRemovedFromContactsRequest,
    socket: Socket
  ): void {
    const targetSocket = this.lobby.get(target_id);

    if (targetSocket) {
      /**
       * this kind of notification is used to update user's contact list in browser
       * no need to store it database
       */
      const eventData: NotificationEventData = {
        _id: '',
        ...notification,
      };

      socket
        .to(targetSocket.id)
        .emit(CLIENT_ONLY_ACTIONS.NOTIFICATION, eventData);
    } else {
      console.log(
        '> Target user is not in the lobby. "Removed from contacts" notification won\'t be send'
      );
    }
  }
  async [ACTIONS.SEND_MISSED_CALL_NOTIFICATION](
    { notification }: SendMissedCallNotificationRequest,
    socket: Socket
  ): Promise<void> {
    const { _id } = await NotificationsService.createNotification(
      notification,
      socket.self_id
    );

    const eventData: NotificationEventData = {
      _id,
      ...notification,
    };

    socket.emit(CLIENT_ONLY_ACTIONS.NOTIFICATION, eventData);
  }
  [ACTIONS.CALL_PARTICIPANTS]({ callId }: CallInput): CallParticipants {
    const callRoom = SocketServer.callRoom(callId);
    const socketRoom = this.io.sockets.adapter.rooms[callRoom];
    return {
      participants: Object.keys(
        (socketRoom && socketRoom.sockets) || {}
      ).map((socketId) => ({ socketId })),
    };
  }
  async [ACTIONS.JOIN_CALL](
    { callId }: CallInput,
    socket: Socket
  ): Promise<void> {
    socket.status = 'busy';
    this.sendNewUserStatusToLobby(socket);

    const callRoom = SocketServer.callRoom(callId);

    const callSockets = this.calls.get(callRoom);
    if (callSockets) {
      callSockets.participants.push(socket.id);
      console.log(
        `> Participant joined the room ${callId}. CallSockets participants count: ${callSockets.participants.length}, viewers: ${callSockets.viewers.length}`
      );
    } else {
      this.calls.set(callRoom, { participants: [socket.id], viewers: [] });
      console.log(`> Created new room for CallSockets ${callId}`);
    }

    socket.join(callRoom);
    const _data: SocketClientCallData = {
      socketId: socket.id,
      callId,
    };
    socket.to(callRoom).emit(ACTIONS.JOIN_CALL, _data);
    const socketRoom = this.io.sockets.adapter.rooms[callRoom];
    if (socketRoom && socketRoom.sockets) {
      for (const socketId in socketRoom.sockets) {
        const _socket: Socket = this.io.sockets.connected[socketId] as Socket;
        if (_socket && _socket.streams) {
          for (const stream in _socket.streams) {
            const kinds = _socket.streams[stream];
            const req: StreamStartData = { callId, socketId, stream, kinds };
            SocketServer.socketLog(
              'current stream',
              socket,
              ACTIONS.STREAM_START,
              req
            );

            socket.emit(ACTIONS.STREAM_START, req);
          }
        }
      }
    }
    SocketServer.socketLog('broadcast', socket, ACTIONS.JOIN_CALL, _data);
  }
  [ACTIONS.JOIN_CALL_AS_VIEWER](
    { callId }: JoinAsViewerRequest,
    socket: Socket
  ): JoinAsViewerResponse {
    socket.status = 'busy';
    this.sendNewUserStatusToLobby(socket);

    const callRoom = SocketServer.callRoom(callId);

    const callSockets = this.calls.get(callRoom);

    console.log(
      `> CallSockets participants count: ${callSockets?.participants?.length}, viewers: ${callSockets?.viewers?.length}`
    );

    if (!callSockets || callSockets.participants.length === 0) {
      throw Error(JoinAsViewerErrors.NO_PARTICIPANTS);
    }

    socket.join(callRoom);

    const eventData: ViewerJoinedEventData = {
      participant_id: socket.self_id,
      participant_image: socket.self_image,
      participant_name: socket.self_name,
    };

    socket.to(callRoom).emit(CLIENT_ONLY_ACTIONS.VIEWER_JOINED, eventData);

    const { participants, viewers } = callSockets;
    viewers.push(socket.id);

    console.log(
      `> Viewer joined the room. CallSockets participants count: ${callSockets.participants.length}, viewers: ${callSockets.viewers.length}`
    );

    const firstParticipant = this.io.sockets.connected[
      participants[0]
    ] as Socket;
    const secondParticipant = this.io.sockets.connected[
      participants[1]
    ] as Socket;

    if (!secondParticipant) {
      console.warn("> There's no second participant in the room");
    }

    return {
      firstParticipant: {
        participant_id: firstParticipant?.self_id,
        participant_image: firstParticipant?.self_image,
        participant_name: firstParticipant?.self_name,
      },
      secondParticipant: {
        participant_id: secondParticipant?.self_id,
        participant_image: secondParticipant?.self_image,
        participant_name: secondParticipant?.self_name,
      },
    };
  }
  [ACTIONS.JOIN_RECORDING_COMMENTS_ROOM](
    { recordingId }: JoinRecordingCommentsRoomRequest,
    socket: Socket
  ): void {
    const commentsRoom = SocketServer.recordingCommentsRoom(recordingId);
    socket.join(commentsRoom);
    console.log(
      `> User ${socket.self_name} joined the comments room ${commentsRoom}`
    );

    return;
  }
  [ACTIONS.LEAVE_RECORDING_COMMENTS_ROOM](
    { recordingId }: LeaveRecordingCommentsRoomRequest,
    socket: Socket
  ): void {
    const commentsRoom = SocketServer.recordingCommentsRoom(recordingId);
    socket.leave(commentsRoom);
    console.log(
      `> User ${socket.self_name} left the comments room ${commentsRoom}`
    );

    return;
  }
  async [ACTIONS.SEND_COMMENT](
    commentRequest: SendCommentRequest,
    socket: Socket
  ): Promise<Comment> {
    const { _id } = await RoomCommentsService.addCommentToRoom(commentRequest);

    const eventData: Comment = {
      ...commentRequest,
      _id,
    };

    if (commentRequest.callId) {
      const callRoom = SocketServer.callRoom(commentRequest.callId);
      console.log(
        `> Broadcasting comment from ${socket.self_name} to room ${callRoom}`
      );
      socket.broadcast
        .to(callRoom)
        .emit(CLIENT_ONLY_ACTIONS.COMMENT, eventData);
    } else if (commentRequest.recordingIds) {
      const recordingCommentsRoom = SocketServer.recordingCommentsRoom(
        commentRequest.recordingIds[0]
      );
      console.log(
        `> Broadcasting comment from ${socket.self_name} to room ${recordingCommentsRoom}`
      );
      socket.broadcast
        .to(recordingCommentsRoom)
        .emit(CLIENT_ONLY_ACTIONS.COMMENT, eventData);
    }

    return eventData;
  }
  [ACTIONS.LEAVE_CALL]({ callId }: CallInput, socket: Socket): void {
    socket.status = 'online';
    this.sendNewUserStatusToLobby(socket);

    const callRoom = SocketServer.callRoom(callId);

    const callSockets = this.calls.get(callRoom);
    if (callSockets) {
      const index = callSockets.participants.indexOf(socket.id);
      if (index !== -1) {
        callSockets.participants.splice(index, 1);

        console.log(
          `> Participant has left the room. CallSockets participants count: ${callSockets.participants.length}, viewers: ${callSockets.viewers.length}`
        );
        if (callSockets.participants.length === 0) {
          console.log(
            `> Room ${callRoom} is about to be removed. Notifying viewers`
          );
          this.io.to(callRoom).emit(CLIENT_ONLY_ACTIONS.LIVE_CALL_ENDED);

          this.calls.delete(callRoom);
        }
      } else {
        const viewerIndex = callSockets.viewers.indexOf(socket.id);
        if (viewerIndex !== -1) {
          callSockets.viewers.splice(index, 1);
          console.log(
            `> Viewer has left the room. CallSockets participants count: ${callSockets.participants.length}, viewers: ${callSockets.viewers.length}`
          );

          const eventData: ViewerJoinedEventData = {
            participant_id: socket.self_id,
            participant_image: socket.self_image,
            participant_name: socket.self_name,
          };

          socket.to(callRoom).emit(CLIENT_ONLY_ACTIONS.VIEWER_LEFT, eventData);
          if (callRoom in socket.rooms) {
            socket.leave(callRoom);
          }
          // viewers don't have streams or affect call flow so we don't want to execure any further logic
          return;
        }
      }
    }

    if (callRoom in socket.rooms) {
      socket.leave(callRoom);
      const data: SocketClientCallData = {
        socketId: socket.id,
        callId,
      };
      for (const stream in socket.streams) {
        this[ACTIONS.STREAM_STOP]({ callId, stream }, socket);
      }
      socket.to(callRoom).emit(ACTIONS.LEAVE_CALL, data);
      SocketServer.socketLog('broadcast', socket, ACTIONS.LEAVE_CALL, data);
    }
    const { participants } = this[ACTIONS.CALL_PARTICIPANTS]({ callId });
    if (!participants || !participants.length) {
      console.log('closing call', callId);
      this.closeCallMixer({ callId })
        .then(() => {})
        .catch(() => {});
    }
  }
  [ACTIONS.LEAVE_CALL_AS_VIEWER]({ callId }: CallInput, socket: Socket): void {
    socket.status = 'online';
    this.sendNewUserStatusToLobby(socket);

    const callRoom = SocketServer.callRoom(callId);

    const callSockets = this.calls.get(callRoom);
    if (callSockets) {
      const index = callSockets.viewers.indexOf(socket.id);
      if (index !== -1) {
        callSockets.viewers.splice(index, 1);
        console.log(
          `> Viewer has left the room. CallSockets participants count: ${callSockets.participants.length}, viewers: ${callSockets.viewers.length}`
        );

        const eventData: ViewerJoinedEventData = {
          participant_id: socket.self_id,
          participant_image: socket.self_image,
          participant_name: socket.self_name,
        };

        socket.to(callRoom).emit(CLIENT_ONLY_ACTIONS.VIEWER_LEFT, eventData);
      }
    } else {
      console.log(
        `> Viewer has left the room. It was already removed since all participants left the room`
      );
    }
    if (callRoom in socket.rooms) {
      socket.leave(callRoom);
    }
  }
  async [ACTIONS.STREAM_START](
    { callId, stream, kinds }: StreamStartRequest,
    socket: Socket
  ): Promise<void> {
    await this.updateSocketStreams(callId, socket, stream, kinds);
    socket.to(SocketServer.callRoom(callId)).emit(ACTIONS.STREAM_START, {
      callId,
      socketId: socket.id,
      stream,
      kinds,
    } as StreamStartData);

    let activeUsers = this.activeCallUsers.get(callId);
    if (activeUsers) {
      this.activeCallUsers.set(callId, ++activeUsers);
    } else {
      this.activeCallUsers.set(callId, 1);
    }

    activeUsers = this.activeCallUsers.get(callId);

    if (activeUsers && activeUsers >= 2) {
      let mixer = await this.getMixerByCall({ callId });

      if (mixer) {
        await mixer.startRecording();
      }
    }
  }
  async [ACTIONS.STREAM_CHANGE](
    { callId, stream, kinds }: StreamKindsCallData,
    socket: Socket
  ): Promise<void> {
    await this.updateSocketStreams(callId, socket, stream, kinds);
    socket.to(SocketServer.callRoom(callId)).emit(ACTIONS.STREAM_CHANGE, {
      callId,
      socketId: socket.id,
      stream,
      kinds,
    } as StreamStartData);
  }
  async [ACTIONS.STREAM_STOP](
    { callId, stream }: StreamStopRequest,
    socket: Socket
  ): Promise<void> {
    await this.updateSocketStreams(callId, socket, stream);
    socket.to(SocketServer.callRoom(callId)).emit(ACTIONS.STREAM_STOP, {
      callId,
      socketId: socket.id,
      stream,
    } as StreamStopData);
  }

  async [ACTIONS.CALL_STATUS_FROM_INITIATOR](
    { status, socketId, callId }: CallStatusFromInitiator,
    socket: Socket
  ) {
    const callRoom = SocketServer.callRoom(callId);

    socket.to(callRoom).emit(ACTIONS.CALL_STATUS_FROM_INITIATOR, {
      status,
      socketId,
    });
  }
  async [ACTIONS.CALL_STATUS_FROM_RECEIVER](
    { status, socketId, callId }: CallStatusFromReceiver,
    socket: Socket
  ) {
    const callRoom = SocketServer.callRoom(callId);

    socket.to(callRoom).emit(ACTIONS.CALL_STATUS_FROM_RECEIVER, {
      status,
      socketId,
    });
  }

  async [ACTIONS.APP_STATUS](appStatus: AppStatus, socket: Socket) {
    const callRoom = SocketServer.callRoom(appStatus.callId);

    socket.to(callRoom).emit(ACTIONS.APP_STATUS, appStatus);
  }

  async [ACTIONS.CALL_DETECTOR_STATUS](
    callDetectorStatus: CallDetectorStatus,
    socket: Socket
  ) {
    const callRoom = SocketServer.callRoom(callDetectorStatus.callId);

    socket.to(callRoom).emit(ACTIONS.CALL_DETECTOR_STATUS, callDetectorStatus);
  }

  async [ACTIONS.MIXER_LAYOUT]({
    callId,
    layout,
    streamsMap,
  }: MixerLayoutData): Promise<void> {
    let mixer = await this.getMixerByCall({ callId });

    if (mixer) {
      await mixer.changeLayout(layout, streamsMap);
    }
  }

  private async closeCallMixer({ callId }: CallInput): Promise<void> {
    const mixer = this.mixers.get(callId);
    if (mixer) {
      console.log(`_MIXER_ await mixer.close(); callId=${callId}`);
      await mixer.close();
      this.mixers.delete(callId);

      await mixer.saveCallRecord();

      const recordId = setTimeout(() => {
        CallRecordingService.deleteRecording({ callId: mixer.callId });
      }, conf.publishTimeOut);

      SocketServer.hangRecords.set(callId, recordId);
    }
  }
  async getMixerByCall({
    callId,
  }: CallInput): Promise<StreamMixer | undefined> {
    let mixer: StreamMixer | undefined = this.mixers.get(callId);
    if (!mixer) {
      const { participants } = await this[ACTIONS.CALL_PARTICIPANTS]({
        callId,
      });
      if (participants && participants.length) {
        mixer = new StreamMixer(
          new CloudApi(conf.cloud.url, conf.cloud.token),
          {}
        );
        this.mixers.set(callId, mixer);
        await mixer.init(callId);
      }
    }
    return mixer;
  }
  private async updateSocketStreams(
    callId: string,
    socket: Socket,
    stream: string,
    kinds: Kinds = []
  ): Promise<void> {
    if (!socket.streams) {
      socket.streams = {};
    }
    const oldKinds: Kinds | undefined = socket.streams[stream];
    if (kinds && kinds.length) {
      socket.streams[stream] = kinds;
    } else if (oldKinds) {
      delete socket.streams[stream];
    }
    let mixer = await this.getMixerByCall({ callId });
    if (mixer) {
      if (oldKinds) {
        for (const kind of oldKinds) {
          if (!kinds.includes(kind)) {
            await mixer.remove(stream, kind);
          }
        }
      }
      for (const kind of kinds) {
        if (!oldKinds || !oldKinds.includes(kind)) {
          await mixer.add(stream, kind);
        }
      }
    }
  }
  private static callRoom(id: string = '') {
    return `call:${id}`;
  }
  private static recordingCommentsRoom(id: string) {
    return `recording:${id}`;
  }
  static generateServerToken(name: string) {
    return signToken(
      { name, exp: Math.floor(Date.now() / 1000 + 12 * 24 * 3600) },
      conf.auth.secret,
      { algorithm: conf.auth.algorithm as Algorithm }
    );
  }

  async acceptMutualContactRequest(
    { target_id, notification }: SendInvitationRequest,
    socket: Socket,
    mutualInvitationId: string,
    targetSocket: Socket | undefined
  ) {
    await ContactsService.createContact(
      { contactPerson: target_id },
      notification.user._id
    );

    await NotificationsService.deleteNotification({
      notification_id: mutualInvitationId,
    });

    const targetUser = await UsersService.getUserData({ _id: target_id });

    const senderNotificationData = createInvitationAcceptedNotification({
      _id: targetUser._id,
      name: targetUser.name,
      imageUrl: targetUser.imageUrl,
    });

    const receiverNotificationData = createInvitationAcceptedNotification(
      notification.user
    );

    const notificationToSender = await NotificationsService.createNotification(
      senderNotificationData,
      notification.user._id
    );

    const notificationToReceiver = await NotificationsService.createNotification(
      receiverNotificationData,
      target_id
    );

    socket.emit(CLIENT_ONLY_ACTIONS.NOTIFICATION, {
      _id: notificationToSender._id,
      ...senderNotificationData,
    });

    if (targetSocket) {
      socket.to(targetSocket.id).emit(CLIENT_ONLY_ACTIONS.NOTIFICATION, {
        _id: notificationToReceiver._id,
        ...receiverNotificationData,
      });
    }
  }
  private sendNewUserStatusToLobby(socket: Socket) {
    const userStatusEventData: UserStatusEventData = {
      user_id: socket.self_id,
      status: socket.status,
    };

    console.log(
      `> Sending new user status data to lobby users: ${JSON.stringify(
        userStatusEventData
      )}`
    );

    socket.broadcast
      .to(LOBBY_ROOM)
      .emit(CLIENT_ONLY_ACTIONS.USER_STATUS, userStatusEventData);
  }
}
