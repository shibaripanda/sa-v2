import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { NavBar } from '../subDashScreen/navBar/NavBar';
import { User } from '../../../interfaces/user';
import { Service } from '../../../interfaces/service';
import { TextLib } from '../../../interfaces/textLib';
import { IconCalendarStats, IconDeviceDesktopAnalytics, IconFingerprint, IconGauge, IconHome2, IconSettings, IconUser } from '@tabler/icons-react';
import { Header } from '../subDashScreen/header/Header';
import { useEffect, useState } from 'react';
import { Main } from '../subDashScreen/main/Main';
import { useMediaQuery } from '@mantine/hooks'
import { Company } from '../../../interfaces/company';
import { StaffUser } from '../../../interfaces/staffUser';
import { FooterLine } from '../subDashScreen/footer/FooterLine';

// const orderViewVariants = [OrdersList_1.name, OrdersList_2.name, OrdersList_3.name]
const orderViewVariants = ['Varint 1', 'Varint 2', 'Varint 3', 'Varint 4', 'Varint 5', 'Varint 6', 'Varint 7', 'Varint 8', 'Varint 9']

const orders_Test = [
    {
      _id: 'khhMI848yismss23233',
      device_id: '8302_JLA',
      device: 'Ноутбук',
      brend: 'Asus',
      model: 'X550',
      serial_number: 'MSL9779SYEO79FE9FXXL',
      problem: 'Не загружается',
      look: 'бу',
      info: 'установить фотошоп',
      client: {name: 'Аркадий Сумкин', contact: '29 8348304'},
      status: 'new',
    },
    {
      _id: 'khhMI88yisms6s23233',
      device_id: '8302_JLA',
      device: 'Ноутбук',
      brend: 'Asus',
      model: 'X550',
      serial_number: 'MSL9779SYEO79FE9FXXL',
      problem: 'Не загружается',
      look: 'бу',
      info: 'установить фотошоп',
      client: {name: 'Аркадий Сумкин', contact: '29 8348304'},
      status: 'new',
    },
    {
      _id: 'khhMI88yism3ss23233',
      device_id: '8302_JLA',
      device: 'Ноутбук',
      brend: 'Asus',
      model: 'X550',
      serial_number: 'MSL9779SYEO79FE9FXXL',
      problem: 'Не загружается',
      look: 'бу',
      info: 'установить фотошоп',
      client: {name: 'Аркадий Сумкин', contact: '29 8348304'},
      status: 'new',
    },
    {
      _id: 'khhMIfghf88yismss23233',
      device_id: '8302_JLA',
      device: 'Ноутбук',
      brend: 'Asus',
      model: 'X550',
      serial_number: 'MSL9779SYEO79FE9FXXL',
      problem: 'Не загружается',
      look: 'бу',
      info: 'установить фотошоп',
      client: {name: 'Аркадий Сумкин', contact: '29 8348304'},
      status: 'new',
    },
    {
      _id: 'khhMI848ywfsfismss23233',
      device_id: '8302_JLA',
      device: 'Ноутбук',
      brend: 'Asus',
      model: 'X550',
      serial_number: 'MSL9779SYEO79FE9FXXL',
      problem: 'Не загружается',
      look: 'бу',
      info: 'установить фотошоп',
      client: {name: 'Аркадий Сумкин', contact: '29 8348304'},
      status: 'new',
    },
    {
      _id: 'khhMI88yisssfsms6s23233',
      device_id: '8302_JLA',
      device: 'Ноутбук',
      brend: 'Asus',
      model: 'X550',
      serial_number: 'MSL9779SYEO79FE9FXXL',
      problem: 'Не загружается',
      look: 'бу',
      info: 'установить фотошоп',
      client: {name: 'Аркадий Сумкин', contact: '29 8348304'},
      status: 'new',
    },
    {
      _id: 'khhMI88yidgsm3ss23233',
      device_id: '8302_JLA',
      device: 'Ноутбук',
      brend: 'Asus',
      model: 'X550',
      serial_number: 'MSL9779SYEO79FE9FXXL',
      problem: 'Не загружается',
      look: 'бу',
      info: 'установить фотошоп',
      client: {name: 'Аркадий Сумкин', contact: '29 8348304'},
      status: 'new',
    },
    {
      _id: 'khhMI88yismss2323df3',
      device_id: '8302_JLA',
      device: 'Ноутбук',
      brend: 'Asus',
      model: 'X550',
      serial_number: 'MSL9779SYEO79FE9FXXL',
      problem: 'Не загружается',
      look: 'бу',
      info: 'установить фотошоп',
      client: {name: 'Аркадий Сумкин', contact: '29 8348304'},
      status: 'new',
    },
];
const navBarData_Test = [
    { icon: IconHome2, label: 'Home' },
    { icon: IconGauge, label: 'Dashboard' },
    { icon: IconDeviceDesktopAnalytics, label: 'Analytics' },
    { icon: IconCalendarStats, label: 'Releases' },
    { icon: IconUser, label: 'Account' },
    { icon: IconFingerprint, label: 'Security' },
    { icon: IconSettings, label: 'Settings' },
];

