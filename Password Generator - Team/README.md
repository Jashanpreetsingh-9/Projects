# pwtool

`pwtool` is a CLI utility for managing passwords.

## Prerequisites

- python3.13 and above

## Install dependencies

Create and activate a virtual environment (recommended):

PowerShell
```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

cmd.exe
```
venv\Scripts\activate
```

Install requirements:

```
pip install -r requirements.txt
```

## Run the app

- From inside the `pwtool/` folder:

```
python app.py
# or
py app.py
```

- Or run as a module from the project root:

```
python -m pwtool.app
```

> Note: If you see an error, check that you have installed dependencies and are running the correct command.

## Troubleshooting

If you see an error similar to:

```
ModuleNotFoundError: No module named 'pwtool'
```

This typically happens when you run the script from *inside* the `pwtool/` directory and Python cannot resolve the package imports. To fix this:

- Run the app as a module from the project root (recommended):

```
python -m pwtool.app
```

- Or create an empty `pwtool/__init__.py` file to make `pwtool` a package and then run `python -m pwtool.app`.

- If you prefer running the script directly from inside the `pwtool/` folder, run:

```
python app.py
```

  but be sure your dependencies are installed and that PYTHONPATH includes the project root (or run from the project root instead).

If you see other errors, try installing dependencies first:

```
pip install -r requirements.txt
```
