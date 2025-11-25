import { Center, Modal } from '@mantine/core'
import { StatusClass } from '../../../../../../classes/StatusClass';

interface ModalEditStatusInterface {
    modalStatus: boolean;
    setModalStatus: any;
    setSelectedStatus: any;
    selectedStatus: StatusClass | null;
}

export function ModalEditStatus(props: ModalEditStatusInterface) {

    console.log(props.selectedStatus)

    return (
        <>
            <Modal radius={'10px'} size={'lg'} opened={props.modalStatus} title={props.selectedStatus?.name} withCloseButton={true}
                onClose={() => {
                    props.setModalStatus.close()
                    props.setSelectedStatus(null)
                }}
                zIndex={9999}
                >
            
                <Center style={{marginTop: '1vmax'}}>
                    {props.selectedStatus?.name}
                </Center>
            </Modal>
        </>
    )
}