import { useEffect, useState } from 'react'

const DEFAULT_API_URL = 'http://127.0.0.1:8000/api/rsvps/'
const RSVP_STORAGE_KEY = 'wedding-rsvp-details'

const initialFormState = {
  guest_name: '',
  phone_number: '',
  response: 'attending',
  guest_count: 1,
  note: '',
}

function readSavedRsvp() {
  if (typeof window === 'undefined') {
    return { data: initialFormState, hasSavedResponse: false }
  }

  try {
    const savedValue = window.localStorage.getItem(RSVP_STORAGE_KEY)

    if (!savedValue) {
      return { data: initialFormState, hasSavedResponse: false }
    }

    const parsedValue = JSON.parse(savedValue)

    return {
      data: {
        guest_name: parsedValue.guest_name || '',
        phone_number: parsedValue.phone_number || '',
        response: parsedValue.response === 'not_attending' ? 'not_attending' : 'attending',
        guest_count: parsedValue.response === 'not_attending' ? 1 : Number(parsedValue.guest_count) || 1,
        note: parsedValue.note || '',
      },
      hasSavedResponse: Boolean(parsedValue.hasSubmitted),
    }
  } catch {
    return { data: initialFormState, hasSavedResponse: false }
  }
}

function RsvpForm() {
  const [formData, setFormData] = useState(() => readSavedRsvp().data)
  const [hasSavedResponse, setHasSavedResponse] = useState(() => readSavedRsvp().hasSavedResponse)
  const [status, setStatus] = useState({ type: 'idle', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const apiUrl = import.meta.env.VITE_RSVP_API_URL || DEFAULT_API_URL

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    window.localStorage.setItem(
      RSVP_STORAGE_KEY,
      JSON.stringify({
        ...formData,
        hasSubmitted: hasSavedResponse,
      }),
    )
  }, [formData, hasSavedResponse])

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((current) => ({
      ...current,
      [name]: name === 'guest_count' ? Number(value) : value,
    }))
  }

  function clearSavedDetails() {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(RSVP_STORAGE_KEY)
    }

    setFormData(initialFormState)
    setHasSavedResponse(false)
    setStatus({ type: 'idle', message: '' })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setIsSubmitting(true)
    setStatus({ type: 'idle', message: '' })

    const payload = {
      ...formData,
      guest_count: formData.response === 'not_attending' ? 0 : formData.guest_count,
    }

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.detail || 'Something went wrong while sending your RSVP.')
      }

      setHasSavedResponse(true)
      setFormData({
        ...payload,
        guest_count: payload.response === 'not_attending' ? 1 : payload.guest_count,
      })
      setStatus({
        type: 'success',
        message: `${data.message} Your RSVP is also saved on this device, so you can revisit and update it later.`,
      })
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'Unable to send your RSVP right now. Please try again later.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="rsvp-form" onSubmit={handleSubmit}>
      {hasSavedResponse ? (
        <div className="rsvp-form__saved">
          <p>Your last RSVP from this device is loaded below. You can update the details and send again anytime.</p>
          <button type="button" className="rsvp-form__clear" onClick={clearSavedDetails}>
            Clear saved details
          </button>
        </div>
      ) : null}

      <div className="rsvp-form__field">
        <label htmlFor="guest_name">Your name</label>
        <input
          id="guest_name"
          name="guest_name"
          type="text"
          value={formData.guest_name}
          onChange={handleChange}
          placeholder="Enter your full name"
          required
        />
      </div>

      <div className="rsvp-form__field">
        <label htmlFor="phone_number">Phone number</label>
        <input
          id="phone_number"
          name="phone_number"
          type="tel"
          value={formData.phone_number}
          onChange={handleChange}
          placeholder="01XXXXXXXXX"
        />
      </div>

      <fieldset className="rsvp-form__choice">
        <legend>Will you be joining us?</legend>
        <label>
          <input
            type="radio"
            name="response"
            value="attending"
            checked={formData.response === 'attending'}
            onChange={handleChange}
          />
          Happily attending
        </label>
        <label>
          <input
            type="radio"
            name="response"
            value="not_attending"
            checked={formData.response === 'not_attending'}
            onChange={handleChange}
          />
          Unable to attend
        </label>
      </fieldset>

      {formData.response === 'attending' ? (
        <div className="rsvp-form__field">
          <label htmlFor="guest_count">How many guests are coming?</label>
          <input
            id="guest_count"
            name="guest_count"
            type="number"
            min="1"
            max="10"
            value={formData.guest_count}
            onChange={handleChange}
          />
        </div>
      ) : null}

      <div className="rsvp-form__field rsvp-form__field--note">
        <label htmlFor="note">Short note</label>
        <textarea
          id="note"
          name="note"
          rows="3"
          value={formData.note}
          onChange={handleChange}
          placeholder="Any message or dua for the couple"
        />
      </div>

      <button className="cta cta--primary cta--submit" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : hasSavedResponse ? 'Update RSVP' : 'Send RSVP'}
      </button>

      {status.message ? (
        <p className={`rsvp-form__status rsvp-form__status--${status.type}`}>{status.message}</p>
      ) : null}
    </form>
  )
}

export default RsvpForm
