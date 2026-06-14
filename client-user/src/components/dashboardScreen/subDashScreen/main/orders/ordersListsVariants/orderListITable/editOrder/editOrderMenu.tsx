import { useState } from 'react';
import { Box, Menu, Text } from '@mantine/core';
import { OrderClass } from '../../../../../../../../classes/OrderClass';
import { cardBorderColorObj } from '../../../../../../../subComponents/colorShema/buttonColorObj';
import { MainTableInterface } from '../OrdersListTable';

export interface EditOrderMenuInterface extends MainTableInterface {
  order: OrderClass;
}

export function EditOrderMenu(props: EditOrderMenuInterface) {

    const [sort, setSort] = useState(props.order.statusId);
    const [opened, setOpened] = useState(false);

    const handleChangeStatus = (statusId: string) => {
        props.order.editStatus(props, statusId, setSort);
        setOpened(false)
    }

    return (
        <Menu shadow="md" width={150} closeOnItemClick={true} opened={opened} onChange={setOpened}>
        <Menu.Target>
            <Box
                style={{
                    display: 'inline-block',
                    border: '1px solid gray',
                    ...cardBorderColorObj(props.order.color),
                    padding: '0.5px 7px',
                    borderRadius: '5px',
                }}
                >
                <Text fw={700} size='sm' style={{ cursor: 'pointer', marginTop: '2px' }}>{props.order.statusName}</Text>
            </Box>
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