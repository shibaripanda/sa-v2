import { Company } from "../interfaces/company"
import { Status } from "../interfaces/status"
import { AxiosClass } from "./AxiosClass"
import { CompanyClass } from "./CompanyClass"
import { Model, ModelWithData } from "./interfacesClass"

export class StatusClass extends (Model as new (data: Status) => ModelWithData<Status>) {

  private axiosClass = new AxiosClass()

  async editStatus(status_id: string, field: string, newValue: string, comp: CompanyClass, pickComp: (company: Company) => void) {
    const res = await this.axiosClass.axiosAppServer('POST', '/status/edit-status', 'edit-status', {status_id, data: {[field]: newValue}})
    console.log(res)
    if (!res) return false
    console.log('aaaaaa', res.data)
    comp.statuses_ids = comp.statuses_ids.map(st =>
      st._id === status_id ? res.data : st
    )
    pickComp(comp)
    return res.data
  }

  async deleteStatus(status_id: string, comp: CompanyClass, pickComp: (company: Company) => void) {
    const res = await this.axiosClass.axiosAppServer('POST', '/status/delete-status', 'delete-status', {status_id})
    console.log(res)
    if (!res) return false
    pickComp({...comp, statuses_ids: comp.statuses_ids.filter(st => status_id !== st._id)})
    return true
  }
}
