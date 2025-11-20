import { Divider, Flex, Grid, Paper, Space, Text } from '@mantine/core';
import { MainInterface } from '../../Main';
import { IconCancel, IconCircleCheck } from '@tabler/icons-react';

export function StaffUserSettings(props: MainInterface) {

  return (
    <Paper withBorder radius="md" p="xs">
      <Text>{`User of Service ${props.service.name} (${props.comp.name})`}</Text>

      <Divider my="lg" label={`User of Service ${props.service.name} (${props.comp.name})`} labelPosition="left" />
      <Grid w="100%" gutter="md">
        {[
          [
            props.user.telegramId ? <IconCircleCheck key='1' size={45} color='green'/> : <IconCancel key='1' size={45} color='red'/>
          ],
          [
            props.user.telegramId ? '@' + props.user.telegramUserName || props.user.telegramId : 'Connect',
          ].map((item, i) => <Text key={`2-${i}`}>{item}</Text>),
          // [
          //   props.user.telegramId ? 'Disconect' : 'Connect'
          // ]
        ].map((item, i) => 
          <Grid.Col  key={`main-${i}`} span={{ base: 12, sm: 6 }}>
            <Flex direction="column" align="center" justify="center" h="100%">
              {item}
            </Flex>
          </Grid.Col>
        )}
      </Grid>

      <Space h='sm'/>
    </Paper>
  );
}