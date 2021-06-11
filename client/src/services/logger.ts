import { format } from "date-fns";

// eslint-disable-next-line import/no-cycle
import { GlobalStorage } from "./global";

import { logOnServerRequest, sendLogs } from "../axios/routes/logs";
import { showErrorNotification, showInfoNotification } from "../utils/notification";
import { SEND_LOGS_THRESHOLD } from "../utils/constants";

interface LogItem {
  date: string;
  file: string;
  message: string;
  type: string;
}

class LoggerService {
  private logs: Array<LogItem> = [];

  private stringifiedLogs = "";

  public log = (
    type: "error"|"info",
    file: string,
    message: string,
    shouldConsole?: boolean,
    forceSend?: boolean,
    shouldShowUser?: boolean,
  ): void => {
    const formatedDate = format(new Date(), "yyyy.MM.dd HH:mm:ss.SSSSSS");

    this.logs.push({
      date: formatedDate,
      file,
      message,
      type,
    });

    const minifiedLog = `${file}: ${message}`;
    const fullLog = `[${type}] ${formatedDate} ${minifiedLog} \n`;

    if (shouldConsole) {
      if (type === "error") {
        console.error(`> ${minifiedLog}`);
      }
      console.log(`> ${minifiedLog}`);
    }

    if (shouldShowUser) {
      const minified = `${file}: ${message}`;
      if (type === "error") {
        showErrorNotification(minified);
      }
      showInfoNotification(minified);
    }

    this.stringifiedLogs = `${this.stringifiedLogs}${fullLog}`;

    if (this.logs.length >= SEND_LOGS_THRESHOLD || forceSend) {
      console.log("> Sending logs: ", this.logs);

      this.send(this.stringifiedLogs);

      this.logs = [];
      this.stringifiedLogs = "";
    }
  }

  private send = async (logs: string): Promise<void> => {
    try {
      if (GlobalStorage.profile !== null && GlobalStorage.profile.name !== undefined) {
        await sendLogs({
          userId: `${GlobalStorage.profile?.name.replace(" ", "")}|${GlobalStorage.profile._id.substr(0, 8)}`,
          logs,
        });
      }
    } catch (err) {
      console.log(err);
      showErrorNotification(err.message);
    }
  }

  public logOnServer = async (message: string): Promise<void> => {
    try {
      await logOnServerRequest({
        log: message,
      });
    } catch (err) {
      console.log(err);
    }
  }
}

export const logger = new LoggerService();
