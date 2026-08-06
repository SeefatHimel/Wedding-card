import akhdCertificate from '../assets/images/akhd-certificate.jpeg'
import akhdGalleryPortrait from '../assets/images/akhd-gallery-portrait.jpeg'
import akhdPortrait from '../assets/images/akhd-portrait.jpeg'

export const invitationSections = [
  {
    id: 'opening',
    label: 'Opening',
    monogram: 'HP',
    title: ['Himel', '&', 'Proma'],
    fullNames: ['Seefat Hossain Himel', 'Proma Ashrafi'],
    date: 'Saturday, 22 August 2026',
    dateTime: '2026-08-22T13:30:00+06:00',
    place: 'Green Garden, Dhanmondi, Dhaka',
    note: 'Scroll to unfold our invitation',
    tags: ['Wedding Reception', '1:30 PM'],
    heroImage: akhdPortrait,
  },
  {
    id: 'story',
    label: 'Blessing',
    title: 'And of His signs is that He created for you from yourselves mates that you may find tranquility in them; and He placed between you affection and mercy. Indeed in that are signs for a people who give thought.',
    text: '',
    accent: 'Surah Ar-Rum · 30:21',
  },
  {
    id: 'events',
    label: 'Invitation',
    title: 'We cordially request the pleasure of your gracious presence and blessings.',
    featuredNames: ['Seefat Hossain Himel', 'Proma Ashrafi'],
    featuredLead: 'At the wedding reception of',
    schedule: [
      ['Hosts', 'A.K.M. Anwar Hossain & Selina Akter'],
      ['Reception Of', 'Their son Seefat Hossain Himel'],
      ['With', 'Proma Ashrafi'],
      ['Daughter Of', 'Ashraf Uddin Ahmed & Momotaz Begum'],
    ],
  },
  {
    id: 'details',
    label: 'Venue & Family',
    title: 'Hosted with love by both families at Green Garden, Dhanmondi.',
    featureImage: akhdCertificate,
    cards: [
      {
        heading: 'Venue',
        body: 'Green Garden\nRooftop Lounge, Restaurant & Banquet Hall\n10th Floor (Lift-10), 4/2 Daffodil Plaza\nSobhanbag, Dhanmondi-27, Dhaka',
      },
      {
        heading: 'Time',
        body: 'Saturday\n22 August 2026\n1:30 PM',
      },
      {
        heading: 'With Best Regards',
        body: 'A.K.M. Anwar Hossain\nand\nSelina Akter',
      },
    ],
    venueMap: 'https://maps.app.goo.gl/7uCoQoVjFGd3779x9',
  },
]

export const galleryImages = [
  {
    src: akhdGalleryPortrait,
    alt: 'Himel and Proma holding their Akhd certificate together',
  },
]
