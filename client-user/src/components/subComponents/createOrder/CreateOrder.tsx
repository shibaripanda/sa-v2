import { Autocomplete, Button, Center, Grid, Group, Modal, Space, TextInput } from "@mantine/core";
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
    console.log(fieldName, newValue)
    console.log(newOrder)
    const index = newOrder.findIndex(f => f.name === fieldName)
    if(index > -1) {
      sessionStorage.setItem(fieldName, newValue.toString())
      newOrder[index].currentData = newValue
      setNewOrder([...newOrder])
    }
  }

  console.log(newOrder)

  const onClearNewOrder = () => {
    // _setSelectedDevice_(null)
    // sessionStorage.removeItem('_selectedDevice_')
    setNewOrder([...newOrder].map(f => {
      sessionStorage.removeItem(f.name)
      return {...f, currentData: null}
    }))
  }

  const onCancelNewOrderClose = () => {
    _setSelectedDevice_(null)
    sessionStorage.removeItem('_selectedDevice_')
    setNewOrder([...newOrder].map(f => {
      sessionStorage.removeItem(f.name)
      return {...f, currentData: null}
    }))
    close()
  }

  const onCloseNewOrderClose = () => {
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
          <Grid justify="flex-start" align="stretch" w="100%">
            {props.comp.devices_ids.map(d => 
              <Grid.Col key={`Devices-${d._id}`} span={{ base: 4, sm: 1.5}}>
                <Button fullWidth onClick={() => {setAndSaveSelectedDevice(d)}} size='xs' color={_selectedDevice_?._id == d._id ? 'green' : 'gray'}>{d.name}</Button>
              </Grid.Col>)
            }
          </Grid>
        </Center>

        <Space h='xl'/>

        <Center>
          {_selectedDevice_ ?
            <Grid justify="flex-start" align="stretch" w="100%">
              {newOrder.filter(f => !_selectedDevice_.blockFields.includes(f._id)).map(d => 
                <Grid.Col key={`Fildes-${d._id}`} span={{ base: 12, sm: 4}}>
                  {d.variants ?
                    <Autocomplete
                    // onChange={(v) => updateNewOrder(d.name, v)} 
                    onChange={(v) => {
                      updateNewOrder(d.name, v)
                      console.log('variants', v)
                    }}
                    label={d.name + (d.onlyNumber ? ' (only numbers)' : '')}
                    value={d.currentData?.toString() ?? ''} 
                    size='xs' 
                    withAsterisk={d.mustHave}
                    data={['dddd', 'eeee']}/>  
                    // data={d.data.map(s => s.toString())}/> 
                    :
                    <TextInput 
                    onChange={(v) => updateNewOrder(d.name, v.target.value)} 
                    label={d.name + (d.onlyNumber ? ' (only numbers)' : '')} 
                    value={d.currentData ?? ''} 
                    size='xs' 
                    withAsterisk={d.mustHave}/>
                  }
                </Grid.Col>)
              }
            </Grid> : 'Выбери устройство'}
        </Center>

        <Space h='xl'/>

        {_selectedDevice_ ?
          <Grid justify="flex-start" align="stretch" w="100%">
            <Grid.Col key={'1'} span={{ base: 12, sm: 2}}>
              <Button fullWidth size='xs' color="grey">Заполнить по фото</Button>
            </Grid.Col>
            <Grid.Col key={'1'} span={{ base: 12, sm: 2}}>
              <Button fullWidth size='xs' color="grey">Очистить фото</Button>
            </Grid.Col>
            <Grid.Col key={'2'} span={{ base: 12, sm: 4}}>
              <Button fullWidth size='xs' color="green">Создать заказ</Button>
            </Grid.Col>
            <Grid.Col key={'3'} span={{ base: 12, sm: 2}}>
              <Button onClick={onClearNewOrder} disabled={!newOrder.some(f => f.currentData !== null)} fullWidth size='xs' color="red">Очистить поля</Button>
            </Grid.Col>
            <Grid.Col key={'4'} span={{ base: 12, sm: 2}}>
              <Button onClick={onCancelNewOrderClose} fullWidth size='xs' color="red">Отмена</Button>
            </Grid.Col>
          </Grid> : null}

      </Modal>

      <Button size='xs' visibleFrom="sm" c='green' variant='default' onClick={open}>{props.text?.createOrder}</Button>
    </>
    
  );
}