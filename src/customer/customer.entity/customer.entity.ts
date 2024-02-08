import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

type locationType = {
    x: number,
    y: number
}

@Entity({ name: 'customers' })
export class CustomerEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column({ type: 'jsonb', nullable: true })
    locationjson: locationType
}
