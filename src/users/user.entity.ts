import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Booking } from '../bookings/booking.entity';
import { Package } from '../package/package.entity';


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    passwordHash: string;

    @Column({ default: 'student' })
    role: 'student' | 'teacher';

    @OneToMany(() => Booking, (b) => b.student)
    bookings?: Booking[];

    @OneToMany(() => Package, (pkg) => pkg.student)
    packages?: Package[];
}
