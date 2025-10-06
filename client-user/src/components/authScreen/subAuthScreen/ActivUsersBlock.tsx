import { Button, Divider, Grid, Space } from "@mantine/core"
import { googleLogout } from "@react-oauth/google";
import { AuthScreenInterface } from "../mainScreen/AuthScreen";
import { IconLogout } from "@tabler/icons-react";
import { User } from "../../../interfaces/user";
import { ServiceModal } from "./ServiceModal";
import { useDisclosure } from "@mantine/hooks";

export function ActivUsersBlock(props: AuthScreenInterface) {

    const [serviseModal, setServiseModal] = useDisclosure(false)

    const showIndividualButExit = (item: User) => {
        if (props.loginedUsers.length > 1) {
            return (
            <Grid.Col span={props.loginedUsers.length > 1 ? 3 : 0}><Button
                key={item._id}
                color='red'
                fullWidth
                mt="xs"
                size="md"
                onClick={async () => {
                    const existUsers: User[] = sessionStorage.getItem('loginedUsers') ? JSON.parse(sessionStorage.getItem('loginedUsers')!) : []
                    if(existUsers.map(user => user._id).includes(item._id)) {
                        sessionStorage.setItem('loginedUsers', JSON.stringify([...existUsers.filter(user => user._id !== item._id)]))
                    }
                    props.setLoginedUsers(JSON.parse(sessionStorage.getItem('loginedUsers')!))
                }}
                >
                <IconLogout/>
            </Button>
            </Grid.Col>
            )
        }
    }
    
    if(props.loginedUsers.length)
        return (
            <div>
            <Grid justify="space-between" align="center" gutter={10}>
            {props.loginedUsers.map(item => <><Grid.Col key={item._id} span={props.loginedUsers.length > 1 ? 9 : 12}><Button
                key={item._id}
                color='green'
                fullWidth
                mt="xs" 
                size="md"
                onClick={async () => {
                props.setActivUserId(item._id)
                sessionStorage.setItem('activeUserId', item._id)
                setServiseModal.open()
                }}
                >
                {item.name ? item.name : item.email}
            </Button></Grid.Col>
            {showIndividualButExit(item)}
            </>)}
            </Grid>
            <Button
                color='red'
                fullWidth
                mt="xl"
                size="md"
                onClick={async () => {
                    sessionStorage.clear()
                    props.setLoginedUsers([])
                    props.setActivUserId('')
                    props.setActiveServiceId('')
                    googleLogout()
                }}
                >
                {props.text?.exit}&nbsp;&nbsp;<IconLogout/>
            </Button>
            <Space h='lg'/>
            <Divider/>
            <ServiceModal {...props} serviseModal={serviseModal} setServiseModal={setServiseModal}/>
            </div>
        )
}