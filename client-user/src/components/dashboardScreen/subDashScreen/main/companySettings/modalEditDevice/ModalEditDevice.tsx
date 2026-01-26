import { Button, Group, HueSlider, Modal, Space } from '@mantine/core'
import { MainInterface } from '../../Main';
import { useState } from 'react';
import { buttonColorObj } from '../../../../../subComponents/colorShema/buttonColorObj';
import { DeviceClass } from '../../../../../../classes/DeviceClass';
import { UpdateStringValueDevice } from '../../../../../subComponents/updateStringValue/UpdateStringValueDevice';

interface ModalEditDeviceInterface extends MainInterface {
    modalDevice: boolean;
    setModalDevice: any;
    setSelectedDevice: any;
    selectedDevice: DeviceClass | null;
}

export function ModalEditDevice(props: ModalEditDeviceInterface) {

    if(props.selectedDevice) {

        const [statusColor, onChangeDeviceColor] = useState(props.selectedDevice.color);

        console.log(props.selectedDevice)
        const deleteDevice = async () => {
            props.setLoadingText(props.text?.deleting)
            props.setLoaderShow.open()
            const res = await props.selectedDevice?.deleteDevice(props.selectedDevice._id, props.comp, props.pickComp)
            if (!res) {
                props.setErrorStatus(true)
                props.setLoadingText(props.text?.error)
                return
            } 
            props.setLoaderShow.close()
            props.setErrorStatus(false)
            props.setModalDevice.close()
        }

        return (
            <>
                <Modal radius={'10px'} size={'lg'} opened={props.modalDevice} 
                    title={<UpdateStringValueDevice {...props} setSelectedDevice={props.setSelectedDevice} device={props.selectedDevice!} dataName="name" func={props.selectedDevice.editDevice.bind(props.selectedDevice)} key={`up1`}/>} 
                    withCloseButton={true}
                    onClose={() => {
                        if (statusColor !== props.selectedDevice?.color) {
                            props.selectedDevice?.editDevice(props.selectedDevice._id, 'color', statusColor.toString(), props.comp, props.pickComp)
                        }
                        props.setModalDevice.close()
                        props.setSelectedDevice(null)
                    }}
                    >
                    <Space h='lg'/>
                    <HueSlider value={statusColor} onChange={onChangeDeviceColor} />
                    <Space h='lg'/>
                    <Space h='lg'/>
                    <Group justify='space-between'>
                        {statusColor !== props.selectedDevice?.color ? (
                        <Button
                            style={buttonColorObj(props.selectedDevice?.color)}
                            size="xs"
                            onClick={() => onChangeDeviceColor(props.selectedDevice?.color!)}
                        >
                            {props.text?.original}
                        </Button>
                        ) : (<div></div>)}
                        {props.comp.statuses_ids.length > 2 && (<Button size="xs" color='red' onClick={deleteDevice}>{props.text?.delete}</Button>)}
                    </Group>
                </Modal>
            </>
        )
    }
}