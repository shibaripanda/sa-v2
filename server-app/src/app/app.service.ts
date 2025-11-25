import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientKafka } from '@nestjs/microservices';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, Error, Types } from 'mongoose';
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

  async onModuleInit() {
    // await this.kafkaClient.connect();
    // this.kafkaClient.emit('test', {
    //   value: {
    //     message: this.configService.get<string>('SERVICE_NAME'),
    //   },
    //   key: 123,
    // });
  }

  async addNewStatus(company_id: Types.ObjectId) {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      const status_id = await this.statusService.createNewOpenStatus(session);
      await this.companyService.addStatusToCompany(
        company_id,
        status_id,
        session,
      );

      await session.commitTransaction();
      return await this.companyService.getCompanyWithRelations(company_id);
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  }

  async deleteAccount(user_owner_id: Types.ObjectId) {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      // Получаем компанию с дочерними объектами
      const companyes = await this.companyService.getCompanyForDelete(
        user_owner_id,
        session,
      );
      if (!companyes || !companyes.length) throw new Error('Company not found');

      for (const comp of companyes) {
        if (comp.services_ids?.length) {
          await this.serviceService.deleteManyServices(
            comp.services_ids.map((s) => s._id),
            session,
          );
        }

        if (comp.shops_ids?.length) {
          await this.shopService.deleteManyShops(
            comp.shops_ids.map((s) => s._id),
            session,
          );
        }

        if (comp.works_ids?.length) {
          await this.workService.deleteManyWorks(
            comp.works_ids.map((w) => w._id),
            session,
          );
        }

        if (comp.devices_ids?.length) {
          await this.deviceService.deleteManyDevices(
            comp.devices_ids.map((d) => d._id),
            session,
          );
        }

        if (comp.parts_ids?.length) {
          await this.partService.deleteManyParts(
            comp.parts_ids.map((p) => p._id),
            session,
          );
        }

        if (comp.staff_users_ids?.length) {
          await this.staffUserService.deleteManyStaffUsers(
            comp.staff_users_ids.map((u) => u._id),
            session,
          );
        }

        if (comp.roles_ids?.length) {
          await this.roleService.deleteManyRoles(
            comp.roles_ids.map((r) => r._id),
            session,
          );
        }

        if (comp.statuses_ids?.length) {
          await this.statusService.deleteManyStatuses(
            comp.statuses_ids.map((s) => s._id),
            session,
          );
        }

        // Удаляем саму компанию
        await this.companyService.deleteCompany(comp._id, session);
      }

      // Удаляем все дочерние элементы через сервисы с сессией

      await session.commitTransaction();
      return true;
    } catch (error) {
      console.log(error);
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  }

  async getAllMyComps(user_id: Types.ObjectId) {
    const compsOwner = await this.companyService.getCompanyWhereOwner(user_id);

    const myStaffUsers_ids =
      await this.staffUserService.getMyStaffUsers_ids(user_id);

    const compsStaff = await this.companyService.getCompanyesWhereStaff(
      myStaffUsers_ids,
      compsOwner.map((c) => c._id),
      user_id,
    );
    // console.log(compsOwner);
    // console.log(compsStaff);
    return { compsOwner, compsStaff };
  }

  async createNewService(company_id: Types.ObjectId) {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      const service_id = await this.serviceService.createNewService(session);

      await this.companyService.addServiceToCompany(
        company_id,
        service_id,
        session,
      );

      await session.commitTransaction();
      return true;
    } catch (error) {
      await session.abortTransaction();
      console.log(error);
      throw error;
    } finally {
      await session.endSession();
    }
  }

  async createNewCompany(user_owner_id: Types.ObjectId) {
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
