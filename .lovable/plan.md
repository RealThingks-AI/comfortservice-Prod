

## Comprehensive Bug Fixes and Industry-Standard Improvements

After thoroughly reviewing every component in the codebase, here are the findings organized by severity.

---

### Bugs (Must Fix)

**1. Navigation Scroll Spy is broken**
The scroll spy doesn't handle "Home" at top of page, misses sections not in the navLinks list (like `#clients`, `#testimonials`, `#why-us`), and doesn't detect Contact at the bottom of the page. It needs: default to "home" when scrollY < 100, bottom-of-page detection for "contact", and viewport-center-based section detection.

**2. Inconsistent stat data across components**
- `About.tsx` says "1000+ AC Units Serviced" and "5/5 Google Rating"
- `Clients.tsx` says "10,000+ AC Units Serviced" and "4.8★ Customer Rating"
- `Testimonials.tsx` says "4.8/5 Average Rating"
- `index.html` says "10,000+ units serviced"
- Structured data says "5.0" rating with "57" reviews
These contradictions hurt credibility. Must standardize.

**3. Google Maps iframe shows wrong location**
The embed URL in `Contact.tsx` uses hardcoded approximate coordinates (`18.65, 73.8`) that don't match the actual business address. The map likely shows a generic location.

**4. OG/Twitter images point to Lovable placeholder**
`index.html` line 14/18: `og:image` and `twitter:image` point to `https://lovable.dev/opengraph-image-p98pqg.png` -- not the business's own image.

**5. Duplicate structured data**
Both `index.html` and `StructuredData.tsx` inject `LocalBusiness` schema, creating duplicate/conflicting JSON-LD on the page.

**6. Lazy-loaded images invisible until loaded**
CSS rule `img[loading="lazy"] { opacity: 0 }` makes lazy images invisible, but the `.loaded` class is never added by any JS, so images only show via the `:not([src=""])` fallback which may cause a flash or delay.

**7. Industries component exists but isn't used**
`Industries.tsx` is a fully built component but is never included in `Index.tsx`. It also has content about "manpower solutions" which is unrelated to AC services -- likely leftover from a template.

**8. Name validation blocks Indian names**
`validateName` regex `/^[a-zA-Z\s\-']+$/` blocks names with dots (like "Mr. Kumar"), and all non-Latin characters (Hindi/Marathi names).

---

### Improvements (Industry Standard)

**9. SEO: Missing `<link rel="preload">` for hero image**
The hero background is the largest contentful paint element but isn't preloaded, increasing LCP.

**10. SEO: No sitemap.xml**
`robots.txt` exists but doesn't reference a sitemap. Adding `sitemap.xml` improves crawl coverage.

**11. Accessibility: No skip-to-content link**
Screen reader and keyboard users must tab through the entire navbar before reaching content.

**12. Accessibility: Testimonial section has `tabIndex={0}` on the entire section**
This makes the whole section focusable, which is confusing for keyboard users. Should be on the carousel container only.

**13. Performance: Font loading blocks render**
Google Fonts loaded via `@import` in CSS blocks rendering. Should use `<link rel="preconnect">` and `<link>` in HTML head instead.

**14. Form doesn't actually send data**
The contact form opens a `mailto:` link which is unreliable -- many users don't have a desktop email client configured. Should use a proper form submission (e.g., Supabase edge function, or a service like Formspree/Web3Forms).

**15. No 404 handling for hash routes**
Clicking footer "Quick Links" like `#about` works on Index but would fail on `/privacy-policy` since those sections don't exist there.

**16. Footer "Back to Top" button only visible when footer is in view**
The scroll-to-top button is in the footer and only appears with IntersectionObserver. Industry standard: floating button visible after scrolling 300px+.

**17. Mobile: Hero tagline container has fixed height**
`h-[5.5rem]` on mobile can clip text on smaller screens or different font rendering.

**18. `handleScrollToServices` is defined but never used**
Dead code in `Hero.tsx`.

---

### Implementation Plan

**Phase 1: Critical Data Fixes**
- Standardize all stats across `About.tsx`, `Clients.tsx`, `Testimonials.tsx`, `index.html` to consistent values
- Fix OG/Twitter images to use business logo or a proper social preview image
- Remove duplicate structured data from `index.html` (keep `StructuredData.tsx`)

**Phase 2: Navigation & Scroll Spy Fix**
- Rewrite scroll spy in `Navigation.tsx`: default "home" at top, viewport-center detection, bottom-of-page "contact" detection
- Add floating scroll-to-top button in `FloatingButtons.tsx` (visible after 300px scroll)

**Phase 3: Form & Contact Fixes**
- Fix Google Maps embed with correct coordinates or proper search query
- Update name validation to allow dots and broader character sets
- Remove dead `handleScrollToServices` from Hero

**Phase 4: SEO & Performance**
- Move Google Fonts from CSS `@import` to HTML `<link>` tags with preconnect
- Add `<link rel="preload">` for hero background image
- Add `sitemap.xml`
- Remove unused Industries component or its template content
- Fix lazy image CSS (remove the opacity:0 rule, let browser handle native lazy loading)

**Phase 5: Accessibility**
- Add skip-to-content link at top of page
- Fix testimonial section tabIndex
- Ensure all interactive elements have proper aria labels

### Files to modify:
- `src/components/Navigation.tsx` -- scroll spy fix
- `src/components/FloatingButtons.tsx` -- scroll-to-top button
- `src/components/About.tsx` -- standardize stats
- `src/components/Clients.tsx` -- standardize stats
- `src/components/Testimonials.tsx` -- standardize rating
- `src/components/Hero.tsx` -- remove dead code, fix tagline height
- `src/components/Contact.tsx` -- fix map, fix name validation
- `src/index.css` -- fix lazy image rule, move font import
- `index.html` -- fix OG images, remove duplicate schema, add preload/preconnect, add sitemap reference
- `public/sitemap.xml` -- new file
- `public/robots.txt` -- add sitemap reference
- `src/pages/Index.tsx` -- add skip-to-content link

