import { ScrollArea } from '@mantine/core';
import { useState } from 'react';
import { OrdersList_1 } from './ordersListsVariants/ordersListVariant-1/OrdersList_1';
import { MainInterface } from '../Main';
import { OrderListItem } from './ordersListsVariants/OrderListItem';


export function Orders(props: MainInterface) {
  const [scrolled, setScrolled] = useState(false);

  const controlSize = props.isMobile ? '' : `calc(100vw - 100px)`

  const activOrderView = () => {
    if(props.orderView === 'Varint 1') {
      return (
        <OrdersList_1 {...props} scrolled={scrolled} controlSize={controlSize}/>
      )
    }
    if(props.orderView === 'Varint 2') {
      return (
        <OrderListItem {...props} countItemsLime={12} scrolled={scrolled} controlSize={controlSize}/>
      )
    }
    if(props.orderView === 'Varint 3') {
      return (
        <OrderListItem  {...props} countItemsLime={6} scrolled={scrolled} controlSize={controlSize}/>
      )
    }
    if(props.orderView === 'Varint 4') {
      return (
        <OrderListItem  {...props} countItemsLime={4} scrolled={scrolled} controlSize={controlSize}/>
      )
    }
    if(props.orderView === 'Varint 5') {
      return (
        <OrderListItem  {...props} countItemsLime={3} scrolled={scrolled} controlSize={controlSize}/>
      )
    }
    if(props.orderView === 'Varint 6') {
      return (
        <OrderListItem  {...props} countItemsLime={2} scrolled={scrolled} controlSize={controlSize}/>
      )
    }
    if(props.orderView === 'Varint 7') {
      return (
        <OrderListItem  {...props} countItemsLime={1} scrolled={scrolled} controlSize={controlSize}/>
      )
    }
    return (
        <OrdersList_1 {...props} scrolled={scrolled} controlSize={controlSize}/>
      )
  }

  return (
    <ScrollArea h="calc(100vh - 105px)" onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
      {activOrderView()}
    </ScrollArea>
  );
}