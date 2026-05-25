import { DashScreenInterface, Photos } from "../components/dashboardScreen/mainScreen/Dashboard"
import { Field } from "../interfaces/field"
import type { User } from "../interfaces/user"
import { socket } from "../utils/socket"
import { AxiosClass } from "./AxiosClass"
import { Model, ModelWithData } from "./interfacesClass"

interface DashData extends DashScreenInterface {
  setPhotos: any
  photos: Photos
  deletePhoto?: string
}

export class UserClass extends (Model as new (data: User) => ModelWithData<User>) {

  private axiosClass = new AxiosClass()

  async analyzPhotos(fields: string[], device: string, leng: string, newOrder: Field[], setNewOrder: any) {
    console.log('analyzPhotos', fields, device, leng)
    return socket.emit('analyzPhotos', {photos: this.photos, fields, device, leng}, (res: {analyzData: {status: boolean, data: { [key: string]: string | null }}}) => {
      if (res.analyzData.status) {
        const anData = res.analyzData.data
        for(const d of fields) {
          const f = newOrder.find(i => i.name == d)
          if(f) {
            f.currentData = anData[d] ? anData[d] : ''
          }
          // newOrder.find(i => i.name == d)?.currentData = anData[d] ? anData[d] : ''
        }
        // const anData = res.analyzData.data
        // for (const f of newOrder) {
        //   console.log(anData[f.name])
        //   f.currentData = anData[f.name] ? anData[f.name] : ''
        // }
        setNewOrder([...newOrder])
      }
    })
  }

  onSocket(dashData: DashData) {
    console.log('onSocket')

    const handler_UpdatePhotos = () => this.updatePhotos(dashData)

    socket.on("updatePhotos_client", handler_UpdatePhotos);

    return () => {
      socket.off("updatePhotos_client", handler_UpdatePhotos);
    };
  }

  deletePhoto(dashData: DashData) {
    socket.emit('deletePhoto', { deletePhoto: dashData.deletePhoto }, (res: {photos: string[]}) => {
      console.log('deletePhoto', res)
      const updatedUser = { ...this, photos: res.photos };
      this.photos = res.photos
      dashData.pickUser(updatedUser)
      this.updateLoginedUsers(updatedUser, dashData.setLoginedUsers)
      this.getImages(dashData)
    })
  }

  async getImages(dashData: DashData) {
    const targetSet = new Set(this.photos)
    const basePhotos = dashData.photos.filter(p => targetSet.has(p.photo))
    const existingSet = new Set(basePhotos.map(p => p.photo))

    const missing = this.photos.filter(p => !existingSet.has(p))
    const loaded = await Promise.all(
      missing.map(photo =>
        new Promise<{ photo: string; image: any }>(resolve => {
          socket.emit('getPhotoBuffer', { photo }, (res: any) => {
            resolve({
              photo,
              image: res.image
            })
          })
        })
      )
    )
    const newPhotos = [...basePhotos, ...loaded]
    console.log('newPhotos', newPhotos)
    dashData.setPhotos(newPhotos)
  }

  updatePhotos(dashData: DashData) {
    socket.emit('getPhotos', (res: {photos: string[]}) => {
      console.log('updatePhotos', res)
      const updatedUser = { ...this, photos: res.photos };
      this.photos = res.photos
      dashData.pickUser(updatedUser)
      this.updateLoginedUsers(updatedUser, dashData.setLoginedUsers)
      this.getImages(dashData)
    })
  }

  getDateSessionEnd() {
    return new Date(this.exp * 1000).toLocaleString()
  }

  async updateUser(dataName: string, newValue: string | number, pickUser: (user: User) => void, setLoginedUsers: (user: User) => void) {
    const res = await this.axiosClass.axiosAuthServer('POST', '/update-user', dataName, {[dataName]: newValue})
    if (!res) return false
    const updatedUser = { ...this, [dataName]: newValue };
    pickUser(updatedUser)
    this.updateLoginedUsers(updatedUser, setLoginedUsers)
    return true
  }

  async deleteAccount(exit: () => void, setLoginedUsers: (user: User) => void) {
    const res = await this.axiosClass.axiosAuthServer('GET', '/delete-account', 'delete-account')
    if (!res) return false
    this.deleteLoginedUsers(this, setLoginedUsers)
    exit()
    return true
  }

  private deleteLoginedUsers(updatedUser: User, setLoginedUsers: (user: User) => void) {
    const existUsers: User[] = sessionStorage.getItem('loginedUsers') ? JSON.parse(sessionStorage.getItem('loginedUsers')!) : []
    sessionStorage.setItem('loginedUsers', JSON.stringify([...existUsers.filter(user => user._id !== updatedUser._id)]))
    setLoginedUsers(JSON.parse(sessionStorage.getItem('loginedUsers')!))
  }

  private updateLoginedUsers(updatedUser: User, setLoginedUsers: (user: User) => void) {
    const existUsers: User[] = sessionStorage.getItem('loginedUsers') ? JSON.parse(sessionStorage.getItem('loginedUsers')!) : []
    sessionStorage.setItem('loginedUsers', JSON.stringify([updatedUser, ...existUsers.filter(user => user._id !== updatedUser._id)]))
    setLoginedUsers(JSON.parse(sessionStorage.getItem('loginedUsers')!))
  }
}
