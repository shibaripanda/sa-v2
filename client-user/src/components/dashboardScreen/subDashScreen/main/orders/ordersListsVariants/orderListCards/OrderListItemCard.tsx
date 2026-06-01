import { Card, Group, Image, Text } from '@mantine/core';
import classes from './OrderListItemCard.module.css';
import mainPic from '../../../../../../../images/mainpic.png'
import { OrderClass } from '../../../../../../../classes/OrderClass';
import { cardBorderColorObj } from '../../../../../../subComponents/colorShema/buttonColorObj';

export function OrderListItemCard({ order }: { order: OrderClass }) {

  const stats = [
    { title: 'Status', value: order.statusId },
    { title: 'Id', value: order.order_id },
    { title: 'Price', value: '170' },
  ];

  const items = stats.map((stat) => (
    <div key={stat.title}>
      {/* <Text size="xs" color="dimmed">
        {stat.title}
      </Text> */}
      <Text fw={500} size="sm">
        {stat.value}
      </Text>
    </div>
  ));

  return (
    <Card withBorder padding="lg" radius="md" className={classes.card} style={{ borderWidth: 2, ...cardBorderColorObj(order.color) }}>
      <Card.Section className={classes.top}><Text className={classes.toptitle}>{order.order_id}</Text></Card.Section>
      <Card.Section>
        <Image
          src={mainPic}
          alt={order._id}
          height={100}
        />
      </Card.Section>

      <Group justify="space-between" mt="lg">
        <Text className={classes.title}>{order.deviceId}</Text>
        <Group gap={5}>
          <Text fz="xs" c="dimmed">
            {order.createdAt}
          </Text>
          {/* <RingProgress size={18} thickness={2} sections={[{ value: 80, color: 'blue' }]} /> */}
        </Group>
      </Group>
      <Text mt="sm" mb="md" c="dimmed" fz="xs" style={{ whiteSpace: 'pre-line' }}>
        {order.statusId}
      </Text>
      <Card.Section className={classes.footer}>{items}</Card.Section>
    </Card>
  );

  // return (
  //   <div>{order._id}</div> 
  // )
}
