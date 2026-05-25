
export interface Field {
    _id: string;
    
    name: string;
    onlyNumber: boolean;
    mustHave: boolean;
    variants: boolean;
    ai: boolean;
    data: string[] | number[];

    currentData?: string | number | null

    createdAt: string;
    updatedAt: string;
}