import { Company } from "../interfaces/company"
import { AxiosClass } from "./AxiosClass"
import { Model, ModelWithData } from "./interfacesClass"

export class CompanyClass extends (Model as new (data: Company) => ModelWithData<Company>) {

  private axiosClass = new AxiosClass()

  // getDateSessionEnd() {
  //   return new Date(this.exp * 1000).toLocaleString()
  // }

  async updateCompany(dataName: string, newValue: string, pickComp: (company: Company) => void) {
    const res = await this.axiosClass.axiosAppServer('POST', '/company/update-company', dataName, {[dataName]: newValue}, this._id)
    console.log(res)
    if (!res) return false
    const updatedCompany = { ...this, [dataName]: newValue };
    pickComp(updatedCompany)
    return true
  }

  // async deleteAccount(exit: () => void, setLoginedUsers: (user: User) => void) {
  //   const res = await this.axiosClass.axiosAuthServer('GET', '/delete-account', 'delete-account')
  //   if (!res) return false
  //   this.deleteLoginedUsers(this, setLoginedUsers)
  //   exit()
  //   return true
  // }

  // private deleteLoginedUsers(updatedUser: User, setLoginedUsers: (user: User) => void) {
  //   const existUsers: User[] = sessionStorage.getItem('loginedUsers') ? JSON.parse(sessionStorage.getItem('loginedUsers')!) : []
  //   sessionStorage.setItem('loginedUsers', JSON.stringify([...existUsers.filter(user => user._id !== updatedUser._id)]))
  //   setLoginedUsers(JSON.parse(sessionStorage.getItem('loginedUsers')!))
  // }

  // private updateLoginedUsers(updatedUser: User, setLoginedUsers: (user: User) => void) {
  //   const existUsers: User[] = sessionStorage.getItem('loginedUsers') ? JSON.parse(sessionStorage.getItem('loginedUsers')!) : []
  //   sessionStorage.setItem('loginedUsers', JSON.stringify([updatedUser, ...existUsers.filter(user => user._id !== updatedUser._id)]))
  //   setLoginedUsers(JSON.parse(sessionStorage.getItem('loginedUsers')!))
  // }
}
