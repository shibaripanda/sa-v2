import { Button, Divider, Group, Modal } from '@mantine/core'
import { StatusClass } from '../../../../../../classes/StatusClass';
import { MainInterface } from '../../Main';
import { UpdateStringValueStatus } from '../../../../../subComponents/updateStringValue/UpdateStringValueStatus';

interface ModalEditStatusInterface extends MainInterface {
    modalStatus: boolean;
    setModalStatus: any;
    setSelectedStatus: any;
    selectedStatus: StatusClass | null;
}

export function ModalEditStatus(props: ModalEditStatusInterface) {

    console.log(props.selectedStatus)
    const deleteStatus = async () => {
        props.setLoadingText('Удаление статуса')
        props.setLoaderShow.open()
        const res = await props.selectedStatus?.deleteStatus(props.selectedStatus?._id, props.comp, props.pickComp)
        if (!res) {
            props.setErrorStatus(true)
            props.setLoadingText('оШИбКа')
            return
        } 
        props.setLoaderShow.close()
        props.setErrorStatus(false)
        props.setModalStatus.close()
    }

    return (
        <>
            <Modal radius={'10px'} size={'lg'} opened={props.modalStatus} 
                title={<UpdateStringValueStatus {...props} setSelectedStatus={props.setSelectedStatus} status={props.selectedStatus!} dataName="name" func={props.selectedStatus?.editStatus.bind(props.selectedStatus)} key={`up1`}/>} 
                withCloseButton={true}
                onClose={() => {
                    props.setModalStatus.close()
                    // props.setSelectedStatus(null)
                }}
                // zIndex={9999}
                >
                <Group justify='space-between'><>{props.selectedStatus?.name}</><Button color='red' onClick={deleteStatus}>{props.text?.deleting}</Button></Group>
            </Modal>
        </>
    )
}