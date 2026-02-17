FROM python:3.11-slim

WORKDIR /app

# Copy backend requirements
COPY backend/requirements.txt backend/requirements.txt

# Install Python dependencies
RUN pip install --no-cache-dir -r backend/requirements.txt

# Copy all files
COPY . .

# Create instance directory for database
RUN mkdir -p backend/instance

# Set environment variable for Python path
ENV PYTHONUNBUFFERED=1

# Expose port
EXPOSE 8080

# Run gunicorn directly
CMD gunicorn -w 4 -b 0.0.0.0:$PORT backend.app:app
