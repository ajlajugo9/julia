const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);
const isOpenWhenPage = window.location.pathname.endsWith('/open-when.html');
const isMemoriesPage = window.location.pathname.endsWith('/memories.html');
const isFormulaPage = window.location.pathname.endsWith('/formula.html');
const isSoundtrackPage = window.location.pathname.endsWith('/soundtrack.html');
const isQuizPage = window.location.pathname.endsWith('/quiz.html');
const isPuzzlePage = window.location.pathname.endsWith('/puzzle.html');
const isCountdownPage = window.location.pathname.endsWith('/countdown.html');
const whatsappContact = '491234567890';
const mathChallenges = [
  { label: '1. Lineare Gleichung', equation: '3x + 7 = 28', answer: '7', solution: 'x = 7' },
  { label: '2. Bruchrechnung', equation: '3/4 + 1/2 = ?', answer: '5/4', solution: '5/4' },
  { label: '3. Prozentrechnung', equation: 'Du hast 80 € und gibst 25 % davon aus. Wie viel bleibt übrig?', answer: '60', solution: '60 €' },
  { label: '4. Potenzen', equation: '2⁵ + 3² = ?', answer: '41', solution: '41' }
];
const openWhenContent = {
  laugh: {
    title: 'Na, schon besser?',
    text: 'Ich wusste doch, dass dich das zum Lachen bringen kann.',
    images: ['media/images/semina1.jpeg', 'media/images/semina2.jpeg', 'media/images/semina3.jpeg']
  },
  push: {
    title: 'Öffne mich, wenn du einen kleinen Schubs brauchst',
    text: 'Schau dir dieses Bild an und sag mir jetzt bitte nicht, dass du keine Lust hast rauszugehen. 😂\n\nDu bist gerade in Kroatien – unter der Sonne, in deinem Land, mit neuen Menschen und neuen Geschichten, die du später mit nach Hause bringst.\n\nAlso zieh dich an, geh raus, bestell dir irgendwas zu trinken und mach dir einen schönen Abend.\n\nUnd wenn du irgendwo Sarti findest, erwarte ich selbstverständlich einen Beweis.',
    images: ['media/images/sarti.jpeg']
  },
  alone: {
    title: 'Dann schreib mir.',
    text: 'Egal wie spät es ist.\nEgal was gerade los ist.\nEgal ob du reden, lachen, weinen oder einfach nur meine Stimme hören möchtest.\n\nDu musst nicht alleine damit sein.'
  },
  loved: {
    title: 'Draga Julia,',
    text: 'znaj da si ti moja svijetla tačka u mraku, moje sunce u kišnom danu i moj osmijeh kroz plač. Ti si ta koja je uvijek bila uz mene i znaj da to puno cijenim.\n\nSve i da hoću, ne mogu ti uzvratiti toliko ljubavi i pažnje koliko si ti meni pružila, ali vjeruj mi da se trudim. Ja sam uz tebe u mislima i volim te svojim srcem i dušom.\n\nTi si posebna osoba koja je u moj život ušla tiho i nenadano, a ostala da me zauvijek činiš sretnom. Niko me nikad ne nasmije kao ti.\n\nHvala ti za svaki razgovor, svaki zagrljaj, svaku vožnju, svaki spontani plan i svaki trenutak u kojem si jednostavno bila tu.\n\nHvala ti što poznaješ i moje najljepše i moje najgore strane, a ipak ostaješ.\n\nI zapamti da, bez obzira na to koliko kilometara ima između nas, nikad nisi daleko od mene. Možeš biti na drugom kraju svijeta, a ja ću i dalje biti tu – samo jedan poziv, jednu poruku i jedno „trebaš mi“ daleko.\n\nNadam se da znaš koliko si posebna, koliko vrijediš i koliko si voljena.\n\nI kada ti nekad bude teško, pročitaj ovo ponovo. Jer ako ikada zaboraviš koliko vrijediš, ja ću biti tu da te podsjetim.\n\nVolim te. 🤍',
    images: ['media/images/love.jpeg']
  },
  giveUp: {
    title: 'Du gibst jetzt nicht auf.',
    text: 'Du bist nicht hierhergekommen, um nach ein paar schwierigen Tagen wieder aufzugeben. Du bist hier, um etwas für dich zu tun.\n\nDu wolltest raus aus deiner Komfortzone. Du arbeitest an dir, wächst daran und sammelst Erfahrungen, die dir niemand mehr nehmen kann. In sechs Monaten kommst du stärker, selbstständiger und selbstbewusster zurück.\n\nVergiss nicht, wie mutig es war, überhaupt zu gehen. Du bist gerade in deinem eigenen Land, unter Menschen, mit denen du dich verbunden fühlen kannst. Du darfst dankbar für diese Möglichkeit sein – auch wenn nicht jeder Tag perfekt ist.\n\nSchlechte Tage bedeuten nicht, dass du die falsche Entscheidung getroffen hast. Frag dich, warum du überhaupt gegangen bist. Du sollst diese sechs Monate nicht nur überstehen, sondern wirklich erleben.\n\nIn sechs Monaten schaust du zurück und wirst froh sein, dass du geblieben bist. Nicht weil jeder Tag wunderschön war, sondern weil du dich selbst kennengelernt hast, gewachsen bist und etwas geschafft hast, vor dem du vielleicht vorher Angst hattest.\n\nAlso Kopf hoch. Atme durch. Geh raus. Mach weiter.\n\nDu bist viel stärker, als du gerade vielleicht glaubst.\n\nUnd ich warte hier auf dich. 🤍'
  }
};
let quizQuestionIndex = 0;
let quizScore = 0;
const quizQuestions = [
  { title: 'Unser spontanes Date', question: 'Wenn wir spontan rausgehen, wofür entscheiden wir uns am Ende eigentlich immer?', answers: ['Kino', 'Sucuk-Baguette-Date', 'Club', 'Ein entspannter Spaziergang, weil wir plötzlich sportlich und vernünftig geworden sind'], correct: 1 },
  { title: 'Unsere Sportkarriere', question: 'Wir haben uns fest vorgenommen, gemeinsam mit dem Joggen durchzuziehen. Wie lange hat unser sportlicher Ehrgeiz tatsächlich angehalten?', answers: ['1 Tag', '1 Woche — wir waren schließlich hochmotiviert', '1 Monat — Disziplin war diesmal unser zweiter Vorname', 'Bis heute — wir sind mittlerweile professionelle Läuferinnen'], correct: 0 },
  { title: 'Die wichtigste Frage beim Einsteigen', question: 'Was ist das Erste, was du mich fragst, sobald wir ins Auto einsteigen?', answers: ['„Darf ich auch einen?“ (Ja, wir reden von der IQOS.)', '„Wo fahren wir eigentlich hin?“', '„Hast du überhaupt noch Benzin?“', '„Welche Musik hören wir?“'], correct: 0 },
  { title: 'Unser persönlicher Comedy-Star', question: 'Über wen lachen wir beide am meisten?', answers: ['Semina', 'Unsere eigenen schlechten Witze', 'Menschen, die wir eigentlich gar nicht kennen', 'Über unsere eigenen Entscheidungen'], correct: 0 },
  { title: 'Autofahrten mit uns', question: 'Was passiert normalerweise, sobald wir zusammen im Auto sitzen?', answers: ['Wir schweigen die ganze Zeit', 'Wir singen so laut, dass wir irgendwann unsere Stimme verlieren', 'Wir reden über 700 verschiedene Themen', 'Wir schlafen beide und hoffen, dass das Auto alleine fährt'], correct: 1 },
  { title: 'Unsere größte gemeinsame Schwäche', question: 'Was ist unsere größte gemeinsame Schwäche?', answers: ['Wir sind viel zu emotional', 'Wir können keine fünf Minuten still sitzen', 'Wir sagen ständig „Wir machen das spontan“ und bereuen es später', 'Wir können uns nie entscheiden, wo wir essen gehen'], correct: 0 },
  { title: 'Mein Lieblingsthema', question: 'Worüber könnte ich deiner Meinung nach stundenlang reden?', answers: ['Emir', 'Emir', 'Emir', 'Emir'], correct: 0 },
  { title: 'Unser meistverwendetes Wort', question: 'Welches Wort kommt in unseren Gesprächen statistisch gesehen am häufigsten vor?', answers: ['amk', 'Bro', 'Wallah', '„Egal“'], correct: 0 },
  { title: 'Die wichtigste Entscheidung deines Lebens', question: 'Wenn du dich zwischen mir und Semina entscheiden müsstest – wen würdest du wählen?', answers: ['Mich', 'Semina'], correct: 0 },
  { title: 'Die mathematische Konstante unserer Freundschaft', question: 'Welche mathematische Konstante beschreibt unsere Freundschaft am besten?', answers: ['π', 'e', '0', '∞'], correct: 3 }
];

