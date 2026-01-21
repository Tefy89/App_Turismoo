import { DataSource } from 'typeorm';
import { ConfigEnum, CoreRepositoryEnum } from '@utils/enums';
import {
  //estefany
  PlaceEntity,
  ShiftEntity,
  SocialNetworkEntity,
  PlaceSchedulesEntity,
  //melanie
  TouristRouteEntity,
  RoutePlaceEntity,
  ReservationEntity,
  CertificationGuideEntity,
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
    provide: CoreRepositoryEnum.PLACE_SCHEDULES_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(PlaceSchedulesEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },

  {
    provide: CoreRepositoryEnum.TOURIST_ROUTE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(TouristRouteEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },

  {
    provide: CoreRepositoryEnum.ROUTE_PLACE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(RoutePlaceEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },

  {
    provide: CoreRepositoryEnum.RESERVATION_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(ReservationEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },

  {
    provide: CoreRepositoryEnum.CERTIFICATION_GUIDE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(CertificationGuideEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },
];
