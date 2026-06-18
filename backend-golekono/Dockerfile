FROM python:3.10-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Create a non-root user with UID 1000
RUN useradd -m -u 1000 user

WORKDIR /code

# Copy requirements and install dependencies
COPY requirements.txt /code/
RUN pip install --no-cache-dir -r requirements.txt

# Copy codebase
COPY --chown=user:user . /code/

# Set owner permissions
RUN chown -R user:user /code

# Switch to non-root user
USER user

# Expose port
EXPOSE 7860

# Run gunicorn
CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:7860", "--workers", "2", "--timeout", "120"]
