import { Center, Loader, Modal } from '@mantine/core'
import { IconExclamationCircle } from '@tabler/icons-react';


export function LoaderModal(props: {text: string; loaderShow: boolean; setLoaderShow: any, errorStatus: boolean, setErrorStatus: any}) {

    const showErrorOrLoader = () => {
        if(props.errorStatus) 
            return (
                <IconExclamationCircle color='red' size={'45px'}/>
            )
        return (
            <Loader size={45} color="blue" type="dots" />
        )
    }

    return (
        <>
            <Modal radius={'10px'} opened={props.loaderShow} title={props.text} withCloseButton={false}
                onClose={() => {
                    props.setLoaderShow.close()
                    props.setErrorStatus(false)
                }}
                zIndex={9999}
                >
            
                <Center style={{marginTop: '1vmax'}}>
                    {showErrorOrLoader()}
                </Center>
            </Modal>
        </>
    )
}