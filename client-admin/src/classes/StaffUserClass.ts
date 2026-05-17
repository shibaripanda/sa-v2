import { StaffUser } from "../interfaces/staffUser"
import { AxiosClass } from "./AxiosClass"
import { Model, ModelWithData } from "./interfacesClass"

export class StaffUserClass extends (Model as new (data: StaffUser) => ModelWithData<StaffUser>) {

  private axiosClass = new AxiosClass()

  async updateStaffUser(dataName: string, newValue: string, pickStaffUser: (staffUser: StaffUser) => void) {
    const res = await this.axiosClass.axiosAuthServer('POST', '/update-staffuser', dataName, {[dataName]: newValue})
    if (!res) return false
    const updatedUser = { ...this, [dataName]: newValue };
    pickStaffUser(updatedUser)
    return true
  }
}
