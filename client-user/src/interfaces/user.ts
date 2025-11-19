export interface HistoryLogin {
    date: number;
    ip: string;
    location: string;
}

export interface User {
    _id: string;
    telegramId: number;
    email: string;
    name: string;
    telegramUserName: string;
    timeLiveToken: string;
    historyLogin: HistoryLogin[];

    updatedAt: string;
    createdAt: string;
    
    location: string;
    ip: string;
    
    iat: number;
    exp: number;
    token: string;
}