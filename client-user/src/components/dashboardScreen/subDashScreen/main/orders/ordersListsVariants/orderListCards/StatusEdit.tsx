import { OrderListItemCardInterface } from "./OrderListItemCard";
import { useState } from 'react';
import { Menu, Text } from '@mantine/core';

export interface StatusEditInterface extends OrderListItemCardInterface {
  elSize: string;
}

export function StatusEdit(props: StatusEditInterface) {

    const [sort, setSort] = useState(props.order.statusId);
    const [opened, setOpened] = useState(false);

    const handleChangeStatus = (statusId: string) => {
        props.order.editStatus(props, statusId, setSort);
        setOpened(false)
    }

    return (
        <Menu shadow="md" width={150} closeOnItemClick={true} opened={opened} onChange={setOpened}>
        <Menu.Target>
            <Text fw={700} style={{ cursor: 'pointer' }} size={props.elSize}>{props.order.statusName}</Text>
        </Menu.Target>

        <Menu.Dropdown>
            <Menu.Label>{props.order.order_id}</Menu.Label>
            <Menu.RadioGroup value={sort} onChange={(v) => handleChangeStatus(v)}>
                {props.comp.statuses_ids.map(s => <Menu.RadioItem key={s._id} value={s._id}>{s.name}</Menu.RadioItem>)}
            </Menu.RadioGroup>
        </Menu.Dropdown>
        </Menu>
    );
}