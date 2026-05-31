import { ActionIcon, AspectRatio, Autocomplete, Box, Button, Center, Checkbox, Divider, Grid, Group, Image, Modal, Overlay, Slider, Space, Text, TextInput, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { Field } from "../../../interfaces/field";
import { Device } from "../../../interfaces/device";
import { HeaderInterface } from "../../dashboardScreen/subDashScreen/header/Header";
import { IconLockOpen, IconSquareX, IconX } from "@tabler/icons-react";
import { OrderFactoryClass } from "../../../classes/OrderFactoryClass";

interface CreateOrder extends HeaderInterface {
  createOrder: boolean;
  setCreateOrder: any;
}

export function CreateOrder(props: CreateOrder) {
  const [_selectedDevice_, _setSelectedDevice_] = useState<Device | null>(sessionStorage.getItem('_selectedDevice_') ? JSON.parse(sessionStorage.getItem('_selectedDevice_')!) : null)
  const [fullPhoto,  setFullPhoto ] = useDisclosure(false);
  const [photo,  setPhoto ] = useState<string>('');
  const [value, setValue] = useState(props.user.sizeNewOrderForm);

  const [multiOrder, setMultiOrder] = useState(false);

  const newOrderData = () => {
    const orderFields = [...props.comp.fields_ids]
    for(const f of orderFields){
      f['currentData'] = sessionStorage.getItem(f.name) ?? null
    }
    return _selectedDevice_ ? orderFields.filter(f => !_selectedDevice_!.blockFields.includes(f._id)) : orderFields
  }
  const [newOrder, setNewOrder] = useState<Field[]>([])

  const orderCreate = new OrderFactoryClass()

  useEffect(() => {
    if (!_selectedDevice_) return

    const device = _selectedDevice_.name

    const unsubscribe = props.user.onSocketCreateOrder(
      props,
      () => ({
        fields: newOrder
          .filter(n => !n.currentData)
          .filter(n => n.aiVoice)
          .map(n => n.name),

        newOrder
      }),
    device,
    props.leng,
    setNewOrder
  )

  return unsubscribe

}, [_selectedDevice_, newOrder])

  useEffect(() => {
    setNewOrder(newOrderData())
  }, [_selectedDevice_])

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
  const activCreateOrderBut = () => {
   for (const n of newOrder) {
    if(n.mustHave && !n.currentData) {
      return true
    }
   }
   return false
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
    props.setCreateOrder.close()
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
  const analyzPhotos = async () => {
    const device = _selectedDevice_ ? _selectedDevice_.name : 'Device'
    await props.user.analyzPhotos(props, props.photos.filter(n => n.activ).map(n => n.photo), newOrder.filter(n => !n.currentData).filter(n => n.ai).map(n => n.name), device, props.leng, newOrder, setNewOrder)
  }
  const setSIzeForm = (size: number) => {
    setValue(size)
    props.user.updateUser('sizeNewOrderForm', size, props.pickUser, props.setLoginedUsers)
  }
  const sizeElement = () => {
    return marks.find(m => m.value === value)?.label as any
  }
  const marks = [
    { value: 0, label: 'xs' },
    { value: 25, label: 'sm' },
    { value: 50, label: 'md' },
    { value: 75, label: 'lg' },
    { value: 100, label: 'xl' },
  ];
  const aiStatus = (f: Field) => {
    if(f.ai && f.aiVoice && !f.currentData) return <Tooltip label={props.text?.photoOrVoice}><div><Text size={sizeElement()} style={{ lineHeight: 1, whiteSpace: 'nowrap', marginRight: '11px' }}>✨💬</Text></div></Tooltip>
    if(f.ai && !f.currentData) return <Tooltip label={props.text?.photo}><div><Text size={sizeElement()}>✨</Text></div></Tooltip>
    if(f.aiVoice && !f.currentData) return <Tooltip label={props.text?.voice}><div><Text size={sizeElement()}>💬</Text></div></Tooltip>
    if(f.currentData) return <Tooltip label={props.text?.clear}><IconSquareX style={{cursor: 'pointer'}} onClick={() => updateNewOrder(f.name, '')}/></Tooltip>
    return ''
  }

  // console.log('newOrder', newOrder)
 
  return (
    <>
      <Modal opened={props.createOrder} onClose={props.setCreateOrder.close} title={props.text?.newOrder} size="100%">

        <Group justify={"space-between"}>
          <div></div>
          <Slider size={'sm'}
            onChange={(v) => setSIzeForm(v)}
            value={value}
            label={(val) => marks.find((mark) => mark.value === val)!.label}
            step={25}
            marks={marks}
            style={{width: '10%'}}
            styles={{ markLabel: { display: 'none' } }}
            />
        </Group>
        
        <Center>
          <Grid justify="flex-start" align="stretch" w="100%">
            {props.comp.devices_ids.map(d => 
              <Grid.Col key={`Devices-${d._id}`} span={{ base: 4, sm: 1.5}}>
                <Button fullWidth onClick={() => {setAndSaveSelectedDevice(d)}} size={sizeElement()} color={_selectedDevice_?._id == d._id ? 'green' : 'gray'}>{d.name}</Button>
              </Grid.Col>)
            }
          </Grid>
        </Center>
 
        {_selectedDevice_ ?
          <div>
            <Space h='xl'/>
            <Divider my="xs" label={_selectedDevice_ ?_selectedDevice_.name : ''} labelPosition="left" />
            <Center>
              <Grid justify="flex-start" align="stretch" w="100%">
                {newOrder.filter(f => !_selectedDevice_.blockFields.includes(f._id)).map(d => 
                  <Grid.Col key={`Fildes-${d._id}`} span={{ base: 12, sm: 4}}>
                    {d.variants ?
                      <Tooltip label={d.currentData?.toString() ?? ''} disabled={d.currentData ? d.currentData?.toString().length < 25 : true}>
                      <Autocomplete
                      error={d.mustHave && !d.currentData}
                      rightSection={aiStatus(d)} 
                      onChange={(v) => {
                        updateNewOrder(d.name, v)
                        console.log('variants', v)
                      }}
                      label={d.name + (d.onlyNumber ? ' (only numbers)' : '')}
                      value={d.currentData?.toString() ?? ''} 
                      size={sizeElement()} 
                      withAsterisk={d.mustHave}
                      data={['dddd', 'eeee']}/></Tooltip> 
                      :
                      <Tooltip label={d.currentData?.toString() ?? ''} disabled={d.currentData ? d.currentData?.toString().length < 25 : true}>
                      <TextInput
                      error={d.mustHave && !d.currentData}
                      rightSection={aiStatus(d)} 
                      onChange={(v) => updateNewOrder(d.name, v.target.value)} 
                      label={d.name + (d.onlyNumber ? ' (only numbers)' : '')} 
                      value={d.currentData ?? ''} 
                      size={sizeElement()}  
                      withAsterisk={d.mustHave}/></Tooltip>
                    }
                  </Grid.Col>)}
              </Grid> 
            </Center>
            <Space h='md'/>
            <Space h='xs'/>
          </div> : ''}

        {props.photos.length ?
          <div>
            <Divider my="xs" label="Photos" labelPosition="left" />
            <Center> 
              <Group  
                wrap="nowrap"
                >{props.photos.map((p, index) =>
              <div key={index} style={{ position: 'relative', display: 'inline-block' }}>
                <Box pos="relative" w={100} h={100}>
                  <Image
                    style={{ cursor: 'pointer' }}
                    h={100}
                    w={100}
                    fit="cover"
                    radius="md"
                    src={`data:image/jpeg;base64,${p.image}`}
                    onClick={() => showFullPhoto(p.image)}
                  />

                  {!p.activ && (
                    <Overlay
                      onClick={() => showFullPhoto(p.image)}
                      color="#000000"
                      backgroundOpacity={0.85}
                      radius="md"
                      zIndex={1}
                      style={{ cursor: 'pointer' }}
                    />
                  )}

                  <ActionIcon
                    color={p.activ ? "blue" : "green"}
                    variant="filled"
                    size="xs"
                    style={{
                      position: 'absolute',
                      bottom: 6,
                      left: 6,
                      zIndex: 2,
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                       props.setPhotos((prev: {photo: string; activ: boolean}[]) =>
                        prev.map(photo =>
                          photo.photo === p.photo
                            ? { ...photo, activ: !photo.activ }
                            : photo
                        )
                      );
                    }}
                  >
                    {p.activ ? <IconX size={12} /> : <IconLockOpen size={12} />}
                  </ActionIcon>

                  <Tooltip label={props.text?.delete}>
                    <ActionIcon
                      color="red"
                      variant="filled"
                      size="xs"
                      style={{
                        position: 'absolute',
                        bottom: 6,
                        right: 6,
                        zIndex: 2,
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        props.user.deletePhoto({ ...props, deletePhoto: p.photo });
                      }}
                    >
                      <IconX size={12} />
                    </ActionIcon>
                  </Tooltip>
                </Box>
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
            </Center>
          </div> : <Center><Text size="sm" c="dimmed">{_selectedDevice_ ? props.text?.SendPhotoToBot : ''}</Text></Center>}
          
        {_selectedDevice_ ?
          <><Space h='xl'/>
            <Grid justify="flex-start" align="stretch" w="100%">
              <Grid.Col key={'1'} span={{ base: 12, sm: 2}}>
                <Button fullWidth size={sizeElement()} disabled={!props.photos.filter(p => p.activ).length || !newOrder.filter(n => n.ai).filter(n => !n.currentData).map(n => n.name).length} onClick={analyzPhotos}>{props.text?.analyz} ✨</Button>
              </Grid.Col>
              <Grid.Col key={'2'} span={{ base: 12, sm: 2}}>
                <Button fullWidth size={sizeElement()} color="orange" disabled={!props.photos.length} onClick={deeleteAllPhoto}>{props.text?.clear} 🖼</Button>
              </Grid.Col>
              <Grid.Col key={'3'} span={{ base: 12, sm: 4}}>
                <Button  onClick={() => orderCreate.createNewOrder({...props, newOrder, _selectedDevice_})} fullWidth size={sizeElement()} color="green" disabled={activCreateOrderBut()}>{props.text?.createOrder}</Button>
              </Grid.Col>
              <Grid.Col key={'4'} span={{ base: 12, sm: 0.5}}>
                <Tooltip label={props.text?.multiOrder}>
                  <Checkbox checked={multiOrder} onChange={(event) => setMultiOrder(event.currentTarget.checked)}/>
                </Tooltip>
              </Grid.Col>
              <Grid.Col key={'5'} span={{ base: 12, sm: 1.75}}>
                <Button onClick={onClearNewOrder} disabled={!newOrder.some(f => f.currentData !== null)} fullWidth size={sizeElement()} color="red">{props.text?.clear}</Button>
              </Grid.Col>
              <Grid.Col key={'6'} span={{ base: 12, sm: 1.75}}>
                <Button onClick={onCancelNewOrderClose} fullWidth size={sizeElement()} color="red">{props.text?.cancel}</Button>
              </Grid.Col>
            </Grid>
          </> : null}

      </Modal>
    </>
    
  );
}