import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { UniversalJwtGuard } from 'src/app/guards/universalJwtGuard';
// import { CurrentUser } from 'src/app/decorators/current-user.decorator';
// import { User } from 'src/app/interfaces/user';
// import { CurrentUser } from 'src/app/decorators/current-user.decorator';
// import { User } from 'src/app/interfaces/user';
import { UpdateCompanyDataDto } from './dto/updateCompanyData.dto';

@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @UseGuards(UniversalJwtGuard)
  @Post('/update-company')
  async updateCompanyData(
    @Body() data: UpdateCompanyDataDto,
    // @CurrentUser() user: User,
    // @Ip() ip: string,
  ) {
    console.log(data);
    return await this.companyService.updateCompanyData(
      data._id,
      data.requestData,
    );
  }
}
