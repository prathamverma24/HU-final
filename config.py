import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:
    # Secret key for session management and CSRF protection
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-key-change-in-production-12345')
    
    # Database configuration with intelligent fallback
    database_url = os.getenv('DATABASE_URL')
    
    # Try to use PostgreSQL if available, otherwise use SQLite
    if database_url and database_url.startswith('postgresql'):
        try:
            # Test if psycopg2 and libpq are available
            import psycopg2
            
            # Add SSL mode for PostgreSQL connections (required by most cloud providers)
            if '?' in database_url:
                SQLALCHEMY_DATABASE_URI = database_url + '&sslmode=require'
            else:
                SQLALCHEMY_DATABASE_URI = database_url + '?sslmode=require'
        except ImportError:
            print("⚠️  PostgreSQL client not available, falling back to SQLite")
            # Fallback to SQLite
            instance_path = os.path.join(os.path.dirname(__file__), 'instance')
            os.makedirs(instance_path, exist_ok=True)
            db_path = os.path.join(instance_path, 'university.db')
            SQLALCHEMY_DATABASE_URI = f'sqlite:///{db_path}'
    else:
        # Use persistent SQLite database file
        instance_path = os.path.join(os.path.dirname(__file__), 'instance')
        os.makedirs(instance_path, exist_ok=True)
        db_path = os.path.join(instance_path, 'university.db')
        SQLALCHEMY_DATABASE_URI = f'sqlite:///{db_path}'
    
    # Disable SQLAlchemy modification tracking (saves memory)
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Email configuration for Flask-Mail
    MAIL_SERVER = os.getenv('MAIL_SERVER', 'smtp.gmail.com')
    MAIL_PORT = int(os.getenv('MAIL_PORT', 587))
    MAIL_USE_TLS = os.getenv('MAIL_USE_TLS', 'True') == 'True'
    MAIL_USERNAME = os.getenv('MAIL_USERNAME')
    MAIL_PASSWORD = os.getenv('MAIL_PASSWORD')
    
    # File upload configuration
    UPLOAD_FOLDER = os.path.join('static', 'uploads')
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB max file size
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp', 'avif'}
