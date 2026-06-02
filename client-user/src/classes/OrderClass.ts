import { DashScreenInterface } from "../components/dashboardScreen/mainScreen/Dashboard";
import { MainInterface } from "../components/dashboardScreen/subDashScreen/main/Main";
import { Order } from "../interfaces/order";
import { socket } from "../utils/socket";
import { OrderPagination } from "./OrderFactoryClass";

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
  deviceName: string;

  statusId: string;
  statusName: string;

  createrStaffId: string;
  createrOriginId: string;

  createrName: string;

  compId: string;
  compName: string;

  serviceId: string;
  serviceName: string;

  photos: string[];
  uploadedPhotos: {photo: string, image: string}[];

  data: Record<string, FieldValue>;
  snapshot: Record<string, FieldSnapshot>;

  createdAt: string;
  updatedAt: string;

  color: number;
  preview: { photo: string, image: string } | null;

  constructor(order: Partial<Order> | null = null, app: DashScreenInterface) {

    this._id = order?._id ?? '';
    this.order_id = order?.order_id ?? '';

    this.createrStaffId = order?.createrStaffId ?? '';
    this.createrOriginId = order?.createrOriginId ?? '';
    this.createrName = order?.createrName ?? '';

    this.deviceId = order?.deviceId ?? '';
    this.deviceName = order?.deviceId ? app.comp.devices_ids.find(d => d._id == order.deviceId)?.name ?? '' : '';

    this.statusId = order?.statusId  ?? '';
    this.statusName = order?.statusId ? app.comp.statuses_ids.find(s => s._id == order.statusId)?.name ?? '' : '';

    this.compId = order?.compId ?? '';
    this.compName = order?.compId ? app.comp.name ?? '' : '';

    this.serviceId = order?.serviceId ?? '';
    this.serviceName = order?.serviceId ? app.service.name ?? '' : '';

    this.photos = order?.photos ?? [];
    this.uploadedPhotos = [];

    this.data = order?.data ?? {};
    this.snapshot = order?.snapshot ?? {};

    this.createdAt = order?.createdAt ? this.formatOrderDate(order.createdAt) : '';
    this.updatedAt = order?.updatedAt ? this.formatOrderDate(order.updatedAt) : '';

    this.color = order?.statusId ? app.comp.statuses_ids.find(s => s._id == order.statusId)?.color ?? 0 : 0;
    this.preview = order?.preview ?? null;

    this.getOneImage().then((image) => {
      if (!image) return;
      console.log(image)
      this.uploadedPhotos.push(image as {photo: string, image: string});
      this.preview = image;
    });
  }

  async editStatus(app: MainInterface, newStatusId: string, setSort: any) {
    console.log(newStatusId);
    app.setLoadingText(app.text?.saving)
    app.setLoaderShow.open()

    socket.emit('editOrderStatus', { _id: this._id, newStatusId }, async (res: {status: boolean}) => {
      console.log('editOrderStatus', res);
          
      await new Promise(resolve => setTimeout(resolve, 1000))

      if(res.status){
        app.setOrders((prev: OrderPagination)  => ({
          ...prev,
          items: prev.items.map((item: OrderClass) => {

            if (item._id !== this._id) return item;

            return new OrderClass({...item.toJSON(), statusId: newStatusId, preview: item.preview}, app);
          }),
        }));
        setSort(newStatusId);
        app.setLoadingText(app.text?.ready)
      }

      if(!res.status){
        app.setErrorStatus(true)
        app.setLoadingText(app.text?.error)
      }

      await new Promise(resolve => setTimeout(resolve, 500))

      app.setLoaderShow.close()
    })
  }

  async getOneImage() {
    if (this.preview) return;
    if (this.photos.length === 0) return;
   
    const photo = this.photos[0];

    if (!photo) return null;

    return new Promise((resolve) => {
      socket.emit('getPhotoBuffer', { photo }, (res: any) => {
        resolve({
          photo,
          image: res.image
        });
      });
    });
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

  // private dataConvert(date: Record<string, FieldValue>, app: DashScreenInterface): Record<string, FieldValue> {
  //   const obj: Record<string, FieldValue> = {}
  //   for (const [key, value] of Object.entries(date)) {
  //     console.log(key, value);
  //     obj[app.comp.fields_ids.find(f => f._id == key)?.name ?? key] = value
  //   }
  //   console.log(obj)
  //   return obj
  // }
  
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
      // hour: '2-digit',
      // minute: '2-digit',
    });
  }
}
