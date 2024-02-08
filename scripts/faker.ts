import { faker } from '@faker-js/faker/locale/pt_BR';
import { CustomerEntity } from "../src/customer/customer.entity/customer.entity"
import { EmployeeEntity } from "../src/employee/employee.entity/employee.entity";
import { AppDataSource } from '../data-source';


AppDataSource.initialize().then(async () => {
    //Configura dados ficticios
    console.log('Adicionado dados fictícios...');
    for(let i = 0; i < 100; i++) {
        const customer = new CustomerEntity();
        customer.name = faker.person.fullName();
        customer.email = faker.internet.email()
        customer.phone = faker.phone.number();
        customer.locationjson = {
            x: Math.floor(Math.random() * 101),
            y: Math.floor(Math.random() * 101),
        };
        await AppDataSource.manager.save(customer);

        const hiringTypes = ['CLT', 'Estagiário', 'Autônomo'];
        const randomIndex = Math.floor(Math.random() * hiringTypes.length);

        const employer = new EmployeeEntity();
        employer.name = faker.person.fullName();
        employer.email = faker.internet.email()
        employer.phone = faker.phone.number();
        employer.description = faker.lorem.words(10);
        employer.hiringType = hiringTypes[randomIndex];
        await AppDataSource.manager.save(employer);
    }
    console.log('Dados adicionados.');
}).catch(error => console.log(error))
