import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const site = 'https://devnazu.jp';
const root = '/nihongo-path/';
const icon = site + root + 'assets/icon.png';
const play = 'https://play.google.com/store/apps/details?id=online.devnazu.books';
const { algorithms } = JSON.parse(await readFile('discoverability/npale-content.json', 'utf8'));
const locales = ['bn', 'en', 'ja'];
const languageNames = ['বাংলা', 'English', '日本語'];
const routes = ['', 'adaptive-learning-engine', 'features', 'technical-documentation', 'changelog', 'faq'];
const titles = [
  ['অ্যাপ পরিচিতি', 'অ্যাডাপ্টিভ লার্নিং ইঞ্জিন', 'অ্যাপের ফিচার', 'কারিগরি নথি', 'সংস্করণ ও পরিবর্তন', 'সাধারণ প্রশ্ন'],
  ['App overview', 'Adaptive Learning Engine', 'App features', 'Technical documentation', 'Changelog', 'Frequently asked questions'],
  ['アプリ概要', '適応学習エンジン', 'アプリの機能', '技術資料', 'バージョン履歴', 'よくある質問'],
];
const write = (path, text) => writeFile(join('dist', path), text);
const url = (page, language) => root + (routes[page] ? routes[page] + '/' : '') + (language ? locales[language] + '/' : '');
const links = (language, pages) => pages.map(page =>
  '<a href="' + url(page, language) + '">' + titles[language][page] + '</a>').join(' ');
const languages = page => locales.map((lang, i) => '<a lang="' + lang + '" hreflang="' + lang + '" href="' + url(page, i) + '">' + languageNames[i] + '</a>').join(' ');
const alternate = page => [...locales, 'x-default'].map((lang, i) =>
  '<link rel="alternate" hreflang="' + lang + '" href="' + site + url(page, i === 3 ? 1 : i) + '">').join('\n');
