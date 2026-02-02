import { Button, Checkbox, Group, Modal, Space } from '@mantine/core'
import { MainInterface } from '../../Main';
import { FieldClass } from '../../../../../../classes/FieldClass';
import { UpdateStringValueField } from '../../../../../subComponents/updateStringValue/UpdateStringValueField';

interface ModalEditFieldInterface extends MainInterface {
    modalField: boolean;
    setModalField: any;
    setSelectedField: any;
    selectedField: FieldClass | null;
}

export function ModalEditField(props: ModalEditFieldInterface) {

    if(props.selectedField) {

        console.log(props.selectedField)
        const deleteField = async () => {
            props.setLoadingText(props.text?.deleting)
            props.setLoaderShow.open()
            const res = await props.selectedField?.deleteField(props.selectedField._id, props.comp, props.pickComp)
            if (!res) {
                props.setErrorStatus(true)
                props.setLoadingText(props.text?.error)
                return
            } 
            props.setLoaderShow.close()
            props.setErrorStatus(false)
            props.setModalField.close()
        }

        const editField = async (field: string, newValue: boolean) => {
            props.setLoadingText(props.text?.updatingData)
            props.setLoaderShow.open()
            const res = await props.selectedField?.editField(props.selectedField._id, field, newValue, props.comp, props.pickComp)
            if (!res) {
                props.setErrorStatus(true)
                props.setLoadingText(props.text?.error)
                return
            }
            props.setLoaderShow.close()
            props.setErrorStatus(false)
            props.setSelectedField(new FieldClass(res))
        }

        return (
            <>
                <Modal radius={'10px'} size={'lg'} opened={props.modalField} 
                    title={<UpdateStringValueField {...props} setSelectedField={props.setSelectedField} field={props.selectedField!} dataName="name" func={props.selectedField.editField.bind(props.selectedField)} key={`up1`}/>} 
                    withCloseButton={true}
                    onClose={() => {
                        props.setModalField.close()
                        props.setSelectedField(null)
                    }}
                    >
                    <Space h='lg'/>
                    <Group>
                        <Checkbox 
                        checked={props.selectedField.mustHave}
                        onChange={(event) => editField('mustHave', event.currentTarget.checked)}
                        /> 
                        Обязательное заполнение
                    </Group>
                    {/* <Space h="xs"/> */}
                    <Group>
                        <Checkbox 
                        checked={props.selectedField.onlyNumber}
                        onChange={(event) => editField('onlyNumber', event.currentTarget.checked)}
                        /> 
                        Только цифры
                    </Group>
                    {/* <Space h="xs"/> */}
                    <Group>
                        <Checkbox 
                        checked={props.selectedField.variants}
                        onChange={(event) => editField('variants', event.currentTarget.checked)}
                        /> 
                        Подгружать варианты
                    </Group>  
                    <Space h='lg'/>
                    <Space h='lg'/>
                    <Group justify='flex-end'>
                        {props.comp.statuses_ids.length > 1 && (<Button size="xs" color='red' onClick={deleteField}>{props.text?.delete}</Button>)}
                    </Group>
                </Modal>
            </>
        )
    }
}