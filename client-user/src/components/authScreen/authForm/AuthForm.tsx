import { useState } from 'react'
import {
  Button,
    Checkbox,
    Grid,
    Paper,
    Space,
    Title,
  } from '@mantine/core';
import classes from './AuthForm.module.css'
import mainPic from '../../../images/mainpic.png'
import { ColorShema } from '../../miniComponents/ColorShema.tsx';
import { GoogleButton } from './GoogleButton.tsx';
import { User } from '../../../interfaces/user.ts';
import { googleLogout } from '@react-oauth/google';

interface AuthFormInterface {
  loginedUsers: User[];
  setLoginedUsers: any;
  setActivUserId: any;
}

  export function AuthForm({loginedUsers, setLoginedUsers, setActivUserId}: AuthFormInterface) {

    const [agreement, setAgreement] = useState(false)


    const usersBlock = () => {
      if(loginedUsers.length)
        return (
          <div>
          {loginedUsers.map(item => <Button
            key={item._id}
            color='green'
            fullWidth
            mt="xl"
            size="md"
            onClick={async () => {
              setActivUserId(item._id)
              sessionStorage.setItem('activeUserId', item._id)
              // open()
            }}
            >
            {item.name ? item.name : item.email}
          </Button>)}
          <Button
            color='red'
            fullWidth
            mt="xl"
            size="md"
            onClick={async () => {
              sessionStorage.clear()
              setLoginedUsers([])
              setActivUserId('')
              googleLogout()
            }}
            >
            Выходj
          </Button>
          <Space h='lg'/>
          <hr></hr>
          </div>

          )
    }
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
            {usersBlock()}
            <GoogleButton title='Google Login' agreement={agreement} setLoginedUsers={setLoginedUsers} setAgreement={setAgreement}/>
            <Space h='md'/>
            <Checkbox
            checked={agreement}
            color='grey'
            onChange={(event) => setAgreement(event.currentTarget.checked)}
            />
        </Paper>
        {/* {modalBlock()} */}
      </div>
    )
  }