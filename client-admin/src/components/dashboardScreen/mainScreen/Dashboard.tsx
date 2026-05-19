import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { NavBar } from '../subDashScreen/navBar/NavBar';
import { TextLib } from '../../../interfaces/textLib';
import { IconBuilding, IconDashboard, IconUser } from '@tabler/icons-react';
import { Header } from '../subDashScreen/header/Header';
import { useEffect, useState } from 'react';
import { Main } from '../subDashScreen/main/Main';
import { useMediaQuery } from '@mantine/hooks'
import { FooterLine } from '../subDashScreen/footer/FooterLine';
import { UserClass } from '../../../classes/UserClass';
import { socket } from '../../../utils/socket';
import { User } from '../../../interfaces/user';
import { Company } from '../../../interfaces/company';

const navBarData_Test = [
    { icon: IconDashboard, label: 'DashboardScreen' },
    { icon: IconUser, label: 'Users' },
    { icon: IconBuilding, label: 'Companies' },
    // { icon: IconBuildingCastle, label: 'Company settings' },
    // { icon: IconMapPin, label: 'Service settings' },
    // { icon: IconCircles, label: 'Roles settings' },
    // { icon: IconBook, label: 'Library' },
    // { icon: IconBuildingWarehouse, label: 'Warehouse' },
    // { icon: IconBuildingStore, label: 'Supplier' },
];

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
    user: UserClass;
    pickUser: any;
    text: TextLib | null;
    setText: any;
    leng: string;
    setLeng: any;
    setLoginedUsers: any;
    setLoadingText: any;
    setLoaderShow: any;
    setErrorStatus: any;
    exit: any;
}

export interface UsersAdminPagination {
  items: User[];
  meta: {
    limit: number;
    page: number;
    total: number;
    totalPages: number;
  }
}

export interface CompaniesAdminPagination {
  items: Company[];
  meta: {
    limit: number;
    page: number;
    total: number;
    totalPages: number;
  }
}

export function Dashboard(props: DashScreenInterface) {
  
  const isMobile = useMediaQuery('(max-width: 48em)')
  const [openedBurgerMainMenu, toggleOpenedBurgerMainMenu ] = useDisclosure();
  const [activeNavBar, setActiveNavBar] = useState(sessionStorage.getItem('activeNavBar') ? Number(sessionStorage.getItem('activeNavBar')) : 0);
  const [navBarData, setNavBarData] = useState(navBarData_Test)

  const [users, setUsers] = useState<UsersAdminPagination>({ items: [], meta: { limit: 100, page: 1, total: 0, totalPages: 0 } });
  const [companies, setCompanies] = useState<CompaniesAdminPagination>({ items: [], meta: { limit: 100, page: 1, total: 0, totalPages: 0 } });

  useEffect(() => {
    const onConnect = () => {
      console.log("connected", socket.id);
    };

    const onDisconnect = (reason: string) => {
      console.log("disconnected", reason);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  useEffect(() => {
    const token = props.user.token || '';

    if (token) {
      socket.auth = { token };

      if (!socket.connected) {
        socket.connect();
      }

      return;
    }
  }, [])

  useEffect(() => {
    setNavBarData(navBarData_Test)
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
            <Header {...props}
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
            companies={companies} setCompanies={setCompanies}
            users={users} setUsers={setUsers}
            navBarData={navBarData}
            activeNavBar={activeNavBar} 
            isMobile={isMobile}
            />
        </AppShell.Main>

        <AppShell.Footer>
            <FooterLine {...props}
            />
        </AppShell.Footer>

    </AppShell>
  );
}