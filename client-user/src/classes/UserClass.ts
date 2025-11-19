import axios from "axios"
import type { User } from "../interfaces/user"

export class Model<T extends object> {
  constructor(data: T) {
    Object.assign(this, data)
  }
}

type ModelWithData<T extends object> = Model<T> & T

export class UserClass extends (Model as new (data: User) => ModelWithData<User>) {

  getDateSessionEnd() {
    return new Date(this.exp * 1000).toLocaleString()
  }

  async updateUser(dataName: string, newValue: string, pickUser: (user: User) => void, setLoginedUsers: (user: User) => void) {
    const res = await this.axiosApi('POST', '/update-user', dataName, {[dataName]: newValue})
    if (!res) return false
    const updatedUser = { ...this, [dataName]: newValue };
    pickUser(updatedUser)
    this.updateLoginedUsers(updatedUser, setLoginedUsers)
    return true
  }

  private updateLoginedUsers(updatedUser: User, setLoginedUsers: (user: User) => void) {
    const existUsers: User[] = sessionStorage.getItem('loginedUsers') ? JSON.parse(sessionStorage.getItem('loginedUsers')!) : []
    sessionStorage.setItem('loginedUsers', JSON.stringify([updatedUser, ...existUsers.filter(user => user._id !== updatedUser._id)]))
    setLoginedUsers(JSON.parse(sessionStorage.getItem('loginedUsers')!))
  }
  private async axiosApi(crub: string, line: string, requestName?: string, requestData?: object) {
    try{
      return await axios({
        method: crub,
        url: import.meta.env.VITE_API_AUTH_LINK + `/user${line}`,
        data: {requestName, requestData},
        headers: {
            "Authorization": `Bearer ${this.token}`
        },
        timeout: 10000
      })
    }
    catch(error){
      return false
    }
    
  }
}
