import { Button, Divider, Flex, Grid, Group, Paper, Space, Text } from '@mantine/core';
import { MainInterface } from '../../Main';
import { useDisclosure } from '@mantine/hooks';
import { ModalEditFieldLineStaff } from './modalEditField/ModalEditFieldLineStaff';

export function StaffUserSettings(props: MainInterface) {

  const [modalFieldLine, setModalFieldLine] = useDisclosure(false)

  return (
    <Paper withBorder radius="md" p="xs">
      <Text>{`User of Service ${props.service.name} (${props.comp.name})`}</Text>

      <Divider my="lg" label="Fields" labelPosition="left" />
      <Group>
        <Button w={'200px'} size='xs' onClick={setModalFieldLine.open}>{props.text?.fieldLine}</Button>
      </Group>
      <Space h="xl"/>
      <Grid w="100%" gutter="md">
        {[
          ...props.comp.fields_ids.map((s, i) => <Button variant='default' key={`status-${i}`} onClick={() => {}} size='xs'>{s.name}</Button>)
        ].map((item, i) =>
            <Grid.Col key={`Statuses-${i}`} span={{ base: 4, sm: 1.5}}>
            <Flex direction="column" justify="center" h="100%">
              {item}
            </Flex>
          </Grid.Col>
        )}
      </Grid>

      <ModalEditFieldLineStaff {...props} modalFieldLine={modalFieldLine} setModalFieldLine={setModalFieldLine}/>
      <Space h='sm'/>
    </Paper>
  );
}