if (isOpenWhenPage) {
  document.title = 'Öffne, wenn... · Our Little World';
  $('.page-nav a[href="index.html"]').textContent = '← Karte';
  $('.page-nav a[href="memories.html"]').textContent = 'nächster Ort →';
  $('.page-back').textContent = '← zurück zur Karte';
  $('.page-intro .eyebrow').textContent = 'station 01 · ein kleiner Brief';
  $('.page-intro h1').innerHTML = 'Öffne, wenn...<br><em>du mich brauchst.</em>';
  $('.page-intro h1 + p').textContent = 'Weil du so gut in Mathe bist: Löse erst die Matheaufgabe, um den Brief zu öffnen.';
  const letters = [
      ['laugh', '😂', 'Öffne mich, wenn du etwas zum Lachen brauchst', 'Hier ist ein Bild, das dich zum Lachen bringen wird!'],
    ['push', '🍹', 'Öffne mich, wenn du einen kleinen Schubs brauchst', 'Ein kleiner Sarti-Schubs für Kroatien'],
    ['alone', '🫂', 'Öffne mich, wenn du dich alleine fühlst', 'Eine Erinnerung daran, dass du nie alleine bist'],
    ['loved', '❤️', 'Öffne mich, wenn du vergessen hast, wie sehr du geliebt wirst', 'Warum du mir so wichtig bist'],
    ['giveUp', '🔥', 'Öffne mich, wenn du aufgeben möchtest', 'Ein liebevoller, aber bestimmter Motivationsbrief']
  ];
  $('.letter-grid').innerHTML = letters.map(([id, emoji, title, subtitle]) => `<button class="letter-card envelope-card reveal" data-letter="${id}"><span class="envelope-wrap"><span class="letter-paper"><strong>${emoji} ${title}</strong><small>${subtitle}</small><b>Du bist mein Zuhause. ♡</b></span><span class="envelope-front"></span><span class="envelope-flap"></span><span class="wax-seal">J</span></span><span class="letter-title">${title}</span><span class="letter-lock">verschlossen · zum Öffnen lösen</span></button>`).join('');
  $('.page-note').textContent = 'fünf Umschläge, eine Freundschaft für immer ♡';
  const envelopeStyles = document.createElement('style');
  envelopeStyles.textContent = `.letter-grid{grid-template-columns:repeat(4,1fr)}.envelope-card{min-height:270px!important;padding:16px 12px!important;overflow:visible!important}.envelope-wrap{height:145px;width:100%;display:block;position:relative;margin-bottom:14px}.envelope-front{position:absolute;inset:32px 0 0;background:#d29a91;clip-path:polygon(0 0,50% 52%,100% 0,100% 100%,0 100%);z-index:3}.envelope-flap{position:absolute;inset:32px 0 auto;height:72px;background:#e2b3aa;clip-path:polygon(0 0,100% 0,50% 100%);transform-origin:top;transition:transform .7s cubic-bezier(.22,.61,.36,1);z-index:4}.envelope-wrap:after{content:'';position:absolute;inset:32px 0 0;border:1px solid rgba(97,76,67,.18);z-index:5;pointer-events:none}.letter-paper{position:absolute;left:9%;right:9%;top:37px;min-height:112px;padding:13px 10px;background:#fffaf3;color:#614c43;text-align:left;box-shadow:0 3px 8px rgba(75,51,42,.15);z-index:2;transition:transform .8s cubic-bezier(.22,.61,.36,1)}.letter-paper strong{display:block;font:14px/1.15 var(--serif);color:#342b28}.letter-paper small{display:block;font-size:9px;line-height:1.3;margin-top:6px;color:#927c72}.letter-paper b{display:block;font:14px var(--script);color:#b97872;margin-top:8px}.envelope-card .wax-seal{position:absolute;left:50%;bottom:25px;transform:translateX(-50%);z-index:6;margin:0}.envelope-card .letter-title{font:17px/1.12 var(--serif);min-height:39px}.envelope-card .letter-lock{margin-top:8px;font-size:9px}.envelope-card.opened .envelope-flap{transform:rotateX(180deg);z-index:1}.envelope-card.opened .letter-paper{transform:translateY(-62px);z-index:5}.envelope-card.opened .wax-seal{opacity:0;transform:translateX(-50%) scale(.7);transition:.3s}.envelope-card.opened{z-index:8}@media(max-width:800px){.letter-grid{grid-template-columns:repeat(2,1fr)!important}.envelope-card{min-height:250px!important}.letter-paper strong{font-size:12px}}`;
  document.head.appendChild(envelopeStyles);
  const popupStyles = document.createElement('style');
  popupStyles.textContent = `.personal-popup{max-width:760px!important;max-height:88vh;overflow:auto;text-align:center}.personal-popup h2{font-size:clamp(28px,4vw,46px);margin-bottom:18px}.popup-copy{white-space:pre-line;text-align:left;color:var(--brown);line-height:1.7;margin:0 auto 24px;max-width:620px}.popup-gallery{display:flex;justify-content:center;align-items:flex-start;gap:16px;flex-wrap:wrap;margin:24px auto}.popup-polaroid{background:#fff;padding:9px 9px 28px;margin:0;width:145px;box-shadow:0 8px 18px rgba(52,43,40,.15);transform:rotate(-3deg)}.popup-polaroid:nth-child(even){transform:rotate(4deg);margin-top:15px}.popup-polaroid img,.image-placeholder{display:block;width:100%;aspect-ratio:1/1;object-fit:cover;background:#eadbd0}.image-placeholder{display:grid;place-items:center;color:var(--muted);font:18px var(--script);line-height:1.1}.popup-gallery:has(.popup-polaroid:only-child) .popup-polaroid{width:min(100%,360px);transform:rotate(2deg);padding-bottom:42px}.popup-gallery:has(.popup-polaroid:only-child) .popup-polaroid img{aspect-ratio:4/5}.whatsapp-button{margin:8px auto 0}.personal-popup:has(.popup-gallery:only-of-type) .popup-copy{font-size:15px}.personal-popup:has(.popup-polaroid img[src*="love-letter"]) {background:#fffaf3;padding:58px 50px}.personal-popup:has(.popup-polaroid img[src*="love-letter"]) .popup-copy{text-align:left;font:22px/1.65 var(--script);color:#614c43}.personal-popup:has(.popup-polaroid img[src*="love-letter"]) h2{font:30px var(--script);text-align:left;color:var(--rose)}@media(max-width:600px){.personal-popup{padding:35px 22px!important}.popup-polaroid{width:125px}.personal-popup:has(.popup-gallery:only-child) .popup-polaroid{width:100%}.personal-popup:has(.popup-polaroid img[src*="love-letter"]) .popup-copy{font-size:19px}}`;
  popupStyles.textContent = `.personal-popup{max-width:820px!important;max-height:88vh;overflow:auto;text-align:center}.personal-popup h2{font-size:clamp(28px,4vw,46px);margin-bottom:18px}.popup-copy{white-space:pre-line;text-align:left;color:var(--brown);line-height:1.7;margin:0 auto 24px;max-width:620px}.popup-gallery{display:flex;justify-content:center;align-items:flex-start;gap:20px;flex-wrap:wrap;margin:24px auto}.popup-polaroid{background:#fff;padding:10px 10px 30px;margin:0;width:190px;box-shadow:0 8px 18px rgba(52,43,40,.15);transform:rotate(-3deg)}.popup-polaroid:nth-child(even){transform:rotate(4deg);margin-top:15px}.popup-polaroid img{display:block;width:100%;aspect-ratio:1/1;object-fit:cover;background:#eadbd0}.popup-gallery:has(.popup-polaroid:only-child) .popup-polaroid{width:min(100%,360px);transform:rotate(2deg);padding-bottom:42px}.popup-gallery:has(.popup-polaroid:only-child) .popup-polaroid img{aspect-ratio:4/5}.whatsapp-button{margin:8px auto 0}.personal-popup:has(.popup-gallery:only-of-type) .popup-copy{font-size:15px}.personal-popup:has(.popup-polaroid img[src*="love-letter"]) {background:#fffaf3;padding:58px 50px}.personal-popup:has(.popup-polaroid img[src*="love-letter"]) .popup-copy{text-align:left;font:22px/1.65 var(--script);color:#614c43}.personal-popup:has(.popup-polaroid img[src*="love-letter"]) h2{font:30px var(--script);text-align:left;color:var(--rose)}@media(max-width:600px){.personal-popup{padding:35px 22px!important}.popup-polaroid{width:145px}.personal-popup:has(.popup-gallery:only-child) .popup-polaroid{width:100%}.personal-popup:has(.popup-polaroid img[src*="love-letter"]) .popup-copy{font-size:19px}}`;
  document.head.appendChild(popupStyles);
  const envelopeLayoutFix = document.createElement('style');
  envelopeLayoutFix.textContent = `.letter-grid{grid-template-columns:repeat(6,1fr);gap:24px}.envelope-card{grid-column:span 2;justify-content:flex-start}.envelope-card:nth-child(4){grid-column:2 / span 2}.envelope-card:nth-child(5){grid-column:4 / span 2}.envelope-card .envelope-wrap{flex:0 0 145px}.envelope-card .letter-paper{top:20px;height:112px;min-height:0;overflow:hidden}.envelope-card.opened .letter-paper{transform:translateY(-62px);height:auto;min-height:112px;overflow:visible}@media(max-width:800px){.letter-grid{grid-template-columns:repeat(2,1fr);gap:13px}.envelope-card,.envelope-card:nth-child(4),.envelope-card:nth-child(5){grid-column:auto}}`;
  document.head.appendChild(envelopeLayoutFix);
  $('footer span').textContent = 'für meine Lieblingsperson, mit Liebe';
  $('.modal-close').setAttribute('aria-label', 'Schließen');
  $('.modal-card .eyebrow').textContent = 'ein kleines Rätsel';
  $('.modal-card h2').textContent = 'Bevor du diesen Brief öffnest...';
  $('.modal-card h2 + p').textContent = 'Löse die Aufgabe.';
  $('#answer').setAttribute('aria-label', 'Antwort auf die Gleichung');
  $('#unlock').textContent = 'Brief öffnen';
}

