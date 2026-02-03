import { Button, Checkbox, Group, HueSlider, Modal, Space } from '@mantine/core'
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

        const editFieldDevice = async (field: string, newValue: string[]) => {
            props.setLoadingText(props.text?.updatingData)
            props.setLoaderShow.open()
            const res = await props.selectedDevice?.editDevice(props.selectedDevice._id, field, newValue, props.comp, props.pickComp)
            if (!res) {
                props.setErrorStatus(true)
                props.setLoadingText(props.text?.error)
                return
            }
            props.setLoaderShow.close()
            props.setErrorStatus(false)
            props.setSelectedDevice(new DeviceClass(res))
        }

        const editFieldsArr = (field_id: string, check: boolean) => {
            const arr = [...props.selectedDevice!.blockFields]

            if (check) {
                return arr.filter(f => f !== field_id)
            }

            arr.push(field_id)
            return [...new Set(arr)]
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

                    {props.comp.fields_ids.map(f => 
                    <Group>
                        <Checkbox 
                        checked={!props.selectedDevice?.blockFields.includes(f._id)}
                        onChange={(event) => editFieldDevice('blockFields', editFieldsArr(f._id, event.currentTarget.checked))
                        }
                        /> 
                        {f.name}
                    </Group>)}

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
                        {props.comp.statuses_ids.length > 1 && (<Button size="xs" color='red' onClick={deleteDevice}>{props.text?.delete}</Button>)}
                    </Group>
                </Modal>
            </>
        )
    }
}