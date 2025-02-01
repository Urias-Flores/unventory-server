import { Module } from '@nestjs/common';
import { UtilitiesService } from './_utilities.service';

@Module({
  providers: [UtilitiesService],
  exports: [UtilitiesService]
})
export class UtilitiesModule {}
