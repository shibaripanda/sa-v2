import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import AuthScreen from "./components/authScreen/AuthScreen";
import { useState } from "react";
import { User } from "./interfaces/user";

export default function App() {

  const [loginedUsers, setLoginedUsers] = useState<User[]>(sessionStorage.getItem('loginedUsers') ? JSON.parse(sessionStorage.getItem('loginedUsers')!) : [])
  const [activeUserId, setActivUserId] = useState<string>(sessionStorage.getItem('activeUserId') ?? '')
  const [activeServiceId, setActiveServiceId] = useState<string>(sessionStorage.getItem('activeServiceId') ?? '')

  return (
  <MantineProvider theme={theme}>
    <AuthScreen loginedUsers={loginedUsers} setLoginedUsers={setLoginedUsers} setActivUserId={setActivUserId}/>
  </MantineProvider>
);
}
