import { IconHome2, IconLogout } from '@tabler/icons-react';
import { ActionIcon, Center, Divider, Stack, Tooltip, UnstyledButton } from '@mantine/core';
import classes from './NavBar.module.css';
import { LanguagePicker } from '../../../subComponents/languagePicker/LanguagePicker';
import { ColorShema } from '../../../subComponents/colorShema/ColorShema';
import { DashScreenInterface } from '../../mainScreen/Dashboard';
import { Exit } from '../../../subComponents/exit/Exit';

export interface NavbarLinkProps {
  icon: typeof IconHome2;
  label: string;
  active?: boolean;
  onClick?: () => void;
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

interface NavBarInterface extends DashScreenInterface {
  navBarData: { icon: typeof IconHome2, label: string }[];
  activeNavBar: number;
  setActiveNavBar: (index: number) => void;
}

export function NavBar(props: NavBarInterface) {
  
  const links = props.navBarData.map((link, index) => (
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
    <nav className={classes.navbar}>
      <Center>
        <Exit {...props}/>
      </Center>

      <div className={classes.navbarMain}>
        <Stack justify="center" gap={15}>
          {links}
        </Stack>
      </div>

      <Stack justify="center" gap={0}>
        <Center>
          <ColorShema/>
        </Center>
        <Divider my="xs"/>
        <Center>
          <LanguagePicker {...props}/>
        </Center>
        <Divider my="xs"/>
        <Center>
          <Exit {...props}/>
        </Center>
      </Stack>
    </nav>
  );
}