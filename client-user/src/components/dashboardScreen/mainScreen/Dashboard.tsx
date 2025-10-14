import { ActionIcon, AppShell, Burger, Button, Center, Group, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { NavBar } from '../subDashScreen/navBar/NavBar';
import { User } from '../../../interfaces/user';
import { Service } from '../../../interfaces/service';
import { TextLib } from '../../../interfaces/textLib';
import { IconLogout } from '@tabler/icons-react';

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
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      padding="md"
      header={{ height: 50 }}
      navbar={{
        width: 50,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
    >
        <AppShell.Header>
            <Group h="100%" px="sm" justify="space-between">
              <Burger
                  opened={opened}
                  onClick={toggle}
                  hiddenFrom="sm"
                  lineSize={1}
                  // size="sm"
              />
              <div>
                <Text size='sm'>{props.service.name}</Text>
                <Text size='sm'>{props.user.name}</Text>
              </div>
              <Button >Создать заказ</Button>
              <ActionIcon
                  onClick={() => {
                      sessionStorage.removeItem('navlink')
                      props.pickService(null)
                      props.pickUser(null)
                  }}
                  variant="transparent"
                  color="grey"
                  aria-label="Toggle color scheme"
              >
                <IconLogout stroke={1.5}/>
              </ActionIcon>
              
                {/* {props.user.name} 
                {props.service.name} */}
            </Group>
        </AppShell.Header>

        {/* <AppShell.Header>
              <Button >Создать заказ</Button>
        </AppShell.Header> */}

        <AppShell.Navbar>
            <NavBar {...props}/>
        </AppShell.Navbar>

        <AppShell.Main>
            Main
        </AppShell.Main>

    </AppShell>
  );
}