import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientKafka } from '@nestjs/microservices';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { CompanyService } from 'src/company/company.service';
import { DeviceService } from 'src/device/device.service';
import { PartService } from 'src/part/part.service';
import { RoleService } from 'src/role/role.service';
import { ServiceService } from 'src/service/service.service';
import { ShopService } from 'src/shop/shop.service';
import { StaffUserService } from 'src/staff-user/staff-user.service';
import { StatusService } from 'src/status/status.service';
import { WorkService } from 'src/work/work.service';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
    @InjectConnection() private readonly connection: Connection,
    private readonly configService: ConfigService,
    private readonly companyService: CompanyService,
    private readonly deviceService: DeviceService,
    private readonly serviceService: ServiceService,
    private readonly shopService: ShopService,
    private readonly roleService: RoleService,
    private readonly partService: PartService,
    private readonly workService: WorkService,
    private readonly statusService: StatusService,
    private readonly staffUserService: StaffUserService,
  ) {}

  onModuleInit() {
    this.kafkaClient.emit('test', {
      value: {
        message: this.configService.get<string>('SERVICE_NAME'),
      },
      key: 123,
    });
  }

  async getAllMyComps(user_id: string) {
    const compsOwner = await this.companyService.getCompanyWhereOwner(user_id);

    const myStaffUsers_ids =
      await this.staffUserService.getMyStaffUsers_ids(user_id);

    const compsStaff = await this.companyService.getCompanyesWhereStaff(
      myStaffUsers_ids,
      compsOwner.map((c) => c._id),
      user_id,
    );
    console.log(compsOwner);
    console.log(compsStaff);
    return { compsOwner, compsStaff };
  }

  async createNewCompany(user_owner_id: string) {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      const role_id = await this.roleService.createNewRole(session);
      const shop_id = await this.shopService.createNewShop(session);
      const device_id = await this.deviceService.createNewDevice(session);
      const status_id = await this.statusService.createNewStatus(session);
      const work_id = await this.workService.createNewWork(session);
      const service_id = await this.serviceService.createNewService(session);

      const staffUser_id = await this.staffUserService.createNewStaffUser(
        user_owner_id,
        role_id,
        service_id,
        session,
      );

      const part_id = await this.partService.createNewPart(
        shop_id,
        service_id,
        session,
      );

      const company = await this.companyService.createNewCompany(
        user_owner_id,
        staffUser_id,
        shop_id,
        role_id,
        device_id,
        status_id,
        work_id,
        service_id,
        part_id,
        session,
      );

      await session.commitTransaction();
      return await this.companyService.getCompanyWithRelations(company._id);
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  }
}
