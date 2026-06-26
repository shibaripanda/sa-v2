import { DashScreenInterface } from "../components/dashboardScreen/mainScreen/Dashboard"
import { StaffUser } from "../interfaces/staffUser"
import { socket } from "../utils/socket"
import { Model, ModelWithData } from "./interfacesClass"

export class StaffUserClass extends (Model as new (data: StaffUser) => ModelWithData<StaffUser>) {

  addNewStaffUser(dashData: DashScreenInterface, email?: string, username?: string) {

    const data = {
      email: email,
      username: username,
      company_id: dashData.comp._id,
      service_id: dashData.service._id,
      staffUser_id: dashData.staffUser._id,
    }

    socket.emit('addNewStaffUser', data, (res: any) => {
      console.log('addNewStaffUser', res)
    })
  }
  
}
