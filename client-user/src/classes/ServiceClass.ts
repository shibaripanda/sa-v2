import { Service } from "../interfaces/service"
import { AxiosClass } from "./AxiosClass"
import { Model, ModelWithData } from "./interfacesClass"

export class ServiceClass extends (Model as new (data: Service) => ModelWithData<Service>) {

  private axiosClass = new AxiosClass()

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
