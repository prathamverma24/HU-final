FROM python:3.13-slim

WORKDIR /app

# Install system dependencies including PostgreSQL client and dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq5 \
    libpq-dev \
    postgresql-client \
    gcc \
    g++ \
    make \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install Python dependencies  
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy application files
COPY app.py config.py models.py wsgi.py ./
COPY static ./static

# Create instance directory for database
RUN mkdir -p instance logs

# Set environment variables
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PORT=8080

EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:8080/api/health')" || exit 1

# Use gunicorn to run the app with proper worker configuration
CMD ["gunicorn", "app:app", "--bind", "0.0.0.0:8080", "--workers", "2", "--worker-class", "sync", "--timeout", "120", "--max-requests", "100", "--max-requests-jitter", "10"]
