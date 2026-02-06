import { Service } from "../interfaces/service"
import { AxiosClass } from "./AxiosClass"
import { Model, ModelWithData } from "./interfacesClass"

export class ServiceClass extends (Model as new (data: Service) => ModelWithData<Service>) {

  private axiosClass = new AxiosClass()

  async createNewOrder(newOrder: {}) {
    const res = await this.axiosClass.axiosAppServer('POST', '/order/create-order', 'create-order', {newOrder})
    console.log(res)
  }

  async updateService(dataName: string, newValue: string, pickService: (service: Service) => void) {
    const res = await this.axiosClass.axiosAppServer('POST', '/service/update-service', dataName, {[dataName]: newValue}, this._id)
    console.log(res)
    if (!res) return false
    const updatedService = { ...this, [dataName]: newValue };
    pickService(updatedService)
    return true
  }

  async deleteService(exit: () => void) {
    const res = await this.axiosClass.axiosAppServer('POST', '/app/delete-service', 'delete-service', {service_id: this._id})
    if (!res) return false
    exit()
    return true
  }
}
