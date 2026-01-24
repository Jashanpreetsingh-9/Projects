from db import db
from decimal import Decimal


class Category(db.Model):
    __tablename__ = "categories"

    id = db.mapped_column(db.Integer, primary_key=True)
    category_name = db.mapped_column(db.String, nullable=False)

    products = db.relationship("Product", back_populates="category")


class Product(db.Model):
    __tablename__ = "products"

    id = db.mapped_column(db.Integer, primary_key=True)
    product_name = db.mapped_column(db.String, nullable=False)
    price = db.mapped_column(db.DECIMAL(10, 2), nullable=False)
    inventory = db.mapped_column(db.Integer, nullable=False, default=0)
    category_id = db.mapped_column(db.Integer, db.ForeignKey("categories.id"))

    category = db.relationship("Category", back_populates="products")
    items = db.relationship("ProductOrder", back_populates="product")


class Customer(db.Model):
    __tablename__ = "customers"

    id = db.mapped_column(db.Integer, primary_key=True)
    customer_name = db.mapped_column(db.String, nullable=False)
    phone = db.mapped_column(db.String, nullable=True)

    orders = db.relationship("Order", back_populates="customer")

    def pending_orders(self):
        return [o for o in self.orders if o.completed is None]

    def completed_orders(self):
        return [o for o in self.orders if o.completed is not None]


class ProductOrder(db.Model):
    __tablename__ = "product_orders"

    product_id = db.mapped_column(db.Integer, db.ForeignKey("products.id"), primary_key=True)
    order_id = db.mapped_column(db.Integer, db.ForeignKey("orders.id"), primary_key=True)
    quantity = db.mapped_column(db.Integer, nullable=False)

    product = db.relationship("Product", back_populates="items")
    order = db.relationship("Order", back_populates="items")


class Order(db.Model):
    __tablename__ = "orders"

    id = db.mapped_column(db.Integer, primary_key=True)
    customer_id = db.mapped_column(db.Integer, db.ForeignKey("customers.id"))
    created = db.mapped_column(db.DateTime, nullable=False, default=db.func.now())
    completed = db.mapped_column(db.DateTime, nullable=True, default=None)
    amount = db.mapped_column(db.DECIMAL(10, 2), nullable=True, default=None)
    
    customer = db.relationship("Customer", back_populates="orders")
    items = db.relationship("ProductOrder", back_populates="order")

    def estimate(self):
        total = Decimal("0.00")
        for po in self.items:
            total += po.product.price * po.quantity
        return total

    def complete(self):
        for p in self.items:
            if p.quantity > p.product.inventory:
                raise ValueError(f"Not enough '{p.product.product_name}' in stock.")
        for p in self.items:
            p.product.inventory -= p.quantity
        self.completed = db.func.now()
        self.amount = self.estimate()
