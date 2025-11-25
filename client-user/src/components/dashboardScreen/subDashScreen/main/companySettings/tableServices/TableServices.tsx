import { useState } from 'react';
import cx from 'clsx';
import { ScrollArea, Table } from '@mantine/core';
import classes from './TableServices.module.css';
import { TextLib } from '../../../../../../interfaces/textLib';
import { Service } from '../../../../../../interfaces/service';

interface TableHistoryLocationInterface {
    services: Service[];
    text: TextLib | null;
}

export function TableServices(props: TableHistoryLocationInterface) {
  const [scrolled, setScrolled] = useState(false);

  const dateString = (datenow: Date) => {
    return new Date(datenow).toLocaleString()
  }

  const rows = props.services.map((row) => (
    <Table.Tr key={row._id}>
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>{row.contacts}</Table.Td>
      <Table.Td>{row.address}</Table.Td>
      <Table.Td>{dateString(row.updatedAt)}</Table.Td>
    </Table.Tr>
  ));

  return (
    <ScrollArea h={150} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
      <Table miw={300}>
        <Table.Thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          {/* <Table.Tr>
            <Table.Th>{props.text?.date}</Table.Th>
            <Table.Th>{props.text?.location}</Table.Th>
            <Table.Th>IP</Table.Th>
          </Table.Tr> */}
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
}