# Migration `20200423111331-remove-maps`

This migration has been generated by Daniel Wallace at 4/23/2020, 11:13:31 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."Brand" (
    "created" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" text   ,
    "founded" timestamp(3)   ,
    "id" text  NOT NULL ,
    "name" text  NOT NULL ,
    "slug" text  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."Category" (
    "created" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" text   ,
    "id" text  NOT NULL ,
    "name" text  NOT NULL ,
    "parentId" text   ,
    "slug" text  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."Product" (
    "active" boolean  NOT NULL DEFAULT true,
    "brandId" text  NOT NULL ,
    "categoryId" text  NOT NULL ,
    "created" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "demand" integer  NOT NULL DEFAULT 0,
    "depth" Decimal(65,30)   ,
    "description" text   ,
    "elasticId" text   ,
    "height" Decimal(65,30)   ,
    "id" text  NOT NULL ,
    "images" text []  ,
    "mfr" text   ,
    "name" text  NOT NULL ,
    "popularity" integer  NOT NULL DEFAULT 0,
    "price" Decimal(65,30)  NOT NULL DEFAULT 0,
    "released" timestamp(3)   ,
    "slug" text  NOT NULL ,
    "weight" Decimal(65,30)   ,
    "width" Decimal(65,30)   ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."Inventory" (
    "active" boolean  NOT NULL DEFAULT true,
    "binId" text   ,
    "condition" "InventoryCondition" NOT NULL DEFAULT 'NEW',
    "created" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" text  NOT NULL ,
    "includedEssentials" text []  ,
    "memberId" text   ,
    "orderItemsId" text   ,
    "productId" text  NOT NULL ,
    "return" boolean  NOT NULL DEFAULT false,
    "returnReason" text   ,
    "serial" text   ,
    "sku" text   ,
    "status" "InventoryStatus" NOT NULL DEFAULT 'NEW',
    "userId" text  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."Bin" (
    "cell" integer  NOT NULL ,
    "column" integer  NOT NULL ,
    "created" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "height" Decimal(65,30)  NOT NULL ,
    "id" text  NOT NULL ,
    "location" text  NOT NULL ,
    "row" integer  NOT NULL ,
    "warehouseId" text  NOT NULL ,
    "width" Decimal(65,30)  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."BinFreeNode" (
    "binId" text  NOT NULL ,
    "created" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "height" Decimal(65,30)  NOT NULL ,
    "id" text  NOT NULL ,
    "width" Decimal(65,30)  NOT NULL ,
    "x" Decimal(65,30)  NOT NULL ,
    "y" Decimal(65,30)  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."Address" (
    "city" text  NOT NULL ,
    "company" text   ,
    "country" text  NOT NULL DEFAULT 'US',
    "email" text  NOT NULL ,
    "id" text  NOT NULL ,
    "name" text  NOT NULL ,
    "phone" text   ,
    "residential" boolean  NOT NULL DEFAULT false,
    "shippoId" text  NOT NULL ,
    "state" text  NOT NULL ,
    "street1" text  NOT NULL ,
    "street2" text   ,
    "userId" text  NOT NULL ,
    "zip" text  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."AddressHistory" (
    "action" "DatabaseAction" NOT NULL DEFAULT 'CREATED',
    "addressId" text  NOT NULL ,
    "id" SERIAL,
    "time" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" text  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."Warehouse" (
    "carrierFacility" text  NOT NULL ,
    "city" text  NOT NULL ,
    "country" text  NOT NULL ,
    "created" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" text  NOT NULL ,
    "id" text  NOT NULL ,
    "name" text  NOT NULL ,
    "phone" text  NOT NULL ,
    "residential" boolean  NOT NULL ,
    "shippoId" text  NOT NULL ,
    "state" text  NOT NULL ,
    "street1" text  NOT NULL ,
    "street2" text   ,
    "zip" text  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."Shipment" (
    "addressId" text  NOT NULL ,
    "airbox" boolean  NOT NULL DEFAULT false,
    "carrierDeliveredAt" timestamp(3)  NOT NULL ,
    "carrierReceivedAt" timestamp(3)  NOT NULL ,
    "created" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "depth" Decimal(65,30)  NOT NULL ,
    "direction" "ShipmentDirection" NOT NULL DEFAULT 'OUTBOUND',
    "easyPostId" text  NOT NULL ,
    "estDeliveryDate" timestamp(3)  NOT NULL ,
    "expedited" boolean  NOT NULL DEFAULT false,
    "height" Decimal(65,30)  NOT NULL ,
    "id" text  NOT NULL ,
    "insurance" Decimal(65,30)  NOT NULL ,
    "labelURL" text  NOT NULL ,
    "labelZPL" text  NOT NULL ,
    "pickup" boolean  NOT NULL DEFAULT false,
    "publicURL" text  NOT NULL ,
    "refundStatus" text  NOT NULL ,
    "status" "ShipmentStatus" NOT NULL DEFAULT 'PRETRANSIT',
    "trackingCode" text  NOT NULL ,
    "type" "ShipmentType" NOT NULL DEFAULT 'ACCESS',
    "userId" text  NOT NULL ,
    "uspsZone" text  NOT NULL ,
    "warehouseId" text  NOT NULL ,
    "weight" Decimal(65,30)  NOT NULL ,
    "width" Decimal(65,30)  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."Order" (
    "airbox" boolean  NOT NULL DEFAULT false,
    "canceled" timestamp(3)   ,
    "completed" timestamp(3)   ,
    "confirmed" timestamp(3)   ,
    "coupon" text   ,
    "created" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expedited" boolean  NOT NULL DEFAULT false,
    "id" text  NOT NULL ,
    "plan" text   ,
    "shipKit" boolean  NOT NULL DEFAULT false,
    "userId" text  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."OrderItem" (
    "created" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" text  NOT NULL ,
    "orderId" text  NOT NULL ,
    "productId" text  NOT NULL ,
    "quantity" integer  NOT NULL DEFAULT 1,
    PRIMARY KEY ("id")
) 

ALTER TABLE "public"."_order_inventory" DROP CONSTRAINT IF EXiSTS "_order_inventory_A_fkey",
DROP CONSTRAINT IF EXiSTS "_order_inventory_B_fkey";

ALTER TABLE "public"."_shipment_inventory" DROP CONSTRAINT IF EXiSTS "_shipment_inventory_A_fkey",
DROP CONSTRAINT IF EXiSTS "_shipment_inventory_B_fkey";

ALTER TABLE "public"."address_history" DROP CONSTRAINT IF EXiSTS "address_history_address_id_fkey";

ALTER TABLE "public"."bin" DROP CONSTRAINT IF EXiSTS "bin_warehouse_id_fkey";

ALTER TABLE "public"."bin_free_node" DROP CONSTRAINT IF EXiSTS "bin_free_node_bin_id_fkey";

ALTER TABLE "public"."inventory" DROP CONSTRAINT IF EXiSTS "inventory_bin_id_fkey";

ALTER TABLE "public"."inventory" DROP CONSTRAINT IF EXiSTS "inventory_product_id_fkey";

ALTER TABLE "public"."order_item" DROP CONSTRAINT IF EXiSTS "order_item_order_id_fkey";

ALTER TABLE "public"."order_item" DROP CONSTRAINT IF EXiSTS "order_item_product_id_fkey";

ALTER TABLE "public"."product" DROP CONSTRAINT IF EXiSTS "product_brand_id_fkey";

ALTER TABLE "public"."product" DROP CONSTRAINT IF EXiSTS "product_category_id_fkey";

ALTER TABLE "public"."shipment" DROP CONSTRAINT IF EXiSTS "shipment_address_id_fkey";

ALTER TABLE "public"."shipment" DROP CONSTRAINT IF EXiSTS "shipment_warehouse_id_fkey";

CREATE UNIQUE INDEX "Brand.slug" ON "public"."Brand"("slug")

CREATE UNIQUE INDEX "Category.slug" ON "public"."Category"("slug")

CREATE UNIQUE INDEX "Product.slug" ON "public"."Product"("slug")

ALTER TABLE "public"."Product" ADD FOREIGN KEY ("brandId")REFERENCES "public"."Brand"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Product" ADD FOREIGN KEY ("categoryId")REFERENCES "public"."Category"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Inventory" ADD FOREIGN KEY ("binId")REFERENCES "public"."Bin"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."Inventory" ADD FOREIGN KEY ("productId")REFERENCES "public"."Product"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Bin" ADD FOREIGN KEY ("warehouseId")REFERENCES "public"."Warehouse"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."BinFreeNode" ADD FOREIGN KEY ("binId")REFERENCES "public"."Bin"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."AddressHistory" ADD FOREIGN KEY ("addressId")REFERENCES "public"."Address"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Shipment" ADD FOREIGN KEY ("addressId")REFERENCES "public"."Address"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Shipment" ADD FOREIGN KEY ("warehouseId")REFERENCES "public"."Warehouse"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."OrderItem" ADD FOREIGN KEY ("productId")REFERENCES "public"."Product"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."OrderItem" ADD FOREIGN KEY ("orderId")REFERENCES "public"."Order"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."_order_inventory" ADD FOREIGN KEY ("A")REFERENCES "public"."Inventory"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."_order_inventory" ADD FOREIGN KEY ("B")REFERENCES "public"."Order"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."_shipment_inventory" ADD FOREIGN KEY ("A")REFERENCES "public"."Inventory"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."_shipment_inventory" ADD FOREIGN KEY ("B")REFERENCES "public"."Shipment"("id") ON DELETE CASCADE  ON UPDATE CASCADE

DROP TABLE "public"."address";

DROP TABLE "public"."address_history";

DROP TABLE "public"."bin";

DROP TABLE "public"."bin_free_node";

DROP TABLE "public"."brand";

DROP TABLE "public"."category";

DROP TABLE "public"."inventory";

DROP TABLE "public"."order";

DROP TABLE "public"."order_item";

DROP TABLE "public"."product";

DROP TABLE "public"."shipment";

DROP TABLE "public"."warehouse";
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200423104846-fix-sid-on-address..20200423111331-remove-maps
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
@@ -20,22 +20,18 @@
   description String?
   founded     DateTime?
   created     DateTime  @default(now())
   products    Product[]
-
-  @@map("brand")
 }
 model Category {
   id          String    @default(uuid()) @id
   name        String
   slug        String    @unique
   description String?
-  parentId    String?   @map("parent_id")
+  parentId    String?
   created     DateTime  @default(now())
   products    Product[]
-
-  @@map("category")
 }
 model Product {
   id          String      @default(uuid()) @id
@@ -52,17 +48,15 @@
   price       Float       @default(0)
   popularity  Int         @default(0)
   demand      Int         @default(0)
   released    DateTime?
-  elasticId   String?     @map("elastic_id")
+  elasticId   String?
   created     DateTime    @default(now())
   inventory   Inventory[]
   brand       Brand       @relation(fields: [brandId], references: [id])
-  brandId     String      @map("brand_id")
+  brandId     String
   category    Category    @relation(fields: [categoryId], references: [id])
-  categoryId  String      @map("category_id")
-
-  @@map("product")
+  categoryId  String
 }
 enum InventoryCondition {
   NEW
@@ -96,23 +90,21 @@
   sku                String?
   active             Boolean            @default(true)
   condition          InventoryCondition @default(NEW)
   status             InventoryStatus    @default(NEW)
-  includedEssentials String[]           @map("included_essentials")
-  returnReason       String?            @map("return_reason")
+  includedEssentials String[]
+  returnReason       String?
   return             Boolean            @default(false)
   created            DateTime           @default(now())
   bin                Bin?               @relation(fields: [binId], references: [id])
-  binId              String?            @map("bin_id")
+  binId              String?
   product            Product            @relation(fields: [productId], references: [id])
-  productId          String             @map("product_id")
-  userId             String             @map("user_id")
-  memberId           String?            @map("member_id")
+  productId          String
+  userId             String
+  memberId           String?
   shipments          Shipment[]         @relation("shipment_inventory", references: [id])
   orders             Order[]            @relation("order_inventory", references: [id])
   orderItemsId       String?
-
-  @@map("inventory")
 }
 model Bin {
   id          String        @default(uuid()) @id
@@ -124,12 +116,10 @@
   height      Float
   created     DateTime      @default(now())
   freeNodes   BinFreeNode[]
   warehouse   Warehouse     @relation(fields: [warehouseId], references: [id])
-  warehouseId String        @map("warehouse_id")
+  warehouseId String
   inventory   Inventory[]
-
-  @@map("bin")
 }
 model BinFreeNode {
   id      String   @default(uuid()) @id
@@ -138,16 +128,14 @@
   width   Float
   height  Float
   created DateTime @default(now())
   bin     Bin      @relation(fields: [binId], references: [id])
-  binId   String   @map("bin_id")
-
-  @@map("bin_free_node")
+  binId   String
 }
 model Address {
   id          String           @default(uuid()) @id
-  shippoId    String           @map("shippo_id")
+  shippoId    String
   street1     String
   street2     String?
   city        String
   state       String
@@ -157,24 +145,20 @@
   name        String
   company     String?
   phone       String?
   email       String
-  userId      String           @map("user_id")
+  userId      String
   shipments   Shipment[]
   history     AddressHistory[]
-
-  @@map("address")
 }
 model AddressHistory {
   time      DateTime       @default(now())
   action    DatabaseAction @default(CREATED)
-  userId    String         @map("user_id")
-  addressId String         @map("address_id")
+  userId    String
+  addressId String
   address   Address        @relation(fields: [addressId], references: [id])
   id        Int            @default(autoincrement()) @id
-
-  @@map("address_history")
 }
 model Warehouse {
   id              String   @default(uuid()) @id
@@ -184,16 +168,14 @@
   state           String
   zip             String
   country         String
   residential     Boolean
-  carrierFacility String   @map("carrier_facility")
+  carrierFacility String
   name            String
   phone           String
   email           String
   created         DateTime @default(now())
-  easyPostId      String   @map("easy_post_id")
-
-  @@map("warehouse")
+  shippoId        String
 }
 enum ShipmentDirection {
   INBOUND
@@ -230,27 +212,25 @@
   height             Float
   depth              Float
   weight             Float
   insurance          Float
-  labelURL           String            @map("label_url")
-  labelZPL           String            @map("label_zpl")
-  publicURL          String            @map("public_url")
-  trackingCode       String            @map("tracking_code")
-  uspsZone           String            @map("usps_zone")
-  refundStatus       String            @map("refund_status")
-  carrierDeliveredAt DateTime          @map("carrier_delivered_at")
-  carrierReceivedAt  DateTime          @map("carrier_received_at")
-  estDeliveryDate    DateTime          @map("est_delivery_date")
+  labelURL           String
+  labelZPL           String
+  publicURL          String
+  trackingCode       String
+  uspsZone           String
+  refundStatus       String
+  carrierDeliveredAt DateTime
+  carrierReceivedAt  DateTime
+  estDeliveryDate    DateTime
   created            DateTime          @default(now())
-  easyPostId         String            @map("easy_post_id")
-  userId             String            @map("user_id")
-  addressId          String            @map("address_id")
+  easyPostId         String
+  userId             String
+  addressId          String
   address            Address           @relation(fields: [addressId], references: [id])
-  warehouseId        String            @map("warehouse_id")
+  warehouseId        String
   warehouse          Warehouse         @relation(fields: [warehouseId], references: [id])
   inventory          Inventory[]       @relation("shipment_inventory", references: [id])
-
-  @@map("shipment")
 }
 model Order {
   id        String      @default(uuid()) @id
@@ -263,21 +243,17 @@
   airbox    Boolean     @default(false)
   coupon    String?
   plan      String?
   expedited Boolean     @default(false)
-  userId    String      @map("user_id")
+  userId    String
   items     OrderItem[]
-
-  @@map("order")
 }
 model OrderItem {
   id        String   @default(uuid()) @id
   product   Product  @relation(fields: [productId], references: [id])
-  productId String   @map("product_id")
+  productId String
   quantity  Int      @default(1)
   order     Order    @relation(fields: [orderId], references: [id])
-  orderId   String   @map("order_id")
+  orderId   String
   created   DateTime @default(now())
-
-  @@map("order_item")
 }
```