const compact = value => JSON.stringify(value).replaceAll('<', '\\u003c');
const scope = [
  'NPALE-এর ১৪টি উপাদানের এই নথি Android ডেভেলপমেন্ট সোর্সের পর্যালোচনার ওপর ভিত্তি করে। APK ও AAB ম্যানিফেস্টে 1.20.3 (Build 37) যাচাই করা হয়েছে। দুই ফাইলের অ্যাডাপ্টিভ রিডার ও রিমাইন্ডার ওয়ার্কার Build 37-এর বিল্ড সোর্সের সঙ্গে মেলে। Google Play-এ 1.20.3 তালিকাভুক্ত। Play-এর production version code আলাদাভাবে যাচাই করা বাকি।',
  'This audit covers 14 components in the NPALE Android development source. The APK and AAB manifests confirm 1.20.3 (Build 37). Their adaptive reader and reminder worker match the Build 37 build source files. Google Play lists 1.20.3. Its production version code still needs separate verification.',
  'Android開発ソースに含まれるNPALEの14項目を確認しました。APKとAABのマニフェストで1.20.3（Build 37）を確認しました。両方の適応学習リーダーと通知ワーカーはBuild 37のビルド元ファイルと一致します。Google Playでは1.20.3が掲載されており、本番配信のバージョンコードは確認中です。',
];
const features = [
  ['JLPT N5–N1 অনুসারে শব্দভাণ্ডার, ব্যাকরণ ও কাঞ্জি সাজানো। বাংলা অর্থ ও ব্যাকরণের ব্যাখ্যা, উচ্চারণ, স্ট্রোক অ্যানিমেশন ও লেখার বোর্ড আছে।', 'বিনামূল্যের প্রিভিউ আছে। বাড়তি পড়ার সময় পেতে রিওয়ার্ডেড বিজ্ঞাপন ব্যবহার হয়। পুরো অ্যাক্সেসের জন্য অ্যাকাউন্ট বা ইন্টারনেট লাগতে পারে।', 'সোর্স ব্রাঞ্চে স্থানীয় স্টাডি হিস্ট্রি, গুগল সাইন-ইনের পথ, টেমপ্লেটভিত্তিক লেখার ফিডব্যাক এবং লিখিত মক পরীক্ষা দেখা যায়। Google Play-এর 1.20.3 নোটে FSRS Smart Review, Daily Smart Study, লেখার ফিডব্যাক এবং ২৫টি সময়-নির্ধারিত লিখিত মক পরীক্ষার উল্লেখ আছে। সব অফলাইন অপারেশন যাচাই হয়নি।'],
  ['Vocabulary, grammar and kanji are organised across JLPT N5–N1, with Bengali meanings and explanations, pronunciation, kanji stroke animation and a writing board.', 'Free previews are available. Rewarded ads can unlock additional study time. Full access may require an account or internet connection.', 'The development source includes local study history, a Google sign-in flow, template-based handwriting feedback and written mock exams. The Play notes for 1.20.3 list FSRS Smart Review, Daily Smart Study, handwriting feedback and 25 timed written mock tests. Full offline coverage remains unverified.'],
  ['JLPT N5〜N1の語彙・文法・漢字を扱い、ベンガル語の語義・文法解説、発音、筆順アニメーション、書き取りボードを提供します。', '無料プレビューがあり、リワード広告で学習時間を追加できます。全機能の利用にはアカウントやインターネット接続が必要な場合があります。', '開発ソースには端末内の学習履歴、Googleログイン、手本に沿った書き取り評価、筆記模擬試験があります。Playの1.20.3更新情報にはFSRS Smart Review、Daily Smart Study、書き取り評価、制限時間付き筆記模試25回分が掲載されています。完全オフライン対応は確認中です。'],
];
const tech = [
  ['যোগ্য উত্তর স্থানীয় SQLite ইতিহাসে রাখা হয়। বর্তমান অ্যাকাউন্ট ও পাঠের অ্যাক্সেস যাচাইয়ের পরে রিডার সেই ডেটা থেকে রিভিউ, দক্ষতা ও পরের প্রশ্ন সাজায়।', 'মক পরীক্ষার চেষ্টা আলাদা রাখা হয়। ঐচ্ছিক ক্লাউড সিঙ্কের জন্য উপযুক্ত সার্ভার দরকার। প্রোডাকশনে সিঙ্ক চালু আছে কি না যাচাই হয়নি।'],
  ['Eligible answer events are stored in account-scoped SQLite history. The reader checks account and study access before using outcomes to schedule review, estimate mastery and select practice.', 'Mock exam attempts are tracked separately. Optional cloud sync requires a compatible server. Production sync remains unverified.'],
  ['対象の回答をアカウント別のSQLite履歴に保存します。閲覧権限を確認した上で、履歴から復習日程、習得度、次の練習問題を計算します。', '模擬試験の履歴は分けて管理します。任意のクラウド同期には対応サーバーが必要で、本番での稼働は確認中です。'],
];
const release = [
  'ডেভেলপমেন্ট সোর্সে সময়-নির্ধারিত লিখিত মক পরীক্ষা, পুনরায় অ্যাপ খোলার পর শেখার মডেল পুনরুদ্ধার এবং রিমাইন্ডার গণনার জন্য আলাদা ওয়ার্কার দেখা যায়।',
  'The audited development revision includes a timed written mock-exam flow, restoration of learning model checkpoints after reopening the app, and reminder fitting in a background worker.',
  '調査した開発版には制限時間付き筆記模試、アプリ再起動後の学習モデル復元、ワーカーでの通知時刻推定が含まれます。',
];
const questions = [
  ['Nihongo Path Books কী?', '১৪টি উপাদান কি সবাই ব্যবহার করতে পারে?', 'ইন্টারনেট ছাড়া সব ফিচার চলবে?', 'লেখার বোর্ড কী মূল্যায়ন করে?'],
  ['What is Nihongo Path Books?', 'Are all 14 NPALE components available to every learner?', 'Do all features work offline?', 'What does the writing board assess?'],
  ['Nihongo Path Booksとは？', 'NPALEの14項目は誰でも使えますか？', '全機能をオフラインで使えますか？', '書き取りボードは何を評価しますか？'],
];
const paragraphs = rows => rows.map(row => '<p>' + row + '</p>').join('\n');
const navLabels = [['ভাষা', 'অ্যাপের পেজ', 'বিস্তারিত তথ্য'], ['Languages', 'App pages', 'App documentation'], ['言語', 'アプリ関連ページ', 'アプリ資料']];
const org = { '@type': 'Organization', '@id': site + '/#devnazu', name: 'DevNazu', url: site + '/' };
const website = { '@type': 'WebSite', '@id': site + '/#website', name: 'DevNazu', url: site + '/' };
const app = {
  '@type': 'SoftwareApplication', '@id': site + root + '#app', name: 'Nihongo Path Books',
  url: site + root, operatingSystem: 'Android', applicationCategory: 'EducationalApplication',
  installUrl: play, image: icon, publisher: { '@id': org['@id'] },
};
const answer = i => [features[i][0], scope[i], features[i][1] + ' ' + features[i][2], algorithms[5][i + 1]];