if (isMemoriesPage) {
  document.title = 'Unsere Erinnerungen · Our Little World';
  $('.page-nav a[href="open-when.html"]').textContent = '← vorheriger Ort';
  $('.page-nav a[href="formula.html"]').textContent = 'nächster Ort →';
  $('.page-back').textContent = '← zurück zur Karte';
  $('.page-intro .eyebrow').textContent = 'station 02 · unser Archiv';
  $('.page-intro h1').innerHTML = 'Unsere<br><em>Erinnerungen.</em>';
  $('.page-intro h1 + p').textContent = 'Eine Wand voller kleiner Beweise, dass gewöhnliche Tage zu den schönsten Geschichten werden, wenn sie uns gehören.';
  $('.inline-heading .eyebrow').textContent = 'eine Erinnerung auf einmal';
  $('.inline-heading h2').textContent = 'Eine Erinnerung für dich.';
  $('#random-memory').textContent = '🎲';
  $('#random-memory').classList.add('memory-dice-button');
  $('.category-row').remove();
  const germanMemoryText = [
    ['Sommer / 2022', 'Der Anfang von allem', 'Wir wussten damals noch nicht, dass genau das unser Lieblingsalltag werden würde.'],
    ['irgendein Dienstag', 'Nur schnell einen Kaffee', 'Drei Stunden, vier Umwege und absolut keine Reue.'],
    ['die guten Tage', 'Wir gegen den Rest der Welt', 'Der Beweis, dass die besten Pläne meistens die sind, die wir fast absagen.']
  ];
  $$('.memory-card').forEach((card, index) => {
    card.querySelector('.memory-date').textContent = germanMemoryText[index][0];
    card.querySelector('h3').textContent = germanMemoryText[index][1];
    card.querySelector('p:last-child').textContent = germanMemoryText[index][2];
  });
  const memoryStyles = document.createElement('style');
  memoryStyles.textContent = `.inline-heading{align-items:center}.memory-dice-button{width:76px;height:76px;flex-shrink:0;border-radius:50%;padding:0;justify-content:center;font-size:34px;letter-spacing:0;border:1px solid var(--rose);background:var(--paper);box-shadow:0 7px 0 rgba(185,120,114,.22);transition:box-shadow .2s,background .2s}.memory-dice-button:hover{background:var(--pink);color:var(--brown);box-shadow:0 3px 0 rgba(185,120,114,.22)}.memory-dice-button.is-rolling{animation:memoryDiceRoll .7s cubic-bezier(.22,.61,.36,1)}@keyframes memoryDiceRoll{0%{transform:rotate(0) scale(1)}45%{transform:rotate(220deg) scale(1.12)}100%{transform:rotate(360deg) scale(1)}}.single-memory-wall{display:block;max-width:410px;margin:20px auto 0}.single-memory-wall .memory-card{transform:rotate(-2deg)!important}.memory-media{display:block;width:100%;aspect-ratio:1/1;object-fit:cover;background:#eadbd0}@media(max-width:800px){.memory-dice-button{width:64px;height:64px;font-size:29px}}`;
  document.head.appendChild(memoryStyles);
  $('footer span').textContent = 'für meine Lieblingsperson, mit Liebe';
}

