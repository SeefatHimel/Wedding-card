from django.contrib import admin

from .models import RsvpSubmission


@admin.register(RsvpSubmission)
class RsvpSubmissionAdmin(admin.ModelAdmin):
    list_display = ('guest_name', 'response', 'guest_count', 'phone_number', 'created_at')
    list_filter = ('response', 'created_at')
    search_fields = ('guest_name', 'phone_number', 'note')
    readonly_fields = ('created_at',)
