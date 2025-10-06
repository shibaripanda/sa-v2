import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import { useEffect, useState } from "react";
import { User } from "./interfaces/user";
import { AuthScreen } from "./components/authScreen/mainScreen/AuthScreen";
import { TextLib } from "./interfaces/textLib";

export default function App() {

  const [leng, setLeng] = useState<string>(window.navigator.language.substring(0,2) ? window.navigator.language.substring(0,2) : 'en')
  const [text, setText] = useState<TextLib | null>(null)

  const [loginedUsers, setLoginedUsers] = useState<User[]>(sessionStorage.getItem('loginedUsers') ? JSON.parse(sessionStorage.getItem('loginedUsers')!) : [])
  const [activeUserId, setActivUserId] = useState<string>(sessionStorage.getItem('activeUserId') ?? '')
  const [user, setUser] = useState<User | null>(null)

  const [activeServiceId, setActiveServiceId] = useState<string>(sessionStorage.getItem('activeServiceId') ?? '')
  

  useEffect(() => {
    if(activeUserId && loginedUsers) {
      const user = loginedUsers.find(user => user._id === activeUserId)
      setUser(user ? user : null)
    }
  }, [activeUserId])

  useEffect(() => {
    if(sessionStorage.getItem('leng')) {
      setLeng(sessionStorage.getItem('leng') as string)
    }
  }, [])

  return (
  <MantineProvider theme={theme}>
    {activeUserId && activeServiceId ? 
    <div>Dashboard {user?.name}</div> : 
    <AuthScreen
      user={user} 
      setLeng={setLeng} 
      leng={leng} 
      text={text} 
      setText={setText} 
      loginedUsers={loginedUsers} 
      setLoginedUsers={setLoginedUsers} 
      setActivUserId={setActivUserId} 
      setActiveServiceId={setActiveServiceId}/>}
  </MantineProvider>
);
}
