# Flask Store Project

A small Flask application that demonstrates a simple store front. The app displays products, categories, customers and orders backed by a local SQLite database and seeded from CSV files.

## Working

The app is fully functional for browsing and inspecting the store data: it lists products and categories, shows category and customer detail pages, and provides an orders list and order detail view. You can complete an order (POST to `/orders/<id>/complete`) which checks inventory and updates the order status and amounts. Data is stored in `store_p2.db` (SQLite) and sample data is loaded from `products.csv` and `customers.csv` by `manage.py`, which also generates random sample orders for demonstration.

> Note: There are no automated tests yet — tests can be added later (pytest is recommended).

## Tools/Extensions to install
1. SQLite3 editor (On VS Code)
2. Rainbow CSV

## Quick start (Windows)

1. Create and activate a virtual environment:

```powershell
python -m venv venv
# PowerShell
.\venv\Scripts\Activate.ps1
# or cmd.exe
venv\Scripts\activate
```

2. Install dependencies:

```powershell
pip install -r requirements.txt
```

3. Initialize the database and load sample data:

```powershell
python manage.py
```

This script will drop and recreate the database tables, import `products.csv` and `customers.csv`, and generate sample orders.

4. Run the app:

```powershell
python app.py
```

5. Open your browser at: http://127.0.0.1:8888 or http://localhost:8888

## Files of interest

- `app.py` — Flask application and routes (runs on port 8888 by default)
- `manage.py` — utility to create/drop tables and load CSV seed data
- `products.csv`, `customers.csv` — seed data for the demo
- `models.py`, `db.py` — database models and SQLite configuration
- `requirements.txt` — pinned dependencies

## Tips

- To preserve an existing DB, avoid running `manage.py` as it drops and recreates tables by default.
- To change the port, modify the `app.run(...)` call in `app.py`.




