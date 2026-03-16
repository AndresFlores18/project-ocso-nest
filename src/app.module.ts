import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import { ProductsModule } from './products/products.module';
import {ConfigModule} from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'TheBestPassword',
    database: 'postgres',
    entities: [],
    autoLoadEntities: true,
    synchronize: true,
  }), EmployeesModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
