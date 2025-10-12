import { Center, Loader, Modal } from '@mantine/core'


export function LoaderModal(props: {text: string; loaderShow: boolean; setLoaderShow: any}) {

    return (
        <>
            <Modal size="xs" radius={'10px'} opened={props.loaderShow} title={props.text}
                onClose={() => {
                    props.setLoaderShow.close()
                }}>
            
                <Center style={{marginTop: '1vmax'}}>
                    <Loader size={45} color="blue" type="dots" />
                </Center>
            </Modal>
        </>
    )
}