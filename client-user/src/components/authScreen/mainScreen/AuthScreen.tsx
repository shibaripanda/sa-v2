import { useState } from 'react'
import {
    Checkbox,
    Grid,
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
import { IconBrandGoogle } from '@tabler/icons-react';

export interface AuthScreenInterface {
  loginedUsers: User[];
  setLoginedUsers: any;
  setActivUserId: any;
  setActiveServiceId: any;
}

  export function AuthScreen(props: AuthScreenInterface) {

    const [agreement, setAgreement] = useState(false)

    // const modalBlock = () => {
    //   if(sessionStorage.getItem('currentUser')){
        
    //     return <ServiceModal 
    //     authClass={props.authClass} 
    //     text={props.text} 
    //     leng={props.leng} 
    //     opened={opened} 
    //     close={close}
    //     // @ts-ignore
    //     user={JSON.parse(sessionStorage.getItem('currentUser'))}
    //     />
    //   }
    // }

    return (
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_TOKEN}>
      <div className={classes.wrapper}  style={{ backgroundImage: `url(${mainPic}` }}>
        <Paper className={classes.form} p={30}>

          <Grid justify="space-between" align="center">
            <Grid.Col span={11}>
              {/* <LanguagePicker avLeng={props.avLeng} setLeng={props.setLeng} leng={props.leng}/> */}
            </Grid.Col>
            <Grid.Col span={1}>
              <ColorShema/>
            </Grid.Col>
          </Grid>
            
          <Title order={3} className={classes.title} ta="center" mt="md" mb={50}>
            Welcom
          </Title>
          {/* 🚀 */}
          <ActivUsersBlock {...props}/>
          <Grid justify="space-between" align="center">
          <Grid.Col span={6}><GoogleButton {...props} title={'Google'} agreement={agreement} setAgreement={setAgreement}/></Grid.Col>
          <Grid.Col span={6}><TelegramButton {...props} title={'Telegram'} agreement={agreement} setAgreement={setAgreement}/></Grid.Col>
          </Grid>
          <Space h='md'/>
          <Checkbox
            checked={agreement}
            color='grey'
            onChange={(event) => setAgreement(event.currentTarget.checked)}
          />

        </Paper>
        {/* {modalBlock()} */}
      </div>
      </GoogleOAuthProvider>
    )
  }