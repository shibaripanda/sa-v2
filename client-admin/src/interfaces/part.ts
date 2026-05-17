
export interface Part {
    _id: string;
    company_owner_id: string;
    staff_user_id: string;
    service_owner_id: string;
    shop_owner_id: string;
    name: string;

    count: number;

    buyPrice: number;
    sellPrice: number;

    createdAt: string;
    updatedAt: string;
}