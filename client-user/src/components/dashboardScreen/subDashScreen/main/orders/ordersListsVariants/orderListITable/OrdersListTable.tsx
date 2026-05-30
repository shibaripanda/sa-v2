import cx from 'clsx';
import { Table } from '@mantine/core';
import classes from './OrdersListTable.module.css';
import { MainInterface } from '../../../Main';
import { Order } from '../../../../../../../interfaces/order';

interface OrderVar1 extends MainInterface {
  scrolled: any;
  controlSize: string;
  openOrderFullscreen: (order: Order) => void;
}

export function OrdersListTable(props: OrderVar1) {

  console.log('OrdersListTable', props.orders)

  const rows = props.orders.items.map((order) => (
    // <Table.Tr key={order._id} onClick={() => {}} style={{ cursor: 'pointer' }}>
    <Table.Tr key={order._id} onClick={() => props.openOrderFullscreen(order)} style={{ cursor: 'pointer' }}> 
      <Table.Td>{order._id}</Table.Td>
      {/* <Table.Td>{order.device} {order.brend} {order.model}</Table.Td>
      <Table.Td>{order.problem}</Table.Td>
      <Table.Td>{order.serial_number}</Table.Td> */}
    </Table.Tr>
  ));

  return (
      <Table w={props.controlSize}>
        <Table.Thead className={cx(classes.header, { [classes.scrolled]: props.scrolled })}>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            {/* <Table.Th>Email</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Company</Table.Th> */}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
  );
}