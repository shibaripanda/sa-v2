import { Autocomplete, Button, Center, Grid, Modal, Space, TextInput } from "@mantine/core";
import { DashScreenInterface } from "../../dashboardScreen/mainScreen/Dashboard";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { Field } from "../../../interfaces/field";
import { Device } from "../../../interfaces/device";

export function CreateOrder(props: DashScreenInterface) {
  const [opened, { open, close }] = useDisclosure(false);
  const [_selectedDevice_, _setSelectedDevice_] = useState<Device | null>(sessionStorage.getItem('_selectedDevice_') ? JSON.parse(sessionStorage.getItem('_selectedDevice_')!) : null)

  const newOrderData = () => {
    const orderFields = [...props.comp.fields_ids]
    for(const f of orderFields){
      f['currentData'] = sessionStorage.getItem(f.name) ?? null
    }
    return orderFields
  }

  const [newOrder, setNewOrder] = useState<Field[]>(newOrderData())

  // console.log('fffffffffffffffffffffff')
  console.log(props.comp)
  // console.log('fffffffffffffffffffffff')

  const updateNewOrder = (fieldName: string, newValue: string | number) => {
    const index = newOrder.findIndex(f => f.name === fieldName)
    if(index > -1) {
      newOrder[index].currentData = newValue
      setNewOrder({...newOrder})
    }
    
  }

  const onCloseNewOrderClose = () => {
    _setSelectedDevice_(null)
    sessionStorage.removeItem('_selectedDevice_')
    close()
  }
  const setAndSaveSelectedDevice = (device: Device) => {
    _setSelectedDevice_(device)
    sessionStorage.setItem('_selectedDevice_', JSON.stringify(device))
  }
 
  return (
    <>
      <Modal opened={opened} onClose={onCloseNewOrderClose} title={props.text?.newOrder} size="100%">

        <Center>
          <Grid justify="space-between">
            {props.comp.devices_ids.map(d => 
              <Grid.Col key={`Devices-${d._id}`} span={{ base: 4, sm: 1.5}}>
                <Button onClick={() => {setAndSaveSelectedDevice(d)}} size='xs' color={_selectedDevice_ == d ? 'green' : 'gray'}>{d.name}</Button>
              </Grid.Col>)
            }
          </Grid>
        </Center>

        <Space h='xl'/>

        <Center>
          {_selectedDevice_ ?
            <Grid justify="flex-start">
              {newOrder.filter(f => !_selectedDevice_.blockFields.includes(f._id)).map(d => 
                <Grid.Col key={`Fildes-${d._id}`} span={{ base: 12, sm: 4}}>
                  {d.variants ?
                    <Autocomplete label={d.name + (d.onlyNumber ? ' (only numbers)' : '')} size='xs' withAsterisk={d.mustHave} data={d.data.map(s => s.toString())}/> 
                    :
                    <TextInput onChange={(v) => updateNewOrder(d.name, v.target.value)} label={d.name + (d.onlyNumber ? ' (only numbers)' : '')} value={d.currentData ?? ''} size='xs' withAsterisk={d.mustHave}/>
                  }
                </Grid.Col>)
              }
            </Grid> : 'Выбери устройство'}
        </Center>

      </Modal>

      <Button size='xs' visibleFrom="sm" c='green' variant='default' onClick={open}>{props.text?.createOrder}</Button>
    </>
    
  );
}