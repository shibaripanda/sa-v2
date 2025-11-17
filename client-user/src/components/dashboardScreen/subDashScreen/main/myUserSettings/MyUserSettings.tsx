import { Button, Group, Space, Text } from '@mantine/core';
import { MainInterface } from '../Main';
import { UpdateStringValue } from '../../../../subComponents/updateStringValue/UpdateStringValue';

export function MyUserSettings(props: MainInterface) {

  console.log(props.service)
  console.log(props.comp)
  console.log(props.user)
  console.log(props.staffUser)
  
  return (
    <>
    <Group gap={7} justify='space-between'>
      <Button>{props.text?.save}</Button>
      <Text>id: {props.user._id}</Text>
    </Group>

    <Space h={'md'}/>
    <Space h={'md'}/>
    <Space h={'md'}/>
    <UpdateStringValue exist={props.user.name} func={props.user.updateUserName.bind(props.user)} update={props.pickUser} update2={props.setLoginedUsers}/>
    </>
  );
}
