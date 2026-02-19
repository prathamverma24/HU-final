FROM python:3.13-slim

WORKDIR /app

# Install system dependencies including PostgreSQL client library
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Copy backend requirements and install Python packages
COPY backend/requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy entire project
COPY . .

# Create necessary directories
RUN mkdir -p backend/instance backend/static/images

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV PORT=8080
ENV PYTHONPATH=/app

# Run gunicorn (app.py is in /app directory after copying)
CMD ["sh", "-c", "cd backend && gunicorn -w 4 -b 0.0.0.0:${PORT} app:app"]
