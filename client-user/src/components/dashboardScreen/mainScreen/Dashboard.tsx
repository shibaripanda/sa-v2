import { AppShell, Burger, Center, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { NavBar } from '../subDashScreen/navBar/NavBar';
import { User } from '../../../interfaces/user';
import { Service } from '../../../interfaces/service';
import { TextLib } from '../../../interfaces/textLib';

export interface DashScreenInterface {
    user: User;
    service: Service;
    pickService: any;
    pickUser: any;
    text: TextLib
    setText: any;
    leng: string;
    setLeng: any;
}

export function Dashboard(props: DashScreenInterface) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
      navbar={{
        width: 80,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
    >
        <AppShell.Header>
            <Group>
                <Burger
                    mt={20}
                    opened={opened}
                    onClick={toggle}
                    hiddenFrom="sm"
                    size="sm"
                />
                {props.user.name} 
                {props.service.name}
            </Group>
        </AppShell.Header>

        <AppShell.Navbar>
            <NavBar {...props}/>
        </AppShell.Navbar>

        <AppShell.Main>
            Main
        </AppShell.Main>

    </AppShell>
  );
}