import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import { useEffect, useState } from "react";
import { User } from "./interfaces/user";
import { AuthScreen } from "./components/authScreen/mainScreen/AuthScreen";

export default function App() {

  const [loginedUsers, setLoginedUsers] = useState<User[]>(sessionStorage.getItem('loginedUsers') ? JSON.parse(sessionStorage.getItem('loginedUsers')!) : [])
  const [activeUserId, setActivUserId] = useState<string>(sessionStorage.getItem('activeUserId') ?? '')
  const [activeServiceId, setActiveServiceId] = useState<string>(sessionStorage.getItem('activeServiceId') ?? 'fgg')
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    if(activeUserId && loginedUsers) {
      const user = loginedUsers.find(user => user._id === activeUserId)
      setUser(user ? user : null)
    }
  }, [activeUserId])

  return (
  <MantineProvider theme={theme}>
    {activeUserId && activeServiceId ? 
    <div>Dashboard {user?.name}</div> : 
    <AuthScreen loginedUsers={loginedUsers} setLoginedUsers={setLoginedUsers} setActivUserId={setActivUserId} setActiveServiceId={setActiveServiceId}/>}
  </MantineProvider>
);
}
