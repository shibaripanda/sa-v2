import { Space } from '@mantine/core';
import { MainInterface } from '../Main';
import { LibSettings } from './libSettings/LibSettings';

export function LibrarySettings(props: MainInterface) {

  console.log(props.service)
  console.log(props.comp)
  console.log(props.user)
  console.log(props.staffUser)
  
  return (
    <>
    <LibSettings {...props}/>
    <Space h='md'/>
    </>
  );
}
