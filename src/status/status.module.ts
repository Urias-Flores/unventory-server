import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusService } from './status.service';
import { StatusApiController } from './status.controller';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [StatusApiController],
  providers: [StatusService],
})
export class StatusModule {}
