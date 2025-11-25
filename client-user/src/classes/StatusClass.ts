import { Status } from "../interfaces/status"
import { AxiosClass } from "./AxiosClass"
import { Model, ModelWithData } from "./interfacesClass"

export class StatusClass extends (Model as new (data: Status) => ModelWithData<Status>) {

  private axiosClass = new AxiosClass()

  // async addNewStatus(company_id: string) {
  //   const res = await this.axiosClass.axiosAppServer('POST', '/status/add-new-status', 'add-new-status', {company_id})
  //   console.log(res)
  //   if (!res) return false
  //   return true
  // }
}
