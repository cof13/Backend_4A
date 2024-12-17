import { DataSource } from "typeorm";
import { Categoria } from "./entities/categoria.entity";

export const CategoriaProviders=[
    {
        provide:'CATEGORIA_REPOSITORY',
        useFactory: (dataSource:DataSource)=>dataSource.getRepository(Categoria),
        inject:['DATABASE_CONNECTION']
    }
]