for (const [language, lang] of locales.entries()) {
  const landing = url(0, language);
  const previous = await readFile(join('dist', landing, 'index.html'), 'utf8');
  await write(landing + 'index.html', previous.replace('</main>',
    '<section><h2>' + navLabels[language][2] + '</h2><nav aria-label="' + navLabels[language][1] + '">' +
    links(language, [1, 2, 3, 4, 5]) + '</nav></section></main>')
    .replace(/ · Google Play release 1\.20\.0| · Google Play公開版：1\.20\.0| · Google Play সংস্করণ 1\.20\.0/g, ''));
  for (const page of [1, 2, 3, 4, 5]) {
    const path = url(page, language);
    const canonical = site + path;
    const title = titles[language][page];
    const description = page === 2 ? features[language][0] : page === 5 ? questions[language].join(' ') : scope[language];
    const faq = questions[language].map((name, i) => ({
      '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text: answer(language)[i] },
    }));
    const data = [{ '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Nihongo Path Books', item: site + landing },
      { '@type': 'ListItem', position: 2, name: title, item: canonical },
    ] }, org, website, app];
    if (page === 5) data.push({ '@type': 'FAQPage', '@id': canonical, mainEntity: faq, inLanguage: lang });
    const sections = {
      1: paragraphs([scope[language]]) + '<ol>' + algorithms.map(row =>
        '<li><h2>' + row[0] + '</h2><p>' + row[language + 1] + '</p></li>').join('\n') + '</ol>',
      2: paragraphs(features[language]),
      3: paragraphs([scope[language], ...tech[language]]) + '<p>' + links(language, [1, 4]) + '</p>',
      4: '<h2>1.20.3 · Google Play · 2026-11-25</h2>' + paragraphs([features[language][2], scope[language], release[language]]),
      5: faq.map(item => '<section><h2>' + item.name + '</h2><p>' + item.acceptedAnswer.text + '</p></section>').join('\n'),
    };
    await mkdir(join('dist', path), { recursive: true });
    await write(path + 'index.html', `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title} | Nihongo Path Books</title>
<meta name="description" content="${description}">
<link rel="canonical" href="${canonical}">
${alternate(page)}
<meta property="og:type" content="website">
<meta property="og:title" content="${title} | Nihongo Path Books">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${icon}">
<link rel="icon" href="${root}assets/icon.png">
<link rel="stylesheet" href="${root}style.css">
<script type="application/ld+json">${compact({ '@context': 'https://schema.org', '@graph': data })}</script>
</head>
<body>
<header><a href="${landing}">Nihongo Path Books</a><nav aria-label="${navLabels[language][0]}">${languages(page)}</nav></header>
<main><h1>${title}</h1>${sections[page]}</main>
<footer><nav aria-label="${navLabels[language][1]}">${links(language, [0, 1, 2, 3, 4, 5].filter(i => i !== page))}</nav></footer>
</body>
</html>
`);
  }
}

const sitemap = await readFile('public/sitemap.xml', 'utf8');
const entries = routes.slice(1).flatMap((_, index) => {
  const page = index + 1;
  const alternates = [...locales, 'x-default'].map((lang, i) =>
    '<xhtml:link rel="alternate" hreflang="' + lang + '" href="' + site + url(page, i === 3 ? 1 : i) + '"/>').join('');
  return locales.map((_, i) => '<url><loc>' + site + url(page, i) + '</loc>' + alternates + '</url>');
});
await write('sitemap.xml', sitemap.replace('<urlset ', '<urlset xmlns:xhtml="http://www.w3.org/1999/xhtml" ')
  .replace('</urlset>', entries.join('\n') + '\n</urlset>'));
await write('llms.txt', '# DevNazu · Nihongo Path Books\n\n> Android Japanese study app with Bengali explanations for JLPT N5–N1. The NPALE audit describes development source and lists release verification limits.\n\n## Official documentation\n\n' +
  titles[1].map((title, i) => '- [' + title + '](' + site + url(i, 1) + ')').join('\n') +
  '\n\n## Store\n\n- [Google Play](' + play + ')\n');
