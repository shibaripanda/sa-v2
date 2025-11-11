import { Modal, ScrollArea } from '@mantine/core';
import { useState } from 'react';
import { OrdersListTable } from './ordersListsVariants/orderListITable/OrdersListTable';
import { MainInterface } from '../Main';
import { OrderListItem } from './ordersListsVariants/orderListCards/OrderListItem';
import { useDisclosure } from '@mantine/hooks';
import { Order } from '../../../mainScreen/Dashboard';

export function Orders(props: MainInterface) {
  const [scrolled, setScrolled] = useState(false);
  const [openOrder, setOpenOrder] = useState<Order | null>(null);
  const [oneOpenOrder, {open, close} ] = useDisclosure();

  const openOrderFullscreen = (order: Order) => {
    if(!order) {
      setOpenOrder(null)
      close()
      return
    }
    setOpenOrder(order)
    open()
  }

  const controlSize = props.isMobile ? '' : `calc(100vw - 100px)`

  const activOrderView = () => {
    if(props.orderView === 'Cards (1 line)') {
      return (
        <OrderListItem {...props} openOrderFullscreen={openOrderFullscreen} countItemsLime={12 / 1} scrolled={scrolled} controlSize={controlSize}/>
      )
    }
    if(props.orderView === 'Cards (2 line)') {
      return (
        <OrderListItem  {...props} openOrderFullscreen={openOrderFullscreen} countItemsLime={12 / 2} scrolled={scrolled} controlSize={controlSize}/>
      )
    }
    if(props.orderView === 'Cards (3 line)') {
      return (
        <OrderListItem  {...props} openOrderFullscreen={openOrderFullscreen} countItemsLime={12 / 3} scrolled={scrolled} controlSize={controlSize}/>
      )
    }
    if(props.orderView === 'Cards (4 line)') {
      return (
        <OrderListItem  {...props} openOrderFullscreen={openOrderFullscreen} countItemsLime={12 / 4} scrolled={scrolled} controlSize={controlSize}/>
      )
    }
    if(props.orderView === 'Cards (5 line)') {
      return (
        <OrderListItem  {...props} openOrderFullscreen={openOrderFullscreen} countItemsLime={12 / 5} scrolled={scrolled} controlSize={controlSize}/>
      )
    }
    if(props.orderView === 'Cards (6 line)') {
      return (
        <OrderListItem  {...props} openOrderFullscreen={openOrderFullscreen} countItemsLime={12 / 6} scrolled={scrolled} controlSize={controlSize}/>
      )
    }
    if(props.orderView === 'Cards (8 line)') {
      return (
        <OrderListItem  {...props} openOrderFullscreen={openOrderFullscreen} countItemsLime={12 / 8} scrolled={scrolled} controlSize={controlSize}/>
      )
    }
    if(props.orderView === 'Cards (10 line)') {
      return (
        <OrderListItem  {...props} openOrderFullscreen={openOrderFullscreen} countItemsLime={12 / 10} scrolled={scrolled} controlSize={controlSize}/>
      )
    }
    return (
        <OrdersListTable {...props} openOrderFullscreen={openOrderFullscreen} scrolled={scrolled} controlSize={controlSize}/>
      )
  }

  return (
    <>
    <ScrollArea h="calc(100vh - 105px)" onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
      {activOrderView()}
    </ScrollArea>
    <Modal radius={'10px'} opened={oneOpenOrder} title={openOrder?.device_id} withCloseButton={true}
        fullScreen
        onClose={() => {
          setOpenOrder(null)
          close()
        }}
        >
      {openOrder?._id}
    </Modal>
    </>
  );
}