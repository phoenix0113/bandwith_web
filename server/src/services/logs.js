[08/04/2021 09:29:17.202] [INFO]   got message 602bdcf13fa03d001d0bb1d3-socket { logged_in: false } joinCall {"callId":"026b2967-26d3-4a95-8655-3a764ed2dfc3","socketId":"602bdcf13fa03d001d0bb1d3-socket"}
[08/04/2021 09:29:17.202] [LOG]    > Sending new user status data to lobby users: {"user_id":"602bdcf13fa03d001d0bb1d3","status":"busy"}
[08/04/2021 09:29:17.202] [LOG]    > Created new room for CallSockets 026b2967-26d3-4a95-8655-3a764ed2dfc3
[08/04/2021 09:29:17.202] [INFO]   broadcast 602bdcf13fa03d001d0bb1d3-socket { logged_in: false } joinCall { socketId: '602bdcf13fa03d001d0bb1d3-socket',
  callId: '026b2967-26d3-4a95-8655-3a764ed2dfc3' }
[08/04/2021 09:29:17.202] [INFO]   sent message 602bdcf13fa03d001d0bb1d3-socket { logged_in: false } joinCall void
[08/04/2021 09:29:17.347] [INFO]   got message 602bdcf13fa03d001d0bb1d3-socket { logged_in: false } makeLobbyCall {"call_id":"026b2967-26d3-4a95-8655-3a764ed2dfc3","_id":"602507d8191d33001d2e1721","isRandomCall":true}
[08/04/2021 09:29:17.347] [LOG]    > Trying to make a specific call to 602507d8191d33001d2e1721
[08/04/2021 09:29:17.347] [LOG]    > MakeLobbyCall event data:  { caller_name: 'test',
  caller_id: '602bdcf13fa03d001d0bb1d3',
  caller_image: null,
  call_id: '026b2967-26d3-4a95-8655-3a764ed2dfc3' }
[08/04/2021 09:29:17.347] [INFO]   sent message 602bdcf13fa03d001d0bb1d3-socket { logged_in: false } makeLobbyCall {"participant_id":"602507d8191d33001d2e1721","participant_name":"Serhii Pyrozhenko","participant_image":"https://lh3.googleusercontent.com/a-/AOh14Gi-1dK-MnL_AJ7KOtpen33S40CfJZm13m8S7rswEw=s96-c"}
[08/04/2021 09:29:17.445] [LOG]    > Appending to /root/server/logs/test|602bdcf1. Logs:  [info] 2021.04.08 12:29:17.315000 global.ts: MAKE_LOBBY_CALL to 602507d8191d33001d2e1721 (generated callId: 026b2967-26d3-4a95-8655-3a764ed2dfc3)

[08/04/2021 09:29:17.445] [LOG]    > Log file was updated
[08/04/2021 09:29:17.552] [INFO]   got message 602507d8191d33001d2e1721-socket { logged_in: false } joinCall {"callId":"026b2967-26d3-4a95-8655-3a764ed2dfc3","socketId":"602507d8191d33001d2e1721-socket"}
[08/04/2021 09:29:17.552] [LOG]    > Sending new user status data to lobby users: {"user_id":"602507d8191d33001d2e1721","status":"busy"}
[08/04/2021 09:29:17.552] [LOG]    > Participant joined the room 026b2967-26d3-4a95-8655-3a764ed2dfc3. CallSockets participants count: 2, viewers: 0
[08/04/2021 09:29:17.553] [INFO]   broadcast 602507d8191d33001d2e1721-socket { logged_in: false } joinCall { socketId: '602507d8191d33001d2e1721-socket',
  callId: '026b2967-26d3-4a95-8655-3a764ed2dfc3' }
[08/04/2021 09:29:17.553] [INFO]   sent message 602507d8191d33001d2e1721-socket { logged_in: false } joinCall void
[08/04/2021 09:29:19.257] [INFO]   got message 602507d8191d33001d2e1721-socket { logged_in: false } receiverCallStatus {"status":2,"socketId":"602507d8191d33001d2e1721-socket","callId":"026b2967-26d3-4a95-8655-3a764ed2dfc3"}
[08/04/2021 09:29:19.257] [INFO]   sent message 602507d8191d33001d2e1721-socket { logged_in: false } receiverCallStatus void
[08/04/2021 09:29:19.515] [LOG]    > Appending to /root/server/logs/test|602bdcf1. Logs:  [info] 2021.04.08 12:29:17.665000 outgoingCall.ts: Socket 602507d8191d33001d2e1721-socket joined 026b2967-26d3-4a95-8655-3a764ed2dfc3 (receiver)
[info] 2021.04.08 12:29:19.369000 outgoingCall.ts: Call was accepted by receiver

