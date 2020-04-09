# Migration `20200409143454-initial`

This migration has been generated by Daniel Wallace at 4/9/2020, 2:34:54 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."brand" (
    "created" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" text  NOT NULL ,
    "founded" timestamp(3)  NOT NULL ,
    "id" text  NOT NULL ,
    "name" text  NOT NULL ,
    "slug" text  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."category" (
    "created" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" text  NOT NULL ,
    "id" text  NOT NULL ,
    "name" text  NOT NULL ,
    "parent_id" text  NOT NULL ,
    "slug" text  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."product" (
    "active" boolean  NOT NULL DEFAULT true,
    "brand_id" text  NOT NULL ,
    "category_id" text  NOT NULL ,
    "created" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "demand" integer  NOT NULL ,
    "depth" Decimal(65,30)  NOT NULL ,
    "description" text  NOT NULL ,
    "elastic_id" text  NOT NULL ,
    "height" Decimal(65,30)  NOT NULL ,
    "id" text  NOT NULL ,
    "images" text []  ,
    "mfr" text  NOT NULL ,
    "name" text  NOT NULL ,
    "popularity" integer  NOT NULL ,
    "price" Decimal(65,30)  NOT NULL ,
    "released" timestamp(3)  NOT NULL ,
    "slug" text  NOT NULL ,
    "weight" Decimal(65,30)  NOT NULL ,
    "width" Decimal(65,30)  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."inventory" (
    "active" boolean  NOT NULL DEFAULT true,
    "bin_id" text  NOT NULL ,
    "condition" "InventoryCondition" NOT NULL DEFAULT 'NEW',
    "created" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" text  NOT NULL ,
    "included_essentials" text []  ,
    "member_id" text  NOT NULL ,
    "product_id" text  NOT NULL ,
    "return" boolean  NOT NULL DEFAULT false,
    "return_reason" text  NOT NULL ,
    "serial" text  NOT NULL ,
    "sku" text  NOT NULL ,
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
    "location" integer  NOT NULL ,
    "row" integer  NOT NULL ,
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
    "carrier_facility" text  NOT NULL ,
    "city" text  NOT NULL ,
    "company" text  NOT NULL ,
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
    "street2" text  NOT NULL ,
    "user_id" text  NOT NULL ,
    "zip" text  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."warehouse" (
    "carrier_facility" text  NOT NULL ,
    "city" text  NOT NULL ,
    "company" text  NOT NULL ,
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
    "street2" text  NOT NULL ,
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
    "airbox" boolean  NOT NULL ,
    "canceled" timestamp(3)  NOT NULL ,
    "completed" timestamp(3)  NOT NULL ,
    "confirmed" timestamp(3)  NOT NULL ,
    "coupon" text  NOT NULL ,
    "created" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expedited" boolean  NOT NULL ,
    "id" text  NOT NULL ,
    "plan" text  NOT NULL ,
    "productId" text   ,
    "shipKit" boolean  NOT NULL ,
    "user_id" text  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."_order_product" (
    "A" text  NOT NULL ,
    "B" text  NOT NULL 
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

CREATE UNIQUE INDEX "_order_product_AB_unique" ON "public"."_order_product"("A","B")

CREATE  INDEX "_order_product_B_index" ON "public"."_order_product"("B")

CREATE UNIQUE INDEX "_shipment_inventory_AB_unique" ON "public"."_shipment_inventory"("A","B")

CREATE  INDEX "_shipment_inventory_B_index" ON "public"."_shipment_inventory"("B")

CREATE UNIQUE INDEX "_order_inventory_AB_unique" ON "public"."_order_inventory"("A","B")

CREATE  INDEX "_order_inventory_B_index" ON "public"."_order_inventory"("B")

ALTER TABLE "public"."product" ADD FOREIGN KEY ("brand_id")REFERENCES "public"."brand"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."product" ADD FOREIGN KEY ("category_id")REFERENCES "public"."category"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."inventory" ADD FOREIGN KEY ("bin_id")REFERENCES "public"."bin"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."inventory" ADD FOREIGN KEY ("product_id")REFERENCES "public"."product"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."bin_free_node" ADD FOREIGN KEY ("bin_id")REFERENCES "public"."bin"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."shipment" ADD FOREIGN KEY ("address_id")REFERENCES "public"."address"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."shipment" ADD FOREIGN KEY ("warehouse_id")REFERENCES "public"."warehouse"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."_order_product" ADD FOREIGN KEY ("A")REFERENCES "public"."order"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."_order_product" ADD FOREIGN KEY ("B")REFERENCES "public"."product"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."_shipment_inventory" ADD FOREIGN KEY ("A")REFERENCES "public"."inventory"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."_shipment_inventory" ADD FOREIGN KEY ("B")REFERENCES "public"."shipment"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."_order_inventory" ADD FOREIGN KEY ("A")REFERENCES "public"."inventory"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."_order_inventory" ADD FOREIGN KEY ("B")REFERENCES "public"."order"("id") ON DELETE CASCADE  ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200409143454-initial
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,255 @@
+datasource db {
+  provider = "postgresql"
+  url      = env("DATABASE_URL")
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model Brand {
+  id          String    @default(cuid()) @id
+  name        String
+  slug        String    @unique
+  description String
+  founded     DateTime
+  created     DateTime  @default(now())
+  products    Product[]
+
+  @@map("brand")
+}
+
+model Category {
+  id          String    @default(cuid()) @id
+  name        String
+  slug        String    @unique
+  description String
+  parentId    String    @map("parent_id")
+  created     DateTime  @default(now())
+  products    Product[]
+
+  @@map("category")
+}
+
+model Product {
+  id          String      @default(cuid()) @id
+  name        String
+  slug        String      @unique
+  description String
+  active      Boolean     @default(true)
+  width       Float
+  height      Float
+  depth       Float
+  weight      Float
+  images      String[]
+  mfr         String
+  price       Float
+  popularity  Int
+  demand      Int
+  released    DateTime
+  elasticId   String      @map("elastic_id")
+  created     DateTime    @default(now())
+  inventory   Inventory[]
+  brand       Brand       @relation(fields: [brandId], references: [id])
+  brandId     String      @map("brand_id")
+  category    Category    @relation(fields: [categoryId], references: [id])
+  categoryId  String      @map("category_id")
+  orders      Order[]     @relation("order_product", references: [id])
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
+  id                 String             @default(cuid()) @id
+  serial             String
+  sku                String
+  active             Boolean            @default(true)
+  condition          InventoryCondition @default(NEW)
+  status             InventoryStatus    @default(NEW)
+  includedEssentials String[]           @map("included_essentials")
+  returnReason       String             @map("return_reason")
+  return             Boolean            @default(false)
+  created            DateTime           @default(now())
+  bin                Bin                @relation(fields: [binId], references: [id])
+  binId              String             @map("bin_id")
+  product            Product            @relation(fields: [productId], references: [id])
+  productId          String             @map("product_id")
+  userId             String             @map("user_id")
+  memberId           String             @map("member_id")
+  shipments          Shipment[]         @relation("shipment_inventory", references: [id])
+  orders             Order[]            @relation("order_inventory", references: [id])
+
+  @@map("inventory")
+}
+
+model Bin {
+  id        String        @default(cuid()) @id
+  cell      Int
+  column    Int
+  row       Int
+  location  Int
+  width     Float
+  height    Float
+  created   DateTime      @default(now())
+  freeNodes BinFreeNode[]
+  inventory Inventory[]
+
+  @@map("bin")
+}
+
+model BinFreeNode {
+  id      String   @default(cuid()) @id
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
+  id              String     @default(cuid()) @id
+  street1         String
+  street2         String
+  city            String
+  state           String
+  zip             String
+  country         String
+  residential     Boolean
+  carrierFacility String     @map("carrier_facility")
+  name            String
+  company         String
+  phone           String
+  email           String
+  created         DateTime   @default(now())
+  easyPostId      String     @map("easy_post_id")
+  userId          String     @map("user_id")
+  shipments       Shipment[]
+
+  @@map("address")
+}
+
+model Warehouse {
+  id              String   @default(cuid()) @id
+  street1         String
+  street2         String
+  city            String
+  state           String
+  zip             String
+  country         String
+  residential     Boolean
+  carrierFacility String   @map("carrier_facility")
+  name            String
+  company         String
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
+  id                 String            @default(cuid()) @id
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
+  id        String      @default(cuid()) @id
+  products  Product[]   @relation("order_product", references: [id])
+  inventory Inventory[] @relation("order_inventory", references: [id])
+  created   DateTime    @default(now())
+  canceled  DateTime
+  completed DateTime
+  confirmed DateTime
+  shipKit   Boolean
+  airbox    Boolean
+  coupon    String
+  plan      String
+  expedited Boolean
+  userId    String      @map("user_id")
+  productId String?
+
+  @@map("order")
+}
```

