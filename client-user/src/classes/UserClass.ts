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
    console.log(this.name)
    this.name = name
    console.log(this.name)
    return this.name
  }
}
