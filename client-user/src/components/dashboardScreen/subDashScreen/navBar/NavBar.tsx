import { useState } from 'react';
import {
  IconCalendarStats,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconGauge,
  IconHome2,
  IconLogout,
  IconSettings,
  IconUser,
} from '@tabler/icons-react';
import { ActionIcon, Center, Divider, Stack, Tooltip, UnstyledButton } from '@mantine/core';
import classes from './NavBar.module.css';
import { LanguagePicker } from '../../../subComponents/languagePicker/LanguagePicker';
import { ColorShema } from '../../../subComponents/colorShema/ColorShema';
import { DashScreenInterface } from '../../mainScreen/Dashboard';

interface NavbarLinkProps {
  icon: typeof IconHome2;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton onClick={onClick} className={classes.link} data-active={active || undefined}>
        <Icon size={20} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const mockdata = [
  { icon: IconHome2, label: 'Home' },
  { icon: IconGauge, label: 'Dashboard' },
  { icon: IconDeviceDesktopAnalytics, label: 'Analytics' },
  { icon: IconCalendarStats, label: 'Releases' },
  { icon: IconUser, label: 'Account' },
  { icon: IconFingerprint, label: 'Security' },
  { icon: IconSettings, label: 'Settings' },
];

export function NavBar(props: DashScreenInterface) {
  const [active, setActive] = useState(sessionStorage.getItem('navlink') ? Number(sessionStorage.getItem('navlink')) : 0);

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => {
        setActive(index)
        sessionStorage.setItem('navlink', index.toString())
      }}
    />
  ));

  return (
    <nav className={classes.navbar}>
      <Center>
        {/* <ActionIcon
            onClick={() => {
                sessionStorage.removeItem('navlink')
                props.pickService(null)
                props.pickUser(null)
            }}
            variant="transparent"
            color="grey"
            aria-label="Toggle color scheme"
        >
            <IconLogout stroke={1.5} />
        </ActionIcon> */}
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
          <ActionIcon
              ml='5px'
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
        </Center>
      </Stack>
    </nav>
  );
}