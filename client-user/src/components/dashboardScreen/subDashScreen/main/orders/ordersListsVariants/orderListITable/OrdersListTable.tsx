import cx from 'clsx';
import { Table } from '@mantine/core';
import classes from './OrdersListTable.module.css';
import { MainInterface } from '../../../Main';
import { OrderClass } from '../../../../../../../classes/OrderClass';

interface OrderVar1 extends MainInterface {
  scrolled: any;
  controlSize: string;
  openOrderFullscreen: (order: OrderClass) => void;
}

export function OrdersListTable(props: OrderVar1) {

  const fieldsLine = props.comp.fields_ids

  console.log('OrdersListTable', props.orders)

  const rows = props.orders.items.map((order) => (
    <Table.Tr key={order._id} onClick={() => props.openOrderFullscreen(order)} style={{ cursor: 'pointer' }}> 
      {fieldsLine.map(f => (<Table.Td key={f._id}>{order.data[f._id] ?? ''}</Table.Td>))}
    </Table.Tr>
  ));

  return (
    <Table w={props.controlSize}>
      <Table.Thead className={cx(classes.header, { [classes.scrolled]: props.scrolled })}>
        <Table.Tr>
          {fieldsLine.map(f => <Table.Th key={f._id}>{f.name}</Table.Th>)}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}