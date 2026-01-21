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
import { RoutePlaceEntity } from './route_place.entity';

@Entity('tourist_routes', { schema: 'core' })
export class TouristRouteEntity {
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

  @OneToMany(() => RoutePlaceEntity, (routePlace) => routePlace.touristRoute)
  routePlaces: RoutePlaceEntity[];

  /** Foreign Keys **/
  @ManyToOne(() => CatalogueEntity, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: CatalogueEntity;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  /** Columns **/

  @Column({
    name: 'name',
    type: 'varchar',
    comment: 'Nombre',
  })
  name: string;

  @Column({
    name: 'description',
    type: 'text',
    comment: 'Descripcion',
  })
  description: string;

  @Column({
    name: 'duration',
    type: 'float',
    comment: 'Duracion en dias',
  })
  duration: number;

  @Column({
    name: 'creation_date',
    type: 'date',
    comment: 'Fecha de creacion del tour',
  })
  creationDate: Date;
}
