import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EditFieldDto } from './dto/editField.dto';
import { DeleteFieldDto } from './dto/deleteField.dto';
import { FieldService } from './field.service';

@Controller()
export class FieldKafkaController {
  constructor(private readonly fieldService: FieldService) {}

  @MessagePattern('edit-field')
  async editStatus(@Payload() data: EditFieldDto) {
    const res = await this.fieldService.editField(
      data.requestData.field_id,
      data.requestData.data,
    );
    return {
      value: res,
      key: Date.now(),
    };
  }

  @MessagePattern('delete-field')
  async deleteStatus(@Payload() data: DeleteFieldDto) {
    console.log(data);
    const res = await this.fieldService.deleteField(data.requestData.field_id);
    return {
      value: { status: res.deletedCount },
      key: Date.now(),
    };
  }
}
