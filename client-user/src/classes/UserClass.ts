import axios from "axios"
import type { User } from "../interfaces/user"

export class Model<T extends object> {
  constructor(data: T) {
    Object.assign(this, data)
  }
}

type ModelWithData<T extends object> = Model<T> & T

export class UserClass extends (Model as new (data: User) => ModelWithData<User>) {
  get displayName() {
    return this.name.toUpperCase()
  }

  async updateUserName(name: string) {

    await axios({
        method: 'GET',
        url: import.meta.env.VITE_API_AUTH_LINK + '/user/user',
        data: {},
        headers: {
            "Authorization": `Bearer ${this.token}`
        },
        timeout: 10000
    })
    .then(async (res) => {
        console.log(res.data)
    })
    // console.log(this.name)
    this.name = name
    console.log(this)
    return this.name
  }
}
