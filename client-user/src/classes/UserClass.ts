import { DashScreenInterface, Photos } from "../components/dashboardScreen/mainScreen/Dashboard"
// import { HeaderInterface } from "../components/dashboardScreen/subDashScreen/header/Header"
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

  async analyzPhotos(dashData: DashData, photos: string[], fields: string[], device: string, leng: string, newOrder: Field[], setNewOrder: any) {
    dashData.setLoadingText(dashData.text?.processPhoto)
    dashData.setLoaderShow.open()

    return socket.emit('analyzPhotos', {photos, fields, device, leng}, async (res: {analyzData: {status: boolean, data: { [key: string]: string | null }}}) => {

      if (res.analyzData.status) {
        const anData = res.analyzData.data
        for(const d of fields) {
          const f = newOrder.find(i => i.name == d)
          if(f) {
            f.currentData = anData[d] ? anData[d] : ''
            sessionStorage.setItem(d, anData[d] ? anData[d] : '')
          }
        }
        setNewOrder([...newOrder])
        dashData.setLoadingText(dashData.text?.ready)
      }

      if(!res.analyzData.status) {
        dashData.setErrorStatus(true)
        dashData.setLoadingText(dashData.text?.error)
      }

      await new Promise(resolve => setTimeout(resolve, 500))

      dashData.setLoaderShow.close()
    })
  }

  async analyzVoice(dashData: DashData, fields: string[], device: string, leng: string, newOrder: Field[], setNewOrder: any, voice: string) {
    dashData.setLoadingText(dashData.text?.processVoice)
    dashData.setLoaderShow.open()

    return socket.emit('analyzVoice', {voice, fields, device, leng}, async (res: {analyzData: {status: boolean, data: { [key: string]: string | null }}}) => {
      console.log('analyzVoice', res);
      if (res.analyzData.status) {
        const anData = res.analyzData.data
        for(const d of fields) {
          const f = newOrder.find(i => i.name == d)
          if(f) {
            f.currentData = anData[d] ? anData[d] : ''
            sessionStorage.setItem(d, anData[d] ? anData[d] : '')
          }
        }
        setNewOrder([...newOrder])
        dashData.setLoadingText(dashData.text?.ready)
      }

      if(!res.analyzData.status) {
        dashData.setErrorStatus(true)
        dashData.setLoadingText(dashData.text?.error)
      }

      await new Promise(resolve => setTimeout(resolve, 500))

      dashData.setLoaderShow.close()
    })
  }

  onSocketCreateOrder(props: DashData, getFields: () => {fields: string[], newOrder: Field[]}, device: string, leng: string, setNewOrder: any) {

    const handler_GetFieldsForVoice = async (voice: string) => {

      const { fields, newOrder } = getFields()

      await this.analyzVoice(
        props,
        fields,
        device,
        leng,
        newOrder,
        setNewOrder,
        voice
      )
    }

    socket.on("get_data_for_new_voice_client", handler_GetFieldsForVoice);

    return () => {
      socket.off("get_data_for_new_voice_client", handler_GetFieldsForVoice);
    };
  }

  onSocket(dashData: DashData) {
    console.log('onSocket')

    const handler_UpdatePhotos = async() => await this.updatePhotos(dashData)

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
        new Promise<{ photo: string; image: any; activ: boolean }>(resolve => {
          socket.emit('getPhotoBuffer', { photo }, (res: any) => {
            resolve({
              photo,
              image: res.image,
              activ: true
            })
          })
        })
      )
    )
    const newPhotos = [...basePhotos, ...loaded]
    // console.log('newPhotos', newPhotos)
    dashData.setPhotos(newPhotos)
  }

  async updatePhotos(dashData: DashData) {
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
