import cx from 'clsx';
import { Table } from '@mantine/core';
import classes from './OrdersListTable.module.css';
import { MainInterface } from '../../../Main';
import { OrderClass } from '../../../../../../../classes/OrderClass';
import { EditOrderMenu } from './editOrder/editOrderMenu';
// import { StatusEdit } from '../orderListCards/StatusEdit';

export interface MainTableInterface extends MainInterface {
  scrolled: any;
  controlSize: string;
  openOrderFullscreen: (order: OrderClass) => void;
}

export function OrdersListTable(props: MainTableInterface) {

  const fieldsLine = props.staffUser.userStaffFieldsLine.filter((f)  => props.comp.fields_ids.some(cf => cf._id === f._id));

  // console.log('OrdersListTable', props.orders)

  const rows = props.orders.items.map((order) => (
    <Table.Tr key={order._id} style={{ cursor: 'pointer' }}> 
      <Table.Td key={1}><EditOrderMenu {...props} order={order}/></Table.Td>
      {fieldsLine.map(f => (<Table.Td key={f._id} onClick={() => props.openOrderFullscreen(order)}>{order.data[f._id] ?? ''}</Table.Td>))}
    </Table.Tr>
  ));

  return (
    <Table w={props.controlSize}>
      <Table.Thead className={cx(classes.header, { [classes.scrolled]: props.scrolled })}>
        <Table.Tr>
          {[<Table.Th>Edit</Table.Th>, fieldsLine.map(f => <Table.Th key={f._id}>{f.name}</Table.Th>)]}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}