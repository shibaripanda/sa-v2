import { Service } from "../interfaces/service"
import { AxiosClass } from "./AxiosClass"
import { Model, ModelWithData } from "./interfacesClass"

export class ServiceClass extends (Model as new (data: Service) => ModelWithData<Service>) {

  private axiosClass = new AxiosClass()

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
    // this.deleteLoginedUsers(this, setLoginedUsers)
    exit()
    return true
  }

  // getDateSessionEnd() {
  //   return new Date(this.exp * 1000).toLocaleString()
  // }

  // async updateUser(dataName: string, newValue: string, pickUser: (user: User) => void, setLoginedUsers: (user: User) => void) {
  //   const res = await this.axiosClass.axiosAuthServer('POST', '/update-user', dataName, {[dataName]: newValue})
  //   if (!res) return false
  //   const updatedUser = { ...this, [dataName]: newValue };
  //   pickUser(updatedUser)
  //   this.updateLoginedUsers(updatedUser, setLoginedUsers)
  //   return true
  // }

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
