# Image Quality — Tcheou Odontologia

## Delivery

The site now uses responsive WebP images with high-resolution variants. The 4K files preserve the original supplied composition, identity, and typography; they were upscaled with Lanczos resampling and restrained sharpening instead of generative reconstruction.

| Asset | Original source | 4K-oriented file |
|---|---:|---|
| Clinical banner | 660 × 366 | `assets/images/tcheou-clinical-banner-4k.webp` — 3840 × 2129 |
| Dra. Cintia portrait | 612 × 832 | `assets/images/dra-cintia-portrait-4k.webp` — 2825 × 3840 |
| Instagram editorial art | 612 × 802 | `assets/images/tcheou-instagram-poster-4k.webp` — 2930 × 3840 |

Each 4K file has a 1200-pixel responsive counterpart. HTML `srcset` lets browsers choose a suitable image for the display and device pixel ratio.

## Fidelity note

These files have 4K-class pixel dimensions, but upscaling cannot recover detail absent from the smaller source photos. For true native 4K detail, replace them with original high-resolution camera/export files when available. The official logo remains SVG for resolution-independent rendering.
