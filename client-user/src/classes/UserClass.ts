import type { User } from "../interfaces/user"
import { AxiosClass } from "./AxiosClass"
import { Model, ModelWithData } from "./interfacesClass"

export class UserClass extends (Model as new (data: User) => ModelWithData<User>) {

  private axiosClass = new AxiosClass()

  getDateSessionEnd() {
    return new Date(this.exp * 1000).toLocaleString()
  }

  async updateUser(dataName: string, newValue: string, pickUser: (user: User) => void, setLoginedUsers: (user: User) => void) {
    const res = await this.axiosClass.axiosAuthServer('POST', '/update-user', dataName, {[dataName]: newValue})
    if (!res) return false
    const updatedUser = { ...this, [dataName]: newValue };
    pickUser(updatedUser)
    this.updateLoginedUsers(updatedUser, setLoginedUsers)
    return true
  }

  async deleteAccount(exit: () => void, setLoginedUsers: (user: User) => void) {
    const res = await this.axiosClass.axiosAuthServer('GET', '/delete-user', 'delete-user')
    if (!res) return false
    this.deleteLoginedUsers(this, setLoginedUsers)
    exit()
    return true
  }

  private deleteLoginedUsers(updatedUser: User, setLoginedUsers: (user: User) => void) {
    const existUsers: User[] = sessionStorage.getItem('loginedUsers') ? JSON.parse(sessionStorage.getItem('loginedUsers')!) : []
    sessionStorage.setItem('loginedUsers', JSON.stringify([...existUsers.filter(user => user._id !== updatedUser._id)]))
    setLoginedUsers(JSON.parse(sessionStorage.getItem('loginedUsers')!))
  }

  private updateLoginedUsers(updatedUser: User, setLoginedUsers: (user: User) => void) {
    const existUsers: User[] = sessionStorage.getItem('loginedUsers') ? JSON.parse(sessionStorage.getItem('loginedUsers')!) : []
    sessionStorage.setItem('loginedUsers', JSON.stringify([updatedUser, ...existUsers.filter(user => user._id !== updatedUser._id)]))
    setLoginedUsers(JSON.parse(sessionStorage.getItem('loginedUsers')!))
  }
}
