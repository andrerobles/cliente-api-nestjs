import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerEntity } from './customer.entity/customer.entity';

@Controller('customers')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) { }

    //rota: GET customers/
    @Get()
    async findAll(): Promise<CustomerEntity[]> {
        return this.customerService.findAll();
    }

    //rota: POST customers/
    @Post()
    async create(@Body() customer: Partial<CustomerEntity>): Promise<CustomerEntity> {
      return await this.customerService.create(customer);
    }
  
    //rota: GET customers/:id
    @Get(':id')
    async getById(@Param('id') id: string): Promise<CustomerEntity> {
      return await this.customerService.getById(+id);
    }
  
    //rota: PUT customers/:id
    @Put(':id')
    async update(@Param('id') id: string, @Body() customer: Partial<CustomerEntity>): Promise<CustomerEntity> {
      return await this.customerService.update(+id, customer);
    }

    //rota: DELETE customers/:id
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<CustomerEntity> {
      return await this.customerService.delete(+id);
    }
}
