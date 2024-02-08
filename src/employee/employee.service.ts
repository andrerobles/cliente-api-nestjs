import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeEntity } from './employee.entity/employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeService {
    constructor(
        @InjectRepository(EmployeeEntity)
        private readonly employeeRepository: Repository<EmployeeEntity>,
    ) { }

    async findAll(): Promise<EmployeeEntity[]> {
        try {
            return await this.employeeRepository.find();
        } catch (error) {
            throw new BadRequestException(`Erro ao retornar funcionários. Detalhes: ${error.message}`);
        }
    }

    async create(employee: Partial<EmployeeEntity>): Promise<EmployeeEntity> {
        if (!employee.name || !employee.email || !employee.phone || !employee.hiringType) {
            throw new BadRequestException('Nome, email, telefone e tipo de contratação são obrigatórios');
        }

        try {
            return await this.employeeRepository.save(employee);
        } catch (error) {
            throw new BadRequestException(`Erro ao criar funcionário. Detalhes: ${error.message}`);
        }
    }

    async getById(id: number): Promise<EmployeeEntity> {
        try {
            return await this.employeeRepository.findOneOrFail({
                where: { id: id },
            });
        } catch (error) {
            if (error.name === 'EntityNotFoundError') {
                throw new NotFoundException(`funcionário com o ID ${id} não encontrado`);
            }
            throw new BadRequestException(`Erro ao buscar funcionário. Detalhes: ${error.message}`);
        }
    }

    async update(id: number, employee: Partial<EmployeeEntity>): Promise<EmployeeEntity> {
        try {
            if (!employee.name || !employee.email || !employee.phone || !employee.hiringType) {
                throw new BadRequestException('Nome, email, telefone e tipo de contratação são obrigatórios');
            }
            await this.getById(id);
            await this.employeeRepository.update(id, employee);
            return await this.employeeRepository.findOne({
                where: { id: id },
            });
        } catch (error) {
            throw new BadRequestException(`Falha ao atualizar o funcionário com o ID ${id}. Detalhes: ${error.message}`);
        }
    }

    async delete(id: number): Promise<EmployeeEntity> {
        try {
            const employee = await this.getById(id); // Caso não seja encontrado já retorna exceção.
            if(employee) {
                await this.employeeRepository.delete(id);
                return employee;
            }
          } catch (error) {
            throw new BadRequestException(`Falha para deletar o funcionário com o ID ${id}. Detalhes: ${error.message}`);
          }
    }
}


