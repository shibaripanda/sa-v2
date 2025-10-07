
type ProfitMode = 'fullProcent' | 'procentWork' | 'fix'

export interface staffUser {
    _id: string;
    origin_user_id: string;
    service_owner_id: string;
    role_id: string;

    profitMode: ProfitMode;
    profit: number;

    filterStatuses: string[];
    filterDevices: string[];
    startTime: number;
    endTime: number;

    createdAt: string;
    updatedAt: string;
}