FROM python:3.11-slim

WORKDIR /app

COPY backend/requirements.txt backend/requirements.txt
RUN pip install --no-cache-dir -r backend/requirements.txt

COPY . .

RUN mkdir -p backend/instance

ENV PYTHONUNBUFFERED=1

CMD gunicorn -w 4 -b 0.0.0.0:$PORT backend.app:app
