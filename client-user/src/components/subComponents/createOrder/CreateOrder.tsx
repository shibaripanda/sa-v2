import { Button, Modal } from "@mantine/core";
import { DashScreenInterface } from "../../dashboardScreen/mainScreen/Dashboard";
import { useDisclosure } from "@mantine/hooks";

export function CreateOrder(props: DashScreenInterface) {
    const [opened, { open, close }] = useDisclosure(false);

    console.log('fffffffffffffffffffffff')
    console.log(props)
    console.log('fffffffffffffffffffffff')
 
  return (
    <>
      <Modal opened={opened} onClose={close} title={props.text?.newOrder} size="100%">
        {/* Modal content */}
        <Button size='xs' visibleFrom="sm" c='green' variant='default' onClick={() => props.service.createNewOrder({device: 'laptop'})}>Создать заказ</Button>
      </Modal>

      <Button size='xs' visibleFrom="sm" c='green' variant='default' onClick={open}>{props.text?.createOrder}</Button>
    </>
    
  );
}