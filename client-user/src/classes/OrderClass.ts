import { Order } from "../interfaces/order";
// import { socket } from "../utils/socket";

export type FieldValue = string | number | boolean | null;
export interface FieldSnapshot {
  label: string;
  type?: string;
  value: FieldValue;
}

export class OrderClass implements Order {

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

  constructor(order: Partial<Order> | null = null) {

    this._id = order?._id ?? '';
    this.order_id = order?.order_id ?? '';

    this.deviceId = order?.deviceId ?? '';
    this.statusId = order?.statusId ?? '';

    this.createrStaffId = order?.createrStaffId ?? '';
    this.createrOriginId = order?.createrOriginId ?? '';
    this.createrName = order?.createrName ?? '';

    this.compId = order?.compId ?? '';
    this.serviceId = order?.serviceId ?? '';

    this.photos = order?.photos ?? [];

    this.data = order?.data ?? {};
    this.snapshot = order?.snapshot ?? {};

    this.createdAt = order?.createdAt ?? '';
    this.updatedAt = order?.updatedAt ?? '';
  }

  toJSON(): Order {
    return {

      _id: this._id,
      order_id: this.order_id,

      deviceId: this.deviceId,
      statusId: this.statusId,

      createrStaffId: this.createrStaffId,
      createrOriginId: this.createrOriginId,
      createrName: this.createrName,

      compId: this.compId,
      serviceId: this.serviceId,

      photos: this.photos,

      data: this.data,
      snapshot: this.snapshot,

      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
