import { Grid } from '@mantine/core';
import { MainInterface } from '../../../Main';
import { OrderListItemCard } from './OrderListItemCard';
import { OrderClass } from '../../../../../../../classes/OrderClass';

interface orderListItemInterface extends MainInterface {
  scrolled: any;
  controlSize: string;
  countItemsLime: number;
  openOrderFullscreen: (order: OrderClass) => void;
}

export function OrderListItem(props: orderListItemInterface) {

  const orders = props.orders.items.map((order) => (
    <Grid.Col key={order._id} span={props.isMobile ? 12 : props.countItemsLime} 
    onClick={() => props.openOrderFullscreen(order)}
    style={{ cursor: 'pointer' }}
    >
      <OrderListItemCard order={order}/>
    </Grid.Col>
  ));

  return (
    <Grid w={props.controlSize}>
      {orders}
    </Grid>
  );
}
