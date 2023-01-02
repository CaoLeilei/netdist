import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';

console.log(databaseProviders);

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
