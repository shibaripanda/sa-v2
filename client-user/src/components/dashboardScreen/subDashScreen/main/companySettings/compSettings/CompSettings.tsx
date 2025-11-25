import { Button, Checkbox, Divider, Flex, Grid, Paper, Space, Text, TextInput } from '@mantine/core';
import { MainInterface } from '../../Main';
import { UpdateStringValue } from '../../../../../subComponents/updateStringValue/UpdateStringValue';
// import { TableHistoryLocation } from '.././tableHistoryLocation/TableHistoryLocation';
// import { IconCancel, IconCircleCheck } from '@tabler/icons-react';
import { useState } from 'react';
import { TableServices } from '../tableServices/TableServices';
import { useDisclosure } from '@mantine/hooks';
import { ModalEditStatus } from '../modalEditStatus/ModalEditStatus';
import { StatusClass } from '../../../../../../classes/StatusClass';

export function CompSettings(props: MainInterface) {

  const [deleteAccountString, setDeleteAccountString] = useState<string>('')
  const [deleteAccountCheckBox, setDeleteAccountCheckBox] = useState<boolean>(false)
  const [modalStatus, setModalStatus] = useDisclosure(false)
  const [selectedStatus, setSelectedStatus] = useState<StatusClass | null>(null)

  const warningSize = () => {
      if(deleteAccountCheckBox && deleteAccountString === props.user.name) {
          return 'xl'
      }
      if(deleteAccountString === props.user.name) {
          return 'md'
      }
      return 'xs'
  }
  const editStatus = async (status: StatusClass) => {
    setSelectedStatus(status)
    setModalStatus.open()
  }
  const addNewStatus = async () => {
    const res = await props.comp.addNewStatus(props.pickComp)
    console.log(res)
  }

  // const deleteAccount = async () => {
  //   props.setLoadingText(props.text?.deleting)
  //   props.setLoaderShow.open()
  //   const res = await props.user.deleteAccount(props.exit, props.setLoginedUsers)
  //   if (!res) {
  //     props.setErrorStatus(true)
  //     props.setLoadingText(props.text?.itWasErrorLate)
  //     return
  //   }
  //   props.setLoaderShow.close()
  // }

  return (
    <Paper withBorder radius="md" p="xs">
      <Text>{'Настройки компании'}</Text>

      <Divider my="lg" label="Company" labelPosition="left" />
      <Grid w="100%" gutter="md">
        {[
          [
            `id: ${props.comp._id}`
          ].map((item, i) => <Text key={`1-${i}`}>{item}</Text>),
          [
            <UpdateStringValue {...props} item="comp" dataName="name" func={props.comp.updateCompany.bind(props.comp)}/>
          ],
          [
            <Text c='green'>{props.user._id === props.comp.user_owner_id ? props.text?.youOwner : '--'}</Text>
          ]
        ].map((item, i) => 
          <Grid.Col key={`Company-${i}`} span={{ base: 12, sm: 4 }}>
            <Flex direction="column" align="center" justify="center" h="100%">
              {item}
            </Flex>
          </Grid.Col>
        )}
      </Grid>

      <Divider my="lg" label="Info" labelPosition="left" />
      <Grid w="100%" gutter="md">
        {[
          <UpdateStringValue {...props} item="comp" dataName="mainOfficeData" func={props.comp.updateCompany.bind(props.comp)}/>
        ].map((item, i) => 
          <Grid.Col key={`Info-${i}`} span={{ base: 12, sm: 12 }}>
            <Flex direction="column" align="center" justify="center" h="100%">
              {item}
            </Flex>
          </Grid.Col>
        )}
      </Grid>

      <Divider my="lg" label="Contacts" labelPosition="left" />
      <Grid w="100%" gutter="md">
        {[
          <UpdateStringValue {...props} item="comp" dataName="mainOfficeContacts" func={props.comp.updateCompany.bind(props.comp)}/>
        ].map((item, i) => 
          <Grid.Col key={`Contacts-${i}`} span={{ base: 12, sm: 12 }}>
            <Flex direction="column" align="center" justify="center" h="100%">
              {item}
            </Flex>
          </Grid.Col>
        )}
      </Grid>

      <Divider my="lg" label="Taxes" labelPosition="left" />
      <Grid w="100%" gutter="md">
        {[
          [
            <Text>Налог %</Text>,
            <Space h="xs"/>,
            <UpdateStringValue {...props} item="comp" dataName="defaulTaxProcent" func={props.comp.updateCompany.bind(props.comp)}/>
          ],
          [
            <Text>Наценка на запчасти %</Text>,
            <Space h="xs"/>,
            <UpdateStringValue {...props} item="comp" dataName="defaultProfitPartProcent" func={props.comp.updateCompany.bind(props.comp)}/>
          ]
        ].map((item, i) => 
          <Grid.Col key={`Taxes-${i}`} span={{ base: 12, sm: 6 }}>
            <Flex direction="column" align="center" justify="center" h="100%">
              {item}
            </Flex>
          </Grid.Col>
        )}
      </Grid>

      <Divider my="lg" label="Statuses" labelPosition="left" />
      <Grid w="100%" gutter="md">
        {[
          ...props.comp.statuses_ids.map((s, i) => <Button key={`status-${i}`} onClick={() => editStatus(s)} size='xs' color='green' w='100px'>{s.name}</Button>)
        ].map((item, i) => 
          <Grid.Col key={`Statuses-${i}`} span={{ base: 12, sm: 12 / props.comp.statuses_ids.length }}>
            <Flex direction="column" align="center" justify="center" h="100%">
              {item}
            </Flex>
          </Grid.Col>
        )}
      </Grid>
      <Space h="xl"/>
      <Button variant='default' size='xs' onClick={addNewStatus}>Add new Status</Button>
      <ModalEditStatus selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} modalStatus={modalStatus} setModalStatus={setModalStatus}/>

      <Divider my="lg" label="Services" labelPosition="left" />
      <TableServices services={props.comp.services_ids} text={props.text}/>

      <Divider my="lg" label="Delete Company" labelPosition="left" />
      <Grid w="100%" gutter="md">
        {[
          [
            <Text key='a' c='red' size={warningSize()}>W A R N I N G</Text>
          ],
          [
            <Text key='b' size='sm' c={'red'}>{props.text?.step} 1</Text>,
            <Space key='c' h='xs'/>,
            <TextInput key='d' value={deleteAccountString} placeholder={props.text?.yourname} onChange={(u) => setDeleteAccountString(u.target.value)}/>
          ],
          [
            <Text key='z' size='sm' c={deleteAccountString !== props.user.name ? 'grey' : 'red'}>{props.text?.step} 2</Text>,
            <Space key='x' h='xs'/>,
            <Checkbox key='v' size='md' disabled={deleteAccountString !== props.user.name} color='red' checked={deleteAccountCheckBox} onChange={(event) => setDeleteAccountCheckBox(event.currentTarget.checked)}/>
          ],
          [
            <Text key='n' size='sm' c={!deleteAccountCheckBox || deleteAccountString !== props.user.name ? 'grey' : 'red'}>{props.text?.step} 3</Text>,
            <Space key='m' h='xs'/>,
            <Button key='g' color='red' disabled={!deleteAccountCheckBox || deleteAccountString !== props.user.name}
            onClick={async () => {
              // await deleteAccount()
            }}>{props.text?.deleteaccount}</Button>
          ],
          [
            props.text?.deleteaccountInfo
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