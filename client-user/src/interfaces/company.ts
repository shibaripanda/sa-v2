import { Types } from "mongoose";
import { Service } from "./service";
import { StaffUser } from "./staffUser";
import { StatusClass } from "../classes/StatusClass";

export interface Company {
    _id: string;
    user_owner_id: string;
    name: string;
    mainOfficeData: string;
    mainOfficeContacts: string;
    defaultProfitPartProcent: number;
    defaulTaxProcent: number;
    staff_users_ids: StaffUser[];
    services_ids: Service[];
    roles_ids: Types.ObjectId[];
    statuses_ids: StatusClass[];
    devices_ids: Types.ObjectId[];
    parts_ids: Types.ObjectId[];
    works_ids: Types.ObjectId[];
    shops_ids: Types.ObjectId[];

    createdAt: string;
    updatedAt: string;
}