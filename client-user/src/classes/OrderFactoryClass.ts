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
    console.log(orderUse)
    if (orderUse) return orderUse
  }

  getOrders(dashBoard: DashScreenInterface, orders: OrderPagination, setOrders: any) {
    socket.emit('getOrders', { page: orders.meta.page, limit: orders.meta.limit, compId: dashBoard.comp._id, serviceId: dashBoard.service._id }, (res: {orders: OrderPagination}) => {
      const useOrders = res.orders.items.map(or => this.orderConvertUse(or, dashBoard))
      console.log('getOrders', {...res.orders, items: useOrders})
      setOrders({...res.orders, items: useOrders})
    })
  }

  createNewOrder(crData: CreateNewOrder): void {
    const order = new OrderClass(null, crData);

    order.createrName = crData.user.name;
    order.createrOriginId = crData.user._id;
    order.createrStaffId = crData.staffUser._id;

    order.deviceId = crData._selectedDevice_._id;
    order.statusId = crData.comp.statuses_ids[0]._id;

    order.compId = crData.comp._id;
    order.serviceId = crData.service._id;

    order.data = {};
    order.snapshot = {};

    order.snapshot.createrName = {label: 'createrName', type: 'text', value: crData.user.name};

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

    crData.setLoadingText(crData.text?.greatingOrder)
    crData.setLoaderShow.open()

    socket.emit('createOrder', newOrder, async (res: {order: Order; status: boolean}) => {
      
      await new Promise(resolve => setTimeout(resolve, 1000))

      if(res.status){
        crData.setOrders((prev: OrderPagination) => ({
          ...prev,
          items: [this.orderConvertUse(res.order, crData), ...prev.items],
        }));
        crData.setLoadingText(crData.text?.ready)
      }

      if(!res.status){
        crData.setErrorStatus(true)
        crData.setLoadingText(crData.text?.error)
      }

      await new Promise(resolve => setTimeout(resolve, 500))

      crData.setLoaderShow.close()
    })
  }
}