if (isFormulaPage) {
  document.title = 'Die Formel von dir · Our Little World';
  $('.page-nav a[href="memories.html"]').textContent = '← vorheriger Ort';
  $('.page-nav a[href="soundtrack.html"]').textContent = 'nächster Ort →';
  $('.page-back').textContent = '← zurück zur Karte';
  $('.page-intro .eyebrow').textContent = 'station 03 · eine wissenschaftliche beobachtung';
  $('.page-intro h1').innerHTML = 'Die Formel<br><em>von dir.</em>';
  $('.page-intro h1 + p').textContent = 'Manche Dinge lassen sich nicht messen. Trotzdem haben wir versucht, aufzuschreiben, warum ausgerechnet du meine Person bist.';
  $('.formula .section-heading .eyebrow').textContent = 'klicke auf eine variable';
  $('.formula .section-heading h2').innerHTML = 'Eine unmögliche<br><em>Gleichung.</em>';
  $('.formula .section-heading').insertAdjacentHTML('beforeend', '<div class="formula-intro"><p>Keine Sorge, ich erkläre es dir ganz in Ruhe. Da kann ich ja nicht einfach eine Formel hinschreiben und dich damit alleine lassen.</p></div>');
  $('.equation span').textContent = 'DU';
  $('.formula-hint').textContent = 'Klicke auf eine Variable';
  $('#factor-message').textContent = 'Jede gute Formel braucht ein kleines Geheimnis.';
  const formulaStyles = document.createElement('style');
  formulaStyles.textContent = `.formula-intro{max-width:560px;margin:30px auto 0;color:#f8efe5}.formula-intro>strong{font:clamp(22px,3vw,34px) var(--serif);color:var(--pink)}.formula-intro p{color:#d9c2b5;margin:14px auto 0}.formula-click-note{font:18px var(--script)!important;color:var(--pink)!important}.formula-definitions{max-width:720px;margin:55px auto 0;text-align:left;display:grid;grid-template-columns:repeat(2,1fr);gap:22px}.formula-definitions article{border-top:1px solid rgba(232,200,192,.35);padding-top:16px}.formula-definitions h3{font:20px var(--serif);color:var(--pink);margin:0 0 6px}.formula-definitions p{font-size:13px;color:#d9c2b5;margin:7px 0}.formula-definitions blockquote{border-left:2px solid var(--rose);padding-left:15px;margin:14px 0;color:#f8efe5;font:18px var(--script)}.limit-line{font:24px var(--serif)!important;color:var(--pink)!important}@media(max-width:800px){.formula-definitions{grid-template-columns:1fr}.formula-intro>strong{font-size:22px}}`;
  document.head.appendChild(formulaStyles);
  $('footer span').textContent = 'für meine Lieblingsperson, mit Liebe';
}

