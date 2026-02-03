import { Button, Checkbox, Divider, Flex, Grid, Paper, Space, Text, TextInput } from '@mantine/core';
import { MainInterface } from '../../Main';
import { UpdateStringValue } from '../../../../../subComponents/updateStringValue/UpdateStringValue';
// import { TableHistoryLocation } from '.././tableHistoryLocation/TableHistoryLocation';
// import { IconCancel, IconCircleCheck } from '@tabler/icons-react';
import { useState } from 'react';
// import { TableServices } from '../tableServices/TableServices';
// import { useDisclosure } from '@mantine/hooks';
// import { ModalEditStatus } from '../modalEditStatus/ModalEditStatus';
// import { StatusClass } from '../../../../../../classes/StatusClass';
// import { buttonColorObj } from '../../../../../subComponents/colorShema/buttonColorObj';
// import { ModalEditStatusLine } from '../modalEditStatus/ModalEditStatusLine';
// import { DeviceClass } from '../../../../../../classes/DeviceClass';
// import { ModalEditDevice } from '../modalEditDevice/ModalEditDevice';
// import { ModalEditDeviceLine } from '../modalEditDevice/ModalEditDeviceLine';
// import { FieldClass } from '../../../../../../classes/FieldClass';
// import { ModalEditField } from '../modalEditField/ModalEditField';
// import { ModalEditFieldLine } from '../modalEditField/ModalEditFieldLine';

