# Wedding RSVP Backend

This Django backend stores RSVP responses for the wedding invitation frontend.

## What it does

- Receives polite RSVP responses from the website
- Stores whether a guest is attending or not attending
- Tracks guest name, phone number, guest count, and a short note
- Provides Django admin for reviewing responses

## Local setup

```bash
python3 -m venv backend/.venv
backend/.venv/bin/pip install -r backend/requirements.txt
backend/.venv/bin/python backend/manage.py migrate
backend/.venv/bin/python backend/manage.py runserver
```

## Environment variables

- `DJANGO_SECRET_KEY`
- `DJANGO_DEBUG`
- `DJANGO_ALLOWED_HOSTS`
- `DJANGO_RSVP_ALLOWED_ORIGINS`

## Default API endpoint

`POST /api/rsvps/`

Expected JSON:

```json
{
  "guest_name": "Example Guest",
  "phone_number": "01700000000",
  "response": "attending",
  "guest_count": 2,
  "note": "Looking forward to it."
}
```
