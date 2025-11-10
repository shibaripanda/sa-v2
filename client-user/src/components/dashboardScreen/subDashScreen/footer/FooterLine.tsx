import { Group } from "@mantine/core";
import { DashScreenInterface, Order } from "../../mainScreen/Dashboard";

interface FooterLineInterface extends DashScreenInterface {
  orders: Order[];
}

export function FooterLine(props: FooterLineInterface) {
    return (
        <>
        <Group justify="space-between" mr={'lg'} ml={'lg'} visibleFrom="sm" gap="250px" mt={'2.5px'}>
            <div>{props.service.name} ({props.comp.name})</div>
            <div>{props.text?.orders} : {props.orders.length}</div>
            <div>{props.user?.name} ({props.user?.email})</div>
        </Group>

        <Group justify="space-between" mr={'lg'} ml={'lg'} hiddenFrom="sm" mt={'2.5px'}>
            <div>{props.service.name}</div>
            <div>{props.text?.orders} : {props.orders.length}</div>
        </Group>
        </>
    )
}