import { CustomerEntity } from "./src/customer/customer.entity/customer.entity"
import { EmployeeEntity } from "./src/employee/employee.entity/employee.entity";
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    migrationsTableName: 'migrations',
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'andre',
    password: 'qwepoi123',
    database: 'prototipo',
    logging: false,
    synchronize: true,
    entities: [CustomerEntity, EmployeeEntity],
});


