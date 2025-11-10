import { IconChevronDown, IconFilter, IconHome2, IconSquareRoundedPlus } from '@tabler/icons-react';
import { ActionIcon, Avatar, Box, Burger, Button, Center, Divider, Group, Menu, Modal, Text, TextInput, Tooltip, UnstyledButton } from '@mantine/core';
import classes from './Header.module.css';
import { DashScreenInterface } from '../../mainScreen/Dashboard';
import { useDisclosure } from '@mantine/hooks';
import { NavbarLinkProps } from '../navBar/NavBar';
import { Exit } from '../../../subComponents/exit/Exit';
import { LanguagePicker } from '../../../subComponents/languagePicker/LanguagePicker';
import { ColorShema } from '../../../subComponents/colorShema/ColorShema';

interface HeaderInterface extends DashScreenInterface {
    headerMenuData: {
      link: string,
      label: string,
      links: { name: string, action: () => void }[]
    }[];
    openedBurger: boolean;
    toggle: () => void;
    navBarData: { icon: typeof IconHome2, label: string }[];
    activeNavBar: number;
    setActiveNavBar: (index: number) => void;
}

function NavbarLink({ icon: Icon, label, active, onClick}: NavbarLinkProps) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton onClick={onClick} className={classes.link} data-active={active || undefined}>
        <Icon size={20} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

export function Header(props: HeaderInterface) {
  const [navbarMebu, {open, close} ] = useDisclosure();

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
  const navbarLinks = props.navBarData.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === props.activeNavBar}
      onClick={() => {
        props.setActiveNavBar(index)
        sessionStorage.setItem('activeNavBar', index.toString())
      }}
    />
  ));

  return (
    <Group h="100%" px="sm" justify="space-between">
         <Burger
          onClick={open}
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

        <Avatar radius="sm" alt={props.user.name} size='sm' name={props.user.name} color="initials" hiddenFrom="sm"/>
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
        <Modal radius={'10px'} opened={navbarMebu} title={<Group><ColorShema/><LanguagePicker {...props}/><Exit {...props}/></Group>} withCloseButton={true}
            size={'md'}
            onClose={close}
            >
            <Center style={{marginTop: '1vmax'}}>
              {navbarLinks}
            </Center>
            <Divider/>
            <Center style={{marginTop: '1vmax'}}>
              <Group gap={5}>
                {items}
              </Group>
            </Center>
        </Modal>
    </Group>
  );
}