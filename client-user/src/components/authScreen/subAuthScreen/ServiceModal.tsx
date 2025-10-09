import { useEffect, useState } from 'react'
import { Button, Grid, Modal, Space } from '@mantine/core'
import { AuthScreenInterface } from '../mainScreen/AuthScreen'
import axios from 'axios';

interface ServiceModalInterface extends AuthScreenInterface {
    serviseModal: boolean;
    setServiseModal: any;
}

export function ServiceModal(props: ServiceModalInterface) {

    const [avaliableServices, setAvaliableServices] = useState<{}[]>([])
    // const [services, setServices] = useState<Service[]>([])
    

    useEffect(() => {
        if(props.serviseModal && props.user) {
            getUserServices()
        }
    }, [props.serviseModal])

    const getUserServices = async () => {
        await axios({
            method: 'POST',
            url: import.meta.env.VITE_API_APP_LINK + '/service/all-user-services',
            data: {token: props.user?.token},
            headers: {
                "Authorization": `Bearer ${props.user?.token}`
            },
            timeout: 10000
        })
        .then(async (res) => {
            console.log(res)
            setAvaliableServices(res.data)
        })
        .catch((er) => {
            console.log(er)
        })
    }

    const createNewService = async () => {
        await axios({
            method: 'POST',
            url: import.meta.env.VITE_API_APP_LINK + '/app/create-new-company',
            data: {token: props.user?.token},
            headers: {
                "Authorization": `Bearer ${props.user?.token}`
            },
            timeout: 10000
        })
        .then(async (res) => {
            console.log(res)
            setAvaliableServices(ex => {return [res.data, ...ex]})
        })
        .catch((er) => {
            console.log(er)
        })
    }

  
    return (
        <>
            <Modal radius={'10px'} opened={props.serviseModal} title={props.text?.services}
                onClose={() => {
                    props.setServiseModal.close()
                }}>
            
            <Grid>
                {/* {services.map(item1 => 
                <Grid.Col key={item1._id} span={12}>
                    <>
                        {item1.name}
                        <Space h='sm'/>
                        <Grid>
                            {item1.subServices
                            .filter(subServ => roles.map(role => role.subServices).flat().map(subs => subs.subServiceId).includes(subServ.subServiceId))
                            .map(item =>
                            <Grid.Col key={item.subServiceId} span={12}> 
                            <Button
                            variant='default'
                            onClick={async () => {
                                sessionStorage.setItem('leng', props.leng)
                                sessionStorage.setItem('text', JSON.stringify(props.text))
                                sessionStorage.setItem('serviceId', item1._id)
                                sessionStorage.setItem('subServiceId', item.subServiceId)
                                // @ts-ignore
                                setTimeout(() => navigate('/service'), 1000)
                            }} 
                            fullWidth
                            >
                            {item.name}
                            </Button>
                        </Grid.Col>
                            )}  
                        </Grid>
                        <Space h='sm'/>
                        <hr></hr>          
                    </>
                </Grid.Col>)} */}

                <Grid.Col span={12}>

                </Grid.Col>

                <Grid.Col span={12}>
                    <Button size='xs' variant='default'
                    onClick={() => {
                        createNewService()
                    }}>
                    {props.text?.crateNewService}
                    </Button>
                </Grid.Col>
            </Grid>
            </Modal>
        </>
    )
}