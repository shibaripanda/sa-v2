import { useState } from 'react'
import {
    Checkbox,
    Grid,
    Group,
    Paper,
    Space,
    Stack,
    Tabs,
    Text,
    Title,
  } from '@mantine/core';
import classes from './AuthScreen.module.css'
import mainPic from '../../../images/mainpic.png'
import { ColorShema } from '../../subComponents/colorShema/ColorShema.tsx';
import { GoogleButton } from '../subAuthScreen/GoogleButton.tsx';
import { ActivUsersBlock } from '../subAuthScreen/ActivUsersBlock.tsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { User } from '../../../interfaces/user.ts';
import { TelegramButton } from '../subAuthScreen/TelegramButton.tsx';
import { LanguagePicker } from '../../subComponents/languagePicker/LanguagePicker.tsx';
import { TextLib } from '../../../interfaces/textLib.ts';
import { useDisclosure } from '@mantine/hooks';
import { ServiceModal } from '../subAuthScreen/ServiceModal.tsx';
import { UserClass } from '../../../classes/UserClass.ts';

export interface AuthScreenInterface {
  user: UserClass | null;
  loginedUsers: User[];
  setLoginedUsers: any;
  pickService: any;
  pickStaffUser: any;
  pickComp: any;
  text: TextLib | null;
  setText: any;
  leng: string;
  setLeng: any;
  pickUser: any;
  setLoaderShow: any;
  setLoadingText: any;
  setErrorStatus: any;
  onIdleTime: number;
  setOnIdleTime: any;
}

  export function AuthScreen(props: AuthScreenInterface) {

    const [agreement, setAgreement] = useState(false)
    const [serviseModal, setServiseModal] = useDisclosure(false)
    const [activeTab, setActiveTab] = useState<string | null>('enter');

    const loginPanel = (panel: string) => {    
      return (
        <Stack gap="lg">
          <TelegramButton {...props} activeTab={panel} setServiseModal={setServiseModal} title={'Telegram'} agreement={agreement} setAgreement={setAgreement}/>
          <GoogleButton {...props} activeTab={panel} setServiseModal={setServiseModal} title={'Google'} agreement={agreement} setAgreement={setAgreement}/>
        </Stack>
      )
    }

    return (
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_TOKEN}>
      <div className={classes.wrapper}  style={{ backgroundImage: `url(${mainPic}` }}>
        <Paper className={classes.form} p={30}>
          <Group justify="space-between">
            <ColorShema/>
            <LanguagePicker {...props}/>
          </Group>
            
          <Title order={3} className={classes.title} ta="center" mt="md" mb={25}>
            {props.text?.hello}
          </Title>
          <ActivUsersBlock {...props} setServiseModal={setServiseModal}/>
          
          <Space h='md'/>
          
          <Tabs color="green"  defaultValue="enter" value={activeTab} onChange={setActiveTab}>

            <Tabs.List>
              <Tabs.Tab value="enter">
                <Text size='sm' fw={700} c={activeTab === 'enter' ? undefined : "dimmed"}>Вход</Text>
              </Tabs.Tab>
              <Tabs.Tab value="reg">
                <Text size='sm' fw={700} c={activeTab === 'reg' ? undefined : "dimmed"}>Регистрация</Text>
              </Tabs.Tab>
            </Tabs.List>

            <Space h='xl'/>

            <Tabs.Panel value="enter">
              {loginPanel("enter")}
            </Tabs.Panel>

            <Tabs.Panel value="reg">
              {loginPanel("reg")}
            </Tabs.Panel>

          </Tabs>

          <Space h='xl'/>

          <Checkbox
            checked={agreement}
            color='grey'
            onChange={(event) => setAgreement(event.currentTarget.checked)}
          />
          
        </Paper>
      </div>
      <ServiceModal {...props} serviseModal={serviseModal} setServiseModal={setServiseModal}/>
      </GoogleOAuthProvider>
    )
  }