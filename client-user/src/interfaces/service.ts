interface HistoryServiceLogin {
    date: number;
    ip: string;
    location: string;
    user_id: string;
}

export interface Service {
    _id: string;
    company_owner_id: string;
    name: string;
    address: string;
    contacts: string;
    workTime: string;

    users_staff_ids: string[];

    historyServiceLogin: HistoryServiceLogin[];
    createdAt: string;
    updatedAt: string;
}