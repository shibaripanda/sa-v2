import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { UniversalJwtGuard } from 'src/app/guards/universalJwtGuard';
import { UpdateCompanyDataDto } from './dto/updateCompanyData.dto';
import { UpdateCompanyStatusLine } from './dto/updateCompanyStatusLine.dto';

@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @UseGuards(UniversalJwtGuard)
  @Post('/update-status-line')
  async updateStatusLine(
    @Body() data: UpdateCompanyStatusLine,
    // @CurrentUser() user: User,
    // @Ip() ip: string,
  ) {
    return await this.companyService.updateCompanyData(
      data._id,
      data.requestData,
    );
  }

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
