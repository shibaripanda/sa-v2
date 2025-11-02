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
import { Service } from "./interfaces/service";
import { Dashboard } from "./components/dashboardScreen/mainScreen/Dashboard";
import { StaffUser } from "./interfaces/staffUser";
import { Company } from "./interfaces/company";

export default function App() {

  const [leng, setLeng] = useState<string>(sessionStorage.getItem('leng') ?? window.navigator.language.substring(0,2) ?? 'en')
  const [text, setText] = useState<TextLib | null>(JSON.parse(sessionStorage.getItem('text')!) ?? null)
  const [loginedUsers, setLoginedUsers] = useState<User[]>(JSON.parse(sessionStorage.getItem('loginedUsers')!) ?? [])

  const [user, setUser] = useState<User | null>(JSON.parse(sessionStorage.getItem('user')!) ?? null)
  const [service, setService] = useState<Service | null>(JSON.parse(sessionStorage.getItem('service')!) ?? null)

  const [staffUser, setStaffUser] = useState<StaffUser | null>(JSON.parse(sessionStorage.getItem('staffUser')!) ?? null)
  const [comp, setComp] = useState<Company | null>(JSON.parse(sessionStorage.getItem('comp')!) ?? null)

  const [loadingText, setLoadingText] = useState<string>(text?.loading ?? 'Loading')
  const [loaderShow, setLoaderShow] = useDisclosure(false)

  const onIdle = () => {
    console.log('sss')
    if(service && loginedUsers.length > 1) {
      pickService(null)
      pickUser(null)
    }
  };

  useIdleTimer({ timeout: 1000 * 5, onIdle });

  const pickStaffUser = (staffUser: StaffUser | null) => {
    if(staffUser) sessionStorage.setItem('staffUser', JSON.stringify(staffUser))
    else sessionStorage.removeItem('staffUser')
    setStaffUser(staffUser)
  }
  const pickComp = (comp: Company | null) => {
    if(comp) sessionStorage.setItem('comp', JSON.stringify(comp))
    else sessionStorage.removeItem('comp')
    setComp(comp)
  }
  const pickService = (service: Service | null) => {
    if(service) sessionStorage.setItem('service', JSON.stringify(service))
    else sessionStorage.removeItem('service')
    setService(service)
  }
  const pickUser = (user: User | null) => {
    if(user) sessionStorage.setItem('user', JSON.stringify(user))
    else sessionStorage.removeItem('user')
    setUser(user)
  }
  
  const screenActiv = () => {
    if(user && service && comp && staffUser) {
      return (
        <Dashboard
        user={user}
        service={service}
        comp={comp}
        staffUser={staffUser}
        pickService={pickService}
        pickUser={pickUser}
        text={text}
        setText={setText}
        leng={leng}
        setLeng={setLeng}
        />
      )
    }
    else{
      return (
        <AuthScreen
        setLoadingText={setLoadingText}
        setLoaderShow={setLoaderShow}
        pickUser={pickUser}
        pickStaffUser={pickStaffUser}
        pickComp={pickComp}
        user={user} 
        setLeng={setLeng} 
        leng={leng} 
        text={text} 
        setText={setText} 
        loginedUsers={loginedUsers} 
        setLoginedUsers={setLoginedUsers}
        pickService={pickService}/>
      )
    }
  }
  
  return (
  <MantineProvider theme={theme}>
    {screenActiv()}
    <LoaderModal text={loadingText} loaderShow={loaderShow} setLoaderShow={setLoaderShow}/>
  </MantineProvider>
);
}
