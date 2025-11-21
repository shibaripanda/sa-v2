import { jwtDecode } from "jwt-decode";
import { User } from "../../../interfaces/user";
import { AuthScreenInterface } from "../mainScreen/AuthScreen";
import { useTelegramLogin } from '@telegram-login-ultimate/react';
import { Button } from "@mantine/core";
import { IconBrandTelegram } from "@tabler/icons-react";
import { AxiosClass } from "../../../classes/AxiosClass";

interface GoogleButtonInterface extends AuthScreenInterface {
    title: string;
    agreement: boolean;
    setAgreement: any;
    setServiseModal: any;
}

export function TelegramButton(props: GoogleButtonInterface) {

    const loginServerRequest = async (credentialResponse: any) => {

        const axiosClass = new AxiosClass()

        return await axiosClass.axiosTelegramRequest(credentialResponse)
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
            props.pickUser(newUser)
            props.setServiseModal.open()
        })
        .catch((er) => {
            console.log(er)
        })
    }

    const [openPopup] = useTelegramLogin({
        botId: Number(import.meta.env.VITE_BOT_ID),
        onSuccess: (user) => loginServerRequest(user),
        onFail: () => {},
    })

    return (
        <Button
            disabled={!props.agreement}
            variant='default'
            fullWidth
            mt="xl"
            size="md" 
            onClick={openPopup}>
            {props.title}&nbsp;&nbsp;<IconBrandTelegram/>
        </Button>
    )
}