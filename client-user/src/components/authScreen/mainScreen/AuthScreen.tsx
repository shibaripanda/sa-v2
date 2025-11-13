import { useState } from 'react'
import {
    Checkbox,
    Grid,
    Group,
    Paper,
    Space,
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
}

  export function AuthScreen(props: AuthScreenInterface) {

    const [agreement, setAgreement] = useState(false)
    const [serviseModal, setServiseModal] = useDisclosure(false)

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
          <Checkbox
          checked={agreement}
          color='grey'
          onChange={(event) => setAgreement(event.currentTarget.checked)}
          />
          <Grid justify="space-between" align="center">
            <Grid.Col span={6}><GoogleButton {...props} setServiseModal={setServiseModal} title={'Google'} agreement={agreement} setAgreement={setAgreement}/></Grid.Col>
            <Grid.Col span={6}><TelegramButton {...props} setServiseModal={setServiseModal} title={'Telegram'} agreement={agreement} setAgreement={setAgreement}/></Grid.Col>
          </Grid>

        </Paper>
      </div>
      <ServiceModal {...props} serviseModal={serviseModal} setServiseModal={setServiseModal}/>
      </GoogleOAuthProvider>
    )
  }