[08/04/2021 09:29:19.516] [LOG]    > Log file was updated
[08/04/2021 09:29:20.006] [LOG]    > Appending to /root/server/logs/SerhiiPyrozhenko|602507d8. Logs:  [info] 2021.04.08 12:29:17.382000 incomingCall.ts: Call is being initialized... Current status: 0
[info] 2021.04.08 12:29:17.397000 incomingCall.ts: Call participant data: 602bdcf13fa03d001d0bb1d3|test
[info] 2021.04.08 12:29:17.599000 incomingCall.ts: You have joined room (as a receiver) with id 026b2967-26d3-4a95-8655-3a764ed2dfc3
[info] 2021.04.08 12:29:19.491000 incomingCall.ts: You acceped call. Starting a stream and init viewers tracker. ACCEPT status was sent

[08/04/2021 09:29:20.006] [LOG]    > Log file was updated
[08/04/2021 09:29:20.439] [LOG]    > Appending to /root/server/logs/SerhiiPyrozhenko|602507d8. Logs:  [info] 2021.04.08 12:29:19.510000 avcoreCall.ts: createMediaStreams call
[info] 2021.04.08 12:29:19.514000 avcoreCall.ts: Creating mediaStreams for kinds [video,audio]
[info] 2021.04.08 12:29:19.518000 avcoreCall.ts: New stream id was generated: 8a56b6f1-d0c2-4ff6-9291-0a2f93813456
[info] 2021.04.08 12:29:19.540000 avcoreCall.ts: Audio stream was initialized. Tracks added to localStream
[info] 2021.04.08 12:29:20.119000 avcoreCall.ts: Video stream was initialized. Tracks added to localStream

[08/04/2021 09:29:20.440] [LOG]    > Log file was updated
[08/04/2021 09:29:20.794] [LOG]    > Appending to /root/server/logs/SerhiiPyrozhenko|602507d8. Logs:  [info] 2021.04.08 12:29:20.121000 avcoreCall.ts: All necessary streams were initialized

[08/04/2021 09:29:20.794] [LOG]    > Log file was updated
[08/04/2021 09:29:21.431] [LOG]    > Appending to /root/server/logs/test|602bdcf1. Logs:  [info] 2021.04.08 12:29:19.371000 avcoreCall.ts: createMediaStreams call
[info] 2021.04.08 12:29:19.371000 avcoreCall.ts: Creating mediaStreams for kinds [video,audio]
[info] 2021.04.08 12:29:19.371000 avcoreCall.ts: New stream id was generated: fc5fc8a6-8c4c-4458-9122-a8cff98b528e
[info] 2021.04.08 12:29:19.416000 avcoreCall.ts: Audio stream was initialized. Tracks added to localStream
[info] 2021.04.08 12:29:21.303000 avcoreCall.ts: Video stream was initialized. Tracks added to localStream

[08/04/2021 09:29:21.432] [LOG]    > Appending to /root/server/logs/test|602bdcf1. Logs:  [info] 2021.04.08 12:29:21.303000 avcoreCall.ts: All necessary streams were initialized

[08/04/2021 09:29:21.432] [LOG]    > Log file was updated
[08/04/2021 09:29:21.433] [LOG]    > Log file was updated
[08/04/2021 09:29:21.669] [INFO]   got message 602507d8191d33001d2e1721-socket { logged_in: false } streamStart {"callId":"026b2967-26d3-4a95-8655-3a764ed2dfc3","stream":"8a56b6f1-d0c2-4ff6-9291-0a2f93813456","kinds":["video","audio"]}
[08/04/2021 09:29:21.767] [LOG]    > Appending to /root/server/logs/SerhiiPyrozhenko|602507d8. Logs:  [info] 2021.04.08 12:29:20.127000 avcoreCall.ts: createMediaStreams finished
[info] 2021.04.08 12:29:20.127000 avcoreCall.ts: avcoreCloudClient.create(PUBLISH, localstream id = 8a56b6f1-d0c2-4ff6-9291-0a2f93813456)
[info] 2021.04.08 12:29:20.635000 avcoreCall.ts: capture.publish call
[info] 2021.04.08 12:29:21.497000 avcoreCall.ts: capture.publish finished
[info] 2021.04.08 12:29:21.498000 avcoreCall.ts: emiting ACTIONS.STREAM_START

[08/04/2021 09:29:21.768] [LOG]    > Log file was updated
[08/04/2021 09:29:22.075] [INFO]   got message 602bdcf13fa03d001d0bb1d3-socket { logged_in: false } streamStart {"callId":"026b2967-26d3-4a95-8655-3a764ed2dfc3","stream":"fc5fc8a6-8c4c-4458-9122-a8cff98b528e","kinds":["video","audio"]}
[08/04/2021 09:29:22.076] [LOG]    queued mixerAdd
[08/04/2021 09:29:22.076] [INFO]   sent message 602bdcf13fa03d001d0bb1d3-socket { logged_in: false } streamStart void
[08/04/2021 09:29:22.173] [LOG]    > Appending to /root/server/logs/test|602bdcf1. Logs:  [info] 2021.04.08 12:29:21.305000 avcoreCall.ts: createMediaStreams finished
[info] 2021.04.08 12:29:21.305000 avcoreCall.ts: avcoreCloudClient.create(PUBLISH, localstream id = fc5fc8a6-8c4c-4458-9122-a8cff98b528e)
[info] 2021.04.08 12:29:21.522000 avcoreCall.ts: capture.publish call
[info] 2021.04.08 12:29:22.044000 avcoreCall.ts: capture.publish finished
[info] 2021.04.08 12:29:22.044000 avcoreCall.ts: emiting ACTIONS.STREAM_START

