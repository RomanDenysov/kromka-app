CREATE TYPE "public"."deliveryType" AS ENUM('pickup', 'delivery');--> statement-breakpoint
CREATE TYPE "public"."inventoryStatus" AS ENUM('inStock', 'soldOut');--> statement-breakpoint
CREATE TYPE "public"."measurementUnit" AS ENUM('g', 'kg', 'pcs', 'ml', 'l', 'ks');--> statement-breakpoint
CREATE TYPE "public"."optionType" AS ENUM('weight', 'quantity', 'volume');--> statement-breakpoint
CREATE TYPE "public"."orderStatus" AS ENUM('notCheckedOut', 'checkoutStarted', 'pending', 'confirmed', 'completed', 'cancelled', 'abandoned');--> statement-breakpoint
CREATE TYPE "public"."paymentStatus" AS ENUM('pending', 'confirmed', 'failed', 'refunded');--> statement-breakpoint
CREATE TYPE "public"."paymentType" AS ENUM('inStore', 'card', 'invoice');--> statement-breakpoint
CREATE TYPE "public"."productStatus" AS ENUM('draft', 'active', 'discontinued', 'sold');--> statement-breakpoint
CREATE TYPE "public"."storeRoles" AS ENUM('member', 'manager');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('admin', 'author', 'manager', 'user', 'partner');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "account" (
	"id" text PRIMARY KEY NOT NULL,
	"accountId" text NOT NULL,
	"providerId" text NOT NULL,
	"userId" text NOT NULL,
	"accessToken" text,
	"refreshToken" text,
	"idToken" text,
	"accessTokenExpiresAt" timestamp,
	"refreshTokenExpiresAt" timestamp,
	"scope" text,
	"password" text,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "categories" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"description" text NOT NULL,
	"allowsDelivery" boolean DEFAULT false NOT NULL,
	"isVisible" boolean DEFAULT true,
	"sortOrder" integer DEFAULT 0,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "categories_name_unique" UNIQUE("name"),
	CONSTRAINT "categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ingredients" (
	"name" text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "inventory" (
	"id" text PRIMARY KEY NOT NULL,
	"storeId" text NOT NULL,
	"productId" text NOT NULL,
	"productOptionsSku" text NOT NULL,
	"quantity" integer,
	"inventoryStatus" "inventoryStatus" DEFAULT 'inStock' NOT NULL,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "invitation" (
	"id" text PRIMARY KEY NOT NULL,
	"organizationId" text NOT NULL,
	"email" text NOT NULL,
	"role" text,
	"status" text NOT NULL,
	"expiresAt" timestamp NOT NULL,
	"inviterId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "member" (
	"id" text PRIMARY KEY NOT NULL,
	"organizationId" text NOT NULL,
	"userId" text NOT NULL,
	"role" text NOT NULL,
	"createdAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orderAnalytics" (
	"id" text PRIMARY KEY NOT NULL,
	"orderId" text NOT NULL,
	"deviceFingerprint" text,
	"userAgent" text,
	"ipAddress" text,
	"lastInteractionAt" timestamp DEFAULT now() NOT NULL,
	"checkoutAttempts" integer DEFAULT 0,
	"itemsAddedCount" integer DEFAULT 0,
	"itemsRemovedCount" integer DEFAULT 0,
	"timeToFirstAdd" integer,
	"timeToCheckout" integer,
	"utmSource" text,
	"utmMedium" text,
	"utmCampaign" text,
	"referrer" text,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orderItems" (
	"id" text PRIMARY KEY NOT NULL,
	"orderId" text NOT NULL,
	"productId" text NOT NULL,
	"productOptionsSku" text NOT NULL,
	"quantity" integer NOT NULL,
	"pricePerItem" integer NOT NULL,
	"totalPrice" integer NOT NULL,
	"addedAt" timestamp DEFAULT now(),
	"removedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orders" (
	"id" text PRIMARY KEY NOT NULL,
	"storeId" text,
	"userId" text NOT NULL,
	"status" "orderStatus" DEFAULT 'notCheckedOut' NOT NULL,
	"subtotalPrice" integer DEFAULT 0 NOT NULL,
	"totalPrice" integer DEFAULT 0 NOT NULL,
	"deliveryPrice" integer DEFAULT 0 NOT NULL,
	"deliveryType" "deliveryType",
	"deliveryAddress" text,
	"paymentType" "paymentType" DEFAULT 'inStore',
	"paymentStatus" "paymentStatus" DEFAULT 'pending',
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "organization" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text,
	"logo" text,
	"createdAt" timestamp NOT NULL,
	"metadata" text,
	CONSTRAINT "organization_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "productIngredients" (
	"id" text PRIMARY KEY NOT NULL,
	"productId" text NOT NULL,
	"ingredientName" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "productOptions" (
	"sku" text PRIMARY KEY NOT NULL,
	"productId" text NOT NULL,
	"optionType" "optionType" NOT NULL,
	"unit" "measurementUnit" NOT NULL,
	"value" integer NOT NULL,
	"price" integer NOT NULL,
	"stripePriceId" text,
	"isDefault" boolean DEFAULT false,
	"sortOrder" integer DEFAULT 0,
	CONSTRAINT "productOptions_stripePriceId_unique" UNIQUE("stripePriceId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"description" text NOT NULL,
	"category" text NOT NULL,
	"status" "productStatus" DEFAULT 'draft',
	"sortOrder" integer DEFAULT 0,
	"isVisible" boolean DEFAULT true,
	"stripeId" text,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "products_name_unique" UNIQUE("name"),
	CONSTRAINT "products_slug_unique" UNIQUE("slug"),
	CONSTRAINT "products_stripeId_unique" UNIQUE("stripeId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expiresAt" timestamp NOT NULL,
	"token" text NOT NULL,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL,
	"ipAddress" text,
	"userAgent" text,
	"userId" text NOT NULL,
	"activeOrganizationId" text,
	"impersonatedBy" text,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "storeMembers" (
	"id" text PRIMARY KEY NOT NULL,
	"storeId" text NOT NULL,
	"userId" text NOT NULL,
	"role" "storeRoles" DEFAULT 'member' NOT NULL,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "stores" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"address" json NOT NULL,
	"addressUrl" text,
	"workingHours" json DEFAULT '{"week":"8:00 - 17:00","saturday":"8:00 - 12:00","sunday":"Zatvorene"}'::json,
	"sortOrder" integer DEFAULT 0,
	"isVisible" boolean NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "stores_name_unique" UNIQUE("name"),
	CONSTRAINT "stores_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"emailVerified" boolean NOT NULL,
	"image" text,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL,
	"role" "role" DEFAULT 'user',
	"banned" boolean,
	"banReason" text,
	"banExpires" timestamp,
	"isAnonymous" boolean,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expiresAt" timestamp NOT NULL,
	"createdAt" timestamp,
	"updatedAt" timestamp
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "inventory" ADD CONSTRAINT "inventory_storeId_stores_id_fk" FOREIGN KEY ("storeId") REFERENCES "public"."stores"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "inventory" ADD CONSTRAINT "inventory_productId_products_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "inventory" ADD CONSTRAINT "inventory_productOptionsSku_productOptions_sku_fk" FOREIGN KEY ("productOptionsSku") REFERENCES "public"."productOptions"("sku") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "invitation" ADD CONSTRAINT "invitation_organizationId_organization_id_fk" FOREIGN KEY ("organizationId") REFERENCES "public"."organization"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "invitation" ADD CONSTRAINT "invitation_inviterId_users_id_fk" FOREIGN KEY ("inviterId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "member" ADD CONSTRAINT "member_organizationId_organization_id_fk" FOREIGN KEY ("organizationId") REFERENCES "public"."organization"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "member" ADD CONSTRAINT "member_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orderAnalytics" ADD CONSTRAINT "orderAnalytics_orderId_orders_id_fk" FOREIGN KEY ("orderId") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orderItems" ADD CONSTRAINT "orderItems_orderId_orders_id_fk" FOREIGN KEY ("orderId") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orderItems" ADD CONSTRAINT "orderItems_productId_products_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orderItems" ADD CONSTRAINT "orderItems_productOptionsSku_productOptions_sku_fk" FOREIGN KEY ("productOptionsSku") REFERENCES "public"."productOptions"("sku") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_storeId_stores_id_fk" FOREIGN KEY ("storeId") REFERENCES "public"."stores"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "productIngredients" ADD CONSTRAINT "productIngredients_productId_products_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "productIngredients" ADD CONSTRAINT "productIngredients_ingredientName_ingredients_name_fk" FOREIGN KEY ("ingredientName") REFERENCES "public"."ingredients"("name") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "productOptions" ADD CONSTRAINT "productOptions_productId_products_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_category_categories_id_fk" FOREIGN KEY ("category") REFERENCES "public"."categories"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "storeMembers" ADD CONSTRAINT "storeMembers_storeId_stores_id_fk" FOREIGN KEY ("storeId") REFERENCES "public"."stores"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "storeMembers" ADD CONSTRAINT "storeMembers_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "category_slug_idx" ON "categories" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "store_product_option_idx" ON "inventory" USING btree ("storeId","productOptionsSku");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "order_analytics_order_id_idx" ON "orderAnalytics" USING btree ("orderId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "order_analytics_device_idx" ON "orderAnalytics" USING btree ("deviceFingerprint");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "order_items_order_id_idx" ON "orderItems" USING btree ("orderId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "order_items_order_product_idx" ON "orderItems" USING btree ("orderId","productId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "order_user_id_idx" ON "orders" USING btree ("userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "order_store_id_idx" ON "orders" USING btree ("storeId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "order_status_idx" ON "orders" USING btree ("status");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "product_ingredients_idx" ON "productIngredients" USING btree ("productId","ingredientName");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "default_option_idx" ON "productOptions" USING btree ("productId","isDefault") WHERE "productOptions"."isDefault" = true;--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "user_store_idx" ON "storeMembers" USING btree ("userId","storeId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "store_slug_idx" ON "stores" USING btree ("slug");