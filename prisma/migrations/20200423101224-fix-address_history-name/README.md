# Migration `20200423101224-fix-address_history-name`

This migration has been generated by Daniel Wallace at 4/23/2020, 10:12:24 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."address_history" (
    "action" "DatabaseAction" NOT NULL DEFAULT 'CREATED',
    "address_id" text  NOT NULL ,
    "id" SERIAL,
    "time" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" text  NOT NULL ,
    PRIMARY KEY ("id")
) 

ALTER TABLE "public"."inventory" ALTER COLUMN "condition" SET DEFAULT 'NEW',
ALTER COLUMN "status" SET DEFAULT 'NEW';

ALTER TABLE "public"."shipment" ALTER COLUMN "direction" SET DEFAULT 'OUTBOUND',
ALTER COLUMN "status" SET DEFAULT 'PRETRANSIT',
ALTER COLUMN "type" SET DEFAULT 'ACCESS';

ALTER TABLE "public"."AddressHistory" DROP CONSTRAINT IF EXiSTS "AddressHistory_address_id_fkey";

ALTER TABLE "public"."address_history" ADD FOREIGN KEY ("address_id")REFERENCES "public"."address"("id") ON DELETE CASCADE  ON UPDATE CASCADE

DROP TABLE "public"."AddressHistory";
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200423101115-initial..20200423101224-fix-address_history-name
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url      = env("DATABASE_URL")
 }
 generator client {
   provider = "prisma-client-js"
@@ -170,8 +170,10 @@
   userId    String         @map("user_id")
   addressId String         @map("address_id")
   address   Address        @relation(fields: [addressId], references: [id])
   id        Int            @default(autoincrement()) @id
+
+  @@map("address_history")
 }
 model Warehouse {
   id              String   @default(uuid()) @id
```


