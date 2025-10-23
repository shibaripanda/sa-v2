import cx from 'clsx';
import { Table } from '@mantine/core';
import classes from './OrderList_1.module.css';
import { MainInterface } from '../../../Main';

interface OrderVar1 extends MainInterface {
  scrolled: any;
  controlSize: string;
}

export function OrdersList_1(props: OrderVar1) {

  const rows = props.orders.map((row) => (
    <Table.Tr key={row.name}>
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>{row.email}</Table.Td>
      <Table.Td>{row.email}</Table.Td>
      <Table.Td>{row.company}</Table.Td>
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