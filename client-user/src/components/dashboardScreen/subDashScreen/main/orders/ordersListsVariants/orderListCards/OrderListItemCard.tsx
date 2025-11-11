import { Card, Group, Image, RingProgress, Text } from '@mantine/core';
import { Order } from '../../../../../mainScreen/Dashboard';
import classes from './OrderListItemCard.module.css';
import mainPic from '../../../../../../../images/mainpic.png'

export function OrderListItemCard({...order}: Order) {

  const stats = [
    { title: 'Status', value: order.status },
    { title: 'Id', value: order.device_id },
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
    <Card withBorder padding="lg" radius="md" className={classes.card}>
      {/* <Card.Section className={classes.footer}>{items}</Card.Section> */}
      <Card.Section>
        <Image
          src={mainPic}
          alt={order.model}
          height={100}
        />
      </Card.Section>

      <Group justify="space-between" mt="lg">
        <Text className={classes.title}>{order.device} {order.brend} {order.model}</Text>
        <Group gap={5}>
          <Text fz="xs" c="dimmed">
            11.11.2025
          </Text>
          {/* <RingProgress size={18} thickness={2} sections={[{ value: 80, color: 'blue' }]} /> */}
        </Group>
      </Group>
      <Text mt="sm" mb="md" c="dimmed" fz="xs" style={{ whiteSpace: 'pre-line' }}>
        {`${order.problem}\n(${order.info})`}
      </Text>
      <Card.Section className={classes.footer}>{items}</Card.Section>
    </Card>
  );
}
