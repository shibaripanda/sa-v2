import { useTelegramLogin } from '@telegram-login-ultimate/react';
import { Button, Center, Modal, Text } from "@mantine/core";
import { AxiosClass } from "../../../classes/AxiosClass";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { IconCancel, IconCircleCheck } from '@tabler/icons-react';
import { User } from '../../../interfaces/user';

interface TelegramButtonAddInterface {
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

export function TelegramButtonAdd(props: TelegramButtonAddInterface) {
    const [opened, { open, close }] = useDisclosure(false);
    const [errorMessage, setErrorMessage] = useState<StatusMessage>({status: false, message: ''});

    const loginServerRequest = async (credentialResponse: object) => {

        const axiosClass = new AxiosClass()

        return await axiosClass.axiosTelegramRequestAdd(credentialResponse, props.action)
        .then(async (res) => {
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

    const [openPopup] = useTelegramLogin({
        botId: Number(import.meta.env.VITE_BOT_ID),
        onSuccess: (user) => loginServerRequest(user),
        onFail: () => {},
    })

    return (
        <div>
            <Button
                disabled={props.disabled}
                variant='default'
                fullWidth
                size='xs'
                onClick={openPopup}>
                {props.title}
            </Button>
            <Modal opened={opened} onClose={close} title={errorMessage.status ? <IconCircleCheck key='1' size={35} color='green'/> : <IconCancel key='1' size={35} color='red'/>}>
                <Center><Text size="sm">{errorMessage.message}</Text></Center>
            </Modal>
        </div>
    )
}