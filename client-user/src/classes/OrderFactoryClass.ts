import { DashScreenInterface, Photos } from "../components/dashboardScreen/mainScreen/Dashboard"
import { Device } from "../interfaces/device"
import { Field } from "../interfaces/field"
import { Order } from "../interfaces/order";
import { socket } from "../utils/socket";
import { OrderClass } from "./OrderClass";

interface CreateNewOrder extends DashScreenInterface {
  _selectedDevice_: Device;
  newOrder: Field[];
  photos: Photos;
}
export interface OrderPagination {
  items: Order[];
  meta: {
    limit: number;
    page: number;
    total: number;
    totalPages: number;
  }
}

export class OrderFactoryClass {

  getOrders(dashBoard: DashScreenInterface, orders: OrderPagination, setOrders: any) {
    socket.emit('getOrders', { page: orders.meta.page, limit: orders.meta.limit, compId: dashBoard.comp._id, serviceId: dashBoard.service._id }, (res: {orders: OrderPagination}) => {
      console.log('getOrders', res)
      setOrders(res)
    })
  }

  createNewOrder(crData: CreateNewOrder): void {
    const order = new OrderClass();

    order.createrName = crData.user.name;
    order.createrOriginId = crData.user._id;
    order.createrStaffId = crData.staffUser._id;

    order.deviceId = crData._selectedDevice_._id;
    order.statusId = crData.comp.statuses_ids[0]._id;

    order.compId = crData.comp._id;
    order.serviceId = crData.service._id;

    order.data = {};
    order.snapshot = {};

    for (const f of crData.newOrder) {
      const value = f.currentData ?? '';

      order.data[f._id] = value;

      order.snapshot[f._id] = {
        label: f.name,
        type: 'text',
        value,
      };
    }

    order.photos = crData.photos
      .filter(f => f.activ)
      .map(f => f.photo);

    const { createdAt, updatedAt, order_id, _id, ...newOrder } = order.toJSON();

    console.log(newOrder)

    socket.emit('createOrder', newOrder, (res: {orders: Order}) => {
      console.log('getOrders', res);
    })
  }
}
