from django.db import models


class RsvpSubmission(models.Model):
    ATTENDING = 'attending'
    NOT_ATTENDING = 'not_attending'
    RESPONSE_CHOICES = [
        (ATTENDING, 'Attending'),
        (NOT_ATTENDING, 'Not attending'),
    ]

    guest_name = models.CharField(max_length=120)
    phone_number = models.CharField(max_length=32, blank=True)
    response = models.CharField(max_length=20, choices=RESPONSE_CHOICES)
    guest_count = models.PositiveSmallIntegerField(default=1)
    note = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.guest_name} - {self.get_response_display()}'
