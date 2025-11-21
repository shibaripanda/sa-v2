export class Model<T extends object> {
  constructor(data: T) {
    Object.assign(this, data)
  }
}

export type ModelWithData<T extends object> = Model<T> & T