import { Module } from '@nestjs/common';
import { databaseProvieder } from './database.providers';
import { ConfigService } from 'src/config/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from 'src/config/config.module';
import { User } from 'src/modules/users/entities/user.entity';
import { Persona } from 'src/modules/persona/entities/persona.entity';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports:[ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                type: 'postgres',
                host:config.get('HOST')|| 'localhost',
                port: +config.get('PORT_DB'),
                username: config.get('USERNAME')||'root',
                password: config.get('PASSWORD')||'prueba',
                database: config.get('DATABASE'),
                entities: [__dirname + '/**/*.entity{.ts,.js}', User,Persona],
            })
        })
    ],
    providers:[...databaseProvieder,ConfigService],
    exports:[...databaseProvieder]
})
export class DatabaseModule {}
