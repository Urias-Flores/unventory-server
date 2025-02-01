import { Module } from '@nestjs/common';
import { BrandController } from './brand.controller';
import { BrandService } from './brand.service';
import { BrandEntity } from "./brand.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([BrandEntity])],
  controllers: [BrandController],
  providers: [BrandService]
})
export class BrandModule {}
