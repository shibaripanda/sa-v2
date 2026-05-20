import { useEffect, useState } from 'react';
import { MainInterface } from '../Main';
import { socket } from '../../../../../utils/socket';
import { Modal, Pagination } from '@mantine/core';
import { Button, Group, Space, Table, Text } from '@mantine/core';
import { CompaniesAdminPagination } from '../../../mainScreen/Dashboard';
import { useDisclosure } from '@mantine/hooks';
import { Company } from '../../../../../interfaces/company';

export function Companies(props: MainInterface) {

  const [opened, { open, close }] = useDisclosure(false);
    const [selectedItem, setSelectedItem] = useState<Company | null>(null);
  
    const getCompanyAdmin = (page: number) => {
      socket.emit('getCompaniesAdmin', {page, limit: props.companies.meta.limit}, (res: CompaniesAdminPagination) => {
        console.log('getCompaniesAdmin', res);
        props.setCompanies(res);
      });
    }
  
    const handleRowClickOpen = (item: Company ) => {
      setSelectedItem(item);
      open();
    };
  
    const handleRowClickClose = () => {
      setSelectedItem(null);
      close();
    };
  
    useEffect(() => {
      if (props.companies.items.length) return;
      getCompanyAdmin(props.companies.meta.page);
    }, [])
  
    console.log(props)
  
    const rows = props.companies.items.map((row) => {
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
        <Table.Tr key={row._id} onClick={() => handleRowClickOpen(row)} style={{ cursor: 'pointer' }}>
          <Table.Td>
              {row._id}
          </Table.Td>
          <Table.Td>
              {row.name}
          </Table.Td>
          {/* <Table.Td>
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
          </Table.Td> */}
          <Table.Td>
            {createdDate}
          </Table.Td>
          <Table.Td>
            {updatedDate}
          </Table.Td>
        </Table.Tr>
      );
    });

    // const links = props.companies.items.map((item) => <LinksGroup {...item} key={item.label} />);
    
    return (
      <div>
  
        <Group justify='space-between'>
  
          <Group>
            <Text size="xl" fw={700}>
              {props.navBarData[props.activeNavBar].label}
            </Text>
            <Button size='xs' variant='default' onClick={() => getCompanyAdmin(1)}>
              {props.text?.refresh}
            </Button>
          </Group>
  
          <Text size="xl" fw={700}>
            {props.companies.items.length} / {props.companies.meta.total}
          </Text>
  
          <Pagination
            size="sm" radius="xs"
            value={props.companies.meta.page}
            onChange={(page) => getCompanyAdmin(page)}
            total={props.companies.meta.totalPages}
          />
  
        </Group>
  
        <Space h="xs" />
  
        <Table.ScrollContainer minWidth={800}>
          <Table verticalSpacing="xs">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>_id</Table.Th>
                <Table.Th>Name</Table.Th>
                {/* <Table.Th>@username</Table.Th>
                <Table.Th>Telegram ID</Table.Th>
                <Table.Th>Email</Table.Th>
                <Table.Th>TLT</Table.Th>
                <Table.Th>Location & IP</Table.Th> */}
                <Table.Th>Created Date</Table.Th>
                <Table.Th>Updated Date</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
          {/* <div className={classes.linksInner}>{links}</div> */}
        </Table.ScrollContainer>
  
        <Modal fullScreen opened={opened} onClose={handleRowClickClose} title="Authentication">
          {selectedItem ? Object.keys(selectedItem).map((key) => (
            <div key={key}>
              <strong>{key}:</strong> {JSON.stringify(selectedItem[key])}
            </div>
          )) : "No user selected"}
        </Modal>
  
      </div>
    );
}