type DropHeadMenu = 
  {
    link: string;
    label: string;
    links: {
        name: string;
        action: () => void;
    }[];
}[]

export interface Order {
  _id: string;
  device_id: string;
  device: string;
  brend: string;
  model: string;
  serial_number: string;
  problem: string;
  look: string;
  info: string;
  client: {name:  string; contact:  string};
  status: string;
}

export interface DashScreenInterface {
    user: User;
    service: Service;
    comp: Company;
    staffUser: StaffUser;
    pickService: any;
    pickUser: any;
    text: TextLib | null;
    setText: any;
    leng: string;
    setLeng: any;
}

export function Dashboard(props: DashScreenInterface) {
  const isMobile = useMediaQuery('(max-width: 48em)')
  const [openedBurgerMainMenu, toggleOpenedBurgerMainMenu ] = useDisclosure();
  const [activeNavBar, setActiveNavBar] = useState(sessionStorage.getItem('activeNavBar') ? Number(sessionStorage.getItem('activeNavBar')) : 0);

  const [orders, setOrders] = useState<Order[]>(orders_Test)
  const [navBarData, setnavBarData] = useState(navBarData_Test)
  const [headerMenuData, setHeaderMenuData] = useState<DropHeadMenu>([])

  const [activOrderView, setActivOrderView] = useState(0)

  const headerMenuData_Test = [
    {
      link: '#1',
      label: 'Orders view',
      links: orderViewVariants.map((v, index) => ({name: activOrderView === index ? v + ' *' : v, action: () => setActivOrderView(index)}))
    },
  ];

  console.log(props.service)
  console.log(props.comp)
  console.log(props.user)
  console.log(props.staffUser)

  useEffect(() => {
    setHeaderMenuData(headerMenuData_Test)
  }, [activOrderView])

  return (
    <AppShell
      padding="15px"
      header={{ height: 45 }}
      footer={{ height: 30 }}
      navbar={{
        width: 50,
        breakpoint: 'sm',
        collapsed: { mobile: !openedBurgerMainMenu },
      }}
    >
        <AppShell.Header>
            <Header {...props} 
            headerMenuData={headerMenuData} 
            openedBurger={openedBurgerMainMenu} 
            toggle={toggleOpenedBurgerMainMenu.toggle}
            navBarData={navBarData} 
            activeNavBar={activeNavBar} 
            setActiveNavBar={setActiveNavBar}
            />
        </AppShell.Header>

        <AppShell.Navbar>
            <NavBar {...props} 
            navBarData={navBarData} 
            activeNavBar={activeNavBar} 
            setActiveNavBar={setActiveNavBar}
            />
        </AppShell.Navbar>

        <AppShell.Main>
            <Main {...props}
            activeNavBar={activeNavBar} 
            orders={orders} 
            orderView={orderViewVariants[activOrderView]} 
            isMobile={isMobile}
            />
        </AppShell.Main>

        <AppShell.Footer>
            <FooterLine {...props} 
            orders={orders}
            />
        </AppShell.Footer>

    </AppShell>
  );
}