[08/04/2021 09:29:22.173] [LOG]    > Log file was updated
[08/04/2021 09:29:22.220] [INFO]   got message 602bdcf13fa03d001d0bb1d3-socket { logged_in: false } mixerLayout {"callId":"026b2967-26d3-4a95-8655-3a764ed2dfc3","layout":1,"streamsMap":{"fc5fc8a6-8c4c-4458-9122-a8cff98b528e":0,"34c70a49-5da2-4514-8526-84e4c8938233":1}}
[08/04/2021 09:29:22.220] [LOG]    queued mixerAdd
[08/04/2021 09:29:22.220] [LOG]    queued mixerAdd
[08/04/2021 09:29:22.220] [INFO]   sent message 602bdcf13fa03d001d0bb1d3-socket { logged_in: false } mixerLayout void
[08/04/2021 09:29:22.317] [LOG]    > Appending to /root/server/logs/test|602bdcf1. Logs:  [info] 2021.04.08 12:29:22.188000 avcoreCall.ts: You've published stream with id fc5fc8a6-8c4c-4458-9122-a8cff98b528e. Playing: [video,audio]. Room participants was notified

[08/04/2021 09:29:22.317] [LOG]    > Log file was updated
[08/04/2021 09:29:22.489] [LOG]    got message mixerStart {"mixerId":"74892766-f682-4fed-8937-02f8f22bf547"}
[08/04/2021 09:29:22.870] [LOG]    sent message listenMixerStopped {"mixerId":"74892766-f682-4fed-8937-02f8f22bf547"}
[08/04/2021 09:29:22.964] [LOG]    got message listenMixerStopped false
[08/04/2021 09:29:22.964] [LOG]    sent message mixerPipeStart {"stream":"026b2967-26d3-4a95-8655-3a764ed2dfc3","mixerId":"74892766-f682-4fed-8937-02f8f22bf547","type":0,"kinds":["video","audio"]}
[08/04/2021 09:29:23.071] [LOG]    > Appending to /root/server/logs/SerhiiPyrozhenko|602507d8. Logs:  [info] 2021.04.08 12:29:22.133000 incomingCall.ts: STREAM_START event with stream fc5fc8a6-8c4c-4458-9122-a8cff98b528e. Subscribing...
[info] 2021.04.08 12:29:22.134000 avcoreCall.ts: Trying to subscribe to stream fc5fc8a6-8c4c-4458-9122-a8cff98b528e with kinds [video,audio]
[info] 2021.04.08 12:29:22.134000 avcoreCall.ts: Calling avcoreCloudClient.create with SUBSCRIBE operation
[info] 2021.04.08 12:29:22.200000 avcoreCall.ts: Calling await playback.subscribe()
[info] 2021.04.08 12:29:22.821000 avcoreCall.ts: You've subscribed to the stream with id fc5fc8a6-8c4c-4458-9122-a8cff98b528e. Playing: [video,audio]

