export interface User {
  _id: string;
  telegramId?: number;
  email?: string;
  name: string;
  telegramUserName: string;
  timeLiveToken: string;
  historyLogin: [HistoryLogin];
}

export type HistoryLogin = { date: number; ip: string; location: string };
