import os
import sys

backend_dir = os.path.join(os.path.dirname(__file__), 'backend')
os.chdir(backend_dir)
sys.path.insert(0, backend_dir)

from app import app, db
from models import Glimpse

with app.app_context():
    glimpses = Glimpse.query.all()
    print(f'Total glimpses in database: {len(glimpses)}')
    print('-' * 60)
    for g in glimpses:
        print(f'ID: {g.id}')
        print(f'Title: {g.title}')
        print(f'Description: {g.description}')
        print(f'Image Path: {g.image_path}')
        print(f'Video URL: {g.video_url}')
        print(f'Hashtags: {g.hashtags}')
        print(f'Active: {g.is_active}')
        print('-' * 60)