[08/04/2021 09:29:23.072] [LOG]    > Log file was updated
[08/04/2021 09:29:23.094] [LOG]    got message mixerPipeStart {"pipeId":"928a6b57-401f-4137-96b5-67417e7bf77f"}
[08/04/2021 09:29:23.396] [LOG]    sent message mixerAdd {"kind":"video","stream":"fc5fc8a6-8c4c-4458-9122-a8cff98b528e","options":{"x":0,"y":0,"width":400,"height":400,"z":0,"renderType":"crop"},"mixerId":"74892766-f682-4fed-8937-02f8f22bf547"}
[08/04/2021 09:29:23.398] [LOG]    sent message mixerAdd {"kind":"audio","stream":"fc5fc8a6-8c4c-4458-9122-a8cff98b528e","mixerId":"74892766-f682-4fed-8937-02f8f22bf547"}
[08/04/2021 09:29:23.402] [LOG]    sent message mixerAdd {"kind":"video","stream":"34c70a49-5da2-4514-8526-84e4c8938233","options":{"x":0,"y":400,"width":400,"height":400,"z":0,"renderType":"crop"},"mixerId":"74892766-f682-4fed-8937-02f8f22bf547"}
[08/04/2021 09:29:23.491] [LOG]    got message mixerAdd null
[08/04/2021 09:29:23.492] [LOG]    got message mixerAdd null
[08/04/2021 09:29:23.498] [LOG]    got message mixerAdd null
[08/04/2021 09:29:23.787] [LOG]    sent message mixerAdd {"kind":"audio","stream":"8a56b6f1-d0c2-4ff6-9291-0a2f93813456","mixerId":"74892766-f682-4fed-8937-02f8f22bf547"}
[08/04/2021 09:29:23.882] [LOG]    got message mixerAdd null
[08/04/2021 09:29:23.883] [LOG]    sent message mixerPipeStart {"mixerId":"74892766-f682-4fed-8937-02f8f22bf547","type":1,"kinds":["video","audio"]}
[08/04/2021 09:29:23.991] [LOG]    got message mixerPipeStart {"pipeId":"ae2675fa-ec7e-409e-a9bd-04a5f30f3344"}
[08/04/2021 09:29:23.991] [INFO]   sent message 602507d8191d33001d2e1721-socket { logged_in: false } streamStart void
[08/04/2021 09:29:24.183] [LOG]    > Appending to /root/server/logs/test|602bdcf1. Logs:  [info] 2021.04.08 12:29:22.337000 avcoreCall.ts: Mixer layout has been sent: {"callId":"026b2967-26d3-4a95-8655-3a764ed2dfc3","layout":1,"streamsMap":{"fc5fc8a6-8c4c-4458-9122-a8cff98b528e":0,"34c70a49-5da2-4514-8526-84e4c8938233":1}}
[info] 2021.04.08 12:29:23.995000 outgoingCall.ts: STREAM_START event with stream 8a56b6f1-d0c2-4ff6-9291-0a2f93813456. Subscribing...
[info] 2021.04.08 12:29:23.995000 avcoreCall.ts: Trying to subscribe to stream 8a56b6f1-d0c2-4ff6-9291-0a2f93813456 with kinds [video,audio]
[info] 2021.04.08 12:29:23.995000 avcoreCall.ts: Calling avcoreCloudClient.create with SUBSCRIBE operation
[info] 2021.04.08 12:29:24.054000 avcoreCall.ts: Calling await playback.subscribe()

[08/04/2021 09:29:24.183] [LOG]    > Log file was updated
[08/04/2021 09:29:24.315] [LOG]    > Appending to /root/server/logs/SerhiiPyrozhenko|602507d8. Logs:  [info] 2021.04.08 12:29:23.026000 avcoreCall.ts: [onAddTrack] adding track to the remote stream
[info] 2021.04.08 12:29:23.027000 avcoreCall.ts: [onAddTrack] Received new audio track. Setting 'enabled' to true
[info] 2021.04.08 12:29:23.082000 avcoreCall.ts: [onAddTrack] adding track to the remote stream
[info] 2021.04.08 12:29:23.083000 avcoreCall.ts: [onAddTrack] video tracks are present. Updating remote video stream
[info] 2021.04.08 12:29:24.041000 avcoreCall.ts: You've published stream with id 8a56b6f1-d0c2-4ff6-9291-0a2f93813456. Playing: [video,audio]. Room participants was notified

[08/04/2021 09:29:24.315] [LOG]    > Log file was updated
[08/04/2021 09:29:24.497] [INFO]   got message 602bdcf13fa03d001d0bb1d3-socket { logged_in: false } mixerLayout {"callId":"026b2967-26d3-4a95-8655-3a764ed2dfc3","layout":1,"streamsMap":{"fc5fc8a6-8c4c-4458-9122-a8cff98b528e":0,"8a56b6f1-d0c2-4ff6-9291-0a2f93813456":1}}
[08/04/2021 09:29:24.789] [LOG]    sent message mixerAdd {"kind":"video","stream":"8a56b6f1-d0c2-4ff6-9291-0a2f93813456","options":{"x":0,"y":400,"width":400,"height":400,"z":0,"renderType":"crop"},"mixerId":"74892766-f682-4fed-8937-02f8f22bf547"}
[08/04/2021 09:29:24.885] [LOG]    got message mixerAdd null
[08/04/2021 09:29:24.885] [INFO]   sent message 602bdcf13fa03d001d0bb1d3-socket { logged_in: false } mixerLayout void
[08/04/2021 09:29:40.363] [INFO]   got message 602507d8191d33001d2e1721-socket { logged_in: false } appStatus {"appStatus":"inactive","callId":"026b2967-26d3-4a95-8655-3a764ed2dfc3"}
[08/04/2021 09:29:40.364] [INFO]   sent message 602507d8191d33001d2e1721-socket { logged_in: false } appStatus void
[08/04/2021 09:30:09.799] [LOG]    > Specified from client id was used for socket: 602507d8191d33001d2e1721-socket
[08/04/2021 09:30:09.799] [INFO]   connected 602507d8191d33001d2e1721-socket { logged_in: false } [ '602bdcf13fa03d001d0bb1d3-socket',
  '602507d8191d33001d2e1721-socket' ]
