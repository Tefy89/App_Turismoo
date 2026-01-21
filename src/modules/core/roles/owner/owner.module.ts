import { Global, Module } from '@nestjs/common';
import { CatalogueModule } from '@modules/common/catalogue/catalogue.module';
import { FileModule } from '@modules/common/file/file.module';
import { MailModule } from '@modules/common/mail/mail.module';
import { controllers } from '@modules/core/roles/owner/controllers';
import { coreProviders } from '@modules/core/core.provider';
import { SharedCoreModule } from '@modules/core/shared-core/shared-core.module';
import { ReportsModule } from '@modules/reports/reports.module';
import { PlacesService } from './services/place.service';
import { SocialNetworksService } from './services/social-networks.service';
import { PlaceSchedulesService } from './services/place-schedules.service';
import { ShiftsService } from './services/shifts.service';
import { EntranceFeesService } from './services/entrance-fee.service';
import { PlaceStylesService } from './services/place-style.service';
import { TourGuideLanguagesService } from './services/tour-guide-languaje.service';
import { TourGuidesService } from './services/tour-guide.service';

@Global()
@Module({
  imports: [CatalogueModule, FileModule, MailModule, SharedCoreModule, ReportsModule],
  controllers,
  providers: [
    ...coreProviders,
    PlacesService,
    SocialNetworksService,
    PlaceSchedulesService,
    ShiftsService,
    EntranceFeesService,
    PlaceStylesService,
    TourGuideLanguagesService,
    TourGuidesService,
  ],
  exports: [],
})
export class OwnerModule {}
