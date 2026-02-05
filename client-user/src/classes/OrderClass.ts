import { Order } from "../interfaces/order"
import { AxiosClass } from "./AxiosClass"
import { Model, ModelWithData } from "./interfacesClass"

export class OrderClass extends (Model as new (data: Order) => ModelWithData<Order>) {

  private axiosClass = new AxiosClass()

  async createNewOrder(newOrder: {}) {
    const res = await this.axiosClass.axiosAppServer('POST', '/order/create-order', 'create-order', {newOrder})
    console.log(res)
  }
}
