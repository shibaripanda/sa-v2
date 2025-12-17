import { Company } from "../interfaces/company"
import { AxiosClass } from "./AxiosClass"
import { Model, ModelWithData } from "./interfacesClass"
import { StatusClass } from "./StatusClass"

export class CompanyClass extends (Model as new (data: Company) => ModelWithData<Company>) {

  private axiosClass = new AxiosClass()

  async deleteCompany(exit: () => void) {
      const res = await this.axiosClass.axiosAppServer('POST', '/app/delete-company', 'delete-company', {company_id: this._id})
      if (!res) return false
      // this.deleteLoginedUsers(this, setLoginedUsers)
      exit()
      return true
    }

  async updateStatusLine(newLine: StatusClass[], pickComp: (company: Company) => void) {
    const res = await this.axiosClass.axiosAppServer('POST', '/company/update-status-line', 'update-status-line', {statuses_ids: newLine.map(s => s._id)}, this._id)
    console.log(res)
    if (!res) return false
    const updatedCompany = { ...this, statuses_ids: newLine };
    pickComp(updatedCompany)
    return true
  }

  async addNewStatus(pickComp: (company: Company) => void) {
    const res = await this.axiosClass.axiosAppServer('POST', '/app/add-new-status', 'add-new-status', {company_id: this._id})
    console.log(res)
    if (!res) return false
    pickComp(res.data)
    return true
  }

  async updateCompany(dataName: string, newValue: string, pickComp: (company: Company) => void) {
    const res = await this.axiosClass.axiosAppServer('POST', '/company/update-company', dataName, {[dataName]: newValue}, this._id)
    console.log(res)
    if (!res) return false
    const updatedCompany = { ...this, [dataName]: newValue };
    pickComp(updatedCompany)
    return true
  }
}
