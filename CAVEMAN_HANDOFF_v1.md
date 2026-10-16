# CAVEMAN HANDOFF v1

APP: Tcheou Odontologia
WORKSTREAM: Premium landing page — responsive 4K image integration
STATE: IMAGE ASSETS PREPARED AND WIRED INTO THE SITE; IMAGE RELEASE COMMIT CREATED ON MAIN; POST-COMMIT QUALITY GATE MUST BE VERIFIED; VERCEL NOT STARTED
MODE: WATCH
CANONICAL SOURCE: https://github.com/comercialestilodevet-create/tcheou-odontologia

CURRENT VERSION / HEAD: main tip must be read dynamically; base HEAD verified before this image release: eeec33d1996377455969c4732e6ebce662a23bd3
BASE: eeec33d1996377455969c4732e6ebce662a23bd3
BRANCH / ENV: main / static site
PR / MR / TASK: no PR open; direct continuation of existing main workstream
SPEC / ADR: README.md; docs/BRAND_SYSTEM.md; docs/LAUNCH_CHECKLIST.md; docs/IMAGE_QUALITY.md

DONE:
- Premium landing page and existing responsive interaction layer retained.
- Added 4K-class WebP variants for the clinical banner, professional portrait, and Instagram educational artwork.
- Added 1200px responsive counterparts and srcset/sizes declarations.
- Added dedicated image-quality stylesheet and editorial Instagram content section.
- Kept official SVG logo as vector; no generated replacement portrait used.
- Added documentation distinguishing upscaled output from native source resolution.

VERIFY:
- HTML anchors and replacements verified before commit.
- All referenced image paths are part of this release tree.
- Confirm the newest GitHub Actions Quality Gate after this commit.
- Inspect the deployed preview visually if GitHub Pages is active.
- Do not describe the upscaled files as native-capture 4K.

GATES:
- Final clinic/team approval of copy and photo.
- Official verification of CRO/credentials.
- Confirm phone, WhatsApp, Instagram and hours.
- Confirm final domain/canonical.
- Visual QA sign-off.
- Only then start Vercel deployment after explicit user advancement.

BLOCKERS:
- No implementation blocker for the image release.
- True native 4K detail requires original high-resolution source captures.
- Vercel intentionally pending.

INVARIANTS:
- GitHub main remains canonical before Vercel.
- Do not start Vercel deployment without explicit user approval.
- Do not invent professional credentials or clinical claims.
- Never declare a live deployment without evidence.
- Keep supplied identity, faces, logo, and typography faithful; avoid generative substitutions.

NEXT:
- WATCH the Quality Gate for the image release and fix actual failures if any.
- If CI passes, classify ADVANCE and wait for clinic/team approval before Vercel.

VERIFY-FIRST:
1. Read current main ref and latest commit; do not assume the recorded base SHA remains HEAD.
2. Check open PRs/issues and the latest workflow run.
3. Confirm assets exist in assets/images/ and inspect index.html + css/image-quality.css.
4. Re-run static validation and inspect the preview if available.
5. Keep Vercel unchanged until the user explicitly advances.
