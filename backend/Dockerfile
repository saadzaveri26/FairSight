# ── FairSight API — Google Cloud Run Dockerfile ──────────────────────────
# Lightweight Python image with only production dependencies.

FROM python:3.11-slim

# Prevent Python from writing .pyc files and enable unbuffered stdout/stderr
# for proper Cloud Run logging.
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Install dependencies first (layer caching optimisation).
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application source.
COPY . .

# Cloud Run injects the PORT env var (default 8080).
ENV PORT=8080
EXPOSE 8080

# Start Uvicorn — bind to 0.0.0.0 so Cloud Run's proxy can reach it.
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT}"]