[08/04/2021 09:30:10.325] [INFO]   got message 602507d8191d33001d2e1721-socket { logged_in: false } joinLobby {"self_id":"602507d8191d33001d2e1721","self_name":"Serhii Pyrozhenko","self_image":"https://lh3.googleusercontent.com/a-/AOh14Gi-1dK-MnL_AJ7KOtpen33S40CfJZm13m8S7rswEw=s96-c","available":true}
[08/04/2021 09:30:10.325] [LOG]    > Sending new user status data to lobby users: {"user_id":"602507d8191d33001d2e1721","status":"online"}
[08/04/2021 09:30:10.325] [LOG]    > 602507d8191d33001d2e1721-socket joined room lobby_room with creds: 602507d8191d33001d2e1721|Serhii Pyrozhenko
[08/04/2021 09:30:10.325] [INFO]   sent message 602507d8191d33001d2e1721-socket { logged_in: false } joinLobby {"onlineUsers":[],"busyUsers":["602bdcf13fa03d001d0bb1d3","602507d8191d33001d2e1721"]}
[08/04/2021 09:30:10.363] [LOG]    Removing Serhii Pyrozhenko from lobby due to disconnect...
[08/04/2021 09:30:10.364] [LOG]    > Sending new user status data to lobby users: {"user_id":"602507d8191d33001d2e1721","status":"offline"}
[08/04/2021 09:30:10.364] [INFO]   disconnecting 602507d8191d33001d2e1721-socket { logged_in: false } { '602507d8191d33001d2e1721-socket': '602507d8191d33001d2e1721-socket',
  lobby_room: 'lobby_room',
  'call:026b2967-26d3-4a95-8655-3a764ed2dfc3': 'call:026b2967-26d3-4a95-8655-3a764ed2dfc3' }
[08/04/2021 09:30:10.364] [LOG]    > Socket was in the call room. Creating onDisconnectingHandler timeout that can be cleared in 120 seconds
[08/04/2021 09:30:10.364] [INFO]   disconnected 602507d8191d33001d2e1721-socket { logged_in: false } [ '602bdcf13fa03d001d0bb1d3-socket' ]
[08/04/2021 09:30:10.956] [LOG]    > Appending to /root/server/logs/SerhiiPyrozhenko|602507d8. Logs:  [info] 2021.04.08 12:29:50.592000 avcoreCall.ts: Capture was closed. Emiting STREAM_STOP
[info] 2021.04.08 12:29:50.596000 avcoreCall.ts: createMediaStreams call
[info] 2021.04.08 12:29:50.597000 avcoreCall.ts: Creating mediaStreams for kinds [video,audio]
[info] 2021.04.08 12:29:50.597000 avcoreCall.ts: Closing subscribed stream fc5fc8a6-8c4c-4458-9122-a8cff98b528e
[info] 2021.04.08 12:29:50.601000 avcoreCall.ts: Trying to subscribe to stream fc5fc8a6-8c4c-4458-9122-a8cff98b528e with kinds [video,audio]
[info] 2021.04.08 12:29:50.604000 avcoreCall.ts: Calling avcoreCloudClient.create with SUBSCRIBE operation
[info] 2021.04.08 12:29:50.736000 avcoreCall.ts: [onRemoveTrack] removing track from the remote stream
[info] 2021.04.08 12:29:50.795000 avcoreCall.ts: [onRemoveTrack] removing track from the remote stream
[error] 2021.04.08 12:29:51.196000 avcoreCall.ts: Network Error
[info] 2021.04.08 12:29:51.557000 avcoreCall.ts: Audio stream was initialized. Tracks added to localStream
[info] 2021.04.08 12:29:51.769000 avcoreCall.ts: Video stream was initialized. Tracks added to localStream
[info] 2021.04.08 12:29:51.776000 avcoreCall.ts: All necessary streams were initialized
[info] 2021.04.08 12:29:51.778000 avcoreCall.ts: createMediaStreams finished
[info] 2021.04.08 12:29:51.781000 avcoreCall.ts: avcoreCloudClient.create(PUBLISH, localstream id = 8a56b6f1-d0c2-4ff6-9291-0a2f93813456)
[error] 2021.04.08 12:29:51.819000 avcoreCall.ts: Network Error
[info] 2021.04.08 12:30:10.724000 avcoreCall.ts: [onAddTrack] adding track to the remote stream

[08/04/2021 09:30:10.956] [LOG]    > Log file was updated
[08/04/2021 09:30:11.876] [LOG]    > Specified from client id was used for socket: 602507d8191d33001d2e1721-socket
[08/04/2021 09:30:11.876] [INFO]   connected 602507d8191d33001d2e1721-socket { logged_in: false } [ '602bdcf13fa03d001d0bb1d3-socket',
  '602507d8191d33001d2e1721-socket' ]
