# Iron Pulse Fitness

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Full single-page marketing website for Iron Pulse Fitness gym (USA, Texas)
- Hero section with headline, subheadline, and dual CTA buttons (Join Now / Get Free Trial)
- About section with gym mission, transformation-focused copy, and 4 "Why Choose Us" bullet points
- Services section: Personal Training, Weight Loss Programs, Strength Training, Group Classes — each with persuasive description
- Membership Pricing section with 3 plans (Basic, Pro, Elite); Pro plan highlighted as most popular
- Transformation section with before/after success story and motivational testimonial
- Call to Action section with strong emotional CTA and free trial offer
- Contact section with phone, email, Texas location, and a contact form (name, email, message, submit)
- Sticky navigation bar with smooth scroll links to all sections
- Backend: store contact form submissions (name, email, message, timestamp)

### Modify
- None

### Remove
- None

## Implementation Plan
1. Select no external components (contact form handled via Motoko backend)
2. Generate Motoko backend with a `submitContact` endpoint (name, email, message) returning success/error and `getContacts` for admin
3. Generate hero background image and gym imagery
4. Build React frontend:
   - Sticky nav with smooth scroll
   - Hero section (full-viewport, dark overlay on gym image, headline, subheadline, CTAs)
   - About section (mission statement, 4 bullet points)
   - Services section (4 cards: Personal Training, Weight Loss, Strength Training, Group Classes)
   - Pricing section (3 cards; Pro highlighted/elevated)
   - Transformation section (before/after story card + testimonial quote)
   - CTA banner section (bold headline, free trial CTA)
   - Contact section (info + functional form wired to backend)
   - Footer
5. Apply deterministic data-ocid markers to all interactive elements
6. Validate and deploy
