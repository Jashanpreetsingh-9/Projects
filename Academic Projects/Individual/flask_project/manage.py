import csv
from app import app
from db import db, engine, Base
from models import Category, Product, Customer, ProductOrder, Order
from random import randint
from datetime import datetime as dt
from datetime import timedelta


def create_tables():
    Base.metadata.create_all(engine)
    print("Tables Created")


def drop_tables():
    Base.metadata.drop_all(engine)
    print("Tables deleted")


def import_data(data):
    if data == "products":
        with open("products.csv") as f:
            return list(csv.reader(f))
    if data == "customers":
        with open("customers.csv") as f:
            return list(csv.reader(f))
    return None


def load_data(data):
    rows = import_data(data)
    if not rows:
        return

    header, *data_rows = rows

    if data == "products":
        for name, price, available, category_name in data_rows:
            category = Category.query.filter_by(category_name=category_name).first()
            if category is None:
                category = Category(category_name=category_name)
                db.session.add(category)
                db.session.flush()

            product = Product(product_name=name, price=price, inventory=available, category_id=category.id)
            db.session.add(product)

        db.session.commit()

    elif data == "customers":
        for name, phone in data_rows:
            customer = Customer(customer_name=name, phone=phone)
            db.session.add(customer)

        db.session.commit()


def generate_orders(count=5):
    for i in range(count):
        customer = db.session.execute(db.select(Customer).order_by(db.func.random())).scalar()
        created = dt.now() - timedelta(days=randint(1, 3), hours=randint(0, 15), minutes=randint(0, 30))

        order = Order(customer=customer, created=created)
        db.session.add(order)

        products = db.session.execute(
            db.select(Product).order_by(db.func.random()).limit(randint(3, 6))
        ).scalars()

        for p in products:
            po = ProductOrder(product=p, order=order, quantity=randint(1, 5))
            db.session.add(po)

    db.session.commit()


if __name__ == "__main__":
    with app.app_context():
        drop_tables()
        create_tables()
        load_data("products")
        load_data("customers")
        generate_orders(8)