[08/04/2021 09:30:12.392] [INFO]   got message 602507d8191d33001d2e1721-socket { logged_in: false } joinLobby {"self_id":"602507d8191d33001d2e1721","self_name":"Serhii Pyrozhenko","self_image":"https://lh3.googleusercontent.com/a-/AOh14Gi-1dK-MnL_AJ7KOtpen33S40CfJZm13m8S7rswEw=s96-c","available":true}
[08/04/2021 09:30:12.392] [LOG]    > Sending new user status data to lobby users: {"user_id":"602507d8191d33001d2e1721","status":"online"}
[08/04/2021 09:30:12.393] [LOG]    > disconnectTimeoutData:  { oldSocketData:
   { streams: { '8a56b6f1-d0c2-4ff6-9291-0a2f93813456': [Array] },
     callId: '026b2967-26d3-4a95-8655-3a764ed2dfc3' },
  timeout:
   Timeout {
     _called: false,
     _idleTimeout: 120000,
     _idlePrev: [TimersList],
     _idleNext: [TimersList],
     _idleStart: 498749552,
     _onTimeout: [Function],
     _timerArgs: undefined,
     _repeat: null,
     _destroyed: false,
     [Symbol(unrefed)]: false,
     [Symbol(asyncId)]: 648505,
     [Symbol(triggerId)]: 648321 },
  disconnected: false }
[08/04/2021 09:30:12.393] [LOG]    > onDisconnectingHandler timeout was cleared
[08/04/2021 09:30:12.393] [LOG]    callSockets:  { participants:
   [ '602bdcf13fa03d001d0bb1d3-socket',
     '602507d8191d33001d2e1721-socket' ],
  viewers: [] }
[08/04/2021 09:30:12.393] [LOG]    > Rejoined call room call:026b2967-26d3-4a95-8655-3a764ed2dfc3 with new socket
[08/04/2021 09:30:12.393] [LOG]    > Sending new user status data to lobby users: {"user_id":"602507d8191d33001d2e1721","status":"busy"}
[08/04/2021 09:30:12.393] [LOG]    > 602507d8191d33001d2e1721-socket joined room lobby_room with creds: 602507d8191d33001d2e1721|Serhii Pyrozhenko
[08/04/2021 09:30:12.393] [INFO]   sent message 602507d8191d33001d2e1721-socket { logged_in: false } joinLobby {"onlineUsers":[],"busyUsers":["602bdcf13fa03d001d0bb1d3"]}
[08/04/2021 09:30:23.329] [INFO]   got message 602507d8191d33001d2e1721-socket { logged_in: false } receiverCallStatus {"status":6,"socketId":"602507d8191d33001d2e1721-socket","callId":"026b2967-26d3-4a95-8655-3a764ed2dfc3"}
[08/04/2021 09:30:23.329] [INFO]   sent message 602507d8191d33001d2e1721-socket { logged_in: false } receiverCallStatus void
[08/04/2021 09:30:23.479] [INFO]   got message 602bdcf13fa03d001d0bb1d3-socket { logged_in: false } streamStop {"callId":"026b2967-26d3-4a95-8655-3a764ed2dfc3","stream":"fc5fc8a6-8c4c-4458-9122-a8cff98b528e"}
[08/04/2021 09:30:23.480] [LOG]    sent message mixerRemove {"kind":"video","stream":"fc5fc8a6-8c4c-4458-9122-a8cff98b528e","mixerId":"74892766-f682-4fed-8937-02f8f22bf547"}
[08/04/2021 09:30:23.488] [INFO]   got message 602bdcf13fa03d001d0bb1d3-socket { logged_in: false } leaveCall {"callId":"026b2967-26d3-4a95-8655-3a764ed2dfc3"}
[08/04/2021 09:30:23.488] [LOG]    > Sending new user status data to lobby users: {"user_id":"602bdcf13fa03d001d0bb1d3","status":"offline"}
[08/04/2021 09:30:23.488] [LOG]    > Participant has left the room. CallSockets participants count: 1, viewers: 0
[08/04/2021 09:30:23.488] [INFO]   broadcast 602bdcf13fa03d001d0bb1d3-socket { logged_in: false } leaveCall { socketId: '602bdcf13fa03d001d0bb1d3-socket',
  callId: '026b2967-26d3-4a95-8655-3a764ed2dfc3' }
