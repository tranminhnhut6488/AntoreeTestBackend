import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Booking } from 'src/bookings/booking.entity';


@Entity()
export class Teacher {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, { eager: true })
    user: User;

    @OneToMany(() => Booking, (booking) => booking.teacher)
    bookings: Booking[];

    @Column()
    image: string;

    @Column()
    expertise: string;

    @Column('float')
    pricePerHour: number;

    @Column('text')
    bio: string;
}
