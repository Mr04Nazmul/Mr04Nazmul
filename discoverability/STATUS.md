# Nihongo Path global discoverability — execution status
Updated 17 November 2026 (Japan).

## Confirmed work
- Owner approved merge/deployment. PR #2 and Bing verification PR #3 were merged through isolated branches. Main website build, 9 multilingual viewport/accessibility checks and 5 portfolio layout checks passed; GitHub Pages deployment succeeded: https://github.com/Mr04Nazmul/Mr04Nazmul/actions/runs/43994875017 .
- Live app pages: https://devnazu.jp/nihongo-path/ (Bengali), https://devnazu.jp/nihongo-path/en/ (English), https://devnazu.jp/nihongo-path/ja/ (Japanese). Each returns HTTP200, has its own canonical and reciprocal hreflang, original icon, actual app screenshots, accurate feature/access disclosures and verified store links.
- Google Search Console ownership verified by HTML tag. Sitemap https://devnazu.jp/sitemap.xml submitted successfully; Google reports Success and 4 discovered URLs. Individual indexing requests for all 3 app pages were accepted into the crawl queue. The pages were not indexed at inspection time; no ranking or indexing-success claim.
- Bing Webmaster ownership verification completed by its issued HTML tag. Sitemap accepted and Processing. Individual indexing requests for all 3 app pages accepted. Japanese-page indexed-data view initially showed an indexing restriction; a fresh Live URL test reported “URL can be indexed by Bing” and “No SEO/GEO issues found”. All 3 live pages return200 with no noindex meta/header. Final inclusion remains Bing's decision.
- AppBrain public listing confirmed after the earlier Play-URL submission: https://www.appbrain.com/app/nihongo-path-books/online.devnazu.books . Its app-search result also appears for the exact package. AppBrain is a discovery directory, not APK hosting.
- APKMirror upload completed. UI confirmed “SUCCESS: Your files have been uploaded, please check if there were any errors.” Submitted existing1.19.3 owner-signed APK, publisher HOSSAIN NAJMUL and public support contact. Submission note discloses the certificate difference from Play and fresh-install limitation. No editorial approval/public listing confirmed.
- Softonic signed-in onboarding reached profile creation. Created Individual publisher profile HOSSAIN NAJMUL using the app's public support email and devnazu.jp. Stopped at the explicit Terms and Conditions / Application Distribution License checkbox; these terms have not been accepted.
- Bengali/English/Japanese ASO copy, screenshot captions, search-intent map, original posts and video script remain in this folder. No social posts or new duplicate accounts were created.

## Platform tracker
Prepared materials are shared existing release/assets/copy, not evidence of a completed platform-specific submission. No new application build, signing change or release occurred.

| Platform | Discovery / submission status | Fees / package | Remaining blocker or action |
|---|---|---|---|
| Google Search | Ownership verified; sitemap Success, 4 discovered URLs; 3 app-page indexing requests accepted | Free | Actual indexing and rankings not yet confirmed |
| Bing | Ownership verified; sitemap Processing; 3 indexing requests accepted | Free | Crawl/index processing; no public ranking claim |
| Google Play | Existing public listing verified: https://play.google.com/store/apps/details?id=online.devnazu.books | Existing account; AAB updates | No Console edits performed |
| Uptodown | PUBLISHED1.19.3: https://nihongo-path.en.uptodown.com/android | Free; APK | Current publication confirmed; no new submission needed |
| AppBrain | Public1.19.3 listing verified: https://www.appbrain.com/app/nihongo-path-books/online.devnazu.books | Play URL directory | Account claim/featured promotion not performed; no paid campaign |
| APKMirror | APK uploaded successfully; editorial review/publication unconfirmed | Existing signed APK; no payment | Await editorial decision; no invented listing URL |
| Softonic | Individual publisher profile created; not submitted | Free; APK only, <=1GB | Explicit acceptance of Terms and Conditions and Application Distribution License; subsequent listing/upload/review |
| Samsung Galaxy Store | Portal reached Samsung account sign-in; not submitted | No signup/annual fee; APK/AAB | Owner sign-in (email/Google/QR offered), commercial seller and applicable business/bank verification. AAB uses store-managed signing |
| Huawei AppGallery | Console access failed with HTTP2/network error; recovery observation rejected by browser URL authority gate; not submitted | Developer accounts free; APK/AAB | Console access, owner identity/region verification and non-GMS device tests; no workaround attempted |
| Xiaomi GetApps | Xiaomi account sign-in reached; not submitted | Distribution free under current agreement; APK, documented bundle-conversion route | Owner authentication, account terms and ownership verification; resolve Play-vs-owner certificate/update strategy |
| OPPO App Market | Developer/HeyTap login reached; not submitted | Free developer registration; APK route | Owner login/identity, current territory eligibility, terms. Do not confuse Theme Store coverage with App Market coverage |
| vivo V-Appstore | No submission; shared materials ready | APK; applicable account fees/AAB not fully verified | Official FAQ does not support individual developer registration; genuine business qualifications required |
| Aptoide Connect | Not submitted; subscription not started | USD69 or EUR69/year; active subscription for review; APK/OBB | Specific spending/renewal approval, account and signature compatibility; prioritised free channels |
| APKPure | No submission; signup required | APK developer route; fees/eligibility not fully confirmed | Owner account and ownership review |
| ONE store | No submission | Account/region-specific; exact package/fee not freshly established | Overseas eligibility and regional onboarding unresolved |
| RuStore | No submission | Current owner-specific requirements not established | Foreign developer/entity eligibility unresolved |
| Mainland China stores (Tencent/AppChina/OEM) | No submission | Platform-specific | Identity/filing/rights and non-GMS compatibility not established |
| Amazon Appstore | Not submitted; general Android-phone route discontinued | Fire conditional | Separate Fire-device compatibility/adaptation, no phone-store publication claim |
| F-Droid | Existing build not eligible on known dependency/source facts | Free FOSS route | Proprietary AdMob dependency and latest source provenance; no SDK removal or relicensing |
| SlideME | No current submission route verified | Not established | Do not rely on historical marketplace lists |
| Facebook / YouTube / Instagram / TikTok | Original copy prepared; no owner-confirmed app profiles linked or modified | No paid campaign | Identify existing official accounts before posting/renaming; TikTok public lookup restricted |

