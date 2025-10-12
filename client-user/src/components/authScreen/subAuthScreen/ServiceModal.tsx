import { useEffect, useState } from 'react'
import { Button, Grid, Group, Modal, Space } from '@mantine/core'
import { AuthScreenInterface } from '../mainScreen/AuthScreen'
import axios from 'axios';
import { Company } from '../../../interfaces/company';

interface ServiceModalInterface extends AuthScreenInterface {
    serviseModal: boolean;
    setServiseModal: any;
    setLoaderShow: any;
    setLoadingText: any;
}

interface CompsData {
    compsOwner: Company[];
    compsStaff: Company[];
}

export function ServiceModal(props: ServiceModalInterface) {

    const [avaliableServices, setAvaliableServices] = useState<CompsData>({compsOwner: [], compsStaff: []})
    
    useEffect(() => {
        console.log('dddddd', props.serviseModal, props.user)
        if(props.serviseModal && props.user) {
            getUserServices()
        }
    }, [props.serviseModal])

    const getUserServices = async () => {
        props.setLoadingText('Получение компаний и сервисов...')
        props.setLoaderShow.open()
        await axios({
            method: 'POST',
            url: import.meta.env.VITE_API_APP_LINK + '/app/get-all-my-comps',
            data: {},
            headers: {
                "Authorization": `Bearer ${props.user?.token}`
            },
            timeout: 10000
        })
        .then(async (res) => {
            props.setLoadingText('Данные успешно получены!')
            console.log(res)
            setAvaliableServices(res.data)
        })
        .catch((er) => {
            console.log(er)
            props.setLoadingText('Ошибка получения данных :-/')
        })
        .finally(() => {
            props.setLoaderShow.close()
        })
    }

    const createNewService = async () => {
        props.setLoaderShow.open()
        await axios({
            method: 'POST',
            url: import.meta.env.VITE_API_APP_LINK + '/app/create-new-company',
            data: {},
            headers: {
                "Authorization": `Bearer ${props.user?.token}`
            },
            timeout: 10000
        })
        .then(async (res) => {
            console.log(res)
            getUserServices()
        })
        .catch((er) => {
            console.log(er)
        })
        .finally(() => {
            props.setLoaderShow.close()
        })
    }

    const listOfCampsAndServices = (comps: Company[]) => {
        const items = comps.map(item1 => 
            <Grid.Col key={item1._id} span={12}>
                {item1.name}
                <Space h='sm'/>
                <Grid>
                    {item1.services_ids
                    .map(item =>
                    <Grid.Col key={item._id.toString()} span={12}> 
                        <Button
                        variant='default'
                        onClick={async () => {
                            console.log('fffff')
                        }} 
                        fullWidth
                        >
                        {item.name}
                        </Button>
                    </Grid.Col>
                    )}  
                </Grid>
                <Space h='sm'/>
                <Group justify="flex-end"><Button size='xs' variant='default'>{props.text?.crateNewService}</Button></Group>
                <Space h='sm'/>
                <hr></hr>
            </Grid.Col>)
        return (
            <>{items}</>
        )
    }

    return (
        <>
            <Modal radius={'10px'} opened={props.serviseModal} title={props.text?.services}
                onClose={() => {
                    setAvaliableServices({compsOwner: [], compsStaff: []})
                    props.setServiseModal.close()
                    sessionStorage.removeItem('user')
                    props.setUser(null)
                }}>
            
            <Grid>
                {listOfCampsAndServices(avaliableServices.compsOwner)}

                <Grid.Col span={12}>

                </Grid.Col>

                <Grid.Col span={12}>
                    <Button size='xs' variant='default'
                    onClick={() => {
                        createNewService()
                    }}>
                    {props.text?.addNewCompany}
                    </Button>
                </Grid.Col>
            </Grid>
            </Modal>
        </>
    )
}