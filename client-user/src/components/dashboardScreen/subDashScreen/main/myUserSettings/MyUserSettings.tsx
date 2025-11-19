import { Center, Divider, Group, Space, Text } from '@mantine/core';
import { MainInterface } from '../Main';
import { UpdateStringValue } from '../../../../subComponents/updateStringValue/UpdateStringValue';
import { TableHistoryLocation } from './tableHistoryLocation/TableHistoryLocation';

export function MyUserSettings(props: MainInterface) {

  console.log(props.service)
  console.log(props.comp)
  console.log(props.user)
  console.log(props.staffUser)
  
  return (
    <>
    <Group gap={7} justify='space-between'>
      <Text>{props.user.email}</Text>
      <Text>id: {props.user._id}</Text>
    </Group>

    <Space h={'md'}/>
    <Divider/>
    <Space h={'xl'}/>

    <Group justify='space-between'>
      <div></div>
      <div>
        <UpdateStringValue {...props} dataName={'name'} func={props.user.updateUser.bind(props.user)}/>
        <Space h={'md'}/>
        <UpdateStringValue {...props} dataName={'timeLiveToken'} func={props.user.updateUser.bind(props.user)}/>
      </div>
      <div>
        {[
          `${props.user.location} ip: ${props.user.ip}`,
          `${props.text?.sessionwillended}:`,
          props.user.getDateSessionEnd()
        ].map(item => 
        <Center><Text>{item}</Text></Center>)}
      </div>
      <div></div>
    </Group>

    <Space h={'xl'}/>
    <Divider/>
    <Space h={'xl'}/>

    <TableHistoryLocation historyLogin={props.user.historyLogin} text={props.text}/>
    </>
  );
}
