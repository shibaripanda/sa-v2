import { useEffect, useState } from 'react'
import { UnstyledButton, Menu, Group, ScrollArea } from '@mantine/core'
import { IconChevronDown } from '@tabler/icons-react'
import classes from './LanguagePicker.module.css'
import axios from 'axios'
import { AuthScreenInterface } from '../../authScreen/mainScreen/AuthScreen'

export function LanguagePicker(props: AuthScreenInterface) {
  const [opened, setOpened] = useState(false)
  const [availableLengs, setAvailableLengs] = useState<{index: string; title: string}[]>([])

  useEffect(() => {
    getTextAvailable()
    getTextLib()
  }, [props.text])

  const getTextAvailable = async () => {
    return await axios({
          method: 'POST',
          url: import.meta.env.VITE_API_LINK + '/text/textavailable',
          data: props.leng,
          headers: {},
          timeout: 10000
      })
      .then(async (res) => {
        setAvailableLengs(res.data.lengs)
      })
      .catch((er) => {
          console.log(er)
      })
  }

  const getTextLib = async () => {
    return await axios({
          method: 'POST',
          url: import.meta.env.VITE_API_LINK + '/text/textlib',
          data: props.leng,
          headers: {},
          timeout: 10000
      })
      .then(async (res) => {
        props.setText(res.data.text)
      })
      .catch((er) => {
          console.log(er)
      })
  }

  const items = availableLengs.map((item) => (
    <Menu.Item
      onClick={() => {
          props.setText(item.index)
          sessionStorage.setItem('leng', item.index)
        }
      }
      key={item.index}
    >
      {item.title}
    </Menu.Item>
  ))

  return (
    <Menu
      onOpen={() => setOpened(true)}
      onClose={() => setOpened(false)}
      radius="md"
      width="target"
      withinPortal
    >
      <Menu.Target>
        <ScrollArea>
            <UnstyledButton className={classes.control} data-expanded={opened || undefined}>
            <Group gap="xs">
                <span className={classes.label}>{props.leng}</span>
            </Group>
            <IconChevronDown size="1rem" className={classes.icon} stroke={1.5} />
            </UnstyledButton>
        </ScrollArea>
      </Menu.Target>
      <Menu.Dropdown>{items}</Menu.Dropdown>
    </Menu>
  )
}