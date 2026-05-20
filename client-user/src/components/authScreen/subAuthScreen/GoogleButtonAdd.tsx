import { Button, Center, Modal, Text } from "@mantine/core";
import { useGoogleLogin } from "@react-oauth/google";
import { AxiosClass } from "../../../classes/AxiosClass";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

interface GoogleButtonAddInterface {
    title: string;
    disabled: boolean;
}

export function GoogleButtonAdd(props: GoogleButtonAddInterface) {
    const [opened, { open, close }] = useDisclosure(false);
    const [errorMessage, setErrorMessage] = useState('');

    const axiosClass = new AxiosClass()

    const loginServerRequest = async (credentialResponse: string) => {
        return await axiosClass.axiosGoogleRequestAdd(credentialResponse, 'add')
        .then(async (res) => {
            if(res.data.status){
                // console.log(jwtDecode(res.data.token))
                // const newUser: User = {...jwtDecode(res.data.token), token: res.data['token']}
                // const existUsers: User[] = sessionStorage.getItem('loginedUsers') ? JSON.parse(sessionStorage.getItem('loginedUsers')!) : []
                // if(!existUsers){
                //     sessionStorage.setItem('loginedUsers', JSON.stringify([newUser]))
                // }
                // else if(existUsers.map(user => user._id).includes(newUser._id)) {
                //     sessionStorage.setItem('loginedUsers', JSON.stringify([newUser, ...existUsers.filter(user => user._id !== newUser._id)]))
                // }
                // else{
                //     sessionStorage.setItem('loginedUsers', JSON.stringify([newUser, ...existUsers]))
                // }
                // props.setAgreement(false)
                // props.setLoginedUsers(JSON.parse(sessionStorage.getItem('loginedUsers')!))
                // props.pickUser(newUser)
                // props.setServiseModal.open()
                return
            }
            console.log(res.data.message)
            setErrorMessage(res.data.message)
            open()
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
        <div>
            <Button
                disabled={props.disabled}
                variant='default'
                fullWidth
                onClick={() => login()}>
                {props.title}
            </Button>
            <Modal opened={opened} onClose={close} title="Error">
                <Center><Text size="sm">{errorMessage}</Text></Center>
            </Modal>
        </div>
    )
}