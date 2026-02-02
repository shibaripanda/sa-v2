import { Button, Group, HueSlider, Modal, Space } from '@mantine/core'
import { MainInterface } from '../../Main';
import { useState } from 'react';
import { buttonColorObj } from '../../../../../subComponents/colorShema/buttonColorObj';
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

        // const [statusColor, onChangeFieldColor] = useState(props.selectedField.color);

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

        return (
            <>
                <Modal radius={'10px'} size={'lg'} opened={props.modalField} 
                    title={<UpdateStringValueField {...props} setSelectedField={props.setSelectedField} field={props.selectedField!} dataName="name" func={props.selectedField.editField.bind(props.selectedField)} key={`up1`}/>} 
                    withCloseButton={true}
                    onClose={() => {
                        // if (statusColor !== props.selectedField?.color) {
                        //     props.selectedField?.editField(props.selectedField._id, 'color', statusColor.toString(), props.comp, props.pickComp)
                        // }
                        props.setModalField.close()
                        props.setSelectedField(null)
                    }}
                    >
                    <Space h='lg'/>
                    {/* <HueSlider value={statusColor} onChange={onChangeFieldColor} /> */}
                    <Space h='lg'/>
                    <Space h='lg'/>
                    {/* <Group justify='space-between'>
                        {statusColor !== props.selectedField?.color ? (
                        <Button
                            style={buttonColorObj(props.selectedField?.color)}
                            size="xs"
                            onClick={() => onChangeFieldColor(props.selectedField?.color!)}
                        >
                            {props.text?.original}
                        </Button>
                        ) : (<div></div>)}
                        {props.comp.statuses_ids.length > 2 && (<Button size="xs" color='red' onClick={deleteField}>{props.text?.delete}</Button>)}
                    </Group> */}
                </Modal>
            </>
        )
    }
}