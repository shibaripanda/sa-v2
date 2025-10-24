import { ScrollArea } from '@mantine/core';
import { DashScreenInterface, Order } from '../../mainScreen/Dashboard';
import { OrdersList_1 } from './orders/ordersListsVariants/ordersListVariant-1/OrdersList_1';
import { useState } from 'react';
import { OrdersList_2 } from './orders/ordersListsVariants/ordersListVariant-2/OrdersList_2';

export interface MainInterface extends DashScreenInterface {
  orders: Order[];
  orderView: string;
  isMobile: boolean;
}

export function Main(props: MainInterface) {
  const [scrolled, setScrolled] = useState(false);

  const controlSize = props.isMobile ? '' : `calc(100vw - 100px)`

  const activOrderView = () => {
    if(props.orderView === 'OrdersList_1') {
      return (
        <OrdersList_1 {...props} scrolled={scrolled} controlSize={controlSize}/>
      )
    }
    if(props.orderView === 'OrdersList_2') {
      return (
        <OrdersList_2 {...props} scrolled={scrolled} controlSize={controlSize}/>
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