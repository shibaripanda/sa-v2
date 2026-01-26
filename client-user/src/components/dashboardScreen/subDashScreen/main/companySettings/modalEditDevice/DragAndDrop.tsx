import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import cx from 'clsx';
import { Button, Grid, Text } from '@mantine/core';
import { useListState } from '@mantine/hooks';
import classes from './DndList.module.css';
import { MainInterface } from '../../Main';
import { buttonColorObj } from '../../../../../subComponents/colorShema/buttonColorObj';
import { IconGripVertical } from '@tabler/icons-react';
import { useEffect } from 'react';
import { TextLib } from '../../../../../../interfaces/textLib';
import { DeviceClass } from '../../../../../../classes/DeviceClass';

interface ItemProps {
  item: DeviceClass;
  index: number;
  l: number;
  text: TextLib | null;
}

function SortableItem({ item, index, l, text}: ItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item._id,
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Grid
      ref={setNodeRef}
      style={style}
      className={cx(classes.item, { [classes.itemDragging]: isDragging })}
      {...attributes}
      {...listeners}
      justify="space-between" align="center"
    >
      <Grid.Col span={3} mt='xs'>
        <IconGripVertical size={'30px'}/>
      </Grid.Col>
      <Grid.Col span={7}>
          <Text>{item.name}</Text>
          <Text c="dimmed" size="sm">
            {text?.position}: {index + 1}
          </Text>
          {index === 0 && (<Text td="underline" fw={700} c="dimmed" size="sm">{text?.new}</Text>)}
          {index === l - 1 && (<Text td="underline" fw={700} c="dimmed" size="sm">{text?.closed}</Text>)}
      </Grid.Col>
      <Grid.Col span={2}>
        <Button fullWidth size='xs' style={buttonColorObj(item.color)}></Button>
      </Grid.Col>
    </Grid> 
  );
}

export function DragAndDrop(props: MainInterface) {
  const [state, handlers] = useListState(props.comp.devices_ids);

  useEffect(() => {
    const updateDeviceLine = async (state: DeviceClass[]) => {
      const res = await props.comp.updateDeviceLine(state, props.pickComp)
      console.log(res)
    }

    if (JSON.stringify(state) !== JSON.stringify(props.comp.devices_ids)) {
      const res = updateDeviceLine(state)
      console.log(res)
      if (!res) handlers.setState(props.comp.devices_ids)
    }
  }, [state])

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) {
      return;
    }
    const oldIndex = state.findIndex((i) => i._id === active.id);
    const newIndex = state.findIndex((i) => i._id === over.id);
    handlers.setState(arrayMove(state, oldIndex, newIndex));
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={state.map((i) => i._id)} strategy={verticalListSortingStrategy}>
        {state.map((item, index) => (
          <SortableItem key={item._id} item={item} index={index} l={state.length} text={props.text} />
        ))}
      </SortableContext>
    </DndContext>
  );
}