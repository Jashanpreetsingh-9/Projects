from models import Category, Product, Customer, ProductOrder, Order
from db import db, engine, Base
from sqlalchemy import update, select
from app import app


with app.app_context():

    stmt = update(Product).values(inventory=100)
    db.session.execute(stmt)
    db.session.commit()

