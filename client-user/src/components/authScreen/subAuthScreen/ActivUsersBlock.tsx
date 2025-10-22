import { Box, Button, Divider, Grid, Space } from "@mantine/core"
import { googleLogout } from "@react-oauth/google";
import { AuthScreenInterface } from "../mainScreen/AuthScreen";
import { IconLogout } from "@tabler/icons-react";
import { User } from "../../../interfaces/user";
import React from "react";

interface ServiceMod extends AuthScreenInterface {
    setServiseModal: any;
}

export function ActivUsersBlock(props: ServiceMod) {

    const showIndividualButExit = (item: User) => {
        // if (props.loginedUsers.length > 1) {
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
        // }
    }
    
    if(props.loginedUsers.length)
        return (
            <div>
            <Grid justify="space-between" align="center" gutter={10}>
            {props.loginedUsers.map(item =>
            <React.Fragment key={item._id}> 
                <Grid.Col span={props.loginedUsers.length > 1 ? 9 : 12}>
                    <Button
                        color='green'
                        fullWidth
                        mt="xs" 
                        size="md"
                        onClick={async () => {
                            props.pickUser(item)
                            props.setServiseModal.open()
                        }}
                        >
                        {item.name ? item.name : item.email}
                    </Button>
                </Grid.Col>
                {props.loginedUsers.length > 1 ? showIndividualButExit(item) : <></>}
            </React.Fragment>
            )}
            </Grid>
            <Button
                color='red'
                fullWidth
                mt="xl"
                size="md"
                onClick={async () => {
                    sessionStorage.clear()
                    props.setLoginedUsers([])
                    props.pickService(null)
                    googleLogout()
                }}
                >
                {props.text?.exit}&nbsp;&nbsp;<IconLogout/>
            </Button>
            <Space h='lg'/>
            <Divider/>
            </div>
        )
}