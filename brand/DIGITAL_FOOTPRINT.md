# MultiMichel — public identity and search-result cleanup
_Research date: 1 November 2026 · Status: working audit, not exhaustive_

## Source of truth
- **Name:** Michel Ferreira
- **Also known as:** MultiMichel
- **Professional identity:** Designer, writer, speaker, mentor; currently Designer Advocate at Figma
- **Home:** Sydney, Australia
- **Career history:** Designing digital products since 1998; Booking.com, Shopify, Atlassian, Xero, Figma
- **Canonical website:** https://multimichel.com/
- **Canonical LinkedIn:** https://www.linkedin.com/in/michelpferreira/
- **Language:** English and Portuguese
- **Biography convention:** 'nearly 30 years' or 'since 1998' through 2027. Do not prematurely use '30+ years.'
- **Editorial approach:** Preserve genuine historical articles/interviews as dated evidence; correct *current* biographies and still-live personal portfolios.

## High-priority actions
| Priority | URL | Ownership | Finding | Corrective action | Status |
|---|---|---|---|---|---|
| P0 | https://michelferreira.me/ | Domain settings / Framer | Redirects to legacy Framer site with Atlassian listed as current job | Point domain permanently (301 or 308) to https://multimichel.com/; preserve path when useful | Needs domain-owner change |
| P0 | https://michelferreira.framer.website/ | Framer | Legacy portfolio explicitly claims Atlassian as current | Unpublish, redirect if supported, or replace homepage with "The new home is multimichel.com"; do not leave a parallel stale portfolio | Needs Framer account |
| P1 | https://multimichel.com/ | Owned via connected GitHub + Vercel | Canonical URLs already correct; identity metadata can be improved | Add Person structured data connecting verified profiles | Prepared in this PR |
| P1 | https://multimichel.github.io/ | GitHub Pages | Accessible duplicate of canonical site | Retain self-canonical URLs to multimichel.com; consider GitHub Pages-only host redirect later | Needs follow-up verification |
| P1 | https://www.linkedin.com/in/michelpferreira/ | LinkedIn profile | Profile URL links to http://www.multimichel.com; Figma experience lacks a description | Replace with https://multimichel.com; update Figma role and Featured links | Needs profile editor |
| P1 | https://adplist.org/mentors/michel-ferreira | ADPList | Still identifies Atlassian as current | Update role to Figma, or close outdated listing if no longer active | Needs account owner |
| P1 | https://www.latinxswhodesign.com/ | Directory / website | Michel listed as Atlassian design manager / CareerFoundry mentor | Replace current role; keep podcast identity and historical work | Needs website owner |
| P1 | https://alistapart.com/author/michelferreira/ | External editorial | Bio says 'now Xero' | Request author-bio update from publication | Needs editor |
| P2 | https://www.coroflot.com/michelpferreira/logos | Coroflot | Lists Laguna Niguel, California | Correct location or describe as historical California-era portfolio | Needs profile owner |
| P2 | https://multimichel.medium.com/ | Medium | Bio says '30+ years' | Align to 'since 1998' and link canonical website | Needs profile owner |
| P2 | https://creativemornings.com/talks/michal-ferreira | External organizer | URL has 'michal' spelling though on-page name is Michel | Request corrected URL/redirect, keeping any existing recording links | Needs organizer |
| P2 | https://www.podchaser.com/podcasts/latinxs-who-design-1665720 | Podcast directory | Creator details sparse | Claim/enrich where supported; link canonical homepage | Needs account owner |
| P2 | https://conffab.com/presentation/fast-%E2%89%A0-good/ | Talk platform | Recorded slide says linkedin.com/in/michelferreira/ | Verify whether slide/description/links can be corrected to /michelpferreira/ | Needs presenter or publisher |

## Confirmed profiles and publication evidence — preserve / cross-link
| URL | Role |
|---|---|
| https://mentorcruise.com/mentor/michelferreira/ | Active mentorship profile; already uses Figma |
| https://dribbble.com/multimichel | Historical creative work; valid owner identity |
| https://www.youtube.com/@multimichel | Video archive |
| https://podcasts.apple.com/au/podcast/latinxs-who-design/id1554011225 | Podcast archive |
| https://open.spotify.com/show/0J3JdhM454AvedlYlXqeRZ | Podcast archive |
| https://alistapart.com/article/design-dialects-breaking-the-rules-not-the-system/ | Published writing |
| https://alistapart.com/article/an-holistic-framework-for-shared-design-leadership/ | Published writing |
| https://www.atlassian.com/blog/teamwork/11-lessons-from-the-nba-bubble-for-your-newly-remote-team | Published writing |
| https://config.figma.com/san-francisco/speakers/ | Official speaker listing |
| https://designmatters.io/lineup/ | Official speaker listing |
| https://webdirections.org/aixdesign/speakers/michel-ferreira.php | Official speaker bio |
| https://creativemornings.com/talks/michal-ferreira | Historical appearance with URL spelling issue |
| https://friends.figma.com/events/details/figma-sydney-presents-pecha-kucha-the-art-of-storytelling/ | 2026 speaking |
| https://fig-events.figma.com/mc-cbr/ | 2026 speaking |
| https://fig-events.figma.com/code-sot-apac/ | 2026 webinar |
| https://fig-events.figma.com/ds-make-apac/ | 2026 webinar |
| https://www.loversmagazine.com/ | Preserve any historically accurate interview, verify exact permalink |

## Domain migration: michelferreira.me
The domain currently redirects to https://michelferreira.framer.website/ (checked from public web access). This cannot be repaired by changing the MultiMichel GitHub repository alone.

1. Identify the registrar / DNS operator and current Framer project domain settings.
2. Prefer a single **permanent 301 or 308** from michelferreira.me (and www, if configured) to https://multimichel.com/; preserve request paths when appropriate.
3. Remove stale custom-domain attachment from Framer if necessary to free the domain. If unpublishing the Framer subdomain is supported, do so or show a minimalist link to the new site.
4. Check HTTPS and follow redirects from both http and https, www and apex.
5. In Google Search Console, verify both domains under ownership, submit the canonical sitemap and request recrawling for key affected URLs. Search results take time; no instant removal guarantee.
6. Do **not** remove historical articles, public talks, or independent podcast archives simply because they are old.

## Search patterns for ongoing identity discovery
- "Michel Ferreira" "MultiMichel"; "Michel Pereira Ferreira" designer
- site:michelferreira.me; site:multimichel.com; site:multimichel.github.io
- "Michel Ferreira" (Booking.com OR Shopify OR Atlassian OR Xero OR Figma)
- "Michel Ferreira" (podcast OR speaker OR design OR entrevista OR palestra)
- "michelpferreira" OR "@multimichel"
- Investigate English and Portuguese, videos, images, PDF slide decks, archived portfolios, conference schedules and non-Google indexes.

**Important:** Several people share the name Michel Ferreira. Exclude unrelated academic papers, podcasts and businesses without independent identity confirmation.

## Editing rule
Before editing a platform: verify account access, preserve links/reviews, and copy the authoritative bio from BRAND_COPY.md. Add new public appearances to the existing `content.js` archive; avoid inventing projects, results or metrics.
