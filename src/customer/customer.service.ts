import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerEntity } from './customer.entity/customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(CustomerEntity)
        private readonly customerRepository: Repository<CustomerEntity>,
    ) { }

    async findAll(): Promise<CustomerEntity[]> {
        try {
            return await this.customerRepository.find();
        } catch (error) {
            throw new BadRequestException(`Erro ao retornar clientes. Detalhes: ${error.message}`);
        }
    }

    async create(customer: Partial<CustomerEntity>): Promise<CustomerEntity> {
        if (!customer.name || !customer.email || !customer.phone || !customer.locationjson) {
            throw new BadRequestException('Nome, email, telefone e localização são obrigatórios');
        }

        try {
            return await this.customerRepository.save(customer);
        } catch (error) {
            throw new BadRequestException(`Erro ao criar cliente. Detalhes: ${error.message}`);
        }
    }

    async getById(id: number): Promise<CustomerEntity> {
        try {
            return await this.customerRepository.findOneOrFail({
                where: { id: id },
            });
        } catch (error) {
            if (error.name === 'EntityNotFoundError') {
                throw new NotFoundException(`Cliente com o ID ${id} não encontrado`);
            }
            throw new BadRequestException(`Erro ao buscar cliente. Detalhes: ${error.message}`);
        }
    }

    async update(id: number, customer: Partial<CustomerEntity>): Promise<CustomerEntity> {
        try {
            if (!customer.name || !customer.email || !customer.phone || !customer.locationjson) {
                throw new BadRequestException('Nome, email, telefone e localização são obrigatórios');
            }
            await this.getById(id);
            await this.customerRepository.update(id, customer);
            return await this.customerRepository.findOne({
                where: { id: id },
            });
        } catch (error) {
            throw new BadRequestException(`Falha ao atualizar o cliente com o ID ${id}. Detalhes: ${error.message}`);
        }
    }

    async delete(id: number):  Promise<CustomerEntity> {
        try {
            const customer = await this.getById(id); // Caso não seja encontrado já retorna exceção.
            if(customer) {
                await this.customerRepository.delete(id);
                return customer;
            }
          } catch (error) {
            throw new BadRequestException(`Falha para deletar o cliente com o ID ${id}. Detalhes: ${error.message}`);
          }
    }
}
