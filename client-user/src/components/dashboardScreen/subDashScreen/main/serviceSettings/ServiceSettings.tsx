import { Space } from '@mantine/core';
import { MainInterface } from '../Main';
import { ServSettings } from './servSettings/ServSettings';

export function ServiceSettings(props: MainInterface) {

  console.log(props.service)
  console.log(props.comp)
  console.log(props.user)
  console.log(props.staffUser)
  
  return (
    <>
    <ServSettings {...props}/>
    <Space h='md'/>
    </>
  );
}
