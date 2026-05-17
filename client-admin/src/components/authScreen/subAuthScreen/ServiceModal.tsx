import { useEffect, useState } from 'react'
import { Button, Grid, Group, Modal, Space, Text } from '@mantine/core'
import { AuthScreenInterface } from '../mainScreen/AuthScreen'
import { Company } from '../../../interfaces/company';
import { AxiosClass } from '../../../classes/AxiosClass';

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

    const axiosClass = new AxiosClass()
    
    useEffect(() => {
        console.log('dddddd', props.serviseModal, props.user)
        if(props.serviseModal && props.user) {
            getUserServices()
        }
    }, [props.serviseModal])

    const getUserServices = async () => {
        props.setLoadingText(props.text?.getUserServices)
        props.setLoaderShow.open()
        const res = await axiosClass.getUserServices()
        if (!res) {
            props.setErrorStatus(true)
            props.setLoadingText(props.text?.itWasErrorLate)
            return
        }
        props.setLoaderShow.close()
        console.log(res)
        setAvaliableServices(res.data)
    }

    const createNewCompany = async () => {
        props.setLoadingText(props.text?.createNewCompany)
        props.setLoaderShow.open()
        const res = await axiosClass.axiosCreateNewCompany()
        if (!res) {
            props.setErrorStatus(true)
            props.setLoadingText(props.text?.itWasErrorLate)
            return
        }
        props.setLoaderShow.close()
        getUserServices()
    }

    const createNewService = async (company_id: string) => {
        props.setLoadingText(props.text?.createNewService)
        props.setLoaderShow.open()
        const res = await axiosClass.axiosCreateNewService(company_id)
        console.log(res)
        if (!res) {
            props.setErrorStatus(true)
            props.setLoadingText(props.text?.itWasErrorLate)
            return
        }
        props.setLoaderShow.close()
        getUserServices()
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
                    
                    <Group justify="flex-end"><Button size='xs' variant='default'
                    onClick={() => {
                        createNewService(item1._id)
                    }}>
                        {props.text?.crateNewService}</Button></Group>
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