import { Button, Center, Modal, Text } from "@mantine/core";
import { useGoogleLogin } from "@react-oauth/google";
import { AxiosClass } from "../../../classes/AxiosClass";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { IconCancel, IconCircleCheck } from "@tabler/icons-react";
import { User } from "../../../interfaces/user";

interface GoogleButtonAddInterface {
    title: string;
    disabled: boolean;
    action: string;
    userId: string;
    setLoginedUsers: any;
    exit: () => void;
}

interface StatusMessage {
    status: boolean;
    message: string;
}

export function GoogleButtonAdd(props: GoogleButtonAddInterface) {
    const [opened, { open, close }] = useDisclosure(false);
    const [errorMessage, setErrorMessage] = useState<StatusMessage>({status: false, message: ''});

    const axiosClass = new AxiosClass()

    const loginServerRequest = async (credentialResponse: string) => {
        return await axiosClass.axiosGoogleRequestAdd(credentialResponse, props.action)
        .then(async (res: { data: StatusMessage }) => {
            console.log(res.data)
            setErrorMessage(res.data)
            open()
            if(res.data.status){
                const existUsers: User[] = sessionStorage.getItem('loginedUsers') ? JSON.parse(sessionStorage.getItem('loginedUsers')!) : []
                if(existUsers.map(user => user._id).includes(props.userId)) {
                    sessionStorage.setItem('loginedUsers', JSON.stringify([...existUsers.filter(user => user._id !== props.userId)]))
                }
                props.setLoginedUsers(JSON.parse(sessionStorage.getItem('loginedUsers')!))
                props.exit()
                return
            }
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
                size="xs"
                onClick={() => login()}>
                {props.title}
            </Button>
            <Modal opened={opened} onClose={close} title={errorMessage.status ? <IconCircleCheck key='1' size={35} color='green'/> : <IconCancel key='1' size={35} color='red'/>}>
                <Center><Text size="sm">{errorMessage.message}</Text></Center>
            </Modal>
        </div>
    )
}