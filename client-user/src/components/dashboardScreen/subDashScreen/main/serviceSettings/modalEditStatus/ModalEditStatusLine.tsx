import {  Modal } from '@mantine/core'
import { MainInterface } from '../../Main';
import { DragAndDrop } from './DragAndDrop';

interface ModalEditStatusInterface extends MainInterface {
    modalStatusLine: boolean;
    setModalStatusLine: any;
}

export function ModalEditStatusLine(props: ModalEditStatusInterface) {

    return (
        <>
            <Modal radius={'10px'} size={'sm'} opened={props.modalStatusLine} 
                title={props.text?.position} 
                withCloseButton={true}
                onClose={() => {
                    props.setModalStatusLine.close()
                }}
                >
                <DragAndDrop {...props}/>
            </Modal>
        </>
    )
}