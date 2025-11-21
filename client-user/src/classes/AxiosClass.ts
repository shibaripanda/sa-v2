import axios from "axios"

export class AxiosClass {

  private token = sessionStorage.getItem('token')

  async axiosAuthServer(crub: string, line: string, requestName?: string, requestData?: object) {
    try{
      return await axios({
        method: crub,
        url: import.meta.env.VITE_API_AUTH_LINK + `/user${line}`,
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
      url: import.meta.env.VITE_API_AUTH_LINK + '/auth/telegramLogin',
      data: credentialResponse,
      headers: {},
      timeout: 10000
    })
  }

  async axiosGoogleRequest(credentialResponse: string) {
    return await axios({
      method: 'POST',
      url: import.meta.env.VITE_API_AUTH_LINK + '/auth/googleLogin',
      data: {access_token: credentialResponse},
      headers: {},
      timeout: 10000
    })
  }
}
