import { use, useEffect, useState } from 'react';
import { MainInterface } from '../Main';
import { socket } from '../../../../../utils/socket';
import { User } from '../../../../../interfaces/user';
import { Button, Group, Space, Table, Text } from '@mantine/core';

  // _id: string; x
  // telegramId: number; x
  // email: string; x
  // name: string; x
  // telegramUserName: string; x
  // timeLiveToken: string; x
  // historyLogin: HistoryLogin[];

  // updatedAt: string; x
  // createdAt: string; x

  // location: string;
  // ip: string;

export function Users(props: MainInterface) {

  const getUsersAdmin = () => {
    socket.emit('getUsersAdmin', {}, (res: User[]) => {
      console.log('getUsersAdmin', res);
      props.setUsers(res);
    });
  }

  useEffect(() => {
    if (props.users.length) return;
    getUsersAdmin();
  }, [])

  console.log(props)

  const rows = props.users.map((row) => {
    const createdDate = new Date(row.createdAt).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
    const updatedDate = new Date(row.updatedAt).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });


    return (
      <Table.Tr key={row._id}>
        <Table.Td>
            {row._id}
        </Table.Td>
        <Table.Td>
            {row.name}
        </Table.Td>
        <Table.Td>
          {row.telegramUserName}
        </Table.Td>
        <Table.Td>
          {row.telegramId}
        </Table.Td>
        <Table.Td>
          {row.email}
        </Table.Td>
        <Table.Td>
          {row.timeLiveToken}
        </Table.Td>
        <Table.Td>
          {row.historyLogin[row.historyLogin.length - 1]?.location || 'N/A'}, {row.historyLogin[row.historyLogin.length - 1]?.ip || 'N/A'}
        </Table.Td>
        <Table.Td>
          {createdDate}
        </Table.Td>
        <Table.Td>
          {updatedDate}
        </Table.Td>
      </Table.Tr>
    );
  });
  
  return (
    <div>

      <Group justify='space-between'>

        <Group>
          <Text size="xl" fw={700}>
            {props.navBarData[props.activeNavBar].label} {props.users.length ? `(${props.users.length})` : ''}
          </Text>
          <Button size='xs' variant='default' onClick={getUsersAdmin}>
            {props.text?.refresh}
          </Button>
        </Group>
        
        <Text size="sm" c="dimmed">
          Всего: {props.users.length}
        </Text>

      </Group>

      <Space h="xs" />

      <Table.ScrollContainer minWidth={800}>
        <Table verticalSpacing="xs">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>_id</Table.Th>
              <Table.Th>Name</Table.Th>
              <Table.Th>@username</Table.Th>
              <Table.Th>Telegram ID</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>TLT</Table.Th>
              <Table.Th>Location & IP</Table.Th>
              <Table.Th>Created Date</Table.Th>
              <Table.Th>Updated Date</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </div>
  );
}
