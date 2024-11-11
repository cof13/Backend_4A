import { PedidoProducto } from "../../pedido/entities/pedidoproducto.entity";
import { Categoria } from "../../categoria/entities/categoria.entity";
import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('productos')

export class Producto {
    @PrimaryGeneratedColumn()
    id: number;

    nombre: string;

    precio: number;

    stock: number;

    image: string;

    description: string;

    estado: boolean;

    @ManyToOne(()=>Categoria, (cat)=>cat.producto)
    categoria:  Categoria;

    @OneToMany(()=>PedidoProducto,pedprod=>pedprod.producto)
    pedidoProducto: PedidoProducto[ ];

}
