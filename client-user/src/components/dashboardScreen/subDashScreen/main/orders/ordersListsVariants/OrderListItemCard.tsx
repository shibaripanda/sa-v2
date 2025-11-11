import { Card, Divider, Grid, Group, Image, Paper, RingProgress, Text } from '@mantine/core';
import { MainInterface } from '../../Main';
import { Order } from '../../../../mainScreen/Dashboard';
import classes from './OrderListItemCard.module.css';
import mainPic from '../../../../../../images/mainpic.png'

interface orderListItemInterface extends MainInterface {
  scrolled: any;
  controlSize: string;
  countItemsLime: number;
  openOrderFullscreen: (order: Order) => void;
}

const stats = [
  { title: 'Distance', value: '27.4 km' },
  { title: 'Avg. speed', value: '9.6 km/h' },
  { title: 'Score', value: '88/100' },
];


export function OrderListItemCard(props: orderListItemInterface) {

  const items = stats.map((stat) => (
    <div key={stat.title}>
      <Text size="xs" color="dimmed">
        {stat.title}
      </Text>
      <Text fw={500} size="sm">
        {stat.value}
      </Text>
    </div>
  ));

  return (
    <Card withBorder padding="lg" radius="md" className={classes.card}>
      <Card.Section>
        <Image
          src={mainPic}
          alt="Running challenge"
          height={100}
        />
      </Card.Section>

      <Group justify="space-between" mt="lg">
        <Text className={classes.title}>Running challenge</Text>
        <Group gap={5}>
          <Text fz="xs" c="dimmed">
            80% completed
          </Text>
          <RingProgress size={18} thickness={2} sections={[{ value: 80, color: 'blue' }]} />
        </Group>
      </Group>
      <Text mt="sm" mb="md" c="dimmed" fz="xs">
        56 km this month • 17% improvement compared to last month • 443 place in global scoreboard
      </Text>
      <Card.Section className={classes.footer}>{items}</Card.Section>
    </Card>
  );
}
