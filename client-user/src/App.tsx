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
import { UserClass } from "./classes/UserClass";
import { StaffUserClass } from "./classes/StaffUserClass";
import { CompanyClass } from "./classes/CompanyClass";
import { ServiceClass } from "./classes/ServiceClass";

export default function App() {

  const [leng, setLeng] = useState<string>(sessionStorage.getItem('leng') ?? window.navigator.language.substring(0,2) ?? 'en')
  const [text, setText] = useState<TextLib | null>(JSON.parse(sessionStorage.getItem('text')!) ?? null)
  const [loginedUsers, setLoginedUsers] = useState<User[]>(JSON.parse(sessionStorage.getItem('loginedUsers')!) ?? [])

  const [user, setUser] = useState<UserClass | null>(sessionStorage.getItem('user') ? new UserClass(JSON.parse(sessionStorage.getItem('user')!)) : null)
  const [service, setService] = useState<ServiceClass | null>(sessionStorage.getItem('service') ? new ServiceClass(JSON.parse(sessionStorage.getItem('service')!)) : null)

  const [staffUser, setStaffUser] = useState<StaffUserClass | null>(sessionStorage.getItem('staffUser') ? new StaffUserClass(JSON.parse(sessionStorage.getItem('staffUser')!)) : null)
  const [comp, setComp] = useState<CompanyClass | null>(sessionStorage.getItem('comp') ? new CompanyClass(JSON.parse(sessionStorage.getItem('comp')!)) : null)

  const [loadingText, setLoadingText] = useState<string>(text?.loading ?? 'Loading')
  const [loaderShow, setLoaderShow] = useDisclosure(false)
  const [errorStatus, setErrorStatus] = useState<boolean>(false)

  const onIdle = () => {
    console.log('onIdle')
    if(service && loginedUsers.length > 1) {
      pickService(null)
      pickUser(null)
      pickStaffUser(null)
      pickComp(null)
    }
  };

  useIdleTimer({ timeout: 1000 * 5, onIdle });

  const pickStaffUser = (staffUser: StaffUser | null) => {
    if(staffUser) sessionStorage.setItem('staffUser', JSON.stringify(staffUser))
    else sessionStorage.removeItem('staffUser')
    setStaffUser(staffUser && new StaffUserClass(staffUser))
  }
  const pickComp = (comp: Company | null) => {
    if(comp) sessionStorage.setItem('comp', JSON.stringify(comp))
    else sessionStorage.removeItem('comp')
    setComp(comp && new CompanyClass(comp))
  }
  const pickService = (service: Service | null) => {
    if(service) sessionStorage.setItem('service', JSON.stringify(service))
    else sessionStorage.removeItem('service')
    setService(service && new ServiceClass(service))
  }
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
    pickStaffUser(null)
    pickComp(null)
    pickService(null)
    pickUser(null)
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
        pickStaffUser={pickStaffUser}
        pickComp={pickComp}
        text={text}
        setText={setText}
        leng={leng}
        setLeng={setLeng}
        setLoginedUsers={setLoginedUsers}
        setLoadingText={setLoadingText}
        setLoaderShow={setLoaderShow}
        setErrorStatus={setErrorStatus}
        exit={exit}/>
      )
    }
    else{
      return (
        <AuthScreen
        setLoadingText={setLoadingText}
        setErrorStatus={setErrorStatus}
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
    <LoaderModal text={loadingText} loaderShow={loaderShow} setLoaderShow={setLoaderShow} errorStatus={errorStatus} setErrorStatus={setErrorStatus}/>
  </MantineProvider>
);
}
