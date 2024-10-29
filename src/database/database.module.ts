import { Module } from '@nestjs/common';
import { databaseProvider } from './database.providers';

@Module({
    providers: [ ...databaseProvider]
})
export class DatabaseModule {}
