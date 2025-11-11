import { Divider, Grid, Group, Paper, Text } from '@mantine/core';
import { MainInterface } from '../../Main';
import { Order } from '../../../../mainScreen/Dashboard';
import { OrderListItemCard } from './OrderListItemCard';

interface orderListItemInterface extends MainInterface {
  scrolled: any;
  controlSize: string;
  countItemsLime: number;
  openOrderFullscreen: (order: Order) => void;
}

export function OrderListItem(props: orderListItemInterface) {

  const orders = props.orders.map((order) => (
    <Grid.Col key={order._id} span={props.isMobile ? 12 : props.countItemsLime} 
    onClick={() => props.openOrderFullscreen(order)}
    style={{ cursor: 'pointer' }}
    >
      {/* <Paper shadow="xl" color='green' radius="md" withBorder p="md"  
      onClick={() => props.openOrderFullscreen(order)}
      style={{ cursor: 'pointer' }}>

        <Group justify='space-between'>
          <Text fw={700}>{order.device} {order.brend} {order.model}</Text>
          <Text fw={700}>{order.device_id}</Text>
        </Group>
        <Divider/>
        <Group justify='space-between'>
          <Text>{order.problem}</Text>
          <Text>{order.status}</Text>
        </Group>

      </Paper> */}
      <OrderListItemCard {...props}/>
    </Grid.Col>
  ));

  return (
    <Grid w={props.controlSize}>
      {orders}
    </Grid>
  );
}
