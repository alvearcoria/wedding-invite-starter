# **App Name**: Mely & Noe: Wedding Celebration

## Core Features:

- Hero Section with Countdown: Display the couple's names, wedding date with a live countdown, and a prominent 'Confirm Assistance' CTA, set against a watercolor background. The AI-powered 'tool' will intelligently format the displayed date.
- RSVP Form with Firebase Integration: A comprehensive RSVP form capturing guest details (name, number of attendees, dietary preferences, etc.), securely stored in Firebase. Features client-side and server-side validation and antispam protection.
- Interactive Map Integration: Embedded Google Maps with locations for the ceremony and reception, ensuring guests can easily navigate to the venues. Opens directly in the device's native map application.
- Gift Registry/Bank Details: Show gift registry (external link) OR bank details with a copy-to-clipboard function and partial masking for security.
- Photo Gallery: A responsive photo gallery with swipeable images. Allow the upload to collaborative album with an integrated QR code that users can easily scan.
- Configurable Sections: Enable/disable sections (Story, Venues, Timeline, etc.) via a site configuration file (site.config.ts) for a personalized experience.
- Accessibility and SEO Optimization: Ensure high accessibility scores (Lighthouse ≥ 90) with semantic HTML, proper ARIA attributes, and optimized images for performance and SEO.

## Style Guidelines:

- Primary color: Champagne (#F7F2E7), a soft, light hue suggesting a neutral and bright tone, suitable as the background for other bolder elements.
- Background color: Aquarelle blush (#F3E9E7), very closely related in hue to the primary, almost fully desaturated for a quiet, bright backdrop.
- Accent color: Sage (#CFE2D0), which offers a subtle analogous accent. Noticeably different in brightness and saturation.
- Font pairing: 'Playfair' (serif) for titles and headings to bring elegance, paired with 'PT Sans' (sans-serif) for body text to ensure legibility.
- Use thin, consistent line icons to complement the elegant watercolor aesthetic.
- Implement a modular one-page layout with clear section divisions, optimized for mobile-first responsiveness (minimum 375px).
- Incorporate subtle microinteractions like fade/scale transitions and minimal parallax effects for an engaging user experience.