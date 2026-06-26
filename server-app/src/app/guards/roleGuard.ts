import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Types } from 'mongoose';
import { CompanyService } from 'src/company/company.service';
import { StaffUserDocument } from 'src/staff-user/staff-user.schema';
import { StaffUserService } from 'src/staff-user/staff-user.service';

interface RequestKafka extends Request {
  email?: string;
  username?: string;
  company_id: Types.ObjectId;
  service_id: Types.ObjectId;
  staffUser_id: Types.ObjectId;
  user_id: Types.ObjectId;
  statusOwner: boolean;
}

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly companyService: CompanyService,
    private readonly staffUserService: StaffUserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const type = context.getType<'http' | 'ws' | 'rpc'>();

    console.log('RoleGuard');

    if (type === 'rpc') {
      console.log(context.switchToRpc().getContext());
      const rpcData: RequestKafka = context.switchToRpc().getData();

      if (!rpcData.statusOwner) return true;

      console.log(rpcData);

      const staffUser: StaffUserDocument | null = await this.staffUserService.getStaffUserById(rpcData.staffUser_id);
      if (staffUser) {
        console.log(staffUser.role_ids.map((r) => r.actions).flat());
      }
      return true;
    }

    throw new UnauthorizedException('Unsupported request type');
  }
}
