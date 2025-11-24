import { Button, Checkbox, Divider, Flex, Grid, Paper, Space, Text, TextInput } from '@mantine/core';
import { MainInterface } from '../../Main';
import { UpdateStringValue } from '../../../../../subComponents/updateStringValue/UpdateStringValue';
// import { TableHistoryLocation } from '.././tableHistoryLocation/TableHistoryLocation';
// import { IconCancel, IconCircleCheck } from '@tabler/icons-react';
import { useState } from 'react';

export function CompSettings(props: MainInterface) {

  const [deleteAccountString, setDeleteAccountString] = useState<string>('')
  const [deleteAccountCheckBox, setDeleteAccountCheckBox] = useState<boolean>(false)

  const warningSize = () => {
      if(deleteAccountCheckBox && deleteAccountString === props.user.name) {
          return 'xl'
      }
      if(deleteAccountString === props.user.name) {
          return 'md'
      }
      return 'xs'
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
            <UpdateStringValue {...props} item="comp" dataName="name" func={props.comp.updateCompany.bind(props.comp)} key={`up1`}/>,
            <Space h="md" key={`up2`}/>,
            <UpdateStringValue {...props} item="comp" dataName="mainOfficeData" func={props.comp.updateCompany.bind(props.comp)} key={`up3`}/>,
            <Space h="md" key={`up4`}/>,
            <UpdateStringValue {...props} item="comp" dataName="mainOfficeContacts" func={props.comp.updateCompany.bind(props.comp)} key={`up5`}/>
          ],
          [
            `${props.user.location} ip: ${props.user.ip}`,
            `${props.text?.sessionwillended}:`,
            props.user.getDateSessionEnd()
          ].map((item, i) => <Text key={`3-${i}`}>{item}</Text>)
        ].map((item, i) => 
          <Grid.Col key={`main-${i}`} span={{ base: 12, sm: 4 }}>
            <Flex direction="column" align="center" justify="center" h="100%">
              {item}
            </Flex>
          </Grid.Col>
        )}
      </Grid>

      {/* <Divider my="lg" label="Google Auth" labelPosition="left" />
      <Grid w="100%" gutter="md">
        {[
          [
            props.user.email ? <IconCircleCheck key='1' size={45} color='green'/> : <IconCancel key='1' size={45} color='red'/>
          ],
          [
            props.user.email ? props.user.email : props.text?.connect,
          ].map((item, i) => <Text key={`2-${i}`}>{item}</Text>),
          // [
          //   props.user.email ? 'Disconect' : 'Connect'
          // ]
        ].map((item, i) => 
          <Grid.Col key={`main-${i}`} span={{ base: 12, sm: 6 }}>
            <Flex direction="column" align="center" justify="center" h="100%">
              {item}
            </Flex>
          </Grid.Col>
        )}
      </Grid>

      <Divider my="lg" label="Telegram Auth" labelPosition="left" />
      <Grid w="100%" gutter="md">
        {[
          [
            props.user.telegramId ? <IconCircleCheck key='1' size={45} color='green'/> : <IconCancel key='1' size={45} color='red'/>
          ],
          [
            props.user.telegramId ? '@' + props.user.telegramUserName || props.user.telegramId : props.text?.connect,
          ].map((item, i) => <Text key={`2-${i}`}>{item}</Text>),
          // [
          //   props.user.telegramId ? 'Disconect' : 'Connect'
          // ]
        ].map((item, i) => 
          <Grid.Col  key={`main-${i}`} span={{ base: 12, sm: 6 }}>
            <Flex direction="column" align="center" justify="center" h="100%">
              {item}
            </Flex>
          </Grid.Col>
        )}
      </Grid>

      <Divider my="lg" label="Sessions" labelPosition="left" />
      <TableHistoryLocation historyLogin={props.user.historyLogin} text={props.text}/>*/}

      <Divider my="lg" label="Delete User" labelPosition="left" />
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
          <Grid.Col  key={`main-${i}`} span={{ base: 12, sm: 2 }}>
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