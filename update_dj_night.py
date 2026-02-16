#!/usr/bin/env python
"""Update DJ Night event description in database"""

import sys
import os

# Add backend directory to path
backend_dir = os.path.join(os.path.dirname(__file__), 'backend')
sys.path.insert(0, backend_dir)
os.chdir(backend_dir)

from app import app, db
from models import Event

def update_dj_night():
    """Update DJ Night event description"""
    with app.app_context():
        # Find DJ Night event
        dj_night = Event.query.filter(Event.title.like('%DJ%Night%')).first()
        
        if dj_night:
            print(f"Found event: {dj_night.title}")
            print(f"Current description: {dj_night.description}")
            
            # Update description
            dj_night.description = "let's groove to music and break the floor. This message is for all come and lets slay the dance the moves on the floor together and make this valentine dreamy."
            db.session.commit()
            
            print("\n✓ Description updated successfully!")
            print(f"New description: {dj_night.description}")
        else:
            print("✗ DJ Night event not found in database")
            print("\nAvailable events:")
            events = Event.query.all()
            for event in events:
                print(f"  - {event.title}")

if __name__ == '__main__':
    update_dj_night()
