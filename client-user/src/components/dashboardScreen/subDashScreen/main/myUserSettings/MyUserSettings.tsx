import { Space } from '@mantine/core';
import { MainInterface } from '../Main';
import { UserSettings } from './userSettings/UserSettings';
import { StaffUserSettings } from './userSettings/StaffUserSettings';

export function MyUserSettings(props: MainInterface) {

  console.log(props.service)
  console.log(props.comp)
  console.log(props.user)
  console.log(props.staffUser)
  
  return (
    <>
    <StaffUserSettings {...props}/>
    <Space h='md'/>
    <UserSettings {...props}/>
    </>
  );
}
