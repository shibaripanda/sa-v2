interface HistoryLogin {
    date: number;
    ip: string;
    location: string;
}

export interface User {
    createdAt: string;
    email: string;
    exp: number;
    historyLogin: HistoryLogin[];
    iat: number;
    ip: string;
    location: string;
    name: string;
    timeLiveToken: string;
    updatedAt: string;
    _id: string;
    token: string;
}