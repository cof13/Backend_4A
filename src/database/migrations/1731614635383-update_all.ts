import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateAll1731614635383 implements MigrationInterface {
    name = 'UpdateAll1731614635383'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "mail" TO "email"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "email" TO "mail"`);
    }

}
