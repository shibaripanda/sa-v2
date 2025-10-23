import { IconChevronDown, IconFilter, IconSquareRoundedPlus } from '@tabler/icons-react';
import { ActionIcon, Box, Burger, Button, Center, Group, Menu, Text, TextInput } from '@mantine/core';
import classes from './Header.module.css';
import { DashScreenInterface } from '../../mainScreen/Dashboard';

interface HeaderInterface extends DashScreenInterface {
    headerMenuData: {
      link: string,
      label: string,
      links: { name: string, action: () => void }[]
    }[];
    openedBurger: boolean;
    toggle: () => void;
}

export function Header(props: HeaderInterface) {

  const items = props.headerMenuData.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.name} onClick={item.action}>{item.name}</Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu key={link.label} trigger="hover" openDelay={100} closeDelay={400}>
          <Menu.Target>
            <a
              href={link.link}
              className={classes.link}
              onClick={(event) => event.preventDefault()}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size={14} stroke={1.5} />
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <a
        key={link.label}
        href={link.link}
        className={classes.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </a>
    );
  });

  return (
    <Group h="100%" px="sm" justify="space-between">
        <Burger 
            opened={props.openedBurger}
            onClick={props.toggle}
            hiddenFrom="sm"
            lineSize={1}
        />

        <Group gap={25} visibleFrom="sm">
            <Box visibleFrom="sm">
                <Text size='sm'>{props.service.name}</Text>
                <Text size='sm'>{props.user.name}</Text>
            </Box>
            <Button size='xs' visibleFrom="sm" c='green' variant='default'>Создать заказ</Button>
        </Group>

        <ActionIcon
                onClick={() => {}}
                variant="transparent"
                color="green"
                hiddenFrom="sm"
            >
            <IconSquareRoundedPlus stroke={2}/>
        </ActionIcon>

        <TextInput variant="unstyled" placeholder='Поиск заказа'/>
        
        <ActionIcon
            onClick={() => {}}
            variant="transparent"
            color="grey"
            hiddenFrom="sm"
        >
            <IconFilter stroke={2}/>
        </ActionIcon>

        <Group gap={5} visibleFrom="sm">
            {items}
        </Group>
    </Group>
  );
}