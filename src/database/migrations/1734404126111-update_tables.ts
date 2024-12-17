import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTables1734404126111 implements MigrationInterface {
    name = 'UpdateTables1734404126111'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "persona" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "apellidos" character varying NOT NULL, CONSTRAINT "PK_13aefc75f60510f2be4cd243d71" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "password" character varying NOT NULL, "mail" character varying NOT NULL, "personaId" integer, CONSTRAINT "REL_92f09d8f74b60402513dbbc6d5" UNIQUE ("personaId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "detalle" character varying NOT NULL, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clientes" ("id" SERIAL NOT NULL, "nombre_completo" character varying NOT NULL, "dni" character varying NOT NULL, "telefono" character varying NOT NULL, CONSTRAINT "PK_d76bf3571d906e4e86470482c08" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pedidos" ("id" SERIAL NOT NULL, "fecha" character varying NOT NULL, "estado" integer NOT NULL, "observaciones" character varying NOT NULL, "clienteId" integer, CONSTRAINT "PK_ebb5680ed29a24efdc586846725" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pedido_producto" ("id" SERIAL NOT NULL, "pedidoId" integer NOT NULL, "productoId" integer NOT NULL, "cantidad" integer NOT NULL, CONSTRAINT "PK_97f69aaf286bdd82afbd487e4d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categoria" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "detalle" character varying NOT NULL, CONSTRAINT "PK_f027836b77b84fb4c3a374dc70d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "producto" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "precio" integer NOT NULL, "stock" integer NOT NULL, "image" character varying NOT NULL, "descripcion" character varying NOT NULL, "estado" boolean NOT NULL, "categoriaId" integer, CONSTRAINT "PK_5be023b11909fe103e24c740c7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles_user" ("rolesId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_f33588d591c00737d7fa6653f6f" PRIMARY KEY ("rolesId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cb0a3e0d85b734d56a4a2205bc" ON "roles_user" ("rolesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f624613332eb30523fd92a1afd" ON "roles_user" ("userId") `);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_92f09d8f74b60402513dbbc6d57" FOREIGN KEY ("personaId") REFERENCES "persona"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pedidos" ADD CONSTRAINT "FK_485346a40b61bb8ae3a98f5400c" FOREIGN KEY ("clienteId") REFERENCES "clientes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pedido_producto" ADD CONSTRAINT "FK_6085b3aa6d0d1aec5985d3cb2ce" FOREIGN KEY ("pedidoId") REFERENCES "pedidos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pedido_producto" ADD CONSTRAINT "FK_da007c96a1af3dbf6a925bf6581" FOREIGN KEY ("productoId") REFERENCES "producto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "producto" ADD CONSTRAINT "FK_6465b0476dcfd393c4808d53b95" FOREIGN KEY ("categoriaId") REFERENCES "categoria"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "roles_user" ADD CONSTRAINT "FK_cb0a3e0d85b734d56a4a2205bc6" FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "roles_user" ADD CONSTRAINT "FK_f624613332eb30523fd92a1afd0" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles_user" DROP CONSTRAINT "FK_f624613332eb30523fd92a1afd0"`);
        await queryRunner.query(`ALTER TABLE "roles_user" DROP CONSTRAINT "FK_cb0a3e0d85b734d56a4a2205bc6"`);
        await queryRunner.query(`ALTER TABLE "producto" DROP CONSTRAINT "FK_6465b0476dcfd393c4808d53b95"`);
        await queryRunner.query(`ALTER TABLE "pedido_producto" DROP CONSTRAINT "FK_da007c96a1af3dbf6a925bf6581"`);
        await queryRunner.query(`ALTER TABLE "pedido_producto" DROP CONSTRAINT "FK_6085b3aa6d0d1aec5985d3cb2ce"`);
        await queryRunner.query(`ALTER TABLE "pedidos" DROP CONSTRAINT "FK_485346a40b61bb8ae3a98f5400c"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_92f09d8f74b60402513dbbc6d57"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f624613332eb30523fd92a1afd"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cb0a3e0d85b734d56a4a2205bc"`);
        await queryRunner.query(`DROP TABLE "roles_user"`);
        await queryRunner.query(`DROP TABLE "producto"`);
        await queryRunner.query(`DROP TABLE "categoria"`);
        await queryRunner.query(`DROP TABLE "pedido_producto"`);
        await queryRunner.query(`DROP TABLE "pedidos"`);
        await queryRunner.query(`DROP TABLE "clientes"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "persona"`);
    }

}
