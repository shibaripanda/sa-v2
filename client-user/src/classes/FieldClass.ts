import { Company } from "../interfaces/company"
import { Field } from "../interfaces/field"
import { AxiosClass } from "./AxiosClass"
import { CompanyClass } from "./CompanyClass"
import { Model, ModelWithData } from "./interfacesClass"

export class FieldClass extends (Model as new (data: Field) => ModelWithData<Field>) {

  private axiosClass = new AxiosClass()

  async editField(field_id: string, field: string, newValue: string, comp: CompanyClass, pickComp: (company: Company) => void) {
    const res = await this.axiosClass.axiosAppServer('POST', '/field/edit-field', 'edit-field', {field_id, data: {[field]: newValue}})
    if (!res) return false
    comp.fields_ids = comp.fields_ids.map(st =>
      st._id === field_id ? res.data : st
    )
    pickComp(comp)
    return res.data
  }

  async deleteField(field_id: string, comp: CompanyClass, pickComp: (company: Company) => void) {
    const res = await this.axiosClass.axiosAppServer('POST', '/field/delete-field', 'delete-field', {field_id})
    if (!res) return false
    pickComp({...comp, fields_ids: comp.fields_ids.filter(st => field_id !== st._id)})
    return true
  }
}
