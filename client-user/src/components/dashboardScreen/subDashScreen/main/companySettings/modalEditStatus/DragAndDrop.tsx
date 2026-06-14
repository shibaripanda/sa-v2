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
import { Button, Grid, Group, Text } from '@mantine/core';
import { useListState } from '@mantine/hooks';
import classes from './DndList.module.css';
import { MainInterface } from '../../Main';
import { StatusClass } from '../../../../../../classes/StatusClass';
import { buttonColorObj } from '../../../../../subComponents/colorShema/buttonColorObj';
import { IconGripVertical } from '@tabler/icons-react';
import { useEffect } from 'react';
import { TextLib } from '../../../../../../interfaces/textLib';

interface ItemProps {
  item: StatusClass;
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
      <Group justify="space-between">
        <IconGripVertical size={'30px'}/>
          <Text>{item.name}</Text>
          <Text c="dimmed" size="sm">
            {text?.position}: {index + 1}
          </Text>
          {index === 0 && (<Text td="underline" fw={700} c="dimmed" size="sm">{text?.new}</Text>)}
          {index === l - 1 && (<Text td="underline" fw={700} c="dimmed" size="sm">{text?.closed}</Text>)}
      </Group>
    </Grid> 
  );
}

export function DragAndDrop(props: MainInterface) {
  const [state, handlers] = useListState(props.comp.statuses_ids);

  useEffect(() => {
    const updateStatusLine = async (state: StatusClass[]) => {
      const res = await props.comp.updateStatusLine(state, props.pickComp)
      console.log(res)
    }

    if (JSON.stringify(state) !== JSON.stringify(props.comp.statuses_ids)) {
      const res = updateStatusLine(state)
      console.log(res)
      if (!res) handlers.setState(props.comp.statuses_ids)
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
          <div  style={{cursor: 'pointer'}}>
            <SortableItem key={item._id} item={item} index={index} l={state.length} text={props.text}/>
          </div>
        ))}
      </SortableContext>
    </DndContext>
  );
}