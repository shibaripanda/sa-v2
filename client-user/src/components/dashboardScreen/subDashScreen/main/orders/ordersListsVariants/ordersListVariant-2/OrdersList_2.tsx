import { Grid, Paper, Text } from '@mantine/core';
import { MainInterface } from '../../../Main';

interface OrderVar2 extends MainInterface {
  scrolled: any;
  controlSize: string;
}

export function OrdersList_2(props: OrderVar2) {

  const orders = props.orders.map((row) => (
    <Grid.Col span={props.isMobile ? 12 : 3}>
      <Paper shadow="xl" color='green' radius="md" withBorder p="xl">
        <Text>{row.company}</Text>
        <Text>
          Use it to create cards, dropdowns, modals and other components that require background
          with shadow
        </Text>
      </Paper>
    </Grid.Col>
  ));

  return (
    <Grid w={props.controlSize}>
      {orders}
    </Grid>
  );
}