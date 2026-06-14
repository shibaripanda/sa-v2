import { ActionIcon, Button, Card, Group, Image, Text } from '@mantine/core';
import classes from './OrderListItemCard.module.css';
import mainPic from '../../../../../../../images/mainpic.png'
import { OrderClass } from '../../../../../../../classes/OrderClass';
import { OrderListItemInterface } from './OrderListItem';
import { IconEdit } from '@tabler/icons-react';
import { StatusEdit } from './StatusEdit';


export interface OrderListItemCardInterface extends OrderListItemInterface {
  order: OrderClass;
}

export function OrderListItemCard(props: OrderListItemCardInterface) {
  // export function OrderListItemCard({ order }: { order: OrderClass }) {

  const marks = [
    { value: 1.2, label: 'xs', image: 100 },
    { value: 1.5, label: 'xs', image: 150 },
    { value: 2, label: 'sm', image: 200 },
    { value: 2.4, label: 'sm', image: 250 },
    { value: 3, label: 'md', image: 300 },
    { value: 4, label: 'md', image: 350 },
    { value: 6, label: 'lg', image: 400 },
    { value: 12, label: 'xl', image: 450 },
  ];
  const elSize = marks.find(m => m.value === props.countItemsLime)?.label || 'md'
  const elImage = marks.find(m => m.value === props.countItemsLime)?.image || 150

  return (
    <Card withBorder padding="lg" radius="md" className={classes.card} style={{ borderWidth: 1 }}>

      <Card.Section>
        <Image
          style={{ cursor: 'pointer' }}
          src={`data:image/jpeg;base64,${props.order.preview?.image}` || mainPic}
          onClick={() => props.openOrderFullscreen(props.order)}
          // src={mainPic}
          alt={props.order._id}
          height={elImage}
          fallbackSrc="https://placehold.co/600x400?text=image"
        />
      </Card.Section>

      <Card.Section className={classes.top}>
        <Text fw={700} size={elSize}>{props.order.order_id}</Text>
        <Text fw={700} c="dimmed" size={elSize}>{props.order.createdDate}</Text>
      </Card.Section>

      {/* <Card.Section className={classes.top}>
        <StatusEdit {...props} elSize={elSize}/>
      </Card.Section> */}

      

      <Card.Section className={classes.top}>
        <StatusEdit {...props} elSize={elSize}/>
        <ActionIcon size={elSize} variant="filled" color="gray" aria-label="Settings">
          <IconEdit style={{ width: '70%', height: '70%' }} />
        </ActionIcon>
      </Card.Section>

    </Card>
  );
}
