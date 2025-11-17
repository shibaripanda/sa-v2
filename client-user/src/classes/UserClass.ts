import axios from "axios"
import type { User } from "../interfaces/user"

export class Model<T extends object> {
  constructor(data: T) {
    Object.assign(this, data)
  }
}

type ModelWithData<T extends object> = Model<T> & T

export class UserClass extends (Model as new (data: User) => ModelWithData<User>) {

  async updateUserName(name: string, update: (user: User) => void, update2: (user: User) => void) {
    const res = await this.axiosApi('POST', 'user', 'updateUserName', {name})
    if (!res) return false
    const updatedUser = { ...this, name };
    update(updatedUser)
    this.updateLoginedUsers(updatedUser, update2)
    return true
  }

  private updateLoginedUsers(updatedUser: User, update2: (user: User) => void) {
    const existUsers: User[] = sessionStorage.getItem('loginedUsers') ? JSON.parse(sessionStorage.getItem('loginedUsers')!) : []
    sessionStorage.setItem('loginedUsers', JSON.stringify([updatedUser, ...existUsers.filter(user => user._id !== updatedUser._id)]))
    update2(JSON.parse(sessionStorage.getItem('loginedUsers')!))
  }

  private async axiosApi(crub: string, line: string, requestName?: string, requestData?: object) {
    return await axios({
        method: crub,
        url: import.meta.env.VITE_API_AUTH_LINK + `/user/${line}`,
        data: {requestName, requestData},
        headers: {
            "Authorization": `Bearer ${this.token}`
        },
        timeout: 10000
    })
  }
}
