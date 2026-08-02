import json

from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import RsvpSubmission


def _corsify(response, request_origin=None):
    if request_origin and request_origin in settings.RSVP_ALLOWED_ORIGINS:
        response['Access-Control-Allow-Origin'] = request_origin
    elif settings.RSVP_ALLOWED_ORIGINS:
        response['Access-Control-Allow-Origin'] = settings.RSVP_ALLOWED_ORIGINS[0]

    response['Access-Control-Allow-Headers'] = 'Content-Type'
    response['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    response['Vary'] = 'Origin'
    return response


@csrf_exempt
def rsvp_collection(request):
    request_origin = request.headers.get('Origin')

    if request.method == 'OPTIONS':
        return _corsify(JsonResponse({'ok': True}), request_origin)

    if request.method == 'GET':
        payload = {
            'message': 'RSVP endpoint is live.',
            'fields': ['guest_name', 'phone_number', 'response', 'guest_count', 'note'],
        }
        return _corsify(JsonResponse(payload), request_origin)

    if request.method != 'POST':
        return _corsify(JsonResponse({'detail': 'Method not allowed.'}, status=405), request_origin)

    try:
        payload = json.loads(request.body or '{}')
    except json.JSONDecodeError:
        return _corsify(JsonResponse({'detail': 'Invalid JSON body.'}, status=400), request_origin)

    guest_name = str(payload.get('guest_name', '')).strip()
    phone_number = str(payload.get('phone_number', '')).strip()
    response_value = str(payload.get('response', '')).strip()
    note = str(payload.get('note', '')).strip()
    guest_count = payload.get('guest_count', 1)

    if not guest_name:
        return _corsify(JsonResponse({'detail': 'Guest name is required.'}, status=400), request_origin)

    if response_value not in {RsvpSubmission.ATTENDING, RsvpSubmission.NOT_ATTENDING}:
        return _corsify(
            JsonResponse({'detail': 'Response must be attending or not_attending.'}, status=400),
            request_origin,
        )

    try:
        guest_count = int(guest_count)
    except (TypeError, ValueError):
        return _corsify(JsonResponse({'detail': 'Guest count must be a number.'}, status=400), request_origin)

    if guest_count < 1:
        guest_count = 1

    if response_value == RsvpSubmission.NOT_ATTENDING:
        guest_count = 0

    submission = RsvpSubmission.objects.create(
        guest_name=guest_name,
        phone_number=phone_number,
        response=response_value,
        guest_count=guest_count,
        note=note,
    )

    message = (
        'Thank you so much for your kind response. We look forward to celebrating with you.'
        if submission.response == RsvpSubmission.ATTENDING
        else 'Thank you for letting us know so kindly. Your blessings mean a lot to us.'
    )

    return _corsify(
        JsonResponse(
            {
                'id': submission.id,
                'message': message,
                'response': submission.response,
            },
            status=201,
        ),
        request_origin,
    )