## Approval and login boundaries
The owner's broad approval authorised website merge/deployment and continued distribution work. APKMirror upload was first rejected by automatic review because it requested specific approval for the signed APK and contact-email disclosure. After the owner explicitly reauthorised that described action, the normal form upload succeeded. This is resolved, not a current blocker.

Softonic's exact legal agreement is a separate action-time consent step. The form states that acceptance grants distribution rights necessary to publish apps. No checkbox or Continue action was taken on that agreement. Samsung/Xiaomi/OPPO authentication requires the owner's sign-in choices/credentials through the secure browser flow; no passwords or OTPs were requested in chat or inspected.

No production Supabase changes, Play Console changes, private-key access or payment. Official account eligibility and store acceptance cannot be manufactured by broad permission.

## Binary/security result and limits
Existing owner APK v2 signature freshly verifies with 4096-bit RSA. SHA256 edef1ff75ab8b2baf51e29601c2b74e0ea59cfa54ccc3707499301bedc2d1518. Certificate SHA256 cee711142bf2d6c786606d09297174b041caa9c25b554249bb2e9c1b6e703ed7 matches recovered report and Uptodown public certificate MD5. No rebuild/re-sign, credentials, private signing keys or database writes.

Recovered prior audit reports eleven manifest permissions, minSDK24/target36, no BILLING permission/BillingClient identified and no Pairip files in owner candidate. That is not an independent malware certification or a full backend/IAP audit. Existing Google login, ads and rewards were not modified or exercised against production. Play's different signing certificate means cross-store updates are not interchangeable. Retain the original archive's security reports for exact permissions and existing real-device test limitations.

Source limitation: original GitHub Android main remains1.14.0/code22. Do not build it and label it1.19.3. Latest original source parity remains unresolved. No production Supabase reads/writes, secrets inspection, ad configuration changes or application releases performed.

## Validation
Production build, 9 app-page checks and the existing 5-layout portfolio suite passed on the deployed source. Main deployment succeeded in run43994875017. Live HTTP200/canonical/noindex-header checks passed for all3 app pages. No physical Android device test was added; no app build/re-sign occurred.

## Sources checked 17 November
- Samsung fees/formats: https://developer.samsung.com/galaxy-store/faq.html ; registration/signing: https://developer.samsung.com/galaxy-store/prepare.html ; https://developer.samsung.com/galaxy-store/launch.html
- Huawei account fees: https://developer.huawei.com/consumer/en/doc/help/identityverfication-0000001053292680/ ; identity/APK: https://developer.huawei.com/consumer/en/doc/doccenter-distribution/agc-help-createapk-0000001912873100/ ; AAB: https://developer.huawei.com/consumer/en/doc/app/agc-help-releasebundle-0000001100316672/
- Xiaomi agreement: https://global.developer.mi.com/document?doc=cookiePolicyTitle.releaseAgreement ; upload: https://orig-global.developer.mi.com/document?doc=appManagement.createAndUpdate ; signature: https://global.developer.mi.com/document?doc=appManagement.getTheAppSignedByGooglePlay
- OPPO: https://developers.oppomobile.com/wiki/index
- vivo registration: https://developer.vivo.com/doc/detail?id=61
- Aptoide: https://docs.connect.aptoide.com/docs/subscription ; https://docs.connect.aptoide.com/docs/app-submission-overview
- Softonic: https://developers.softonic.com/publish-android-app/
- Uptodown: https://support.uptodown.com/hc/en-us/articles/4424141383181-Basic-guide-to-register-and-publish-apps-on-Uptodown
- AppBrain: https://www.appbrain.com/info/addapp ; https://www.appbrain.com/docs/publisher-faq/account
- Google sitemaps: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- Bing verification: https://www2.bing.com/webmasters/help/add-and-verify-site-12184f8b

The older 16 November store tracker is historical supporting research, not proof that every platform has been re-verified or submitted today. A public page or sitemap submission does not guarantee indexing or rankings.
