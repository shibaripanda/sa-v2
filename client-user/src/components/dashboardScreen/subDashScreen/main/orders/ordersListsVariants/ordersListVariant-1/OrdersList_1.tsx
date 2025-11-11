import cx from 'clsx';
import { Table } from '@mantine/core';
import classes from './OrderList_1.module.css';
import { MainInterface } from '../../../Main';
import { Order } from '../../../../../mainScreen/Dashboard';

interface OrderVar1 extends MainInterface {
  scrolled: any;
  controlSize: string;
  openOrderFullscreen: (order: Order) => void;
}

export function OrdersList_1(props: OrderVar1) {

  const rows = props.orders.map((order) => (
    <Table.Tr key={order._id} onClick={() => props.openOrderFullscreen(order)} style={{ cursor: 'pointer' }}>
      <Table.Td>{order.device}</Table.Td>
      <Table.Td>{order.device} {order.brend} {order.model}</Table.Td>
      <Table.Td>{order.problem}</Table.Td>
      <Table.Td>{order.serial_number}</Table.Td>
    </Table.Tr>
  ));

  return (
      <Table w={props.controlSize}>
        <Table.Thead className={cx(classes.header, { [classes.scrolled]: props.scrolled })}>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Company</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
  );
}