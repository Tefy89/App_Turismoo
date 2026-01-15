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
import { PlaceEntity } from './place.entity';

@Entity('social_networks', { schema: 'core' })
export class SocialNetworkEntity {
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

  @ManyToOne(() => CatalogueEntity)
  @JoinColumn({ name: 'platform_id' })
  platform: CatalogueEntity;
  @Column({
    type: 'uuid',
    name: 'platform_id',
    nullable: true,
    comment: 'Plataforma de redes sociales',
  })
  platformId: string;

  /** Columns **/
  @Column({
    name: 'url_red_social',
    type: 'varchar',
    comment: 'Enlace a la red social del lugar',
  })
  urlRedSocial: string;
}