if (isSoundtrackPage) {
  document.title = 'Unser Soundtrack · Our Little World';
  $('.page-nav a[href="formula.html"]').textContent = '← vorheriger Ort';
  $('.page-nav a[href="diary.html"]').textContent = 'nächster Ort →';
  $('.page-back').textContent = '← zurück zur Karte';
  $('.page-intro .eyebrow').textContent = 'station 04 · unsere playlist';
  $('.page-intro h1').innerHTML = 'Unsere<br><em>Lieder.</em>';
  $('.page-intro h1 + p').textContent = 'Wenn du dich durch unsere Lieder an uns erinnern möchtest.';
  $('.mixtape .eyebrow').remove();
  $('.mixtape h2').innerHTML = 'Lieder<br><em>für uns</em>';
  $('.mixtape-label p:last-child').textContent = 'unsere Lieder, unsere Erinnerungen';
  const trackCopy = [
    ['Gresnica I Vila', 'Dejan Matić · Sinonim Za Ljubav'],
    ['Nisi ti za male stvari', 'Željko Samardžić · Mila'],
    ['Kad mi dođeš ti', 'Oliver Dragojević · Dvi, tri riči'],
    ['Monster', 'Jala Brat & Buba Corelli · Goat Season (Part One)'],
    ['Rodjen Spreman', 'Nedeljko Bajic Baja · Snovi Od Stakla']
  ];
  if ($$('.track').length < trackCopy.length) {
    $('.track-list').insertAdjacentHTML('beforeend', '<div class="track"><span>05</span><span class="play-icon">▶</span><div><strong></strong><small></small></div><span>05:23</span></div>');
  }
  $$('.track').forEach((track, index) => {
    track.querySelector('strong').textContent = trackCopy[index][0];
    track.querySelector('small').textContent = trackCopy[index][1];
  });
  const firstDuration = $('.track').querySelector('span:last-child');
  if (firstDuration) firstDuration.textContent = '03:53';
  const secondDuration = $$('.track')[1]?.querySelector('span:last-child');
  if (secondDuration) secondDuration.textContent = '03:34';
  const thirdDuration = $$('.track')[2]?.querySelector('span:last-child');
  if (thirdDuration) thirdDuration.textContent = '03:58';
  const fourthDuration = $$('.track')[3]?.querySelector('span:last-child');
  if (fourthDuration) fourthDuration.textContent = '02:29';
  const fifthDuration = $$('.track')[4]?.querySelector('span:last-child');
  if (fifthDuration) fifthDuration.textContent = '05:23';
  $('.mixtape').insertAdjacentHTML('beforeend', '<img class="spotify-cover" src="https://i.scdn.co/image/ab67616d00001e02b5848572a5e2949663ce38f9" alt="Cover von Gresnica I Vila von Dejan Matić">');
  $('.mixtape').insertAdjacentHTML('beforeend', '<img class="spotify-cover spotify-cover-secondary" src="https://i.scdn.co/image/ab67616d00001e02eddab54f8fbadf40bb5680fd" alt="Cover von Nisi ti za male stvari von Željko Samardžić">');
  $('.mixtape').insertAdjacentHTML('beforeend', '<img class="spotify-cover spotify-cover-tertiary" src="https://i.scdn.co/image/ab67616d00001e025b3847ab5d458697618c6861" alt="Cover von Kad mi dođeš ti von Oliver Dragojević">');
  $('.mixtape').insertAdjacentHTML('beforeend', '<img class="spotify-cover spotify-cover-quaternary" src="https://i.scdn.co/image/ab67616d00001e0246634c6af414fa8e25f8a570" alt="Cover von Monster von Jala Brat und Buba Corelli">');
  $('.mixtape').insertAdjacentHTML('beforeend', '<img class="spotify-cover spotify-cover-quinary" src="https://i.scdn.co/image/ab67616d00001e02234316aa45cb70ffcadb589a" alt="Cover von Rodjen Spreman von Nedeljko Bajic Baja">');
  const spotifyTracks = [
    ['https://open.spotify.com/track/1mpucCqvXdFnA1ePydEtJT?si=pzCyWMbbQQmHc8GbwMUfhg&utm_source=copy-link', 'Gresnica I Vila auf Spotify öffnen'],
    ['https://open.spotify.com/track/7b7UxctiBoIHKzlT6uHYcR?si=IsdXM4zqT-ygId_Sba26dw&utm_source=copy-link', 'Nisi ti za male stvari auf Spotify öffnen'],
    ['https://open.spotify.com/track/7f4gkvlgB3vPItQsg2vsNL?si=qVLJzfuISDCL84URRBMhCg&utm_source=copy-link', 'Kad mi dođeš ti auf Spotify öffnen'],
    ['https://open.spotify.com/track/1crm15PhUGeGeXUTBslAsw?si=_Wu0grotTLSQt9heh_Gkiw&utm_source=copy-link', 'Monster auf Spotify öffnen']
    ,['https://open.spotify.com/track/0GloGJLY20q1uvo8LAb85r?si=3uOlmthLS4CxuLY_LKtoQA&utm_source=copy-link', 'Rodjen Spreman auf Spotify öffnen']
  ];
  spotifyTracks.forEach(([spotifyLink, label], index) => {
    const track = $$('.track')[index];
    if (!track) return;
    track.setAttribute('role', 'link');
    track.setAttribute('tabindex', '0');
    track.setAttribute('aria-label', label);
    track.addEventListener('click', () => window.open(spotifyLink, '_blank', 'noopener,noreferrer'));
    track.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') window.open(spotifyLink, '_blank', 'noopener,noreferrer'); });
  });
  $('footer span').textContent = 'für meine Lieblingsperson, mit Liebe';
  const soundtrackStyles = document.createElement('style');
  soundtrackStyles.textContent = `.mixtape{padding-right:175px}.track[role="link"]{cursor:pointer}.track[role="link"]:hover{background:rgba(232,200,192,.5)}.track[role="link"]:focus-visible{outline:2px solid var(--rose);outline-offset:3px}.spotify-cover{position:absolute;right:28px;top:165px;width:88px;height:88px;object-fit:cover;transform:rotate(7deg);box-shadow:0 8px 17px rgba(52,43,40,.2)}.spotify-cover-secondary{right:82px;top:212px;width:68px;height:68px;transform:rotate(-8deg);z-index:0}.spotify-cover-tertiary{right:122px;top:248px;width:54px;height:54px;transform:rotate(5deg);z-index:0}.spotify-cover-quaternary{right:18px;top:250px;width:52px;height:52px;transform:rotate(-4deg);z-index:0}.spotify-cover-quinary{right:70px;top:278px;width:45px;height:45px;transform:rotate(9deg);z-index:0}.spotify-cover{z-index:1}@media(max-width:800px){.mixtape{padding-right:30px;padding-bottom:170px}.spotify-cover{width:82px;height:82px;right:20px;top:auto;bottom:30px}.spotify-cover-secondary{width:62px;height:62px;right:68px;top:auto;bottom:70px}.spotify-cover-tertiary{width:48px;height:48px;right:107px;top:auto;bottom:25px}.spotify-cover-quaternary{width:46px;height:46px;right:19px;top:auto;bottom:25px}.spotify-cover-quinary{width:40px;height:40px;right:57px;top:auto;bottom:27px}}`;
  document.head.appendChild(soundtrackStyles);
}

const isDiaryPage = window.location.pathname.endsWith('/diary.html');
if (isDiaryPage) {
  document.title = 'Unser digitales Tagebuch · Our Little World';
  $('.page-nav a[href="soundtrack.html"]').textContent = '← vorheriger Ort';
  $('.page-nav a[href="quiz.html"]').textContent = 'nächster Ort →';
  $('.page-back').textContent = '← zurück zur Karte';
  $('.page-intro .eyebrow').textContent = 'station 05 · unser blog';
  $('.page-intro h1').innerHTML = 'Unser digitales<br><em>Tagebuch.</em>';
  $('.page-intro h1 + p').textContent = 'Du lädst deine Erinnerungen hoch und ich mache meine. So bleibt unser kleines Leben miteinander verbunden, auch wenn wir gerade weit voneinander entfernt sind.';
  $('.diary .timeline').innerHTML = `<div class="diary-columns"><div class="diary-column diary-yours"><div class="diary-column-heading"><span class="diary-sticker">für dich</span><h2>Deine Erinnerungen</h2><p>Lade hier kleine Momente aus deinem Auslandssemester hoch.</p><label class="diary-upload"><span>+ Erinnerung hinzufügen</span><input type="file" accept="image/*,video/*"><small>Fotos und Videos · später mit Datenbank</small></label></div><article class="diary-entry reveal visible"><div class="entry-dot"></div><div class="entry-meta">JULIA · 11 SEPT 2024</div><h3>First week survived ✈</h3><p>Ein kleiner Platzhalter für deinen ersten Beitrag. Hier kannst du später erzählen, was du erlebt hast.</p><div class="entry-image"><img src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=85" alt="Gemütliches Café"></div></article></div><div class="diary-column diary-mine"><div class="diary-column-heading"><span class="diary-sticker">von mir</span><h2>Meine Erinnerungen</h2><p>Ich sammle hier die kleinen Dinge, die ich dir erzählen möchte.</p><button class="outline-button diary-add-button" type="button">+ meinen Beitrag hinzufügen</button></div><article class="diary-entry reveal visible"><div class="entry-dot"></div><div class="entry-meta">AJLA · 03 SEPT 2024</div><h3>Heute war der Himmel deine Lieblingsfarbe.</h3><p>Es war einer dieser zarten rosa Sonnenuntergänge, von denen du 47 Fotos gemacht hättest. Ich habe eins für dich gemacht.</p><div class="entry-image"><img src="https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=800&q=85" alt="Rosa Sonnenuntergang"></div></article></div></div>`;
  $('.center-button')?.remove();
  $('footer span').textContent = 'für meine Lieblingsperson, mit Liebe';
  const diaryStyles = document.createElement('style');
    diaryStyles.textContent = `.diary-page .timeline:before{display:none}.diary-columns{display:grid;grid-template-columns:repeat(2,1fr);gap:70px;max-width:1050px;margin:0 auto}.diary-column{position:relative}.diary-column-heading{border-bottom:1px solid var(--line);padding:0 0 28px;margin-bottom:48px}.diary-column-heading h2{font-size:36px;margin:9px 0 8px}.diary-column-heading p{color:var(--muted);font-size:13px;max-width:330px}.diary-sticker{font:20px var(--script);color:var(--rose);transform:rotate(-4deg);display:inline-block}.diary-upload{display:flex;flex-direction:column;align-items:flex-start;gap:3px;margin-top:23px;color:var(--brown);cursor:pointer}.diary-upload span{border:1px solid var(--rose);padding:11px 14px;font:11px var(--sans);letter-spacing:.08em;text-transform:uppercase}.diary-upload:hover span{background:var(--pink)}.diary-upload input{display:none}.diary-upload small{font-size:10px;color:var(--muted)}.diary-add-button{margin-top:23px}.diary-column .timeline:before{display:none}.diary-column .diary-entry{margin-left:35px}.diary-column .entry-dot{left:-35px}.diary-column .entry-image{width:min(100%,280px)}@media(max-width:800px){.diary-columns{grid-template-columns:1fr;gap:70px}.diary-column-heading h2{font-size:32px}.diary-column .diary-entry{margin-left:40px}}
`;
  document.head.appendChild(diaryStyles);
}

