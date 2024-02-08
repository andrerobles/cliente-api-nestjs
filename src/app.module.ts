import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from './customer/customer.entity/customer.entity';
import { EmployeeModule } from './employee/employee.module';
import { EmployeeEntity } from './employee/employee.entity/employee.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "andre",
      password: "qwepoi123",
      database: "facilitajuridico",
      entities: [CustomerEntity, EmployeeEntity],
      synchronize: false
    }),
    CustomerModule,
    EmployeeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
