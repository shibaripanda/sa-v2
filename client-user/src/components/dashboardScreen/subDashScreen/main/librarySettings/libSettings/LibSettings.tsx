import { Button, Checkbox, Divider, Flex, Grid, Group, Paper, Space, Text, TextInput } from '@mantine/core';
import { MainInterface } from '../../Main';
import { UpdateStringValue } from '../../../../../subComponents/updateStringValue/UpdateStringValue';
// import { TableHistoryLocation } from '.././tableHistoryLocation/TableHistoryLocation';
// import { IconCancel, IconCircleCheck } from '@tabler/icons-react';
import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { StatusClass } from '../../../../../../classes/StatusClass';
import { buttonColorObj } from '../../../../../subComponents/colorShema/buttonColorObj';
import { DeviceClass } from '../../../../../../classes/DeviceClass';

export function LibSettings(props: MainInterface) {

  const [deleteAccountString, setDeleteAccountString] = useState<string>('')
  const [deleteAccountCheckBox, setDeleteAccountCheckBox] = useState<boolean>(false)
  const [modalStatus, setModalStatus] = useDisclosure(false)
  const [modalStatusLine, setModalStatusLine] = useDisclosure(false)
  const [selectedStatus, setSelectedStatus] = useState<StatusClass | null>(null)

  const [modalDevice, setModalDevice] = useDisclosure(false)
  const [modalDeviceLine, setModalDeviceLine] = useDisclosure(false)
  const [selectedDevice, setSelectedDevice] = useState<DeviceClass | null>(null)

  const warningSize = () => {
      if(deleteAccountCheckBox && deleteAccountString === props.comp.name) {
          return 'xl'
      }
      if(deleteAccountString === props.comp.name) {
          return 'md'
      }
      return 'xs'
  }

  const editDevice = async (device: DeviceClass) => {
    setSelectedDevice(new DeviceClass(device))
    setModalDevice.open()
  }
  const addNewDevice = async () => {
    const res = await props.comp.addNewDevice(props.pickComp)
    console.log(res)
  }


  return (
    <Paper withBorder radius="md" p="xs">
      <Text>{props.text?.docForPrint}</Text>

      <Divider my="lg" label="Devices" labelPosition="left" />
      <Group>
        <Button variant='default' size='xs' onClick={addNewDevice}>{props.text?.addNewDevice}</Button>
        <Button variant='default' size='xs' onClick={setModalDeviceLine.open}>{props.text?.deviceLine}</Button>
      </Group>
      <Space h="xl"/>
      <Grid w="100%" gutter="md">
        {[
          ...props.comp.devices_ids.map((s, i) => <Button style={buttonColorObj(s.color)} key={`device-${i}`} onClick={() => editDevice(s)} size='xs' color='green' w='100px'>{s.name}</Button>)
        ].map((item, i) => 
          // <Grid.Col key={`Devices-${i}`} span={{ base: 12, sm: 12 / props.comp.devices_ids.length }}>
            <Grid.Col key={`Devices-${i}`} span={{ base: 4, sm: 1.5}}>
            <Flex direction="column" align="center" justify="center" h="100%">
              {item}
            </Flex>
          </Grid.Col>
        )}
      </Grid>

    </Paper>
  );
}