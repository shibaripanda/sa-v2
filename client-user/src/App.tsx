import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import { useState } from "react";
import { User } from "./interfaces/user";
import { AuthScreen } from "./components/authScreen/mainScreen/AuthScreen";
import { TextLib } from "./interfaces/textLib";
import { useDisclosure } from "@mantine/hooks";
import { LoaderModal } from "./components/subComponents/loader/LoaderModal";

export default function App() {

  const [leng, setLeng] = useState<string>(sessionStorage.getItem('leng') ? sessionStorage.getItem('leng')! : window.navigator.language.substring(0,2) ? window.navigator.language.substring(0,2) : 'en')
  const [text, setText] = useState<TextLib | null>(null)
  const [loginedUsers, setLoginedUsers] = useState<User[]>(sessionStorage.getItem('loginedUsers') ? JSON.parse(sessionStorage.getItem('loginedUsers')!) : [])
  const [user, setUser] = useState<User | null>(JSON.parse(sessionStorage.getItem('user')!) ?? null)
  const [activeServiceId, setActiveServiceId] = useState<string>(sessionStorage.getItem('activeServiceId') ?? '')
  const [loadingText, setLoadingText] = useState<string>(text?.loading ?? 'Loading')

  const [loaderShow, setLoaderShow] = useDisclosure(false)
  

  return (
  <MantineProvider theme={theme}>
    {user && activeServiceId ? 
    <div>Dashboard {user?.name}</div> : 
    <AuthScreen
      setLoadingText={setLoadingText}
      setLoaderShow={setLoaderShow}
      setUser={setUser}
      user={user} 
      setLeng={setLeng} 
      leng={leng} 
      text={text} 
      setText={setText} 
      loginedUsers={loginedUsers} 
      setLoginedUsers={setLoginedUsers}
      setActiveServiceId={setActiveServiceId}/>}
    <LoaderModal text={loadingText} loaderShow={loaderShow} setLoaderShow={setLoaderShow}/>
  </MantineProvider>
);
}
