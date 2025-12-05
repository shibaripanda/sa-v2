import { Button, Group, HueSlider, Modal, Space } from '@mantine/core'
import { StatusClass } from '../../../../../../classes/StatusClass';
import { MainInterface } from '../../Main';
import { UpdateStringValueStatus } from '../../../../../subComponents/updateStringValue/UpdateStringValueStatus';
import { useState } from 'react';
import { buttonColorObj } from '../../../../../subComponents/colorShema/buttonColorObj';

interface ModalEditStatusInterface extends MainInterface {
    modalStatus: boolean;
    setModalStatus: any;
    setSelectedStatus: any;
    selectedStatus: StatusClass | null;
}

export function ModalEditStatus(props: ModalEditStatusInterface) {

    if(props.selectedStatus) {

        const [statusColor, onChangeStatusColor] = useState(props.selectedStatus.color);

        console.log(props.selectedStatus)
        const deleteStatus = async () => {
            props.setLoadingText(props.text?.deleting)
            props.setLoaderShow.open()
            const res = await props.selectedStatus?.deleteStatus(props.selectedStatus._id, props.comp, props.pickComp)
            if (!res) {
                props.setErrorStatus(true)
                props.setLoadingText(props.text?.error)
                return
            } 
            props.setLoaderShow.close()
            props.setErrorStatus(false)
            props.setModalStatus.close()
        }

        return (
            <>
                <Modal radius={'10px'} size={'lg'} opened={props.modalStatus} 
                    title={<UpdateStringValueStatus {...props} setSelectedStatus={props.setSelectedStatus} status={props.selectedStatus!} dataName="name" func={props.selectedStatus.editStatus.bind(props.selectedStatus)} key={`up1`}/>} 
                    withCloseButton={true}
                    onClose={() => {
                        if (statusColor !== props.selectedStatus?.color) {
                            props.selectedStatus?.editStatus(props.selectedStatus._id, 'color', statusColor.toString(), props.comp, props.pickComp)
                        }
                        props.setModalStatus.close()
                        props.setSelectedStatus(null)
                    }}
                    // zIndex={9999}
                    >
                    {/* {props.comp.statuses_ids.map(s => <Text>{s.name}</Text>)} */}
                    <Space h='lg'/>
                    <HueSlider value={statusColor} onChange={onChangeStatusColor} />
                    <Space h='lg'/>
                    <Space h='lg'/>
                    <Group justify='space-between'>
                        {statusColor !== props.selectedStatus?.color ? (
                        <Button
                            style={buttonColorObj(props.selectedStatus?.color)}
                            size="xs"
                            onClick={() => onChangeStatusColor(props.selectedStatus?.color!)}
                        >
                            {props.text?.original}
                        </Button>
                        ) : (<div></div>)}
                        <Button size="xs" color='red' onClick={deleteStatus}>{props.text?.delete}</Button>
                    </Group>
                </Modal>
            </>
        )
    }
}