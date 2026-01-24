from flask import Flask, render_template, redirect
from sqlalchemy import select
from db import db
from models import Product, Category, Customer, Order
from pathlib import Path

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///store_p2.db"
app.instance_path = Path(".").resolve()

db.init_app(app)

@app.route("/")
def home():
    return render_template("home.html")

@app.route("/products")
def products():
    stmt = db.select(Product)
    products = db.session.execute(stmt).scalars()
    return render_template("products.html", products=products)

@app.route("/categories")
def categories():
    stmt = db.select(Category)
    categories = db.session.execute(stmt).scalars()
    return render_template("categories.html", categories=categories)

@app.route("/customers")
def customers():
    stmt = db.select(Customer)
    customers = db.session.execute(stmt).scalars()
    return render_template("customers.html", customers=customers)

@app.route("/categories/<string:name>")
def category_detail(name):
    stmt = db.select(Category).where(Category.category_name == name)
    category = db.session.execute(stmt).scalar()

    if category is None:
        return f"Category '{name}' not found.", 404

    return render_template("category_detail.html", category=category)

@app.route("/customers/<int:id>")
def customer_detail(id):
    stmt = db.select(Customer).where(Customer.id == id)
    customer = db.session.execute(stmt).scalar()

    if customer is None:
        return f"Customer with ID {id} not found.", 404

    return render_template("customer_detail.html", customer=customer)


@app.get("/orders")
def orders_list():
    orders = db.session.execute(select(Order).order_by(Order.created.desc())).scalars()
    return render_template("orders.html", orders=orders)

@app.get("/orders/<int:id>")
def order_detail(id):
    order = db.get_or_404(Order, id)
    return render_template("order_detail.html", order=order)

@app.post("/orders/<int:id>/complete")
def order_complete(id):
    order = db.get_or_404(Order, id)
    try:
        order.complete()
        db.session.commit()
        return redirect(f"/orders/{id}")
    except ValueError as e:
        return render_template("error.html", message=str(e))


if __name__ == "__main__":
    app.run(debug=True,port=8888)