[08/04/2021 09:30:23.488] [INFO]   sent message 602bdcf13fa03d001d0bb1d3-socket { logged_in: false } leaveCall void
[08/04/2021 09:30:23.494] [INFO]   got message 602507d8191d33001d2e1721-socket { logged_in: false } streamStop {"callId":"026b2967-26d3-4a95-8655-3a764ed2dfc3","stream":"8a56b6f1-d0c2-4ff6-9291-0a2f93813456"}
[08/04/2021 09:30:23.495] [LOG]    sent message mixerRemove {"kind":"video","stream":"8a56b6f1-d0c2-4ff6-9291-0a2f93813456","mixerId":"74892766-f682-4fed-8937-02f8f22bf547"}
[08/04/2021 09:30:23.550] [INFO]   got message 602507d8191d33001d2e1721-socket { logged_in: false } leaveCall {"callId":"026b2967-26d3-4a95-8655-3a764ed2dfc3"}
[08/04/2021 09:30:23.550] [LOG]    > Sending new user status data to lobby users: {"user_id":"602507d8191d33001d2e1721","status":"online"}
[08/04/2021 09:30:23.550] [LOG]    > Participant has left the room. CallSockets participants count: 0, viewers: 0
[08/04/2021 09:30:23.550] [LOG]    > Room call:026b2967-26d3-4a95-8655-3a764ed2dfc3 is about to be removed. Notifying viewers
[08/04/2021 09:30:23.551] [INFO]   broadcast 602507d8191d33001d2e1721-socket { logged_in: false } leaveCall { socketId: '602507d8191d33001d2e1721-socket',
  callId: '026b2967-26d3-4a95-8655-3a764ed2dfc3' }
