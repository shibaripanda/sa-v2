import { DashScreenInterface } from "../components/dashboardScreen/mainScreen/Dashboard"
import { StaffUser } from "../interfaces/staffUser"
import { socket } from "../utils/socket"
import { Model, ModelWithData } from "./interfacesClass"

export class StaffUserClass extends (Model as new (data: StaffUser) => ModelWithData<StaffUser>) {

  addNewStaffUser(dashData: DashScreenInterface, email?: string, username?: string) {
      socket.emit('addNewStaffUser', { email: 'prevetlunatikam@gmail.com', username: 'username' }, (res: any) => {
        console.log('addNewStaffUser', res)
      })
    }
}
