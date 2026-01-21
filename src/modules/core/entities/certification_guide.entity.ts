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
//import { TouristGuideEntity } from '@modules/core/entities/tourist-guide.entity';

@Entity('certification_guides', { schema: 'core' })
export class CertificationGuideEntity {
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
  //@ManyToOne(() => TouristGuideEntity)
  //@JoinColumn({ name: 'guide_id' })
  //guide: TouristGuideEntity;

  @Column({ name: 'guide_id', type: 'uuid' })
  guideId: string;

  @ManyToOne(() => CatalogueEntity)
  @JoinColumn({ name: 'certification_id' })
  certification: CatalogueEntity;

  @Column({ name: 'certification_id', type: 'uuid' })
  certificationId: string;

  /** Columns **/
  @Column({
    name: 'issue_date',
    type: 'varchar',
    comment: 'Fecha de emision',
  })
  issueDate: Date;

  @Column({
    name: 'expiration_date',
    type: 'varchar',
    comment: 'Fecha de vencimiento',
  })
  expirationDate: Date;
}
