import {MigrationInterface, QueryRunner} from "typeorm";

export class DatabaseContent1726593990884 implements MigrationInterface {
    name = 'DatabaseContent1726593990884'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "subscription_type" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_13bf5fb01dc4c8909a555120da5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "surname" character varying NOT NULL, "login" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, "paymentDate" TIMESTAMP NOT NULL, "subscription_id" integer, CONSTRAINT "UQ_a62473490b3e4578fd683235c5e" UNIQUE ("login"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "studio" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_4c17ecb2b175322407ebbaef5c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "show" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "imdbRating" integer NOT NULL, "description" character varying NOT NULL, "posterUrl" character varying NOT NULL, "type" character varying NOT NULL, "releaseYear" integer NOT NULL, "endYear" integer NOT NULL, "subscription_id" integer, "studio_id" integer, CONSTRAINT "PK_e9993c2777c1d0907e845fce4d1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "content" ("id" SERIAL NOT NULL, "seasonNumber" integer NOT NULL, "episodeNumber" integer NOT NULL, "contentUrl" character varying NOT NULL, "show_id" integer, CONSTRAINT "PK_6a2083913f3647b44f205204e36" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_ec4e57f4138e339fb111948a16f" FOREIGN KEY ("subscription_id") REFERENCES "subscription_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "show" ADD CONSTRAINT "FK_906a035321c42689a47b603a67c" FOREIGN KEY ("subscription_id") REFERENCES "subscription_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "show" ADD CONSTRAINT "FK_0d14bd4b84ea3f599ac80acc0f3" FOREIGN KEY ("studio_id") REFERENCES "studio"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "content" ADD CONSTRAINT "FK_a2121b2ee2677d91b0ffca3e850" FOREIGN KEY ("show_id") REFERENCES "show"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "content" DROP CONSTRAINT "FK_a2121b2ee2677d91b0ffca3e850"`);
        await queryRunner.query(`ALTER TABLE "show" DROP CONSTRAINT "FK_0d14bd4b84ea3f599ac80acc0f3"`);
        await queryRunner.query(`ALTER TABLE "show" DROP CONSTRAINT "FK_906a035321c42689a47b603a67c"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_ec4e57f4138e339fb111948a16f"`);
        await queryRunner.query(`DROP TABLE "content"`);
        await queryRunner.query(`DROP TABLE "show"`);
        await queryRunner.query(`DROP TABLE "studio"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "subscription_type"`);
    }

}
