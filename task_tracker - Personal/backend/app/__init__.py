from flask import Flask
from flask_cors import CORS
from .config import Config
from .database import db

def create_app(testing = False):
    app = Flask(__name__)
    if testing:
        app.config["TESTING"] = True
        app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///:memory:"
    else:
        app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///tasks.db"

    db.init_app(app)
    CORS(app)

    from .routes.tasks import tasks_bp
    app.register_blueprint(tasks_bp, url_prefix="/tasks")
    
    with app.app_context():
        from .models import Task
        db.create_all()

    return app
