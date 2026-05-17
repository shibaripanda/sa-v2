import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import { useState } from "react";
import { User } from "./interfaces/user";
import { AuthScreen } from "./components/authScreen/mainScreen/AuthScreen";
import { TextLib } from "./interfaces/textLib";
import { useDisclosure } from "@mantine/hooks";
import { LoaderModal } from "./components/subComponents/loader/LoaderModal";
import { useIdleTimer } from 'react-idle-timer';
import { Dashboard } from "./components/dashboardScreen/mainScreen/Dashboard";
import { UserClass } from "./classes/UserClass";

export default function App() {

  const [leng, setLeng] = useState<string>(sessionStorage.getItem('leng') ?? window.navigator.language.substring(0,2) ?? 'en')
  const [text, setText] = useState<TextLib | null>(JSON.parse(sessionStorage.getItem('text')!) ?? null)
  const [loginedUsers, setLoginedUsers] = useState<User[]>(JSON.parse(sessionStorage.getItem('loginedUsers')!) ?? [])

  const [user, setUser] = useState<UserClass | null>(sessionStorage.getItem('user') ? new UserClass(JSON.parse(sessionStorage.getItem('user')!)) : null)

  const [loadingText, setLoadingText] = useState<string>(text?.loading ?? 'Loading')
  const [loaderShow, setLoaderShow] = useDisclosure(false)
  const [errorStatus, setErrorStatus] = useState<boolean>(false)

  const [onIdleTime, setOnIdleTime] = useState<number>(sessionStorage.getItem('onIdleTime') ? Number(sessionStorage.getItem('onIdleTime'))! : 5)

  const onIdle = () => {
    console.log('onIdle')
    if(loginedUsers.length > 1) {
      pickUser(null)
    }
  };

  useIdleTimer({ timeout: 60000 * onIdleTime, onIdle });

  const pickUser = (user: User | null) => {
    if(user) {
      sessionStorage.setItem('user', JSON.stringify(user))
      sessionStorage.setItem('token', user.token)
    }
    else{
      sessionStorage.removeItem('user')
      sessionStorage.removeItem('token')
    } 
    setUser(user && new UserClass(user))
  }

  const exit = () => {
    pickUser(null)
  }

  const screenActiv = () => {
    if(user) {
      return (
        <Dashboard
        user={user}
        pickUser={pickUser}
        text={text}
        setText={setText}
        leng={leng}
        setLeng={setLeng}
        setLoginedUsers={setLoginedUsers}
        setLoadingText={setLoadingText}
        setLoaderShow={setLoaderShow}
        setErrorStatus={setErrorStatus}
        exit={exit}
        />
      )
    }
    else{
      return (
        <AuthScreen
        setLoadingText={setLoadingText}
        setErrorStatus={setErrorStatus}
        setLoaderShow={setLoaderShow}
        pickUser={pickUser}
        user={user} 
        setLeng={setLeng} 
        leng={leng} 
        text={text} 
        setText={setText} 
        loginedUsers={loginedUsers} 
        setLoginedUsers={setLoginedUsers}
        onIdleTime={onIdleTime}
        setOnIdleTime={setOnIdleTime}
        />
      )
    }
  }
  
  return (
  <MantineProvider theme={theme}>
    {screenActiv()}
    <LoaderModal text={loadingText} loaderShow={loaderShow} setLoaderShow={setLoaderShow} errorStatus={errorStatus} setErrorStatus={setErrorStatus}/>
  </MantineProvider>
);
}
