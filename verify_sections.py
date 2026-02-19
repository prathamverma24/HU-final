import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

from backend.app import app, db
from backend.models import SectionContent
import json

with app.app_context():
    sections = SectionContent.query.all()
    print(f"\n✅ Found {len(sections)} sections in database:\n")
    
    for section in sections:
        print(f"📄 Section: {section.section_name}")
        print(f"   Active: {section.is_active}")
        content = json.loads(section.content_json)
        print(f"   Content keys: {list(content.keys())}")
        print(f"   Updated: {section.updated_at}")
        print()
