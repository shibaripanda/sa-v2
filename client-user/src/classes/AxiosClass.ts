import axios from "axios"

export class AxiosClass {

  private token = sessionStorage.getItem('token')
  private authServerLink = import.meta.env.VITE_API_AUTH_LINK
  private appServerLink = import.meta.env.VITE_API_APP_LINK

  async getUserServices(){
    return await axios({
        method: 'POST',
        url: this.appServerLink + '/app/get-all-my-comps',
        data: {},
        headers: {
            "Authorization": `Bearer ${this.token}`
        },
        timeout: 10000
    })
  }

  async axiosCreateNewCompany() {
    return await axios({
        method: 'POST',
        url: this.appServerLink + '/app/create-new-company',
        data: {},
        headers: {
            "Authorization": `Bearer ${this.token}`
        },
        timeout: 10000
    })
  }

  async axiosAuthServer(crub: string, line: string, requestName?: string, requestData?: object) {
    try{
      return await axios({
        method: crub,
        url: this.authServerLink + `/user${line}`,
        data: {requestName, requestData},
        headers: {
            "Authorization": `Bearer ${this.token}`
        },
        timeout: 10000
      })
    }
    catch(error){
      return false
    }
  }

  async axiosTelegramRequest(credentialResponse: string) {
    return await axios({
      method: 'POST',
      url: this.authServerLink + '/auth/telegramLogin',
      data: credentialResponse,
      headers: {},
      timeout: 10000
    })
  }

  async axiosGoogleRequest(credentialResponse: string) {
    return await axios({
      method: 'POST',
      url: this.authServerLink + '/auth/googleLogin',
      data: {access_token: credentialResponse},
      headers: {},
      timeout: 10000
    })
  }
}
