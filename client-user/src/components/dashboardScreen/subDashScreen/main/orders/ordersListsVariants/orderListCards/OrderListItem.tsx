import { Grid } from '@mantine/core';
import { MainInterface } from '../../../Main';
import { Order } from '../../../../../mainScreen/Dashboard';
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
      <OrderListItemCard {...order}/>
    </Grid.Col>
  ));

  return (
    <Grid w={props.controlSize}>
      {orders}
    </Grid>
  );
}
