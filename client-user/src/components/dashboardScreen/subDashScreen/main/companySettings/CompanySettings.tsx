import { Space } from '@mantine/core';
import { MainInterface } from '../Main';
import { CompSettings } from './compSettings/CompSettings';

export function CompanySettings(props: MainInterface) {

  console.log(props.service)
  console.log(props.comp)
  console.log(props.user)
  console.log(props.staffUser)
  
  return (
    <>
    <CompSettings {...props}/>
    <Space h='md'/>
    </>
  );
}
