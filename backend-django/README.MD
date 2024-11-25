
# Django Project Setup

## Prerequisites

Make sure you have the following installed on your system:
- Python 3.x
- pip (Python package installer)
- virtualenv (for creating virtual environments)

## Steps to Set Up the Project

### 1. Open the Backend-Folder

```bash
cd backend-django
```

### 2. Set Up a Virtual Environment

Create a virtual environment to isolate project dependencies:

```bash
# For Windows
python -m venv venv

# For MacOS/Linux
python3 -m venv venv
```

Activate the virtual environment:

```bash
# For Windows
.\venv\Scripts\activate

# For MacOS/Linux
source venv/bin/activate
```

### 3. Install Dependencies

With the virtual environment activated, install the required dependencies:

```bash
pip install -r requirements.txt
```

This will install all the necessary libraries, such as Django, database connectors, etc.

Here is the revised version of the section for creating the `.env` file:

### 4. Set Up Environment Variables

Create a `.env` file in the root of the project directory. This file should contain the necessary environment variables such as secret keys, database settings, and other configurations. 

You can find the required environment variables in the following document:

[Environment Variables ](https://docs.google.com/document/d/1h1v0u-A_bfWmbs4qSuZRUZ1m1y8LCos2AdzI3r7geIM/edit?usp=sharing)

Once you've reviewed the document, create the `.env` file and populate it with the necessary values from the document.


### 5. Run the Application

Now that the virtual environment is set up and dependencies are installed, you can run the Django development server:

```bash
python manage.py runserver
```

This will start the server locally at `http://127.0.0.1:8000/`. You can access the project by opening this URL in your web browser.

### 6. Database Migrations (Optional)

If this is your first time setting up the project or if there are any new migrations, run the following commands to set up the database:

```bash
# Apply migrations
python manage.py migrate

# Create a superuser (optional but recommended for admin access)
python manage.py createsuperuser
```

Follow the prompts to create an admin user.

---

