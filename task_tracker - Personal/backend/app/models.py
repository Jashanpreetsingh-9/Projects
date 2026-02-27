from .database import db
from sqlalchemy import Integer, String, Text, Date
from sqlalchemy.orm import mapped_column
from datetime import date, timedelta

class Task(db.Model):
    __tablename__ = "tasks"

    id = mapped_column(Integer, primary_key=True)
    name = mapped_column(String, nullable=False)
    frequency_days = mapped_column(Integer, nullable=False)
    last_completed = mapped_column(Date, nullable=False)
    next_due_date = mapped_column(Date, nullable=False)
    notes = mapped_column(Text, nullable=True)
    
    def update_due_date(self):
        self.next_due_date = self.last_completed + timedelta(days=self.frequency_days)

    def to_dict(self):
        return {"id": self.id,"name":self.name,"frequency_days": self.frequency_days,"last_completed": self.last_completed.isoformat(),"next_due_date": self.next_due_date.isoformat(),"notes": self.notes}