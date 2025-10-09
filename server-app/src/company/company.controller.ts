import { Body, Controller, Post } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CurrentUser } from 'src/app/decorators/current-user.decorator';
import { User } from 'src/app/interfaces/user';

@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  // @UseGuards(UniversalJwtGuard)
  @Post('/create-company')
  async createCompany(
    @Body() data: any,
    @CurrentUser() user: User,
    // @Ip() ip: string,
  ) {
    return await this.companyService.createNewCompany(user._id);
  }
}
