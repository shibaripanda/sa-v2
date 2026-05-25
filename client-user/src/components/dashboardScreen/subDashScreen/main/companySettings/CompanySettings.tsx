import { Space } from '@mantine/core';
import { MainInterface } from '../Main';
import { CompSettings } from './compSettings/CompSettings';

export function CompanySettings(props: MainInterface) {

  console.log('CompanySettings', props)
  
  return (
    <>
    <CompSettings {...props}/>
    <Space h='md'/>
    </>
  );
}
