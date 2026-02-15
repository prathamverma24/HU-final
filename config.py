import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-key-change-in-production')
    
    # Database configuration with SSL support for Supabase/PostgreSQL
    database_url = os.getenv('DATABASE_URL', 'sqlite:///university.db')
    
    # Add SSL mode for PostgreSQL connections (required by Supabase)
    if database_url and database_url.startswith('postgresql'):
        if '?' in database_url:
            SQLALCHEMY_DATABASE_URI = database_url + '&sslmode=require'
        else:
            SQLALCHEMY_DATABASE_URI = database_url + '?sslmode=require'
    else:
        SQLALCHEMY_DATABASE_URI = database_url
    
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Email configuration
    MAIL_SERVER = os.getenv('MAIL_SERVER', 'smtp.gmail.com')
    MAIL_PORT = int(os.getenv('MAIL_PORT', 587))
    MAIL_USE_TLS = os.getenv('MAIL_USE_TLS', 'True') == 'True'
    MAIL_USERNAME = os.getenv('MAIL_USERNAME')
    MAIL_PASSWORD = os.getenv('MAIL_PASSWORD')
    
    # Upload configuration
    UPLOAD_FOLDER = os.path.join('static', 'uploads', 'events')
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB max file size
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp', 'avif'}
