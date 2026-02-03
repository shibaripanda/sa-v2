import {  Modal } from '@mantine/core'
import { MainInterface } from '../../Main';
import { DragAndDrop } from './DragAndDrop';

interface ModalEditFieldInterface extends MainInterface {
    modalFieldLine: boolean;
    setModalFieldLine: any;
}

export function ModalEditFieldLine(props: ModalEditFieldInterface) {

    return (
        <>
            <Modal radius={'10px'} size={'sm'} opened={props.modalFieldLine} 
                title={props.text?.position} 
                withCloseButton={true}
                onClose={() => {
                    props.setModalFieldLine.close()
                }}
                >
                <DragAndDrop {...props}/>
            </Modal>
        </>
    )
}