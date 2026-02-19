#!/usr/bin/env python3
"""Test script to check what the API returns for events"""

import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

from backend.app import app
from backend.models import Event

with app.app_context():
    events = Event.query.filter_by(is_active=True).order_by(Event.event_date).all()
    print(f"\nFound {len(events)} events in database:\n")
    
    for event in events:
        print(f"ID: {event.id}")
        print(f"Title: {event.title}")
        print(f"Description: {event.description[:50]}...")
        print(f"Date: {event.event_date}")
        print(f"Image Path: {event.image_path}")
        print(f"Active: {event.is_active}")
        print("-" * 60)
        
    print("\nAPI Response Format:")
    print([event.to_dict() for event in events])
