
export type FieldValue = string | number | boolean | null;

export interface FieldSnapshot {
  label: string;
  type?: string;
  value: FieldValue;
}

export interface Order {

  deviceId: string;
  statusId: string;

  createrStaffId: string;
  createrOriginId: string;
  createrName: string;
  
  photos: string[];

  fields: Record<string, FieldValue>;
  snapshot: Record<string, FieldSnapshot>;

  createdAt: string;
  updatedAt: string;

}