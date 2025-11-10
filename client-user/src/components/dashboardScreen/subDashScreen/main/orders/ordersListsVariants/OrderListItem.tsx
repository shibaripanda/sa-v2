import { Grid, Paper, Text } from '@mantine/core';
import { MainInterface } from '../../Main';

interface orderListItemInterface extends MainInterface {
  scrolled: any;
  controlSize: string;
  countItemsLime: number;
}

export function OrderListItem(props: orderListItemInterface) {

  const orders = props.orders.map((order) => (
    <Grid.Col key={order._id} span={props.isMobile ? 12 : props.countItemsLime}>
      <Paper shadow="xl" color='green' radius="md" withBorder p="md">

        <Text>{order.device_id} ({order.status})</Text>
        <Text>{order.device} {order.brend} {order.model} ({order.look})</Text>
        <Text>{order.serial_number}</Text>
        <Text>{order.problem} ({order.info})</Text>
        <Text>{order.client.name} ({order.client.contact})</Text>

      </Paper>
    </Grid.Col>
  ));

  return (
    <Grid w={props.controlSize}>
      {orders}
    </Grid>
  );
}
