import { DataSource } from "typeorm"

export const databaseProvider=[
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: () => {
            const dataSource = new DataSource({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: '1234',
                database: 'back_nest_angular_CO'
            });
            return dataSource.initialize();
        }
    }
]