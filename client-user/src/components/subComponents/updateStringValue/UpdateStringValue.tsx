import { Group, Text, TextInput, Tooltip } from '@mantine/core';
import { IconCancel, IconCircleCheck, IconDeviceFloppy, IconEdit } from '@tabler/icons-react';
import { useState } from 'react';
import { MainInterface } from '../../dashboardScreen/subDashScreen/main/Main';

interface UpdateStringValue extends MainInterface {
  edited: string;
}

type Step =  0 | 1 | 2

export function UpdateStringValue(props: {exist: string; func: any, update: any, update2: any}) {

  const [value, setNewValue] = useState<string>('')
  const [step, setStep] = useState<Step>(0)

  const defaultItem = () => {
    return (
      <Group gap={7} align="flex-start">
        <Text>{props.exist}</Text>
        <Tooltip label={'Edit'} position="top" transitionProps={{ duration: 0 }}>
          <IconEdit size={20} color='red'style={{ cursor: 'pointer' }} onClick={() => setStep(2)}/>
        </Tooltip>
      </Group>
    )
  }
  const updatedtItem = () => {
    return (
      <Group gap={7} align="flex-start">
      <IconCircleCheck size={20} color='green'/>
      <Text>{props.exist}</Text>
      <Tooltip label={'Edit'} position="top" transitionProps={{ duration: 0 }}>
        <IconEdit size={20} color='red'style={{ cursor: 'pointer' }} onClick={() => setStep(2)}/>
      </Tooltip>
    </Group>
    )
  }
  const editedtItem = () => {
    return (
      <Group gap={7} align="center">
        <Tooltip label={'Cancel'} position="top" transitionProps={{ duration: 0 }}>
          <IconCancel size={20} color='red'style={{ cursor: 'pointer' }}
          onClick={() => {
            setNewValue('')
            setStep(0)
          }}
          />
        </Tooltip>
        <Tooltip label={value ? 'Save' : 'Empty'} position="top" transitionProps={{ duration: 0 }}>
          <IconDeviceFloppy size={20} color={value ? 'red' : 'grey'} style={{ cursor: 'pointer' }} 
          onClick={async () => {
            if(value) {
              const res = await props.func(value, props.update, props.update2)
              // props.update(res)
              // console.log(res)
              if(res) setStep(1)
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
          placeholder={props.exist}
          autoFocus
        />
      </Group>
    )
  }

  return (
    <>
      {[defaultItem, updatedtItem, editedtItem][step]()}
    </>
  );
}