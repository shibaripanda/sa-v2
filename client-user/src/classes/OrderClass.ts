import { DashScreenInterface, Photos } from "../components/dashboardScreen/mainScreen/Dashboard"
import { Device } from "../interfaces/device"
import { Field } from "../interfaces/field"
import { Order } from "../interfaces/order"
import { socket } from "../utils/socket"
import { AxiosClass } from "./AxiosClass"
import { Model, ModelWithData } from "./interfacesClass"

interface CreateNewOrder extends DashScreenInterface {
  _selectedDevice_: Device;
  newOrder: Field[];
  photos: Photos;
}

// _id: string;
    
// _deviceId_: string;
// _statusId_: string;
// _createrStaffId_: string;
// _createrOriginId_: string;
// _createrName_: string;

// createdAt: string;
// updatedAt: string;

export class OrderClass extends (Model as new (order: Order | null) => ModelWithData<Order>) {
  
  constructor(order: Order | null) {
    super(order)
    this.deviceId = order ? order.deviceId : ''
    this.statusId = order ? order.statusId : ''
    this.createrStaffId = order ? order.createrStaffId : ''
    this.createrOriginId = order ? order.createrOriginId : ''
    this.createrName = order ? order.createrName : ''
    this.photos = order ? order.photos : []
    
    this.fields = order ? order.fields : {}
    this.snapshot = order ? order.snapshot : {}
  }
  
  async createNewOrder(crData: CreateNewOrder) {
    console.log(crData)
    this.createrName = crData.user.name
    this.createrOriginId = crData.user._id
    this.createrStaffId = crData.staffUser._id

    this.deviceId = crData._selectedDevice_._id
    this.statusId = crData.comp.statuses_ids[0]._id

    for (const f of crData.newOrder) {
      this.fields[f._id] = f.currentData ?? ''
      this.snapshot[f._id] = {label: f.name, type: 'text', value: f.currentData ?? ''}
    }

    this.photos = crData.photos.filter(f => f.activ).map(f => f.photo)

    // socket.emit('createNewOrder', { deletePhoto: dashData.deletePhoto }, (res: {photos: string[]}) => {
    // })

    console.log(this)
  }
}
