import { Company } from "../interfaces/company"
import { Device } from "../interfaces/device"
import { AxiosClass } from "./AxiosClass"
import { CompanyClass } from "./CompanyClass"
import { Model, ModelWithData } from "./interfacesClass"

export class DeviceClass extends (Model as new (data: Device) => ModelWithData<Device>) {

  private axiosClass = new AxiosClass()

  async editDevice(device_id: string, field: string, newValue: string, comp: CompanyClass, pickComp: (company: Company) => void) {
    const res = await this.axiosClass.axiosAppServer('POST', '/device/edit-device', 'edit-device', {device_id, data: {[field]: newValue}})
    if (!res) return false
    comp.devices_ids = comp.devices_ids.map(st =>
      st._id === device_id ? res.data : st
    )
    pickComp(comp)
    return res.data
  }

  async deleteDevice(device_id: string, comp: CompanyClass, pickComp: (company: Company) => void) {
    const res = await this.axiosClass.axiosAppServer('POST', '/device/delete-device', 'delete-device', {device_id})
    console.log('ssssssssssssss', res)
    if (!res) return false
    pickComp({...comp, devices_ids: comp.devices_ids.filter(st => device_id !== st._id)})
    return true
  }
}
