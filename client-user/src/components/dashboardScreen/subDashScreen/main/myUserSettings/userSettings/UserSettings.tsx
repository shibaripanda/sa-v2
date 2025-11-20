import { Button, Checkbox, Divider, Flex, Grid, Paper, Space, Text, TextInput } from '@mantine/core';
import { MainInterface } from '../../Main';
import { UpdateStringValue } from '../../../../../subComponents/updateStringValue/UpdateStringValue';
import { TableHistoryLocation } from '.././tableHistoryLocation/TableHistoryLocation';
import { IconCancel, IconCircleCheck } from '@tabler/icons-react';
import { useState } from 'react';

export function UserSettings(props: MainInterface) {

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

  return (
    <Paper withBorder radius="md" p="xs">
      <Text>User Settings</Text>

      <Divider my="lg" label="User" labelPosition="left" />
      <Grid w="100%" gutter="md">
        {[
          [
            `id: ${props.user._id}`
          ].map((item, i) => <Text key={`1-${i}`}>{item}</Text>),
          [
            <UpdateStringValue {...props} dataName="name" func={props.user.updateUser.bind(props.user)} key={`up1`}/>,
            <Space h="md" key={`up2`}/>,
            <UpdateStringValue {...props} dataName="timeLiveToken" func={props.user.updateUser.bind(props.user)} key={`up3`}/>
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

      <Divider my="lg" label="Google Auth" labelPosition="left" />
      <Grid w="100%" gutter="md">
        {[
          [
            props.user.email ? <IconCircleCheck key='1' size={45} color='green'/> : <IconCancel key='1' size={45} color='red'/>
          ],
          [
            props.user.email ? props.user.email : 'Connect',
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
            props.user.telegramId ? '@' + props.user.telegramUserName || props.user.telegramId : 'Connect',
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
      <TableHistoryLocation historyLogin={props.user.historyLogin} text={props.text}/>

      <Divider my="lg" label="Delete User" labelPosition="left" />
      <Grid w="100%" gutter="md">
        {[
          [
            <Text c='red' size={warningSize()}>Warning</Text>
          ],
          [
            <Text size='sm' c={'red'}>Step 1</Text>,
            <Space h='xs'/>,
            <TextInput value={deleteAccountString} placeholder='Print your name for delete' onChange={(u) => setDeleteAccountString(u.target.value)}/>
          ],
          [
            <Text size='sm' c={deleteAccountString !== props.user.name ? 'grey' : 'red'}>Step 2</Text>,
            <Space h='xs'/>,
            <Checkbox size='md' disabled={deleteAccountString !== props.user.name} color='red' checked={deleteAccountCheckBox} onChange={(event) => setDeleteAccountCheckBox(event.currentTarget.checked)}/>
          ],
          [
            <Text size='sm' c={!deleteAccountCheckBox || deleteAccountString !== props.user.name ? 'grey' : 'red'}>Step 3</Text>,
            <Space h='xs'/>,
            <Button color='red' disabled={!deleteAccountCheckBox || deleteAccountString !== props.user.name}>Delete account</Button>
          ],
          [
            'Безвозвратное удаление'
          ],
          [
            <Text c='red' size={warningSize()}>Warning</Text>
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