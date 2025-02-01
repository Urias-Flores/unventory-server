import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

//Configurations
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

//Entities
import { EmployeeEntity } from './employee/employee.entity';
import { UserEntity } from './user/user.entity';

//Modules
import { EmployeeModule } from './employee/employee.module';
import { UserModule } from './user/user.module';
import { BalanceModule } from './balance/balance.module';
import { BalanceDetailModule } from './balance-detail/balance-detail.module';
import { CategoryModule } from './category/category.module';
import { ClientModule } from './client/client.module';
import { BuyModule } from './buy/buy.module';
import { BuyDetailModule } from './buy-detail/buy-detail.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { QuoteModule } from './quote/quote.module';
import { QuoteDetailModule } from './quote-detail/quote-detail.module';
import { ExpenseModule } from './expense/expense.module';
import { InventoryModule } from './inventory/inventory.module';
import { InventoryActionModule } from './inventory-action/inventory-action.module';
import { BrandModule } from './brand/brand.module';
import { NotificationModule } from './notification/notification.module';
import { ProductModule } from './product/product.module';
import { SupplierModule } from './supplier/supplier.module';
import { RequestModule } from './request/request.module';
import { RequestDetailModule } from './request-detail/request-detail.module';
import { SaleModule } from './sale/sale.module';
import { SaleDetailModule } from './sale-detail/sale-detail.module';
import { PayModule } from './pay/pay.module';
import { BalanceEntity } from './balance/balance.entity';
import { BalanceDetailEntity } from './balance-detail/balance-detail.entity';
import { BrandEntity } from './brand/brand.entity';
import { BuyEntity } from './buy/buy.entity';
import { BuyDetailEntity } from './buy-detail/buy-detail.entity';
import { CategoryEntity } from './category/category.entity';
import { ClientEntity } from './client/client.entity';
import { ConfigurationEntity } from './configuration/configuration.entity';
import { ExpenseEntity } from './expense/expense.entity';
import { InventoryEntity } from './inventory/inventory.entity';
import { NotificationEntity } from './notification/notification.entity';
import { PayEntity } from './pay/pay.entity';
import { ProductEntity } from './product/product.entity';
import { QuoteEntity } from './quote/quote.entity';
import { QuoteDetailEntity } from './quote-detail/quote-detail.entity';
import { RequestEntity } from './request/request.entity';
import { RequestDetailEntity } from './request-detail/request-detail.entity';
import { SaleEntity } from './sale/sale.entity';
import { SaleDetailEntity } from './sale-detail/sale-detail.entity';
import { SupplierEntity } from './supplier/supplier.entity';
import { InventoryActionEntity } from './inventory-action/inventory-action.entity';
import { UtilitiesModule } from './_utilities/_utilities.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configServices: ConfigService) => ({
        type: 'mysql',
        host: configServices.get('DB_HOST'),
        port: configServices.get('DB_PORT'),
        username: configServices.get('DB_USER'),
        password: configServices.get('DB_PASSWORD'),
        database: configServices.get('DB_NAME'),
        entities: [
          BalanceEntity,
          BalanceDetailEntity,
          BrandEntity,
          BuyEntity,
          BuyDetailEntity,
          CategoryEntity,
          ClientEntity,
          ConfigurationEntity,
          EmployeeEntity,
          ExpenseEntity,
          InventoryEntity,
          InventoryActionEntity,
          NotificationEntity,
          PayEntity,
          ProductEntity,
          QuoteEntity,
          QuoteDetailEntity,
          RequestEntity,
          RequestDetailEntity,
          SaleEntity,
          SaleDetailEntity,
          SupplierEntity,
          UserEntity,
        ],
        synchronize: true,
        ssl: false,
      }),
      inject: [ConfigService],
    }),
    BalanceModule,
    BalanceDetailModule,
    BrandModule,
    BuyModule,
    BuyDetailModule,
    CategoryModule,
    ClientModule,
    ConfigurationModule,
    EmployeeModule,
    ExpenseModule,
    InventoryModule,
    InventoryActionModule,
    NotificationModule,
    PayModule,
    ProductModule,
    QuoteModule,
    QuoteDetailModule,
    RequestModule,
    RequestDetailModule,
    SaleModule,
    SaleDetailModule,
    SupplierModule,
    UserModule,
    UtilitiesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
