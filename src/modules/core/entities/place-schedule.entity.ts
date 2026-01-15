import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { PlaceEntity } from './place.entity';
import { ShiftEntity } from './shift.entity';

@Entity('place_schedules', { schema: 'core' })
export class PlaceSchedulesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_timestampP',
    comment: 'Fecha de creacion del registro',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_timestampP',
    comment: 'Fecha de actualizacion de la ultima actualizacion del registro',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
    comment: 'Fecha de eliminacion del registro',
  })
  deletedAt: Date;

  @Column({
    name: 'enabled',
    type: 'boolean',
    default: true,
    comment: 'true=visible, false=no visible',
  })
  enabled: boolean;

  /** Inverse Relationship **/

  /** Foreign Keys **/
  @ManyToOne(() => PlaceEntity)
  @JoinColumn({ name: 'place_id' })
  place: PlaceEntity;
  @Column({
    type: 'uuid',
    name: 'place_id',
    nullable: true,
    comment: 'llave foranea a lugar',
  })
  placeId: string;

  @ManyToOne(() => ShiftEntity)
  @JoinColumn({ name: 'shift_id' })
  shift: ShiftEntity;
  @Column({
    type: 'uuid',
    name: 'shift_id',
    nullable: true,
    comment: 'llave foranea a lugar',
  })
  shiftId: string;
  /** Columns **/
  @Column({
    name: 'day',
    type: 'varchar',
    comment: 'Dia de la semana',
  })
  day: string;
}
