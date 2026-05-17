import { Group } from "@mantine/core";
import { DashScreenInterface } from "../../mainScreen/Dashboard";

interface FooterLineInterface extends DashScreenInterface {
}

export function FooterLine(props: FooterLineInterface) {
    return (
        <>
        <Group justify="space-between" mr={'lg'} ml={'lg'} visibleFrom="sm" gap="250px" mt={'2.5px'}>
            <div>{props.user?.name} ({props.user?.email})</div>
        </Group>

        <Group justify="space-between" mr={'lg'} ml={'lg'} hiddenFrom="sm" mt={'2.5px'}>
            <div>{props.text?.orders}</div>
        </Group>
        </>
    )
}