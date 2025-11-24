import { Group, Text, TextInput, Tooltip } from '@mantine/core';
import { IconCancel, IconCircleCheck, IconDeviceFloppy, IconEdit } from '@tabler/icons-react';
import { useState } from 'react';
import { MainInterface } from '../../dashboardScreen/subDashScreen/main/Main';
import { UserClass } from '../../../classes/UserClass';
import { StaffUserClass } from '../../../classes/StaffUserClass';
import { ServiceClass } from '../../../classes/ServiceClass';
import { CompanyClass } from '../../../classes/CompanyClass';

type ItemMap = {
  user: UserClass;
  staffUser: StaffUserClass;
  service: ServiceClass;
  comp: CompanyClass;
};

type StringKeys<T> = {
  [K in keyof T]: T[K] extends string ? K : never
}[keyof T];

interface UpdateStringValue<T extends keyof ItemMap> extends MainInterface {
  item: T;
  dataName: StringKeys<ItemMap[T]>;
  func: any;
}

type Step =  0 | 1 | 2

export function UpdateStringValue<T extends keyof ItemMap>(props: UpdateStringValue<T>) {

  const [value, setNewValue] = useState<string>('')
  const [step, setStep] = useState<Step>(0)

  const key = props.item
  const itemObj: ItemMap[T] = props[key]

  const examples = () => {
    if(props.dataName === 'timeLiveToken') {
      return (
        <Text size='sm'>{props.text?.examples}: 24h, 12h, 1h, 100h ...</Text>
      )
    }
    if(props.dataName === 'name') {
      return (
        <Text size='sm'>{props.text?.examples}: Tom Smith, Anne Smile ...</Text>
      )
    }
  }
  const valid = () => {
    if(props.dataName === 'timeLiveToken') {
      return /^[1-9][0-9]*h$/.test(value)
    }
    if(props.dataName === 'name') {
      return /^[\p{L}\p{N} ]+$/u.test(value)
    }
    return value
  }

  const updateItem = () => {
    if (props.item === 'user') return props.pickUser
    if (props.item === 'comp') return props.pickComp
    if (props.item === 'staffUser') return props.pickStaffUser
    if (props.item === 'service') return props.pickService
  }

  const defaultItem = () => {
    return (
      <Group gap={7} align="flex-start">
        <Tooltip fz="xs" label={props.text?.edit} position="top" transitionProps={{ duration: 0 }}>
          <IconEdit size={20} color='red'style={{ cursor: 'pointer' }} onClick={() => setStep(2)}/>
        </Tooltip>
        <Text>{itemObj[props.dataName] as unknown as string}</Text>
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
        <Text>{itemObj[props.dataName] as unknown as string}</Text>
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
              const res = await props.func(props.dataName, value, updateItem(), props.setLoginedUsers)
              if(!res) {
                props.setErrorStatus(true)
                props.setLoadingText(props.text?.itWasErrorLate)
                return
              }
              props.setLoaderShow.close()
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
          placeholder={itemObj[props.dataName] as unknown as string}
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