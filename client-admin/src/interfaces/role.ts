
export interface Role {
    _id: string;
    company_owner_id: string;
    staff_user_id: string;
    name: string;

    actions: string[];
    devices_ids: string[];
    statuses_ids: string[];

    createdAt: string;
    updatedAt: string;
}