export function ServSettings(props: MainInterface) {

  const [deleteAccountString, setDeleteAccountString] = useState<string>('')
  const [deleteAccountCheckBox, setDeleteAccountCheckBox] = useState<boolean>(false)

  // const [modalStatus, setModalStatus] = useDisclosure(false)
  // const [modalStatusLine, setModalStatusLine] = useDisclosure(false)
  // const [selectedStatus, setSelectedStatus] = useState<StatusClass | null>(null)

  // const [modalDevice, setModalDevice] = useDisclosure(false)
  // const [modalDeviceLine, setModalDeviceLine] = useDisclosure(false)
  // const [selectedDevice, setSelectedDevice] = useState<DeviceClass | null>(null)

  // const [modalField, setModalField] = useDisclosure(false)
  // const [modalFieldLine, setModalFieldLine] = useDisclosure(false)
  // const [selectedField, setSelectedField] = useState<FieldClass | null>(null)

  const warningSize = () => {
      if(deleteAccountCheckBox && deleteAccountString === props.service.name) {
          return 'xl'
      }
      if(deleteAccountString === props.service.name) {
          return 'md'
      }
      return 'xs'
  }

  // const editDevice = async (device: DeviceClass) => {
  //   setSelectedDevice(new DeviceClass(device))
  //   setModalDevice.open()
  // }
  // const addNewDevice = async () => {
  //   const res = await props.comp.addNewDevice(props.pickComp)
  //   console.log(res)
  // }

  // const editStatus = async (status: StatusClass) => {
  //   setSelectedStatus(new StatusClass(status))
  //   setModalStatus.open()
  // }
  // const addNewStatus = async () => {
  //   const res = await props.comp.addNewStatus(props.pickComp)
  //   console.log(res)
  // }

  // const editField = async (field: FieldClass) => {
  //   setSelectedField(new FieldClass(field))
  //   setModalField.open()
  // }
  // const addNewField = async () => {
  //   const res = await props.comp.addNewField(props.pickComp)
  //   console.log(res)
  // }

  const deleteCompany = async () => {
    props.setLoadingText(props.text?.deleting)
    props.setLoaderShow.open()
    const res = await props.service.deleteService(props.exit)
    if (!res) {
      props.setErrorStatus(true)
      props.setLoadingText(props.text?.itWasErrorLate)
      return
    }
    props.setLoaderShow.close()
  }

  return (
    <Paper withBorder radius="md" p="xs">
      <Text>{props.text?.serviceSettings}</Text>
      
      <Divider my="lg" label="Service" labelPosition="left" />
      <Grid w="100%" gutter="md">
        {[
          [
            `id: ${props.service._id}`
          ].map((item, i) => <Text key={`1-${i}`}>{item}</Text>),
          [
            <UpdateStringValue {...props} item="service" dataName="name" func={props.service.updateService.bind(props.service)}/>
          ],
          [
            <Text c='green'>{props.user._id === props.comp.user_owner_id ? props.text?.youOwner : '--'}</Text>
          ]
        ].map((item, i) => 
          <Grid.Col key={`Service-${i}`} span={{ base: 12, sm: 4 }}>
            <Flex direction="column" align="center" justify="center" h="100%">
              {item}
            </Flex>
          </Grid.Col>
        )}
      </Grid>

      <Divider my="lg" label="Address" labelPosition="left" />
      <Grid w="100%" gutter="md">
        {[
          <UpdateStringValue {...props} item="service" dataName="address" func={props.service.updateService.bind(props.service)}/>
        ].map((item, i) => 
          <Grid.Col key={`Address-${i}`} span={{ base: 12, sm: 12 }}>
            <Flex direction="column" align="center" justify="center" h="100%">
              {item}
            </Flex>
          </Grid.Col>
        )}
      </Grid>

      <Divider my="lg" label="Contacts" labelPosition="left" />
      <Grid w="100%" gutter="md">
        {[
          <UpdateStringValue {...props} item="service" dataName="contacts" func={props.service.updateService.bind(props.service)}/>
        ].map((item, i) => 
          <Grid.Col key={`Contacts-${i}`} span={{ base: 12, sm: 12 }}>
            <Flex direction="column" align="center" justify="center" h="100%">
              {item}
            </Flex>
          </Grid.Col>
        )}
      </Grid>

      <Divider my="lg" label="WorkTime" labelPosition="left" />
      <Grid w="100%" gutter="md">
        {[
          <UpdateStringValue {...props} item="service" dataName="workTime" func={props.service.updateService.bind(props.service)}/>
        ].map((item, i) => 
          <Grid.Col key={`WorkTime-${i}`} span={{ base: 12, sm: 12 }}>
            <Flex direction="column" align="center" justify="center" h="100%">
              {item}
            </Flex>
          </Grid.Col>
        )}
      </Grid>

      <Divider my="lg" label="Delete Service" labelPosition="left" />
      <Grid w="100%" gutter="md">
        {[
          [
            <Text key='a' c='red' size={warningSize()}>W A R N I N G</Text>
          ],
          [
            <Text key='b' size='sm' c={'red'}>{props.text?.step} 1</Text>,
            <Space key='c' h='xs'/>,
            <TextInput key='d' value={deleteAccountString} placeholder={props.text?.serviceName} onChange={(u) => setDeleteAccountString(u.target.value)}/>
          ],
          [
            <Text key='z' size='sm' c={deleteAccountString !== props.service.name ? 'grey' : 'red'}>{props.text?.step} 2</Text>,
            <Space key='x' h='xs'/>,
            <Checkbox key='v' size='md' disabled={deleteAccountString !== props.service.name} color='red' checked={deleteAccountCheckBox} onChange={(event) => setDeleteAccountCheckBox(event.currentTarget.checked)}/>
          ],
          [
            <Text key='n' size='sm' c={!deleteAccountCheckBox || deleteAccountString !== props.service.name ? 'grey' : 'red'}>{props.text?.step} 3</Text>,
            <Space key='m' h='xs'/>,
            <Button key='g' color='red' disabled={!deleteAccountCheckBox || deleteAccountString !== props.service.name}
            onClick={async () => {
              await deleteCompany()
            }}>{props.text?.deleteService}</Button>
          ],
          [
            props.text?.deleteServiceInfo
          ],
          [
            <Text key='j' c='red' size={warningSize()}>W A R N I N G</Text>
          ]
        ].map((item, i) => 
          <Grid.Col  key={`Delete Company-${i}`} span={{ base: 12, sm: 2 }}>
            <Flex direction="column" align="center" justify="center" h="100%">
              {item}
            </Flex>
          </Grid.Col>
        )}
      </Grid> 
      <Space h='md'/>
    </Paper>
  );
}