import { Modal, ScrollArea } from '@mantine/core';
import { useState } from 'react';
import { OrdersList_1 } from './ordersListsVariants/ordersListVariant-1/OrdersList_1';
import { MainInterface } from '../Main';
import { OrderListItem } from './ordersListsVariants/OrderListItem';
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
    if(props.orderView === 'Varint 1') {
      return (
        <OrdersList_1 {...props} openOrderFullscreen={openOrderFullscreen} scrolled={scrolled} controlSize={controlSize}/>
      )
    }
    if(props.orderView === 'Varint 2') {
      return (
        <OrderListItem {...props} openOrderFullscreen={openOrderFullscreen} countItemsLime={12} scrolled={scrolled} controlSize={controlSize}/>
      )
    }
    if(props.orderView === 'Varint 3') {
      return (
        <OrderListItem  {...props} openOrderFullscreen={openOrderFullscreen} countItemsLime={6} scrolled={scrolled} controlSize={controlSize}/>
      )
    }
    if(props.orderView === 'Varint 4') {
      return (
        <OrderListItem  {...props} openOrderFullscreen={openOrderFullscreen} countItemsLime={4} scrolled={scrolled} controlSize={controlSize}/>
      )
    }
    if(props.orderView === 'Varint 5') {
      return (
        <OrderListItem  {...props} openOrderFullscreen={openOrderFullscreen} countItemsLime={3} scrolled={scrolled} controlSize={controlSize}/>
      )
    }
    if(props.orderView === 'Varint 6') {
      return (
        <OrderListItem  {...props} openOrderFullscreen={openOrderFullscreen} countItemsLime={2.4} scrolled={scrolled} controlSize={controlSize}/>
      )
    }
    if(props.orderView === 'Varint 7') {
      return (
        <OrderListItem  {...props} openOrderFullscreen={openOrderFullscreen} countItemsLime={2} scrolled={scrolled} controlSize={controlSize}/>
      )
    }
    if(props.orderView === 'Varint 8') {
      return (
        <OrderListItem  {...props} openOrderFullscreen={openOrderFullscreen} countItemsLime={1.5} scrolled={scrolled} controlSize={controlSize}/>
      )
    }
    if(props.orderView === 'Varint 9') {
      return (
        <OrderListItem  {...props} openOrderFullscreen={openOrderFullscreen} countItemsLime={1.2} scrolled={scrolled} controlSize={controlSize}/>
      )
    }
    return (
        <OrdersList_1 {...props} openOrderFullscreen={openOrderFullscreen} scrolled={scrolled} controlSize={controlSize}/>
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