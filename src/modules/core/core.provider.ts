import { DataSource } from 'typeorm';
import { ConfigEnum, CoreRepositoryEnum } from '@utils/enums';
import {
  //estefany
  PlaceEntity,
  ShiftEntity,
  SocialNetworkEntity,
  PlaceSchedulesEntity,
  EntranceFeeEntity,
  PlaceStyleEntity,
  TourGuideEntity,
  TourGuideLanguageEntity,
} from '@modules/core/entities';

export const coreProviders = [
  {
    provide: CoreRepositoryEnum.PLACE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(PlaceEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },

  {
    provide: CoreRepositoryEnum.SHIFT_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(ShiftEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },

  {
    provide: CoreRepositoryEnum.SOCIAL_NETWORK_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(SocialNetworkEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },

  {
    provide: CoreRepositoryEnum.PLACE_SCHEDULE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(PlaceSchedulesEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },

  //luis
  {
    provide: CoreRepositoryEnum.ENTRANCE_FEE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(EntranceFeeEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },

  {
    provide: CoreRepositoryEnum.PLACE_STYLE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(PlaceStyleEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },

  {
    provide: CoreRepositoryEnum.TOUR_GUIDE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(TourGuideEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },

  {
    provide: CoreRepositoryEnum.TOUR_GUIDE_LANGUAGE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(TourGuideLanguageEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },
];
