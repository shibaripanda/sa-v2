
export interface Company {
    _id: string;
    user_owner_id: string;
    name: string;
    mainOfficeData: string;
    mainOfficeContacts: string;

    defaultProfitPartProcent: number;

    defaulTaxProcent: number;

    services_ids: string[];

    roles_ids: string[];

    statuses_ids: string[];

    devices_ids: string[];

    parts_ids: string[];

    works_ids: string[];

    createdAt: string;
    updatedAt: string;
}