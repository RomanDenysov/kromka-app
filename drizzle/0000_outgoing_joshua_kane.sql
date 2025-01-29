CREATE TYPE "public"."delivery_types" AS ENUM('pickup', 'delivery');--> statement-breakpoint
CREATE TYPE "public"."inventory_status" AS ENUM('in_stock', 'sold_out');--> statement-breakpoint
CREATE TYPE "public"."measurement_units" AS ENUM('g', 'kg', 'ml', 'l', 'ks');--> statement-breakpoint
CREATE TYPE "public"."member_roles" AS ENUM('member', 'manager');--> statement-breakpoint
CREATE TYPE "public"."order_status" AS ENUM('not_checked_out', 'checkout_started', 'pending', 'confirmed', 'completed', 'cancelled', 'abandoned');--> statement-breakpoint
CREATE TYPE "public"."payment_status" AS ENUM('pending', 'confirmed', 'failed', 'refunded');--> statement-breakpoint
CREATE TYPE "public"."payment_types" AS ENUM('in_store', 'card', 'invoice');--> statement-breakpoint
CREATE TYPE "public"."product_status" AS ENUM('draft', 'active', 'archived', 'sold');--> statement-breakpoint
CREATE TYPE "public"."staff_role" AS ENUM('admin', 'manager', 'author');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "categories" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"description" text NOT NULL,
	"allows_delivery" boolean DEFAULT false NOT NULL,
	"sort_order" integer DEFAULT 0,
	"is_visible" boolean DEFAULT true,
	"updated_at" timestamp DEFAULT now(),
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "categories_name_unique" UNIQUE("name"),
	CONSTRAINT "categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "category_image" (
	"category_id" text NOT NULL,
	"image_id" text NOT NULL,
	CONSTRAINT "category_image_category_id_image_id_pk" PRIMARY KEY("category_id","image_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "images" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"url" text NOT NULL,
	"key" text NOT NULL,
	"size" text NOT NULL,
	"mime_type" text NOT NULL,
	"width" integer,
	"height" integer,
	"uploaded_by" text NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "images_key_unique" UNIQUE("key")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product_images" (
	"product_id" text NOT NULL,
	"image_id" text NOT NULL,
	"sort_order" integer DEFAULT 0,
	CONSTRAINT "product_images_product_id_image_id_pk" PRIMARY KEY("product_id","image_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "store_image" (
	"store_id" text NOT NULL,
	"image_id" text NOT NULL,
	CONSTRAINT "store_image_store_id_image_id_pk" PRIMARY KEY("store_id","image_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "order_delivery_information" (
	"order_id" text PRIMARY KEY NOT NULL,
	"delivery_address" jsonb,
	"delivery_instructions" text,
	"delivery_contact" text,
	"delivery_service" text,
	"tracking_number" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "order_items" (
	"order_id" text,
	"product_id" text,
	"product_price" integer,
	"quantity" integer,
	CONSTRAINT "order_items_order_id_product_id_pk" PRIMARY KEY("order_id","product_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orders" (
	"id" text PRIMARY KEY NOT NULL,
	"store_id" text,
	"user_id" text,
	"order_status" "order_status" DEFAULT 'not_checked_out',
	"subtotal_price" integer DEFAULT 0,
	"delivery_price" integer DEFAULT 0,
	"total_price" integer DEFAULT 0,
	"delivery_type" "delivery_types" DEFAULT 'pickup',
	"payment_type" "payment_types" DEFAULT 'in_store',
	"payment_status" "payment_status" DEFAULT 'pending',
	"updated_at" timestamp DEFAULT now(),
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ingredients" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "ingredients_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "inventory" (
	"id" text PRIMARY KEY NOT NULL,
	"store_id" text NOT NULL,
	"product_id" text NOT NULL,
	"default_quantity" integer NOT NULL,
	"current_quantity" integer NOT NULL,
	"low_stock_threshold" integer NOT NULL,
	"inventory_status" "inventory_status" DEFAULT 'in_stock' NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product_ingredients" (
	"product_id" text NOT NULL,
	"ingredient_id" text NOT NULL,
	CONSTRAINT "product_ingredients_product_id_ingredient_id_pk" PRIMARY KEY("product_id","ingredient_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"description" text NOT NULL,
	"category_id" text NOT NULL,
	"product_status" "product_status" DEFAULT 'draft' NOT NULL,
	"unit" "measurement_units" NOT NULL,
	"value" integer,
	"price" integer,
	"sort_order" integer DEFAULT 0,
	"is_visible" boolean DEFAULT true,
	"stripe_id" text,
	"stripe_price_id" text,
	"updated_at" timestamp DEFAULT now(),
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "products_name_unique" UNIQUE("name"),
	CONSTRAINT "products_slug_unique" UNIQUE("slug"),
	CONSTRAINT "products_stripe_id_unique" UNIQUE("stripe_id"),
	CONSTRAINT "products_stripe_price_id_unique" UNIQUE("stripe_price_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "store_members" (
	"id" text PRIMARY KEY NOT NULL,
	"store_id" text NOT NULL,
	"user_id" text NOT NULL,
	"member_role" "member_roles" DEFAULT 'member' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "stores" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"address" json NOT NULL,
	"addressUrl" text NOT NULL,
	"working_hours" json DEFAULT '{"week":"8:00 - 17:00","saturday":"8:00 - 12:00","sunday":"Zatvorene"}'::json NOT NULL,
	"sort_order" integer DEFAULT 0,
	"is_visible" boolean DEFAULT true,
	"updated_at" timestamp DEFAULT now(),
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "stores_name_unique" UNIQUE("name"),
	CONSTRAINT "stores_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"updated_at" timestamp DEFAULT now(),
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "staff" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"role" "staff_role" NOT NULL,
	"is_active" boolean DEFAULT true,
	"updated_at" timestamp DEFAULT now(),
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "staff_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"email_verified" boolean NOT NULL,
	"image" text,
	"is_anonymous" boolean,
	"updated_at" timestamp DEFAULT now(),
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "category_image" ADD CONSTRAINT "category_image_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "category_image" ADD CONSTRAINT "category_image_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "images" ADD CONSTRAINT "images_uploaded_by_users_id_fk" FOREIGN KEY ("uploaded_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_images" ADD CONSTRAINT "product_images_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_images" ADD CONSTRAINT "product_images_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "store_image" ADD CONSTRAINT "store_image_store_id_stores_id_fk" FOREIGN KEY ("store_id") REFERENCES "public"."stores"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "store_image" ADD CONSTRAINT "store_image_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_delivery_information" ADD CONSTRAINT "order_delivery_information_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_items" ADD CONSTRAINT "order_items_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_store_id_stores_id_fk" FOREIGN KEY ("store_id") REFERENCES "public"."stores"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "inventory" ADD CONSTRAINT "inventory_store_id_stores_id_fk" FOREIGN KEY ("store_id") REFERENCES "public"."stores"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "inventory" ADD CONSTRAINT "inventory_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_ingredients" ADD CONSTRAINT "product_ingredients_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_ingredients" ADD CONSTRAINT "product_ingredients_ingredient_id_ingredients_id_fk" FOREIGN KEY ("ingredient_id") REFERENCES "public"."ingredients"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "store_members" ADD CONSTRAINT "store_members_store_id_stores_id_fk" FOREIGN KEY ("store_id") REFERENCES "public"."stores"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "store_members" ADD CONSTRAINT "store_members_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "staff" ADD CONSTRAINT "staff_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "category_slug_idx" ON "categories" USING btree ("slug");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "order_items_order_id_idx" ON "order_items" USING btree ("order_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "order_items_order_product_idx" ON "order_items" USING btree ("order_id","product_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "order_user_id_idx" ON "orders" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "order_store_id_idx" ON "orders" USING btree ("store_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "order_status_idx" ON "orders" USING btree ("order_status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ingredient_name_idx" ON "ingredients" USING btree ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "inventory_status_idx" ON "inventory" USING btree ("inventory_status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "current_quantity_idx" ON "inventory" USING btree ("current_quantity");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "product_slug_idx" ON "products" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "user_store_idx" ON "store_members" USING btree ("user_id","store_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "store_slug_idx" ON "stores" USING btree ("slug");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "staff_user_id_idx" ON "staff" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "staff_user_id_unique" ON "staff" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "staff_user_active_idx" ON "staff" USING btree ("user_id","is_active");