if (isQuizPage) {
  document.title = 'Wie gut kennst du uns? · Our Little World';
  $('.page-nav a[href="diary.html"]').textContent = '← vorheriger Ort';
  $('.page-nav a[href="puzzle.html"]').textContent = 'nächster Ort →';
  $('.page-back').textContent = '← zurück zur Karte';
  $('.page-intro .eyebrow').textContent = 'station 06 · der inoffizielle Test';
  $('.page-intro h1').innerHTML = 'Wie gut kennst<br><em>du uns?</em>';
  $('.page-intro h1 + p').textContent = 'Kein Druck.';
  $('.quiz-box .eyebrow').textContent = 'frage 01 / 10';
  const quizCard = $('#quiz-question');
  const renderQuizQuestion = () => {
    const item = quizQuestions[quizQuestionIndex];
    quizCard.innerHTML = `<p class="quiz-progress">Frage ${String(quizQuestionIndex + 1).padStart(2, '0')} · ${item.title}</p><p><strong>${item.question}</strong></p><div class="answers">${item.answers.map((answer, index) => `<button data-correct="${index === item.correct}">${String.fromCharCode(65 + index)}) ${answer}</button>`).join('')}</div>`;
    $('.quiz-box .eyebrow').textContent = `frage ${String(quizQuestionIndex + 1).padStart(2, '0')} / 10`;
    $('#quiz-result').textContent = '';
    bindQuizAnswers();
  };
  window.renderQuizQuestion = renderQuizQuestion;
  renderQuizQuestion();
  $('footer span').textContent = 'für meine Lieblingsperson, mit Liebe';
  const quizStyles = document.createElement('style');
  quizStyles.textContent = `.quiz-progress{font:13px var(--sans)!important;letter-spacing:.1em;text-transform:uppercase;color:var(--rose)}.quiz-question>p:nth-child(2) strong{font:26px/1.3 var(--serif)}.quiz-result{min-height:60px}`;
  document.head.appendChild(quizStyles);
}

if (isPuzzlePage) {
  document.title = 'Setz uns zusammen · Our Little World';
  $('.page-nav a[href="quiz.html"]').textContent = '← vorheriger Ort';
  $('.page-nav a[href="countdown.html"]').textContent = 'nächster Ort →';
  $('.page-back').textContent = '← zurück zur Karte';
  $('.page-intro .eyebrow').textContent = 'station 07 · ein kleines Spiel für uns';
  $('.page-intro h1').innerHTML = 'Setz uns<br><em>zusammen.</em>';
  $('.page-intro h1 + p').textContent = 'Ziehe die Teile an ihren Platz. 4 Teile · 1 Freundschaft · ∞ Erinnerungen.';
  $('#puzzle-button').textContent = 'Puzzle neu mischen';
  $('#puzzle-success').textContent = "DISTANCE CAN’T KEEP US APART. ♡";
  $('footer span').textContent = 'für meine Lieblingsperson, mit Liebe';
  const puzzleBoard = $('#puzzle-board');
  const scrambled = [2, 4, 1, 3];
  puzzleBoard.innerHTML = scrambled.map((piece) => `<div class="puzzle-piece puzzle-tile piece-${piece}" draggable="true" data-piece="${piece}" aria-label="Puzzleteil ${piece}"></div>`).join('');
  const puzzleStyles = document.createElement('style');
  puzzleStyles.textContent = `.puzzle-board{touch-action:none}.puzzle-tile{cursor:grab;position:relative}.puzzle-tile:after{content:'';position:absolute;inset:0;border:2px solid transparent;transition:.2s}.puzzle-tile:hover:after,.puzzle-tile.selected:after{border-color:var(--pink)}.puzzle-tile.dragging{opacity:.45;cursor:grabbing}.puzzle-board.solved .puzzle-tile{cursor:default}.puzzle-help{font:18px var(--script);color:var(--pink);margin:18px 0 0}`;
  document.head.appendChild(puzzleStyles);
  puzzleBoard.insertAdjacentHTML('afterend', '<p class="puzzle-help">Ziehe ein Teil auf ein anderes – oder tippe zwei Teile nacheinander an.</p>');
  let selectedTile = null;
  let draggedTile = null;
  const checkPuzzle = () => {
    const solved = [...puzzleBoard.children].every((tile, index) => Number(tile.dataset.piece) === index + 1);
    if (solved) {
      puzzleBoard.classList.add('solved');
      $('#puzzle-success').classList.add('show');
      $('#puzzle-button').textContent = 'Noch einmal spielen';
    }
  };
  const swapTiles = (first, second) => {
    const firstPiece = first.dataset.piece;
    first.dataset.piece = second.dataset.piece;
    second.dataset.piece = firstPiece;
    first.className = `puzzle-piece puzzle-tile piece-${first.dataset.piece}`;
    second.className = `puzzle-piece puzzle-tile piece-${second.dataset.piece}`;
    first.classList.remove('selected');
    second.classList.remove('selected');
    selectedTile = null;
    checkPuzzle();
  };
  puzzleBoard.addEventListener('click', (event) => {
    const tile = event.target.closest('.puzzle-tile');
    if (!tile || puzzleBoard.classList.contains('solved')) return;
    if (!selectedTile) { selectedTile = tile; tile.classList.add('selected'); return; }
    if (selectedTile !== tile) swapTiles(selectedTile, tile);
  });
  puzzleBoard.addEventListener('dragstart', (event) => { draggedTile = event.target.closest('.puzzle-tile'); draggedTile?.classList.add('dragging'); });
  puzzleBoard.addEventListener('dragend', () => { draggedTile?.classList.remove('dragging'); draggedTile = null; });
  puzzleBoard.addEventListener('dragover', (event) => event.preventDefault());
  puzzleBoard.addEventListener('drop', (event) => { event.preventDefault(); const target = event.target.closest('.puzzle-tile'); if (draggedTile && target && draggedTile !== target) swapTiles(draggedTile, target); });
  $('#puzzle-button').addEventListener('click', () => {
    puzzleBoard.classList.remove('solved');
    $('#puzzle-success').classList.remove('show');
    const tiles = [...puzzleBoard.children];
    tiles.sort(() => Math.random() - .5);
    tiles.forEach((tile) => puzzleBoard.appendChild(tile));
  });
}

