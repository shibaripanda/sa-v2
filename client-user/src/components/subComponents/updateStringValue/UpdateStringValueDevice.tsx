import { Group, Text, TextInput, Tooltip } from '@mantine/core';
import { IconCancel, IconCircleCheck, IconDeviceFloppy, IconEdit } from '@tabler/icons-react';
import { useState } from 'react';
import { MainInterface } from '../../dashboardScreen/subDashScreen/main/Main';
import { DeviceClass } from '../../../classes/DeviceClass';

type StringKeys<T> = {
  [K in keyof T]: T[K] extends string | number ? K : never
}[keyof T];

interface UpdateStringValueDevice extends MainInterface {
  device: DeviceClass;
  dataName: StringKeys<DeviceClass>;
  func: any;
  setSelectedDevice: any;
}

type Step =  0 | 1 | 2

export function UpdateStringValueDevice(props: UpdateStringValueDevice) {

  const [value, setNewValue] = useState<string>('')
  const [step, setStep] = useState<Step>(0)

  const examples = () => {
    if(props.dataName === 'name') {
      return (
        <Text size='sm'>{props.text?.examples}: Tom Smith, Anne Smile ...</Text>
      )
    }
  }
  const valid = () => {
    if(props.dataName === 'name') {
      return /^[\p{L}\p{N} ]+$/u.test(value)
    }
    return value
  }

  const defaultItem = () => {
    return (
      <Group gap={7} align="flex-start">
        <Tooltip fz="xs" label={props.text?.edit} position="top" transitionProps={{ duration: 0 }}>
          <IconEdit size={20} color='red'style={{ cursor: 'pointer' }} onClick={() => setStep(2)}/>
        </Tooltip>
        <Text>{props.device[props.dataName] as unknown as string}</Text>
      </Group>
    )
  }
  const updatedtItem = () => {
    return (
      <Group gap={7} align="flex-start">
     
      <Tooltip fz="xs" label={props.text?.edit} position="top" transitionProps={{ duration: 0 }}>
        <IconEdit size={20} color='red'style={{ cursor: 'pointer' }} onClick={() => setStep(2)}/>
      </Tooltip>
        <IconCircleCheck size={20} color='green'/>
        <Text>{props.device[props.dataName] as unknown as string}</Text>
    </Group>
    )
  }
  const editedtItem = () => {
    return (
      <>
      <Group gap={7} align="center">
        <Tooltip fz="xs" label={props.text?.cancel} position="top" transitionProps={{ duration: 0 }}>
          <IconCancel size={20} color='red'style={{ cursor: 'pointer' }}
          onClick={() => {
            setNewValue('')
            setStep(0)
          }}
          />
        </Tooltip>
        <Tooltip fz="xs" label={valid() ? props.text?.save : props.text?.empty + ' / ' + props.text?.badsimvols} position="top" transitionProps={{ duration: 0 }}>
          <IconDeviceFloppy size={20} color={valid() ? 'red' : 'grey'} style={{ cursor: 'pointer' }} 
          onClick={async () => {
            if(valid()) {
              props.setLoadingText(props.text?.updatingData)
              props.setLoaderShow.open()
              const res = await props.func(props.device._id, props.dataName, value, props.comp, props.pickComp)
              if(!res) {
                props.setErrorStatus(true)
                props.setLoadingText(props.text?.itWasErrorLate)
                return
              }
              props.setLoaderShow.close()
              props.setSelectedDevice(new DeviceClass(res))
              setStep(1)
            }
          }}
        />
        </Tooltip>
        <TextInput
          onChange={(v) => {
            console.log(value)
            setNewValue(v.target.value)
          }}
        value={value}
        variant="unstyled"
          placeholder={props.device[props.dataName] as unknown as string}
          autoFocus
        />
      </Group>
      {examples()}
      </>
    )
  }

  return (
    <>
      {[defaultItem, updatedtItem, editedtItem][step]()}
    </>
  );
}