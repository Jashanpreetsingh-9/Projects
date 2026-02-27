from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy import create_engine

class Base(DeclarativeBase):
    pass

# Export the SQLAlchemy db object and an engine bound to the same SQLite URI
# so scripts (e.g. manage.py) can create/drop tables directly.
DB_URI = "sqlite:///store_p2.db"
engine = create_engine(DB_URI)

db = SQLAlchemy(model_class=Base)