if (isCountdownPage) {
  document.title = 'Countdown · Our Little World';
  $('.page-nav a[href="puzzle.html"]').textContent = '← vorheriger Ort';
  $('.page-nav a[href="index.html"]').textContent = 'zurück zur Karte →';
  $('.page-back').textContent = '← zurück zur Karte';
  $('.page-intro .eyebrow').textContent = 'station 08 · der schönste Teil kommt noch';
  $('.page-intro h1').innerHTML = 'Bis du<br><em>wieder da bist.</em>';
  $('.page-intro h1 + p').textContent = 'Ich zähle jede Minute, bis du wieder zurück bist und wieder alles richtig ist.';
  $('.countdown-copy .eyebrow').textContent = 'die Rückreise';
  $('.countdown-copy h2').innerHTML = 'Bald<br><em>wieder da.</em>';
  $('.countdown-copy h2 + p').innerHTML = 'Ändere das Datum in <strong>app.js</strong>, sobald der Plan feststeht.';
  const labels = ['Tage', 'Stunden', 'Minuten', 'Sekunden'];
  $$('.countdown-clock span').forEach((label, index) => { label.textContent = labels[index]; });
  $('#home-message').textContent = 'bis der Countdown eine Erinnerung wird';
  $('footer span').textContent = 'für meine Lieblingsperson, mit Liebe';
  const countdownStyles = document.createElement('style');
  countdownStyles.textContent = `.countdown-page .countdown{display:block;text-align:center}.countdown-page .countdown-copy,.countdown-page .home-message{display:none}.countdown-page .countdown-clock{width:100%;justify-content:center;align-items:flex-start;margin:0 auto}.countdown-page .countdown-clock div{min-width:70px}@media(max-width:800px){.countdown-page .countdown{display:block}.countdown-page .countdown-clock{margin-top:0;gap:9px}.countdown-page .countdown-clock div{min-width:58px}}`;
  document.head.appendChild(countdownStyles);
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });
$$('.reveal').forEach((element) => revealObserver.observe(element));

