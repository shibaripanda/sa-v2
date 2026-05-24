import { ActionIcon, Autocomplete, Button, Center, Grid, Group, Image, Indicator, Modal, Space, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { Field } from "../../../interfaces/field";
import { Device } from "../../../interfaces/device";
import { HeaderInterface } from "../../dashboardScreen/subDashScreen/header/Header";
import { IconX } from "@tabler/icons-react";

export function CreateOrder(props: HeaderInterface) {
  const [opened, { open, close }] = useDisclosure(false);
  const [_selectedDevice_, _setSelectedDevice_] = useState<Device | null>(sessionStorage.getItem('_selectedDevice_') ? JSON.parse(sessionStorage.getItem('_selectedDevice_')!) : null)

  // const [photos, setPhotos] = useState(props.user.photos)
  const [fullPhoto,  setFullPhoto ] = useDisclosure(false);
  const [photo,  setPhoto ] = useState<string>('');

  const newOrderData = () => {
    const orderFields = [...props.comp.fields_ids]
    for(const f of orderFields){
      f['currentData'] = sessionStorage.getItem(f.name) ?? null
    }
    return orderFields
  }

  const [newOrder, setNewOrder] = useState<Field[]>(newOrderData())

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

  const showFullPhoto = (photo: string) => {
    setPhoto(photo)
    setFullPhoto.open()
  }

  const deeleteAllPhoto = () => {
    for (const p of props.photos) {
      props.user.deletePhoto({ ...props, deletePhoto: p.photo })
    }
  }

  console.log(props.photos)
 
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
            </Grid> : ''}
        </Center>

        <Space h='xl'/>

        {_selectedDevice_ ?
          <Grid justify="flex-start" align="stretch" w="100%">
            <Grid.Col key={'1'} span={{ base: 12, sm: 2}}>
              <Button fullWidth size='xs' color="grey">Заполнить по фото</Button>
            </Grid.Col>
            <Grid.Col key={'1'} span={{ base: 12, sm: 2}}>
              <Button fullWidth size='xs' color="red" disabled={!props.photos.length} onClick={deeleteAllPhoto}>Очистить фото</Button>
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

          <Space h='xl'/>

          {props.photos.length ?
            <Center> 
              <Group  
                wrap="nowrap"
                // style={{
                //   overflow: 'hidden',
                //   width: '100%',
                // }}
                >{props.photos.map((p, index) =>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <Image
                  h={150}
                  w={150}
                  fit="cover"
                  radius="md"
                  src={`data:image/jpeg;base64,${p.image}`}
                  onClick={() => showFullPhoto(p.image)}
                />

                <ActionIcon
                  color="red"
                  variant="filled"
                  size="xs"
                  style={{
                    position: 'absolute',
                    bottom: 6,
                    right: 6,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    props.user.deletePhoto({ ...props, deletePhoto: p.photo });
                  }}
                >
                  <IconX size={12} />
                </ActionIcon>
              </div>
              )}
              </Group>
              <Modal opened={fullPhoto} onClose={setFullPhoto.close} title="Photo" fullScreen> 
                <Center>
                  <Image
                    h={'auto'}
                    w="70%"
                    radius="md"
                    src={`data:image/jpeg;base64,${photo}`}
                  />
                </Center>
              </Modal>
            </Center> : null
          }

      </Modal>

      <Button size='xs' visibleFrom="sm" c='green' variant='default' onClick={open}>{props.text?.createOrder}</Button>
    </>
    
  );
}