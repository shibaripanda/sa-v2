import { ActionIcon, useComputedColorScheme, useMantineColorScheme } from "@mantine/core";
import { IconSun } from "@tabler/icons-react";

export function ColorShema() {
    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true })
    return (
    <ActionIcon
        onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
        variant="transparent"
        color="grey"
        aria-label="Toggle color scheme"
    >
        <IconSun stroke={1.5} />
    </ActionIcon>
    )
}
