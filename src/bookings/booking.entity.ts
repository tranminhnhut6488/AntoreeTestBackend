import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Teacher } from '../teachers/teacher.entity';


@Entity()
export class Booking {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.bookings, { eager: true })
    student: User;

    @ManyToOne(() => Teacher, (teacher) => teacher.bookings, { eager: true })
    teacher: Teacher;

    @Column()
    date: string;

    @Column()
    status: string;
}
