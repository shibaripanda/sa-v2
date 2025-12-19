import { useEffect, useState } from 'react'
import { Popover, Grid, ActionIcon } from '@mantine/core'
import { IconWorld } from '@tabler/icons-react'
import classes from './LanguagePicker.module.css'
import axios from 'axios'
import { TextLib } from '../../../interfaces/textLib'

export function LanguagePicker(props: {leng: string; setText: any; setLeng: any; text: TextLib | null}) {
  const [opened, setOpened] = useState(false)
  const [availableLengs, setAvailableLengs] = useState<{index: string; title: string}[]>([])

  useEffect(() => {
      getTextAvailable()
      getTextLib()
  }, [props.leng])

  const getTextAvailable = async () => {
    return await axios({
          method: 'POST',
          url: import.meta.env.VITE_API_LINK + '/text/textavailable',
          data: {},
          headers: {},
          timeout: 10000
      })
      .then(async (res) => {
        setAvailableLengs(res.data)
      })
      .catch((er) => {
          console.log(er)
      })
  }

  const getTextLib = async () => {
    return await axios({
          method: 'POST',
          url: import.meta.env.VITE_API_LINK + '/text/textlib',
          data: {leng: props.leng},
          headers: {},
          timeout: 10000
      })
      .then(async (res) => {
        sessionStorage.setItem('text', JSON.stringify(res.data))
        props.setText(res.data)
      })
      .catch((er) => {
          console.log(er)
      })
  }

  const items = availableLengs.map((item) => (
    <span className={item.index === props.leng ? classes.activeLabel : classes.label} onClick={() => {
          props.setLeng(item.index)
          sessionStorage.setItem('leng', item.index)
          setOpened((o) => !o)
        }
      }
      key={item.index}>{item.title}</span>
  ))

  return (
    <Popover width={500} position="bottom" withArrow shadow="md" opened={opened} onChange={setOpened}>
      <Popover.Target>
          <ActionIcon  onClick={() => {setOpened((o) => !o)}}
          variant="transparent"
          color="grey"
          ><IconWorld stroke={1.5} /></ActionIcon>
      </Popover.Target>
      <Popover.Dropdown>
        <Grid>
          {items.map((l, index) => <Grid.Col key={index} span={4}>{l}</Grid.Col>)}
        </Grid>
      </Popover.Dropdown>
    </Popover>
  )
}