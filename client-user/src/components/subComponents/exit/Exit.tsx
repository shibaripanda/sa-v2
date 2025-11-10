import { ActionIcon } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import { DashScreenInterface } from "../../dashboardScreen/mainScreen/Dashboard";

export function Exit(props: Pick<DashScreenInterface, 'pickService' | 'pickUser'>) {
    return (
    <ActionIcon
        ml='5px'
        onClick={() => {
            sessionStorage.removeItem('navlink')
            props.pickService(null)
            props.pickUser(null)
        }}
        variant="transparent"
        color="grey"
        aria-label="Toggle color scheme"
    >
    <IconLogout stroke={1.5}/>
    </ActionIcon>
    )
}