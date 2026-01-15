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
import { PlaceSchedulesEntity } from './place-schedule.entity';
import { SocialNetworkEntity } from './social-network.entity';
//import { PlaceStyleEntity } from './place-style.entity';
//import { EntranceFeeEntity } from './entrance-fee.entity';
//import { RoutePlaceEntity } from './routeplace.entity';

@Entity('places', { schema: 'core' })
export class PlaceEntity {
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
  @OneToMany(() => SocialNetworkEntity, (socialNetwork) => socialNetwork.place)
  socialNetworks: SocialNetworkEntity[];

  @OneToMany(() => PlaceSchedulesEntity, (schedule) => schedule.place)
  schedules: PlaceSchedulesEntity[];

  /*@OneToMany(() => PlaceStyleEntity, (placeStyle) => placeStyle.place)
  placeStyles: PlaceStyleEntity[];

  @OneToMany(() => EntranceFeeEntity, (entranceFee) => entranceFee.place)
  entranceFees: EntranceFeeEntity[];

  @OneToMany(() => RoutePlaceEntity, (routePlace) => routePlace.place)
  routePlaces: RoutePlaceEntity[];*/

  /** Foreign Keys — Catalogue **/
  @ManyToOne(() => CatalogueEntity)
  @JoinColumn({ name: 'place_category_id' })
  placeCategory: CatalogueEntity;

  @Column({
    name: 'place_category_id',
    type: 'uuid',
    nullable: false,
    comment: 'Llave foranea de la tabla catalogue (place_category)',
  })
  placeCategoryId: string;

  @ManyToOne(() => CatalogueEntity)
  @JoinColumn({ name: 'religious_order_id' })
  religiousOrder: CatalogueEntity;

  @Column({
    name: 'religious_order_id',
    type: 'uuid',
    nullable: true,
    comment: 'Llave foranea de la tabla catalogue (religious_order)',
  })
  religiousOrderId: string;

  /** Columns **/
  @Column({
    name: 'name',
    type: 'varchar',
    comment: 'Nombre del lugar',
  })
  name: string;

  @Column({
    name: 'description',
    type: 'text',
    comment: 'Descripción del lugar',
  })
  description: string;

  @Column({
    name: 'address',
    type: 'varchar',
    comment: 'Dirección del lugar',
  })
  address: string;

  @Column({
    name: 'latitude',
    type: 'float',
    comment: 'Coordenada geográfica latitud',
  })
  latitude: number;

  @Column({
    name: 'longitude',
    type: 'float',
    comment: 'Coordenada geográfica longitud',
  })
  longitude: number;

  @Column({
    name: 'area',
    type: 'float',
    comment: 'Área del lugar',
  })
  area: number;

  @Column({
    name: 'relevant_data',
    type: 'text',
    comment: 'Datos relevantes del lugar',
  })
  relevantData: string;
}
