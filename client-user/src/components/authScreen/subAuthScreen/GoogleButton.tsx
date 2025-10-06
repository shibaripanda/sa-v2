import { Button } from "@mantine/core";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { User } from "../../../interfaces/user";
import { AuthScreenInterface } from "../mainScreen/AuthScreen";
import { IconBrandGoogle } from "@tabler/icons-react";

interface GoogleButtonInterface extends AuthScreenInterface {
    title: string;
    agreement: boolean;
    setAgreement: any;
}

export function GoogleButton(props: GoogleButtonInterface) {

    const loginServerRequest = async (credentialResponse: string) => {
        return await axios({
            method: 'POST',
            url: import.meta.env.VITE_API_AUTH_LINK + '/auth/googleLogin',
            data: {access_token: credentialResponse},
            headers: {},
            timeout: 10000
        })
        .then(async (res) => {
            console.log(jwtDecode(res.data.token))
            const newUser: User = {...jwtDecode(res.data.token), token: res.data['token']}
            const existUsers: User[] = sessionStorage.getItem('loginedUsers') ? JSON.parse(sessionStorage.getItem('loginedUsers')!) : []
            if(!existUsers){
                sessionStorage.setItem('loginedUsers', JSON.stringify([newUser]))
            }
            else if(existUsers.map(user => user._id).includes(newUser._id)) {
                sessionStorage.setItem('loginedUsers', JSON.stringify([newUser, ...existUsers.filter(user => user._id !== newUser._id)]))
            }
            else{
                sessionStorage.setItem('loginedUsers', JSON.stringify([newUser, ...existUsers]))
            }
            props.setAgreement(false)
            props.setLoginedUsers(JSON.parse(sessionStorage.getItem('loginedUsers')!))
        })
        .catch((er) => {
            console.log(er)
        })
    }

    const login = useGoogleLogin({
        onSuccess: async tokenResponse  => {
          await loginServerRequest(tokenResponse.access_token)
        }
    })

    return (
        <Button
            disabled={!props.agreement}
            variant='default'
            fullWidth
            mt="xl"
            size="md" 
            onClick={() => login()}>
            {props.title}&nbsp;&nbsp;<IconBrandGoogle/>
        </Button>
    )
}