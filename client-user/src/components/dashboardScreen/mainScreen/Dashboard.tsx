import { AppShell, Center, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { NavBar } from '../subDashScreen/navBar/NavBar';
import { User } from '../../../interfaces/user';
import { Service } from '../../../interfaces/service';
import { TextLib } from '../../../interfaces/textLib';
import { IconCalendarStats, IconDeviceDesktopAnalytics, IconFingerprint, IconGauge, IconHome2, IconSettings, IconUser } from '@tabler/icons-react';
import { Header } from '../subDashScreen/header/Header';
import { useEffect, useState } from 'react';
import { Main } from '../subDashScreen/main/Main';
import { OrdersList_1 } from '../subDashScreen/main/orders/ordersListsVariants/ordersListVariant-1/OrdersList_1';
import { OrdersList_2 } from '../subDashScreen/main/orders/ordersListsVariants/ordersListVariant-2/OrdersList_2';
import { useMediaQuery } from '@mantine/hooks'

const orderViewVariants = [OrdersList_1.name, OrdersList_2.name]

 const orders_Test = [
    {
      name: 'Athena Weissnat',
      company: 'Little - Rippin',
      email: 'Elouise.Prohaska@yahoo.com',
    },
    {
      name: 'Deangelo Runolfsson',
      company: 'Greenfelder - Krajcik',
      email: 'Kadin_Trantow87@yahoo.com',
    },
    {
      name: 'Danny Carter',
      company: 'Kohler and Sons',
      email: 'Marina3@hotmail.com',
    },
    {
      name: 'Trace Tremblay PhD',
      company: 'Crona, Aufderhar and Senger',
      email: 'Antonina.Pouros@yahoo.com',
    },
    {
      name: 'Derek Dibbert',
      company: 'Gottlieb LLC',
      email: 'Abagail29@hotmail.com',
    },
    {
      name: 'Viola Bernhard',
      company: 'Funk, Rohan and Kreiger',
      email: 'Jamie23@hotmail.com',
    },
    {
      name: 'Austin Jacobi',
      company: 'Botsford - Corwin',
      email: 'Genesis42@yahoo.com',
    },
    {
      name: 'Hershel Mosciski',
      company: 'Okuneva, Farrell and Kilback',
      email: 'Idella.Stehr28@yahoo.com',
    },
    {
      name: 'Mylene Ebert',
      company: 'Kirlin and Sons',
      email: 'Hildegard17@hotmail.com',
    },
    {
      name: 'Lou Trantow',
      company: 'Parisian - Lemke',
      email: 'Hillard.Barrows1@hotmail.com',
    },
    {
      name: 'Dariana Weimann',
      company: 'Schowalter - Donnelly',
      email: 'Colleen80@gmail.com',
    },
    {
      name: 'Dr. Christy Herman',
      company: 'VonRueden - Labadie',
      email: 'Lilyan98@gmail.com',
    },
    {
      name: 'Katelin Schuster',
      company: 'Jacobson - Smitham',
      email: 'Erich_Brekke76@gmail.com',
    },
    {
      name: 'Melyna Macejkovic',
      company: 'Schuster LLC',
      email: 'Kylee4@yahoo.com',
    },
    {
      name: 'Pinkie Rice',
      company: 'Wolf, Trantow and Zulauf',
      email: 'Fiona.Kutch@hotmail.com',
    },
    {
      name: 'Brain Kreiger',
      company: 'Lueilwitz Group',
      email: 'Rico98@hotmail.com',
    },
    {
      name: 'Myrtice McGlynn',
      company: 'Feest, Beahan and Johnston',
      email: 'Julius_Tremblay29@hotmail.com',
    },
    {
      name: 'Chester Carter PhD',
      company: 'Gaylord - Labadie',
      email: 'Jensen_McKenzie@hotmail.com',
    },
    {
      name: 'Mrs. Ericka Bahringer',
      company: 'Conn and Sons',
      email: 'Lisandro56@hotmail.com',
    },
    {
      name: 'Korbin Buckridge Sr.',
      company: 'Mraz, Rolfson and Predovic',
      email: 'Leatha9@yahoo.com',
    },
    {
      name: 'Dr. Daisy Becker',
      company: 'Carter - Mueller',
      email: 'Keaton_Sanford27@gmail.com',
    },
    {
      name: 'Derrick Buckridge Sr.',
      company: "O'Reilly LLC",
      email: 'Kay83@yahoo.com',
    },
    {
      name: 'Ernie Hickle',
      company: "Terry, O'Reilly and Farrell",
      email: 'Americo.Leffler89@gmail.com',
    },
    {
      name: 'Jewell Littel',
      company: "O'Connell Group",
      email: 'Hester.Hettinger9@hotmail.com',
    },
    {
      name: 'Cyrus Howell',
      company: 'Windler, Yost and Fadel',
      email: 'Rick0@gmail.com',
    },
    {
      name: 'Dr. Orie Jast',
      company: 'Hilll - Pacocha',
      email: 'Anna56@hotmail.com',
    },
    {
      name: 'Luisa Murphy',
      company: 'Turner and Sons',
      email: 'Christine32@yahoo.com',
    },
    {
      name: 'Lea Witting',
      company: 'Hodkiewicz Inc',
      email: 'Ford_Kovacek4@yahoo.com',
    },
    {
      name: 'Kelli Runolfsson',
      company: "Feest - O'Hara",
      email: 'Dimitri87@yahoo.com',
    },
    {
      name: 'Brook Gaylord',
      company: 'Conn, Huel and Nader',
      email: 'Immanuel77@gmail.com',
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


export interface DashScreenInterface {
    user: User;
    service: Service;
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

  const [orders, setOrders] = useState(orders_Test)
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

  useEffect(() => {
    setHeaderMenuData(headerMenuData_Test)
  }, [activOrderView])

  useEffect(() => {
    setOrders(orders_Test)
    setnavBarData(navBarData_Test)
  }, [])

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
            <Header {...props} headerMenuData={headerMenuData} openedBurger={openedBurgerMainMenu} toggle={toggleOpenedBurgerMainMenu.toggle}/>
        </AppShell.Header>

        <AppShell.Navbar>
            <NavBar {...props} navBarData={navBarData} activeNavBar={activeNavBar} setActiveNavBar={setActiveNavBar}/>
        </AppShell.Navbar>

        <AppShell.Main>
            <Main {...props} orders={orders} orderView={orderViewVariants[activOrderView]} isMobile={isMobile}/>
        </AppShell.Main>

        <AppShell.Footer>
            <Center>
              <Group justify="space-between">
                <div>{props.user?.email}</div>
                <div>{orders.length}</div>
              </Group>
            </Center>
        </AppShell.Footer>

    </AppShell>
  );
}