import {  Modal } from '@mantine/core'
import { MainInterface } from '../../Main';
import { DragAndDrop } from './DragAndDrop';

interface ModalEditDeviceInterface extends MainInterface {
    modalDeviceLine: boolean;
    setModalDeviceLine: any;
}

export function ModalEditDeviceLine(props: ModalEditDeviceInterface) {

    return (
        <>
            <Modal radius={'10px'} size={'sm'} opened={props.modalDeviceLine} 
                title={props.text?.position} 
                withCloseButton={true}
                onClose={() => {
                    props.setModalDeviceLine.close()
                }}
                >
                <DragAndDrop {...props}/>
            </Modal>
        </>
    )
}