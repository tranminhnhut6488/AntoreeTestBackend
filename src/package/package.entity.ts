import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Package {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.packages, { eager: true })
    student: User;

    @Column()
    name: string;

    @Column()
    type: string;

    @Column()
    price: number;

    @Column({ default: false })
    isPaid: boolean;
}
