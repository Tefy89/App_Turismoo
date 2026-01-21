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
import { CatalogueEntity } from '@modules/common/catalogue/catalogue.entity';
import { TouristRouteEntity } from './tourist_route.entity';
//import { TouristGuideEntity } from './tourist-guide.entity';

@Entity('reservations', { schema: 'core' })
export class ReservationEntity {
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
  @ManyToOne(() => TouristRouteEntity)
  @JoinColumn({ name: 'route_id' })
  route: TouristRouteEntity;

  @Column({ name: 'route_id', type: 'uuid' })
  routeId: string;

  //@ManyToOne(() => TouristGuideEntity)
  //@JoinColumn({ name: 'guide_id' })
  //guide: TouristGuideEntity;

  //@Column({ name: 'guide_id', type: 'uuid' })
  //guideId: string;

  @ManyToOne(() => CatalogueEntity)
  @JoinColumn({ name: 'status_id' })
  status: CatalogueEntity;

  @Column({
    name: 'status',
    type: 'varchar',
    comment: 'Estado de la reservacion',
  })
  statusId: string;

  /** Columns **/
  @Column({
    name: 'date',
    type: 'date',
    comment: 'Fecha',
  })
  date: Date;

  @Column({
    name: 'time',
    type: 'time',
    comment: 'Hora',
  })
  time: string;

  @Column({
    name: 'total_cost',
    type: 'float',
    comment: 'Costo total de la reservacion',
  })
  totalCost: number;
}
