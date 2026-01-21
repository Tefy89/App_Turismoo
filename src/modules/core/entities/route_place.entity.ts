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
import { TouristRouteEntity } from './tourist_route.entity';

@Entity('route_places', { schema: 'core' })
export class RoutePlaceEntity {
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
  // 👉 Ruta turística
  @ManyToOne(() => TouristRouteEntity)
  @JoinColumn({ name: 'tourist_route_id' })
  touristRoute: TouristRouteEntity;

  @Column({
    name: 'tourist_route_id',
    type: 'uuid',
    nullable: false,
    comment: 'rutas turísticas',
  })
  touristRouteId: string;

  // Lugar
  @ManyToOne(() => PlaceEntity)
  @JoinColumn({ name: 'place_id' })
  place: PlaceEntity;

  @Column({
    name: 'place_id',
    type: 'uuid',
    nullable: false,
    comment: 'lugares',
  })
  placeId: string;

  /** Columns **/
  @Column({
    name: 'visit_order',
    type: 'integer',
    comment: 'Orden de visita del lugar en la ruta',
  })
  visitOrder: number;
}
