import { ActionIcon, AppShell, Burger, Button, Group, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { NavBar } from '../subDashScreen/navBar/NavBar';
import { User } from '../../../interfaces/user';
import { Service } from '../../../interfaces/service';
import { TextLib } from '../../../interfaces/textLib';
import { IconFilter, IconSquareRoundedPlus } from '@tabler/icons-react';

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
              <Group hiddenFrom="sm">
                <ActionIcon
                    onClick={() => {}}
                    variant="transparent"
                    color="grey"
                    aria-label="Toggle color scheme"
                >
                  <IconSquareRoundedPlus stroke={2}/>
                </ActionIcon>
                <ActionIcon
                    onClick={() => {}}
                    variant="transparent"
                    color="grey"
                    aria-label="Toggle color scheme"
                >
                  <IconFilter stroke={2}/>
                </ActionIcon>
              </Group>
              <Group visibleFrom="sm">
                <Button variant='default'>Создать заказ</Button>
                <Button variant='default'>Фильтр</Button>
              </Group>
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