import { Space } from '@mantine/core';
import { MainInterface } from '../Main';
import { ServSettings } from './servSettings/ServSettings';

export function ServiceSettings(props: MainInterface) {

  console.log('ServiceSettings', props)
  
  return (
    <>
    <ServSettings {...props}/>
    <Space h='md'/>
    </>
  );
}
