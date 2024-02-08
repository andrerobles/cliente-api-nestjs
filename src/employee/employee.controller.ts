import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeEntity } from './employee.entity/employee.entity';

@Controller('employees')
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) { }

    //rota: GET employees/
    @Get()
    async findAll(): Promise<EmployeeEntity[]> {
        return this.employeeService.findAll();
    }

    //rota: POST employees/
    @Post()
    async create(@Body() customer: Partial<EmployeeEntity>): Promise<EmployeeEntity> {
      return await this.employeeService.create(customer);
    }
  
    //rota: GET employees/:id
    @Get(':id')
    async getById(@Param('id') id: string): Promise<EmployeeEntity> {
      return await this.employeeService.getById(+id);
    }
  
    //rota: PUT employees/:id
    @Put(':id')
    async update(@Param('id') id: string, @Body() customer: Partial<EmployeeEntity>): Promise<EmployeeEntity> {
      return await this.employeeService.update(+id, customer);
    }

    //rota: DELETE employees/:id
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<EmployeeEntity> {
      return await this.employeeService.delete(+id);
    }
}
