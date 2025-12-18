import axios from "axios"

export class AxiosClass {

  private token = sessionStorage.getItem('token')
  private authServerLink = import.meta.env.VITE_API_AUTH_LINK
  private appServerLink = import.meta.env.VITE_API_APP_LINK

  private api = import.meta.env.VITE_API_LINK

  async getUserServices(){
    try{
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
    catch {
      return false
    }
  }

  async axiosCreateNewCompany() {
    try{
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
    catch {
      return false
    }
  }

  async axiosCreateNewService(company_id: string) {
    try{
      return await axios({
          method: 'POST',
          url: this.appServerLink + '/app/create-new-service',
          data: { company_id },
          headers: {
              "Authorization": `Bearer ${this.token}`
          },
          timeout: 10000
      })
    }
    catch {
      return false
    }
  }

  async axiosAppServer(crub: string, line: string, requestName?: string, requestData?: object, _id?: string) {
    try{
      return await axios({
        method: crub,
        url: this.appServerLink + `${line}`,
        data: {requestName, requestData, _id},
        headers: {
            "Authorization": `Bearer ${this.token}`
        },
        timeout: 10000
      })
    }
    catch {
      return false
    }
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
    catch {
      return false
    }
  }

  async axiosTelegramRequest(credentialResponse: string) {
    return await axios({
      method: 'POST',
      url: this.api + '/auth/telegramLogin',
      data: credentialResponse,
      headers: {},
      timeout: 10000
    })
  }

  async axiosGoogleRequest(credentialResponse: string) {
    return await axios({
      method: 'POST',
      url: this.api + '/auth/googleLogin',
      data: {access_token: credentialResponse},
      headers: {},
      timeout: 10000
    })
  }
}
