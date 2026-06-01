
export type FieldValue = string | number | boolean | null;

export interface FieldSnapshot {
  label: string;
  type?: string;
  value: FieldValue;
}

export interface Order {

  _id: string;
  order_id: string;

  deviceId: string;
  statusId: string;

  createrStaffId: string;
  createrOriginId: string;
  createrName: string;

  compId: string;
  serviceId: string;
  
  photos: string[];

  data: Record<string, FieldValue>;
  snapshot: Record<string, FieldSnapshot>;

  createdAt: string;
  updatedAt: string;

  // color?: number;

}