import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientKafka } from '@nestjs/microservices';
import { CompanyDocument } from 'src/company/company.schema';
import { CompanyService } from 'src/company/company.service';
import { DeviceDocument } from 'src/device/device.schema';
import { DeviceService } from 'src/device/device.service';
import { PartDocument } from 'src/part/part.schema';
import { PartService } from 'src/part/part.service';
import { RoleDocument } from 'src/role/role.schema';
import { RoleService } from 'src/role/role.service';
import { ServiceDocument } from 'src/service/service.schema';
import { ServiceService } from 'src/service/service.service';
import { ShopDocument } from 'src/shop/shop.schema';
import { ShopService } from 'src/shop/shop.service';
import { StaffUserDocument } from 'src/staff-user/staff-user..schema';
import { StaffUserService } from 'src/staff-user/staff-user.service';
import { StatusDocument } from 'src/status/status.schema';
import { StatusService } from 'src/status/status.service';
import { WorkDocument } from 'src/work/work.schema';
import { WorkService } from 'src/work/work.service';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
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

  async createNewCompany(user_owner_id: string) {
    const company: CompanyDocument =
      await this.companyService.createNewCompany(user_owner_id);

    const service: ServiceDocument = await this.serviceService.createNewService(
      company._id.toString(),
    );

    const staffUser: StaffUserDocument =
      await this.staffUserService.createNewStaffUser(company._id.toString());

    const role: RoleDocument = await this.roleService.createNewRole(
      company._id.toString(),
    );

    const shop: ShopDocument = await this.shopService.createNewShop(
      company._id.toString(),
    );

    const part: PartDocument = await this.partService.createNewPart(
      company._id.toString(),
    );

    const device: DeviceDocument = await this.deviceService.createNewDevice(
      company._id.toString(),
    );

    const status: StatusDocument = await this.statusService.createNewStatus(
      company._id.toString(),
    );

    const work: WorkDocument = await this.workService.createNewWork(
      company._id.toString(),
    );
  }
}
