import { Button, Divider, Group, HueSlider, Modal, Space, Text } from '@mantine/core'
import { StatusClass } from '../../../../../../classes/StatusClass';
import { MainInterface } from '../../Main';
import { UpdateStringValueStatus } from '../../../../../subComponents/updateStringValue/UpdateStringValueStatus';
import { useState } from 'react';
import { buttonColorObj } from '../../../../../subComponents/colorShema/buttonColorObj';
import { DragAndDrop } from './DragAndDrop';

interface ModalEditStatusInterface extends MainInterface {
    modalStatusLine: boolean;
    setModalStatusLine: any;
}

export function ModalEditStatusLine(props: ModalEditStatusInterface) {

    // if(props.selectedStatus) {

        // console.log(props.selectedStatus)
        // const deleteStatus = async () => {
        //     props.setLoadingText('Удаление статуса')
        //     props.setLoaderShow.open()
        //     const res = await props.selectedStatus?.deleteStatus(props.selectedStatus._id, props.comp, props.pickComp)
        //     if (!res) {
        //         props.setErrorStatus(true)
        //         props.setLoadingText('оШИбКа')
        //         return
        //     } 
        //     props.setLoaderShow.close()
        //     props.setErrorStatus(false)
        //     props.setModalStatus.close()
        // }

        return (
            <>
                <Modal radius={'10px'} size={'lg'} opened={props.modalStatusLine} 
                    title={"Порядок статусов"} 
                    withCloseButton={true}
                    onClose={() => {
                        // if (statusColor !== props.selectedStatus?.color) {
                        //     props.selectedStatus?.editStatus(props.selectedStatus._id, 'color', statusColor.toString(), props.comp, props.pickComp)
                        // }
                        props.setModalStatusLine.close()
                        // props.setSelectedStatus(null)
                    }}
                    // zIndex={9999}
                    >
                    <DragAndDrop {...props}/>
                </Modal>
            </>
        )
    // }
}