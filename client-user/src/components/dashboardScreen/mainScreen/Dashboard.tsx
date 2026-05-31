import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { NavBar } from '../subDashScreen/navBar/NavBar';
import { TextLib } from '../../../interfaces/textLib';
import { Header } from '../subDashScreen/header/Header';
import { useEffect, useState } from 'react';
import { Main } from '../subDashScreen/main/Main';
import { useMediaQuery } from '@mantine/hooks'
// import { FooterLine } from '../subDashScreen/footer/FooterLine';
import { UserClass } from '../../../classes/UserClass';
import { CompanyClass } from '../../../classes/CompanyClass';
import { ServiceClass } from '../../../classes/ServiceClass';
import { StaffUserClass } from '../../../classes/StaffUserClass';
import { socket } from '../../../utils/socket';
import { OrderFactoryClass, OrderPagination } from '../../../classes/OrderFactoryClass';
import { DefaultDataClass } from '../../../classes/DefaultDataClass';

type DropHeadMenu = 
  {
    link: string;
    label: string;
    links: {
        name: string;
        action: () => void;
    }[];
}[]

export type Photos = {photo: string; image: any; activ: boolean}[]

export interface DashScreenInterface {
    user: UserClass;
    service: ServiceClass;
    comp: CompanyClass;
    staffUser: StaffUserClass;
    pickService: any;
    pickUser: any;
    pickStaffUser: any;
    pickComp: any;
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

export function Dashboard(props: DashScreenInterface) {

  const defaultData = new DefaultDataClass()

  // console.log('Dashboard', props)
  
  const isMobile = useMediaQuery('(max-width: 48em)')
  const [openedBurgerMainMenu, toggleOpenedBurgerMainMenu ] = useDisclosure();
  const [activeNavBar, setActiveNavBar] = useState(defaultData.activeNavBarDefault);
  const [activOrderView, setActivOrderView] = useState(defaultData.activOrderViewDefault)

  const [navBarData, setNavBarData] = useState(defaultData.navBarDataDefault)
  const [headerMenuData, setHeaderMenuData] = useState<DropHeadMenu>([])

  const [orders, setOrders] = useState<OrderPagination>(defaultData.ordersDefault)
  const [photos, setPhotos] = useState<Photos>([])

  const headerMenuData_Test = [
    {
      link: '#1',
      label: 'Orders view',
      links: defaultData.orderViewVariantsDefault().map((v, index) => ({name: activOrderView === index ? v + ' *' : v, action: () => setActivOrderView(index)}))
    },
  ];

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
      props.user.onSocket({...props, photos, setPhotos })
      props.user.getImages({...props, photos, setPhotos })

      return;
    }
  }, [props.user.token])

  useEffect(() => {
    const orderFactory = new OrderFactoryClass();
    orderFactory.getOrders(props, orders, setOrders);
    setNavBarData(defaultData.navBarDataDefault)
  }, [])

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
            photos={photos}
            setPhotos={setPhotos}
            setOrders={setOrders}
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
            setOrders={setOrders} 
            orderView={defaultData.orderViewVariantsDefault()[activOrderView]} 
            isMobile={isMobile}
            />
        </AppShell.Main>

        <AppShell.Footer>
            {/* <FooterLine {...props} 
            orders={orders}?
            /> */}
        </AppShell.Footer>

    </AppShell>
  );
}