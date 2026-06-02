import { DashScreenInterface, Photos } from "../components/dashboardScreen/mainScreen/Dashboard"
import { HeaderInterface } from "../components/dashboardScreen/subDashScreen/header/Header";
import { Device } from "../interfaces/device"
import { Field } from "../interfaces/field"
import { Order } from "../interfaces/order";
import { socket } from "../utils/socket";
import { OrderClass } from "./OrderClass";

interface CreateNewOrder extends HeaderInterface {
  _selectedDevice_: Device;
  newOrder: Field[];
  photos: Photos;
}
export interface OrderPagination {
  items: OrderClass[];
  meta: {
    limit: number;
    page: number;
    total: number;
    totalPages: number;
  }
}

export class OrderFactoryClass {

  private orderConvertUse(order: Order, dashBoard: DashScreenInterface) {
    const orderUse = new OrderClass(order, dashBoard)
    // console.log(orderUse)
    if (orderUse) return orderUse
  }

  getOrders(dashBoard: DashScreenInterface, orders: OrderPagination, setOrders: any) {
    socket.emit('getOrders', { page: orders.meta.page, limit: orders.meta.limit, compId: dashBoard.comp._id, serviceId: dashBoard.service._id }, (res: {orders: OrderPagination}) => {
      const useOrders = res.orders.items.map(or => this.orderConvertUse(or, dashBoard))
      // console.log('getOrders', {...res.orders, items: useOrders})
      setOrders({...res.orders, items: useOrders})
    })
  }

  createNewOrder(app: CreateNewOrder): void {
    const order = new OrderClass(null, app);

    order.createrName = app.user.name;
    order.createrOriginId = app.user._id;
    order.createrStaffId = app.staffUser._id;

    order.deviceId = app._selectedDevice_._id;
    order.statusId = app.comp.statuses_ids[0]._id;

    order.compId = app.comp._id;
    order.serviceId = app.service._id;

    order.data = {};
    order.snapshot = {};

    order.snapshot.createrName = {label: 'createrName', type: 'text', value: app.user.name};

    for (const f of app.newOrder) {
      const value = f.currentData ?? '';

      order.data[f._id] = value;

      order.snapshot[f._id] = {
        label: f.name,
        type: 'text',
        value,
      };
    }

    order.photos = app.photos
      .filter(f => f.activ)
      .map(f => f.photo);

    const { createdAt, updatedAt, order_id, _id, ...newOrder } = order.toJSON();

    app.setLoadingText(app.text?.greatingOrder)
    app.setLoaderShow.open()

    socket.emit('createOrder', newOrder, async (res: {order: Order; status: boolean}) => {
      
      await new Promise(resolve => setTimeout(resolve, 1000))

      if(res.status){
        app.setOrders((prev: OrderPagination) => ({
          ...prev,
          items: [this.orderConvertUse(res.order, app), ...prev.items],
        }));
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
}
