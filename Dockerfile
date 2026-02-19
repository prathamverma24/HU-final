FROM python:3.13-slim

WORKDIR /app

# Install PostgreSQL client libraries
RUN apt-get update && apt-get install -y \
    postgresql-client \
    libpq-dev \
    libpq5 \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy backend requirements and install
COPY backend/requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy entire project
COPY . .

# Create instance directory for SQLite
RUN mkdir -p backend/instance backend/static/images

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV PORT=8080
ENV PYTHONPATH=/app

# Use explicit path to backend app
CMD ["sh", "-c", "cd /app && gunicorn -w 4 -b 0.0.0.0:${PORT} backend.app:app"]
