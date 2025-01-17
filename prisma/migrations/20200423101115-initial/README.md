# Migration `20200423101115-initial`

This migration has been generated by Daniel Wallace at 4/23/2020, 10:11:15 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "DatabaseAction" AS ENUM ('CREATED', 'UPDATED', 'DELETED');

CREATE TABLE "public"."brand" (
    "created" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" text   ,
    "founded" timestamp(3)   ,
    "id" text  NOT NULL ,
    "name" text  NOT NULL ,
    "slug" text  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."category" (
    "created" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" text   ,
    "id" text  NOT NULL ,
    "name" text  NOT NULL ,
    "parent_id" text   ,
    "slug" text  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."product" (
    "active" boolean  NOT NULL DEFAULT true,
    "brand_id" text  NOT NULL ,
    "category_id" text  NOT NULL ,
    "created" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "demand" integer  NOT NULL DEFAULT 0,
    "depth" Decimal(65,30)   ,
    "description" text   ,
    "elastic_id" text   ,
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

CREATE TABLE "public"."inventory" (
    "active" boolean  NOT NULL DEFAULT true,
    "bin_id" text   ,
    "condition" "InventoryCondition" NOT NULL DEFAULT 'NEW',
    "created" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" text  NOT NULL ,
    "included_essentials" text []  ,
    "member_id" text   ,
    "orderItemsId" text   ,
    "product_id" text  NOT NULL ,
    "return" boolean  NOT NULL DEFAULT false,
    "return_reason" text   ,
    "serial" text   ,
    "sku" text   ,
    "status" "InventoryStatus" NOT NULL DEFAULT 'NEW',
    "user_id" text  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."bin" (
    "cell" integer  NOT NULL ,
    "column" integer  NOT NULL ,
    "created" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "height" Decimal(65,30)  NOT NULL ,
    "id" text  NOT NULL ,
    "location" text  NOT NULL ,
    "row" integer  NOT NULL ,
    "warehouse_id" text  NOT NULL ,
    "width" Decimal(65,30)  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."bin_free_node" (
    "bin_id" text  NOT NULL ,
    "created" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "height" Decimal(65,30)  NOT NULL ,
    "id" text  NOT NULL ,
    "width" Decimal(65,30)  NOT NULL ,
    "x" Decimal(65,30)  NOT NULL ,
    "y" Decimal(65,30)  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."address" (
    "city" text  NOT NULL ,
    "company" text   ,
    "country" text  NOT NULL DEFAULT 'US',
    "email" text  NOT NULL ,
    "id" text  NOT NULL ,
    "name" text  NOT NULL ,
    "phone" text   ,
    "residential" boolean  NOT NULL DEFAULT false,
    "state" text  NOT NULL ,
    "street1" text  NOT NULL ,
    "street2" text   ,
    "user_id" text  NOT NULL ,
    "zip" text  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."AddressHistory" (
    "action" "DatabaseAction" NOT NULL DEFAULT 'CREATED',
    "address_id" text  NOT NULL ,
    "id" SERIAL,
    "time" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" text  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."warehouse" (
    "carrier_facility" text  NOT NULL ,
    "city" text  NOT NULL ,
    "country" text  NOT NULL ,
    "created" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "easy_post_id" text  NOT NULL ,
    "email" text  NOT NULL ,
    "id" text  NOT NULL ,
    "name" text  NOT NULL ,
    "phone" text  NOT NULL ,
    "residential" boolean  NOT NULL ,
    "state" text  NOT NULL ,
    "street1" text  NOT NULL ,
    "street2" text   ,
    "zip" text  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."shipment" (
    "address_id" text  NOT NULL ,
    "airbox" boolean  NOT NULL DEFAULT false,
    "carrier_delivered_at" timestamp(3)  NOT NULL ,
    "carrier_received_at" timestamp(3)  NOT NULL ,
    "created" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "depth" Decimal(65,30)  NOT NULL ,
    "direction" "ShipmentDirection" NOT NULL DEFAULT 'OUTBOUND',
    "easy_post_id" text  NOT NULL ,
    "est_delivery_date" timestamp(3)  NOT NULL ,
    "expedited" boolean  NOT NULL DEFAULT false,
    "height" Decimal(65,30)  NOT NULL ,
    "id" text  NOT NULL ,
    "insurance" Decimal(65,30)  NOT NULL ,
    "label_url" text  NOT NULL ,
    "label_zpl" text  NOT NULL ,
    "pickup" boolean  NOT NULL DEFAULT false,
    "public_url" text  NOT NULL ,
    "refund_status" text  NOT NULL ,
    "status" "ShipmentStatus" NOT NULL DEFAULT 'PRETRANSIT',
    "tracking_code" text  NOT NULL ,
    "type" "ShipmentType" NOT NULL DEFAULT 'ACCESS',
    "user_id" text  NOT NULL ,
    "usps_zone" text  NOT NULL ,
    "warehouse_id" text  NOT NULL ,
    "weight" Decimal(65,30)  NOT NULL ,
    "width" Decimal(65,30)  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."order" (
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
    "user_id" text  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."order_item" (
    "created" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" text  NOT NULL ,
    "order_id" text  NOT NULL ,
    "product_id" text  NOT NULL ,
    "quantity" integer  NOT NULL DEFAULT 1,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."_shipment_inventory" (
    "A" text  NOT NULL ,
    "B" text  NOT NULL 
) 

CREATE TABLE "public"."_order_inventory" (
    "A" text  NOT NULL ,
    "B" text  NOT NULL 
) 

CREATE UNIQUE INDEX "brand.slug" ON "public"."brand"("slug")

CREATE UNIQUE INDEX "category.slug" ON "public"."category"("slug")

CREATE UNIQUE INDEX "product.slug" ON "public"."product"("slug")

CREATE UNIQUE INDEX "_shipment_inventory_AB_unique" ON "public"."_shipment_inventory"("A","B")

CREATE  INDEX "_shipment_inventory_B_index" ON "public"."_shipment_inventory"("B")

CREATE UNIQUE INDEX "_order_inventory_AB_unique" ON "public"."_order_inventory"("A","B")

CREATE  INDEX "_order_inventory_B_index" ON "public"."_order_inventory"("B")

ALTER TABLE "public"."product" ADD FOREIGN KEY ("brand_id")REFERENCES "public"."brand"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."product" ADD FOREIGN KEY ("category_id")REFERENCES "public"."category"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."inventory" ADD FOREIGN KEY ("bin_id")REFERENCES "public"."bin"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."inventory" ADD FOREIGN KEY ("product_id")REFERENCES "public"."product"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."bin" ADD FOREIGN KEY ("warehouse_id")REFERENCES "public"."warehouse"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."bin_free_node" ADD FOREIGN KEY ("bin_id")REFERENCES "public"."bin"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."AddressHistory" ADD FOREIGN KEY ("address_id")REFERENCES "public"."address"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."shipment" ADD FOREIGN KEY ("address_id")REFERENCES "public"."address"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."shipment" ADD FOREIGN KEY ("warehouse_id")REFERENCES "public"."warehouse"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."order_item" ADD FOREIGN KEY ("product_id")REFERENCES "public"."product"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."order_item" ADD FOREIGN KEY ("order_id")REFERENCES "public"."order"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."_shipment_inventory" ADD FOREIGN KEY ("A")REFERENCES "public"."inventory"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."_shipment_inventory" ADD FOREIGN KEY ("B")REFERENCES "public"."shipment"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."_order_inventory" ADD FOREIGN KEY ("A")REFERENCES "public"."inventory"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."_order_inventory" ADD FOREIGN KEY ("B")REFERENCES "public"."order"("id") ON DELETE CASCADE  ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200423101115-initial
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,280 @@
+datasource db {
+  provider = "postgresql"
+  url      = env("DATABASE_URL")
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+enum DatabaseAction {
+  CREATED
+  UPDATED
+  DELETED
+}
+
+model Brand {
+  id          String    @default(uuid()) @id
+  name        String
+  slug        String    @unique
+  description String?
+  founded     DateTime?
+  created     DateTime  @default(now())
+  products    Product[]
+
+  @@map("brand")
+}
+
+model Category {
+  id          String    @default(uuid()) @id
+  name        String
+  slug        String    @unique
+  description String?
+  parentId    String?   @map("parent_id")
+  created     DateTime  @default(now())
+  products    Product[]
+
+  @@map("category")
+}
+
+model Product {
+  id          String      @default(uuid()) @id
+  name        String
+  slug        String      @unique
+  description String?
+  active      Boolean     @default(true)
+  width       Float?
+  height      Float?
+  depth       Float?
+  weight      Float?
+  images      String[]
+  mfr         String?
+  price       Float       @default(0)
+  popularity  Int         @default(0)
+  demand      Int         @default(0)
+  released    DateTime?
+  elasticId   String?     @map("elastic_id")
+  created     DateTime    @default(now())
+  inventory   Inventory[]
+  brand       Brand       @relation(fields: [brandId], references: [id])
+  brandId     String      @map("brand_id")
+  category    Category    @relation(fields: [categoryId], references: [id])
+  categoryId  String      @map("category_id")
+
+  @@map("product")
+}
+
+enum InventoryCondition {
+  NEW
+  LIKENEW
+  EXCELLENT
+  USED
+  DAMAGED
+}
+
+enum InventoryStatus {
+  NEW
+  PENDING
+  ACCEPTED
+  ENROUTEWAREHOUSE
+  INSPECTING
+  INWAREHOUSE
+  SHIPMENTPREP
+  ENROUTEMEMBER
+  WITHMEMBER
+  RETURNING
+  OUTOFSERVICE
+  ENROUTEOWNER
+  RETURNED
+  STOLEN
+  LOST
+}
+
+model Inventory {
+  id                 String             @default(uuid()) @id
+  serial             String?
+  sku                String?
+  active             Boolean            @default(true)
+  condition          InventoryCondition @default(NEW)
+  status             InventoryStatus    @default(NEW)
+  includedEssentials String[]           @map("included_essentials")
+  returnReason       String?            @map("return_reason")
+  return             Boolean            @default(false)
+  created            DateTime           @default(now())
+  bin                Bin?               @relation(fields: [binId], references: [id])
+  binId              String?            @map("bin_id")
+  product            Product            @relation(fields: [productId], references: [id])
+  productId          String             @map("product_id")
+  userId             String             @map("user_id")
+  memberId           String?            @map("member_id")
+  shipments          Shipment[]         @relation("shipment_inventory", references: [id])
+  orders             Order[]            @relation("order_inventory", references: [id])
+  orderItemsId       String?
+
+  @@map("inventory")
+}
+
+model Bin {
+  id          String        @default(uuid()) @id
+  cell        Int
+  column      Int
+  row         Int
+  location    String
+  width       Float
+  height      Float
+  created     DateTime      @default(now())
+  freeNodes   BinFreeNode[]
+  warehouse   Warehouse     @relation(fields: [warehouseId], references: [id])
+  warehouseId String        @map("warehouse_id")
+  inventory   Inventory[]
+
+  @@map("bin")
+}
+
+model BinFreeNode {
+  id      String   @default(uuid()) @id
+  x       Float
+  y       Float
+  width   Float
+  height  Float
+  created DateTime @default(now())
+  bin     Bin      @relation(fields: [binId], references: [id])
+  binId   String   @map("bin_id")
+
+  @@map("bin_free_node")
+}
+
+model Address {
+  id          String           @id
+  street1     String
+  street2     String?
+  city        String
+  state       String
+  zip         String
+  country     String           @default("US")
+  residential Boolean          @default(false)
+  name        String
+  company     String?
+  phone       String?
+  email       String
+  userId      String           @map("user_id")
+  shipments   Shipment[]
+  history     AddressHistory[]
+
+  @@map("address")
+}
+
+model AddressHistory {
+  time      DateTime       @default(now())
+  action    DatabaseAction @default(CREATED)
+  userId    String         @map("user_id")
+  addressId String         @map("address_id")
+  address   Address        @relation(fields: [addressId], references: [id])
+  id        Int            @default(autoincrement()) @id
+}
+
+model Warehouse {
+  id              String   @default(uuid()) @id
+  street1         String
+  street2         String?
+  city            String
+  state           String
+  zip             String
+  country         String
+  residential     Boolean
+  carrierFacility String   @map("carrier_facility")
+  name            String
+  phone           String
+  email           String
+  created         DateTime @default(now())
+  easyPostId      String   @map("easy_post_id")
+
+  @@map("warehouse")
+}
+
+enum ShipmentDirection {
+  INBOUND
+  OUTBOUND
+}
+
+enum ShipmentStatus {
+  UNKNOWN
+  PRETRANSIT
+  INTRANSIT
+  OUTFORDELIVERY
+  DELIVERED
+  AVAILABLEFORPICKUP
+  RETURNTOSENDER
+  FAILURE
+  CANCELLED
+  ERROR
+}
+
+enum ShipmentType {
+  ACCESS
+  EARN
+}
+
+model Shipment {
+  id                 String            @default(uuid()) @id
+  pickup             Boolean           @default(false)
+  airbox             Boolean           @default(false)
+  expedited          Boolean           @default(false)
+  direction          ShipmentDirection @default(OUTBOUND)
+  type               ShipmentType      @default(ACCESS)
+  status             ShipmentStatus    @default(PRETRANSIT)
+  width              Float
+  height             Float
+  depth              Float
+  weight             Float
+  insurance          Float
+  labelURL           String            @map("label_url")
+  labelZPL           String            @map("label_zpl")
+  publicURL          String            @map("public_url")
+  trackingCode       String            @map("tracking_code")
+  uspsZone           String            @map("usps_zone")
+  refundStatus       String            @map("refund_status")
+  carrierDeliveredAt DateTime          @map("carrier_delivered_at")
+  carrierReceivedAt  DateTime          @map("carrier_received_at")
+  estDeliveryDate    DateTime          @map("est_delivery_date")
+  created            DateTime          @default(now())
+  easyPostId         String            @map("easy_post_id")
+  userId             String            @map("user_id")
+  addressId          String            @map("address_id")
+  address            Address           @relation(fields: [addressId], references: [id])
+  warehouseId        String            @map("warehouse_id")
+  warehouse          Warehouse         @relation(fields: [warehouseId], references: [id])
+  inventory          Inventory[]       @relation("shipment_inventory", references: [id])
+
+  @@map("shipment")
+}
+
+model Order {
+  id        String      @default(uuid()) @id
+  inventory Inventory[] @relation("order_inventory", references: [id])
+  created   DateTime    @default(now())
+  canceled  DateTime?
+  completed DateTime?
+  confirmed DateTime?
+  shipKit   Boolean     @default(false)
+  airbox    Boolean     @default(false)
+  coupon    String?
+  plan      String?
+  expedited Boolean     @default(false)
+  userId    String      @map("user_id")
+  items     OrderItem[]
+
+  @@map("order")
+}
+
+model OrderItem {
+  id        String   @default(uuid()) @id
+  product   Product  @relation(fields: [productId], references: [id])
+  productId String   @map("product_id")
+  quantity  Int      @default(1)
+  order     Order    @relation(fields: [orderId], references: [id])
+  orderId   String   @map("order_id")
+  created   DateTime @default(now())
+
+  @@map("order_item")
+}
```