[08/04/2021 09:30:23.551] [LOG]    closing call 026b2967-26d3-4a95-8655-3a764ed2dfc3
[08/04/2021 09:30:23.551] [LOG]    _MIXER_ await mixer.close(); callId=026b2967-26d3-4a95-8655-3a764ed2dfc3
[08/04/2021 09:30:23.551] [LOG]    _MIXER_ await this.api.mixerClose({mixerId:74892766-f682-4fed-8937-02f8f22bf547)
[08/04/2021 09:30:23.551] [LOG]    sent message mixerClose {"mixerId":"74892766-f682-4fed-8937-02f8f22bf547"}
[08/04/2021 09:30:23.551] [INFO]   sent message 602507d8191d33001d2e1721-socket { logged_in: false } leaveCall void
[08/04/2021 09:30:23.574] [LOG]    got message mixerRemove null
[08/04/2021 09:30:23.574] [LOG]    queued mixerRemove
[08/04/2021 09:30:23.574] [INFO]   sent message 602bdcf13fa03d001d0bb1d3-socket { logged_in: false } streamStop void
[08/04/2021 09:30:23.582] [LOG]    > Appending to /root/server/logs/test|602bdcf1. Logs:  [info] 2021.04.08 12:29:24.466000 avcoreCall.ts: You've subscribed to the stream with id 8a56b6f1-d0c2-4ff6-9291-0a2f93813456. Playing: [video,audio]
[info] 2021.04.08 12:29:24.997000 avcoreCall.ts: Mixer layout has been sent: {"callId":"026b2967-26d3-4a95-8655-3a764ed2dfc3","layout":1,"streamsMap":{"fc5fc8a6-8c4c-4458-9122-a8cff98b528e":0,"8a56b6f1-d0c2-4ff6-9291-0a2f93813456":1}}
[info] 2021.04.08 12:29:40.476000 avcoreCall.ts: > APP_STATUS event: inactive
[info] 2021.04.08 12:30:23.441000 outgoingCall.ts: Call was finished by receiver

[08/04/2021 09:30:23.583] [LOG]    > Log file was updated
[08/04/2021 09:30:23.589] [LOG]    got message mixerRemove null
[08/04/2021 09:30:23.589] [LOG]    queued mixerRemove
[08/04/2021 09:30:23.589] [INFO]   sent message 602507d8191d33001d2e1721-socket { logged_in: false } streamStop void
[08/04/2021 09:30:23.596] [LOG]    > Appending to /root/server/logs/SerhiiPyrozhenko|602507d8. Logs:  [info] 2021.04.08 12:30:10.728000 avcoreCall.ts: [onAddTrack] Received new audio track. Setting 'enabled' to true
[info] 2021.04.08 12:30:10.810000 avcoreCall.ts: [onAddTrack] adding track to the remote stream
[info] 2021.04.08 12:30:23.347000 incomingCall.ts: Call was finished from your side. FINISHED status was sent

[08/04/2021 09:30:23.596] [LOG]    > Log file was updated
[08/04/2021 09:30:23.650] [LOG]    got message mixerClose null
[08/04/2021 09:30:23.718] [INFO]   got message 602bdcf13fa03d001d0bb1d3-socket { logged_in: false } mixerLayout {"callId":"026b2967-26d3-4a95-8655-3a764ed2dfc3","layout":1,"streamsMap":{"8a56b6f1-d0c2-4ff6-9291-0a2f93813456":1}}
[08/04/2021 09:30:23.718] [INFO]   sent message 602bdcf13fa03d001d0bb1d3-socket { logged_in: false } mixerLayout void
[08/04/2021 09:30:23.741] [LOG]    > Appending to /root/server/logs/test|602bdcf1. Logs:  [info] 2021.04.08 12:30:23.448000 avcoreCall.ts: Capture was closed. Emiting STREAM_STOP
[info] 2021.04.08 12:30:23.602000 outgoingCall.ts: You left the call room with id 026b2967-26d3-4a95-8655-3a764ed2dfc3
[info] 2021.04.08 12:30:23.603000 outgoingCall.ts: All listeners and trackers were cleaned

[08/04/2021 09:30:23.742] [LOG]    > Log file was updated
[08/04/2021 09:30:23.824] [LOG]    > Appending to /root/server/logs/test|602bdcf1. Logs:  [info] 2021.04.08 12:30:23.687000 avcoreCall.ts: You've stopped streaming of fc5fc8a6-8c4c-4458-9122-a8cff98b528e

[08/04/2021 09:30:23.824] [LOG]    > Log file was updated
[08/04/2021 09:30:23.870] [LOG]    > Appending to /root/server/logs/SerhiiPyrozhenko|602507d8. Logs:  [info] 2021.04.08 12:30:23.349000 avcoreCall.ts: Capture was closed. Emiting STREAM_STOP
[info] 2021.04.08 12:30:23.415000 avcoreCall.ts: [onRemoveTrack] removing track from the remote stream
[info] 2021.04.08 12:30:23.419000 avcoreCall.ts: [onRemoveTrack] removing track from the remote stream
[info] 2021.04.08 12:30:23.633000 incomingCall.ts: You left the call room with id 026b2967-26d3-4a95-8655-3a764ed2dfc3
[info] 2021.04.08 12:30:23.634000 incomingCall.ts: All listeners and trackers were cleaned

[08/04/2021 09:30:23.870] [LOG]    > Appending to /root/server/logs/SerhiiPyrozhenko|602507d8. Logs:  [info] 2021.04.08 12:30:23.638000 avcoreCall.ts: You've stopped streaming of 8a56b6f1-d0c2-4ff6-9291-0a2f93813456

[08/04/2021 09:30:23.870] [LOG]    > Log file was updated
[08/04/2021 09:30:23.871] [LOG]    > Log file was updated
[08/04/2021 09:30:24.297] [LOG]    got message streamRecordings {"list":[]}
[08/04/2021 09:30:24.938] [INFO]   got message 602507d8191d33001d2e1721-socket { logged_in: false } setOnlineStatus {"onlineStatus":"offline"}
[08/04/2021 09:30:24.938] [LOG]    > New status set for Serhii Pyrozhenko: offline
[08/04/2021 09:30:24.938] [LOG]    > Sending new user status data to lobby users: {"user_id":"602507d8191d33001d2e1721","status":"offline"}
[08/04/2021 09:30:24.938] [INFO]   sent message 602507d8191d33001d2e1721-socket { logged_in: false } setOnlineStatus void
[08/04/2021 09:30:26.239] [LOG]    Removing Serhii Pyrozhenko from lobby due to disconnect...
[08/04/2021 09:30:26.239] [LOG]    > Sending new user status data to lobby users: {"user_id":"602507d8191d33001d2e1721","status":"offline"}
[08/04/2021 09:30:26.239] [INFO]   disconnecting 602507d8191d33001d2e1721-socket { logged_in: false } { '602507d8191d33001d2e1721-socket': '602507d8191d33001d2e1721-socket',
  lobby_room: 'lobby_room' }
[08/04/2021 09:30:26.240] [LOG]    > Socket wasn't it the call. No need to call LEAVE_CALL or setup timeout
[08/04/2021 09:30:26.240] [INFO]   disconnected 602507d8191d33001d2e1721-socket { logged_in: false } [ '602bdcf13fa03d001d0bb1d3-socket' ]
[08/04/2021 09:30:40.325] [INFO]   disconnecting 602507d8191d33001d2e1721-socket { logged_in: false } { '602507d8191d33001d2e1721-socket': '602507d8191d33001d2e1721-socket',
  lobby_room: 'lobby_room' }
[08/04/2021 09:30:40.326] [LOG]    > Socket wasn't it the call. No need to call LEAVE_CALL or setup timeout
[08/04/2021 09:30:40.326] [INFO]   disconnected 602507d8191d33001d2e1721-socket { logged_in: false } [ '602bdcf13fa03d001d0bb1d3-socket' ]
[08/04/2021 09:31:22.595] [LOG]    > Appending to /root/server/logs/test|602bdcf1. Logs:  [info] 2021.04.08 12:30:23.832000 avcoreCall.ts: Mixer layout has been sent: {"callId":"026b2967-26d3-4a95-8655-3a764ed2dfc3","layout":1,"streamsMap":{"8a56b6f1-d0c2-4ff6-9291-0a2f93813456":1}}
[info] 2021.04.08 12:31:22.457000 outgoingCall.ts: OutgoingCall service was reset. Redirecting to Home page...

[08/04/2021 09:31:22.596] [LOG]    > Log file was updated
[08/04/2021 09:31:24.976] [LOG]    got message deleteStreamRecordings ""
[08/04/2021 09:32:09.959] [ERROR]  (node:29) MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 wakeup listeners added. Use emitter.setMaxListeners() to increase limit
