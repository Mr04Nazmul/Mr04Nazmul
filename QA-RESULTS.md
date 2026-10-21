# DevNazu verification — 21 October 2026

Production TypeScript and Vite build: PASS.

| Browser layout | Viewport | Result |
|---|---|---|
| Desktop Chromium | 1440 × 1000 | PASS |
| iPhone-sized Chromium, touch | 390 × 844 | PASS |
| Android-sized Chromium, touch | 412 × 915 | PASS |
| Small mobile Chromium, touch | 320 × 700 | PASS |
| Reduced-motion mobile Chromium | 375 × 812 | PASS |

Each run checks all six main sections, three project cards, image loading, horizontal overflow, carousel next/previous/direct pagination, sound expand/mute/unmute, video pause, video looping and inline playback, local HTTP failures, runtime/console errors, and axe WCAG 2 A/AA + WCAG 2.1 AA rules. Mobile runs additionally verify the menu, Escape closing and link closing. All report zero runtime errors, missing images, overflow and axe violations. Screenshots reviewed for desktop, iPhone hero, skills and project layouts. Automated checks complement, rather than replace, real device testing.

Original video: 510 × 910, H.264/AAC, 13.93 seconds, 8,560,588 bytes. Original local mirror is byte identical (SHA-256 `be3eae536d30a1e44982b4ad7f69b1f8b3228c9699d6bcddbb2f5c7df7bb55e5`). A VP9/Opus rendition of the same video adds broader browser compatibility; byte-identical original MP4 and original remote URL are retained as fallbacks. Native resolution has not changed. Reduced-motion mode starts paused and removes scroll stacking and reveal animations. Video can still be explicitly played.

`npm test` serves the production build and generates screenshots and `test-results/report.json`. CI uploads the results as `browser-qa`. Final local run used official Chrome for Testing 155 and Playwright 1.64.1; CI uses the runner’s official Google Chrome for H.264/AAC playback. The open Chromium distribution lacks the proprietary media codecs required by the original video. This is viewport emulation, not physical iOS Safari / Android hardware testing. External video host had intermittent 502 responses; self-hosting the same source removes the primary dependency.

Project link audit: Halal Checker live URL, project repositories and public GitHub profile resolve. Receipt AI's legacy GitHub Pages URL returns 404, so the portfolio links to its source. NAZORIX's legacy Pages address redirects to nazus.xyz, so the portfolio links to its source. The Money- repository currently contains Halal Checker code, so it is not misrepresented as a wallet release. No awards, certifications or launch claims were invented.

Deployment: staging and main run validation. Main deploys only after build and browser QA pass. Custom domain remains devnazu.jp in both CNAME files. Existing GitHub profile README and attribution draft preserved.

## Profile cleanup

Removed Japan Halal Checker from project cards, milestones and skill destinations. Replaced the generic avatar with the owner-supplied illustrated portrait, linked to the full original image. Removed library names from the main footer and retained required attribution on the linked Credits page. All five layout checks additionally assert the removed project links and footer labels are absent and the new portrait asset is selected.
