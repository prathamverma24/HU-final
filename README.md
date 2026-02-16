# Haridwar University Website

Full-stack application with React frontend and Flask API backend.

## Project Structure

```
├── frontend/          # React application
├── backend/           # Flask API
├── static/           # Static assets (legacy)
└── templates/        # HTML templates (legacy)
```

## Frontend (React)

### Setup
```bash
cd frontend
npm install
npm start
```

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
1. Push code to GitHub
2. Import project in Vercel
3. Set root directory to `frontend`
4. Add environment variable: `REACT_APP_API_URL=<your-backend-url>`

## Backend (Flask API)

### Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### Run
```bash
python api.py
```

### Deploy Backend
Recommended platforms:
- Railway.app
- Render.com
- Heroku

### Environment Variables
Create `.env` file in backend/:
```
DATABASE_URL=your_database_url
SECRET_KEY=your_secret_key
MAIL_USERNAME=your_email
MAIL_PASSWORD=your_password
```

## Features

- ✅ React frontend with React Router
- ✅ Flask REST API backend
- ✅ Events and Happenings management
- ✅ Contact form
- ✅ Admin authentication
- ✅ Responsive design
- ✅ Swiper carousel
- ✅ CORS enabled

## Tech Stack

### Frontend
- React 18
- React Router
- Axios
- Swiper.js
- CSS3

### Backend
- Flask
- Flask-CORS
- Flask-SQLAlchemy
- Flask-Login
- PostgreSQL/SQLite

## Default Admin Credentials
- Username: `admin`
- Password: `admin123`

**Change these in production!**
