import { useState } from 'react';
import cx from 'clsx';
import { ScrollArea, Table } from '@mantine/core';
import classes from './TableHistoryLocation.module.css';
import { HistoryLogin } from '../../../../../../interfaces/user';
import { TextLib } from '../../../../../../interfaces/textLib';

interface TableHistoryLocationInterface {
    historyLogin: HistoryLogin[];
    text: TextLib | null;
}

export function TableHistoryLocation(props: TableHistoryLocationInterface) {
  const [scrolled, setScrolled] = useState(false);

  const dateString = (datenow: number) => {
    return new Date(datenow).toLocaleString()
  }

  const rows = props.historyLogin.sort((a, b) => b.date - a.date).map((row) => (
    <Table.Tr key={row.date}>
      <Table.Td>{dateString(row.date)}</Table.Td>
      <Table.Td>{row.location}</Table.Td>
      <Table.Td>{row.ip}</Table.Td>
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