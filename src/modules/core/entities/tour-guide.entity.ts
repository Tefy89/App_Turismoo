import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CatalogueEntity } from '@modules/common/catalogue/catalogue.entity';
import { ClassificationEntity } from '@modules/core/entities/classification.entity';
import { UserEntity } from '@auth/entities';
import { TourGuideLanguageEntity } from './tour-guide-languaje.entity';

@Entity('tour-guides', { schema: 'core' })
export class TourGuideEntity {
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
  @OneToMany(() => TourGuideLanguageEntity, (entity) => entity.tourGuide)
  languages: TourGuideLanguageEntity[];

  /** Foreign Keys **/
  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
  @Column({
    type: 'uuid',
    name: 'user_id',
    nullable: true,
    comment: 'Usuario asociado al guia turistico',
  })
  userId: string;

  /** Columns **/
   @Column({
    name: 'available',
    type: 'boolean',
    comment: 'Disponibilidad del guia',
  })
  available: boolean;

  @Column({
    name: 'hourly_rate',
    type: 'float',
    comment: 'Tarifa por hora',
  })
  hourlyRate: number;
}