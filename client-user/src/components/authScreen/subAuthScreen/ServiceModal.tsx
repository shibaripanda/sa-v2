import { useEffect, useState } from 'react'
import { Button, Divider, Grid, Group, Modal, Paper, Space, Text } from '@mantine/core'
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
        props.setLoadingText(props.text?.getUserServices)
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
            console.log(res)
            setAvaliableServices(res.data)
        })
        .catch((er) => {
            console.log(er)
        })
        .finally(() => {
            props.setLoaderShow.close()
        })
    }

    const createNewCompany = async () => {
        props.setLoadingText(props.text?.createNewCompany)
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

    const listOfCampsAndServices = (comps: Company[], isOwner: boolean) => {
        const items = comps.map(item1 =>
            <Grid.Col key={item1._id} span={12}>
                <Text>{item1.name}</Text>
                {isOwner ? (<Text size='xs' c='green'>{props.text?.youOwner}</Text>) : ''}
                <Space h='sm'/>
                <Grid>
                    {item1.services_ids
                    .map(item =>
                    <Grid.Col key={item._id.toString()} span={12}> 
                        <Button
                        variant='default'
                        onClick={async () => {
                            setAvaliableServices({compsOwner: [], compsStaff: []})
                            props.pickService(item)
                            props.pickStaffUser(item1.staff_users_ids.find(u => u.origin_user_id === props.user?._id))
                            props.pickComp(item1)
                            props.setServiseModal.close()
                        }} 
                        fullWidth
                        >
                        {item.name}
                        </Button>
                    </Grid.Col>
                    )}  
                </Grid>
                <Space h='sm'/>
                {isOwner ?
                <div>
                    
                    <Group justify="flex-end"><Button size='xs' variant='default'>{props.text?.crateNewService}</Button></Group>
                    <Space h='sm'/>
                </div> : ''}
                <hr></hr>
            </Grid.Col>
            )
        return (
            <>{items}</>
        )
    }

    return (
        <>
            <Modal radius={'10px'} opened={props.serviseModal} title={props.user?.name}
                onClose={() => {
                    setAvaliableServices({compsOwner: [], compsStaff: []})
                    props.pickUser(null)
                    props.setServiseModal.close()
                }}>
            
            <Grid>
                {listOfCampsAndServices(avaliableServices.compsOwner, true)}
                {listOfCampsAndServices(avaliableServices.compsStaff, false)}

                <Grid.Col span={12}>
                    <Button size='xs' variant='default'
                    onClick={() => {
                        createNewCompany()
                    }}>
                    {props.text?.addNewCompany}
                    </Button>
                </Grid.Col>
            </Grid>
            </Modal>
        </>
    )
}