const modal = $('#modal');
let activeLetter = null;
let activeCard = null;
const lockMarkup = `<button class="modal-close" aria-label="Schließen">×</button><p class="eyebrow">ein kleines Rätsel</p><h2>Bevor du diesen Brief öffnest...</h2><p>Löse die Aufgabe.</p><div class="lock-equation">2 + 2 = <input id="answer" type="number" aria-label="Antwort auf die Matheaufgabe" /></div><button class="primary-button" id="unlock">Brief öffnen</button><p class="unlock-message" id="unlock-message"></p>`;
const getChallenge = () => mathChallenges[(activeCard ? [...document.querySelectorAll('.letter-card')].indexOf(activeCard) : 0) % mathChallenges.length];
const resetLockModal = () => {
  if (!modal) return;
  const card = modal.querySelector('.modal-card');
  const challenge = getChallenge();
  card.classList.remove('personal-popup');
  card.innerHTML = `<button class="modal-close" aria-label="Schließen">×</button><p class="eyebrow">ein kleines Rätsel</p><h2>Bevor du diesen Brief öffnest...</h2><p>Löse die Aufgabe.</p><div class="lock-equation"><strong class="challenge-equation">${challenge.equation}</strong><input id="answer" type="text" inputmode="decimal" aria-label="Antwort auf die Matheaufgabe" placeholder="deine Antwort" /></div><button class="primary-button" id="unlock">Brief öffnen</button><p class="unlock-message" id="unlock-message"></p>`;
  card.querySelector('.modal-close').addEventListener('click', closeModal);
  bindUnlockButton();
};
$$('.letter-card').forEach((card) => card.addEventListener('click', () => {
  activeLetter = card.dataset.letter;
  activeCard = card;
  resetLockModal();
  if ($('#answer')) $('#answer').value = '';
  if ($('#unlock-message')) $('#unlock-message').textContent = '';
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  const answerInput = modal?.querySelector('#answer');
  if (answerInput) answerInput.focus();
}));
const closeModal = () => { modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true'); resetLockModal(); };
const renderOpenWhenPopup = (letterId) => {
  const content = openWhenContent[letterId];
  if (!content || !modal) return;
  const card = modal.querySelector('.modal-card');
  const gallery = content.images?.length
    ? `<div class="popup-gallery">${content.images.map((image, index) => `<figure class="popup-polaroid polaroid-${index + 1}"><img src="${image}" alt="Erinnerungsfoto ${index + 1}"></figure>`).join('')}</div>`
    : '';
  const contactButton = letterId === 'alone' ? `<a class="primary-button whatsapp-button" href="https://wa.me/${whatsappContact}" target="_blank" rel="noopener noreferrer">💬 Schreib mir oder ruf mich an</a>` : '';
  card.classList.add('personal-popup');
  card.innerHTML = `<button class="modal-close" aria-label="Schließen">×</button><p class="eyebrow">ein Brief für dich</p><h2>${content.title}</h2><div class="popup-copy">${content.text}</div>${gallery}${contactButton}`;
  card.querySelector('.modal-close').addEventListener('click', closeModal);
};
if (modal) {
  $('.modal-close').addEventListener('click', closeModal);
  modal.addEventListener('click', (event) => { if (event.target === modal) closeModal(); });
}
function bindUnlockButton() {
  if (!$('#unlock')) return;
  $('#unlock').addEventListener('click', () => {
  const message = $('#unlock-message');
  const challenge = getChallenge();
  const submittedAnswer = $('#answer')?.value.trim().replace(',', '.');
  const normalizedAnswer = challenge.answer.replace(',', '.');
  if (submittedAnswer === normalizedAnswer) {
    if (activeCard) {
      activeCard.classList.add('opened');
      activeCard.querySelector('.letter-lock').textContent = 'geöffnet · ein Brief für dich';
    }
    if (isOpenWhenPage && openWhenContent[activeLetter]) {
      renderOpenWhenPopup(activeLetter);
    } else {
      message.textContent = `Unlocked: This letter is for when you ${activeLetter === 'miss' ? 'miss me most.' : 'need a little extra love.'}`;
      setTimeout(closeModal, 1800);
    }
  } else message.textContent = isOpenWhenPage ? 'Fast, Bestie. Versuch es noch einmal ♡' : 'Almost, bestie. Try again ♡';
  });
}
bindUnlockButton();

const memories = isMemoriesPage ? [
  { title: 'Der Anfang von allem', text: 'Wir wussten damals noch nicht, dass genau das unser Lieblingsalltag werden würde.', date: 'Sommer / 2022', media: { type: 'image', src: 'media/images/memory-01.jpeg' } },
  { title: 'Nur schnell einen Kaffee', text: 'Drei Stunden, vier Umwege und absolut keine Reue.', date: 'irgendein Dienstag', media: { type: 'image', src: 'media/images/memory-02.jpeg' } },
  { title: 'Wir gegen den Rest der Welt', text: 'Der Beweis, dass die besten Pläne meistens die sind, die wir fast absagen.', date: 'die guten Tage', media: { type: 'video', src: 'media/videos/fueße.mp4' } }
] : [
  { title: 'The beginning of everything', text: 'We didn’t know then that this would become our favourite kind of normal.', date: 'summer / 2022', media: { type: 'image', src: 'media/images/memory-01.jpeg' } },
  { title: 'Just one quick coffee', text: 'Three hours, four side quests and absolutely no regrets.', date: 'some tuesday', media: { type: 'image', src: 'media/images/memory-02.jpeg' } },
  { title: 'Us against the world', text: 'Proof that the best plans are usually the ones we almost cancel.', date: 'the good days', media: { type: 'video', src: 'media/videos/fueße.mp4' } }
];
const renderMemoryMedia = (memory) => memory.media?.type === 'video'
  ? `<video class="memory-media" controls playsinline preload="metadata"><source src="${memory.media.src}" type="video/mp4">Dein Browser unterstützt dieses Video nicht.</video>`
  : `<img class="memory-media" src="${memory.media?.src || memory.image}" alt="Erinnerungsfoto">`;
const renderMemory = (memory) => {
  const wall = $('#memory-wall');
  if (!wall) return;
  wall.classList.add('single-memory-wall');
  wall.innerHTML = `<article class="memory-card memory-a reveal visible"><div class="polaroid-image">${renderMemoryMedia(memory)}</div><p class="memory-date">${isMemoriesPage ? memory.date : 'randomly selected'}</p><h3>${memory.title}</h3><p>${memory.text}</p></article>`;
};
if (isMemoriesPage) renderMemory(memories[Math.floor(Math.random() * memories.length)]);
if ($('#random-memory')) $('#random-memory').addEventListener('click', () => {
  if (isMemoriesPage) {
    const button = $('#random-memory');
    button.classList.remove('is-rolling');
    void button.offsetWidth;
    button.classList.add('is-rolling');
    renderMemory(memories[Math.floor(Math.random() * memories.length)]);
    return;
  }
  const shuffledMemories = [...memories].sort(() => Math.random() - 0.5);
  if (isMemoriesPage && shuffledMemories.every((memory, index) => memory.title === memories[index].title)) shuffledMemories.push(shuffledMemories.shift());
  const wall = $('#memory-wall');
  wall.animate([{ opacity: .25, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 450 });
  wall.innerHTML = shuffledMemories.map((memory, index) => `<article class="memory-card memory-${String.fromCharCode(97 + index)} reveal visible"><div class="polaroid-image">${renderMemoryMedia(memory)}</div><p class="memory-date">randomly selected</p><h3>${memory.title}</h3><p>${memory.text}</p></article>`).join('');
});

$$('[data-factor]').forEach((button) => button.addEventListener('click', () => {
  const messages = isFormulaPage
    ? { Attention: 'A = Aufmerksamkeit: Du bemerkst Dinge, die andere übersehen.', Humour: 'H = Humor: Ein großer Teil unserer Freundschaft besteht daraus, über Dinge zu lachen, die wahrscheinlich niemand sonst lustig finden würde.', Chaos: 'K = Chaos: Hier wird es mathematisch etwas gefährlich. K² bedeutet, dass dein Chaos quadriert wird: Ein bisschen Chaos × ein bisschen Chaos = sehr viel Chaos.', Trust: 'T = Vertrauen: Die Konstante, die alles zusammenhält.', Love: 'L∞ = Liebe: Die Liebe geht gegen ∞. Also: L → ∞. Das bedeutet, sie hat keine obere Grenze.' }
    : { Attention: 'You notice the little things, always.', Humour: 'No one makes me laugh at the worst possible times like you do.', Chaos: 'Life is more fun when we forget the plan together.', Trust: 'The kind of trust that makes distance feel temporary.', Love: 'The constant. The infinite. The whole point.' };
  $('#factor-message').textContent = messages[button.dataset.factor];
}));

function bindQuizAnswers() {
  $$('.answers button').forEach((button) => button.addEventListener('click', () => {
    $$('.answers button').forEach((answer) => { answer.disabled = true; });
    const correct = button.dataset.correct === 'true';
    button.classList.add(correct ? 'correct' : 'incorrect');
    if (!isQuizPage) {
      $('#quiz-result').textContent = correct ? 'Best friend status: CONFIRMED ✓' : 'Cute guess. We both know the side quest wins ♡';
      return;
    }
    if (correct) quizScore += 1;
    setTimeout(() => {
      quizQuestionIndex += 1;
      if (quizQuestionIndex < quizQuestions.length) {
        window.renderQuizQuestion();
      } else {
        const percentage = Math.round((quizScore / quizQuestions.length) * 100);
        const result = percentage === 100
          ? 'Beste-Freundin-Status: ABSOLUT BESTÄTIGT ✓'
          : percentage >= 70
            ? 'Beste-Freundin-Status: BESTÄTIGT ✓'
            : 'Beste-Freundin-Status: natürlich trotzdem BESTÄTIGT ♡';
        $('#quiz-question').innerHTML = `<p class="quiz-progress">Das Ergebnis ist da</p><p><strong>${quizScore} von ${quizQuestions.length} Punkten · ${percentage}%</strong></p><p class="quiz-final-copy">${result}</p><button class="primary-button" id="quiz-restart">Nochmal spielen</button>`;
        $('#quiz-result').textContent = 'Du kennst uns vielleicht nicht immer, aber du bist immer meine Person ♡';
        $('#quiz-restart').addEventListener('click', () => { quizQuestionIndex = 0; quizScore = 0; window.renderQuizQuestion(); });
      }
    }, 650);
  }));
}
if (!isQuizPage) bindQuizAnswers();

if ($('#puzzle-button') && !isPuzzlePage) $('#puzzle-button').addEventListener('click', () => {
  $('#puzzle-board').classList.add('solved');
  $('#puzzle-success').classList.add('show');
  $('#puzzle-button').textContent = 'together again ♡';
});

const homeDate = new Date('2027-01-15T18:00:00');
const updateCountdown = () => {
  if (!$('#days')) return;
  const distance = homeDate - new Date();
  if (distance <= 0) { $('#home-message').textContent = "SHE'S HOME. ♡"; return; }
  const values = [Math.floor(distance / 86400000), Math.floor(distance / 3600000) % 24, Math.floor(distance / 60000) % 60, Math.floor(distance / 1000) % 60];
  ['days', 'hours', 'minutes', 'seconds'].forEach((id, index) => { $(`#${id}`).textContent = String(values[index]).padStart(2, '0'); });
};
updateCountdown();
setInterval(updateCountdown, 1000);
