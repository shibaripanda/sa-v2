import { DashScreenInterface } from "../components/dashboardScreen/mainScreen/Dashboard";
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

  color: number;

  constructor(order: Partial<Order> | null = null, app: DashScreenInterface) {

    this._id = order?._id ?? '';
    this.order_id = order?.order_id ?? '';

    this.deviceId = order?.deviceId ? app.comp.devices_ids.find(d => d._id == order.deviceId)?.name ?? '' : '';
    this.statusId = order?.statusId ? app.comp.statuses_ids.find(s => s._id == order.statusId)?.name ?? '' : '';

    this.createrStaffId = order?.createrStaffId ?? '';
    this.createrOriginId = order?.createrOriginId ?? '';
    this.createrName = order?.createrName ?? '';

    this.compId = order?.compId ? app.comp.name ?? '' : '';
    this.serviceId = order?.serviceId ? app.service.name ?? '' : '';

    this.photos = order?.photos ?? [];

    this.data = order?.data ?? {};
    this.snapshot = order?.snapshot ?? {};

    this.createdAt = order?.createdAt ? this.formatOrderDate(order.createdAt) : '';
    this.updatedAt = order?.updatedAt ? this.formatOrderDate(order.updatedAt) : '';

    this.color = order?.statusId ? app.comp.statuses_ids.find(s => s._id == order.statusId)?.color ?? 0 : 0;

    // this._id = order?._id ?? '';
    // this.order_id = order?.order_id ?? '';

    // this.deviceId = order?.deviceId ?? '';
    // this.statusId = order?.statusId ?? '';

    // this.createrStaffId = order?.createrStaffId ?? '';
    // this.createrOriginId = order?.createrOriginId ?? '';
    // this.createrName = order?.createrName ?? '';

    // this.compId = order?.compId ?? '';
    // this.serviceId = order?.serviceId ?? '';

    // this.photos = order?.photos ?? [];

    // this.data = order?.data ?? {};
    // this.snapshot = order?.snapshot ?? {};

    // this.createdAt = order?.createdAt ?? '';
    // this.updatedAt = order?.updatedAt ?? '';
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

  private dataConvert(date: Record<string, FieldValue>, app: DashScreenInterface): Record<string, FieldValue> {
    const obj: Record<string, FieldValue> = {}
    for (const [key, value] of Object.entries(date)) {
      console.log(key, value);
      obj[app.comp.fields_ids.find(f => f._id == key)?.name ?? key] = value
    }
    console.log(obj)
    return obj
  }
  
  private formatOrderDate(date: string | Date): string {
    const value = new Date(date);

    const now = new Date();

    const isToday =
      value.getDate() === now.getDate() &&
      value.getMonth() === now.getMonth() &&
      value.getFullYear() === now.getFullYear();

    if (isToday) {
      return value.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
      });
    }

    return value.toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}
