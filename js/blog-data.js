// ===== BLOG POST DATA =====
const blogPosts = [
  {
    id: 1,
    title: { tr: "Web Gelistirmeye Nereden Baslamali?", en: "Where to Start Web Development?" },
    summary: { tr: "Web gelistirme dunyasina adim atmak isteyenler icin kapsamli bir rehber. HTML, CSS ve JavaScript'ten baslayin...", en: "A comprehensive guide for those who want to step into web development. Start with HTML, CSS and JavaScript..." },
    content: {
      tr: `<p>Web gelistirme, gunumuzun en populer ve talep goren becerilerinden biri haline geldi. Peki nereden baslamali?</p>
<h2>1. HTML - Temeli Atin</h2>
<p>HTML (HyperText Markup Language), web sayfalarinin iskeletini olusturur. Basliklar, paragraflar, resimler ve baglantilar gibi temel yapisal elemanlari HTML ile tanimlarsiniz. HTML ogrenmek, web gelistirme yolculugunuzun ilk adimi olmalidir.</p>
<h2>2. CSS - Gorunumu Sekillendirin</h2>
<p>CSS (Cascading Style Sheets), HTML ile olusturdugunuz yapiyi gorsellestirmenizi saglar. Renkler, fontlar, yerlesim duzeni ve animasyonlar CSS ile kontrol edilir. Flexbox ve Grid gibi modern CSS teknikleri ile responsive tasarimlar olusturabilirsiniz.</p>
<h2>3. JavaScript - Etkilesim Ekleyin</h2>
<p>JavaScript, web sayfalariniza etkilesim katar. Buton tiklama olaylari, form dogrulama, dinamik icerik yukleme ve cok daha fazlasi JavaScript ile mumkun hale gelir.</p>
<h2>4. Framework Secimi</h2>
<p>Temelleri ogrendikten sonra React, Vue veya Angular gibi bir framework ogrenmeyi dusunebilirsiniz. Bu frameworkler buyuk olcekli uygulamalar gelistirmenizi kolaylastirir.</p>
<h2>Sonuc</h2>
<p>Onemli olan baslamaktir. Kucuk projelerle pratik yapin, GitHub'da kodlarinizi paylasin ve surekli ogrenmeye devam edin. Hata yapmaktan korkmamali, her hata yeni bir ogrenme firsatidir.</p>`,
      en: `<p>Web development has become one of the most popular and in-demand skills today. So where should you start?</p>
<h2>1. HTML - Lay the Foundation</h2>
<p>HTML (HyperText Markup Language) forms the skeleton of web pages. You define basic structural elements like headings, paragraphs, images and links with HTML. Learning HTML should be the first step in your web development journey.</p>
<h2>2. CSS - Shape the Appearance</h2>
<p>CSS (Cascading Style Sheets) allows you to visualize the structure you created with HTML. Colors, fonts, layout and animations are controlled with CSS. You can create responsive designs with modern CSS techniques like Flexbox and Grid.</p>
<h2>3. JavaScript - Add Interaction</h2>
<p>JavaScript adds interaction to your web pages. Button click events, form validation, dynamic content loading and much more become possible with JavaScript.</p>
<h2>4. Framework Selection</h2>
<p>After learning the basics, you can consider learning a framework like React, Vue or Angular. These frameworks make it easier to develop large-scale applications.</p>
<h2>Conclusion</h2>
<p>The important thing is to start. Practice with small projects, share your code on GitHub and keep learning. Don't be afraid of making mistakes, every mistake is a new learning opportunity.</p>`
    },
    category: "yazilim",
    date: "2026-02-24",
    icon: "fa-rocket",
    gradient: "var(--primary)",
    author: "Hasan"
  },
  {
    id: 2,
    title: { tr: "Yapay Zeka ve Gelecek", en: "Artificial Intelligence and the Future" },
    summary: { tr: "Yapay zekanin hayatimizi nasil degistirdigine dair dusuncelerim. AI'nin is dunyasindan egitime kadar etkileri...", en: "My thoughts on how artificial intelligence is changing our lives. The effects of AI from business to education..." },
    content: {
      tr: `<p>Yapay zeka (AI) artik sadece bilim kurgu filmlerinin konusu degil. Gunluk hayatimizin ayrilmaz bir parcasi haline geldi.</p>
<h2>AI Nerede Kullaniliyor?</h2>
<p>Sesli asistanlardan otonom araclara, sagliktaki teshis sistemlerinden finans sektorundeki algoritmik ticarete kadar AI her yerde. ChatGPT gibi buyuk dil modelleri ise insanlarin bilgiye erisim ve icerik uretim seklini tamamen degistirdi.</p>
<h2>Egitimde AI</h2>
<p>Kisisellestirilmis ogrenme deneyimleri, otomatik degerlendirme ve akilli ogretim sistemleri egitime yeni bir boyut katmaktadir. Ogrenciler artik kendi hizlarinda, kendi ilgi alanlarina yonelik ogrenebiliyorlar.</p>
<h2>Is Dunyasinda Donusum</h2>
<p>Bazi mesleklerin ortadan kalkacagi korkusu yasansa da, AI asil olarak meslekleri donusturuyor. Tekrarli isler otomatize olurken, yaratici ve stratejik dusunme becerileri daha degerli hale geliyor.</p>
<h2>Etik Kaygılar</h2>
<p>Veri gizliligi, yapay zeka yanlilik, deepfake ve otonom silahlar gibi konular onemli etik tartismalara yol aciyor. Bu teknolojilerin sorumlu bir sekilde gelistirilmesi sart.</p>`,
      en: `<p>Artificial intelligence (AI) is no longer just the subject of science fiction movies. It has become an integral part of our daily lives.</p>
<h2>Where is AI Used?</h2>
<p>From voice assistants to autonomous vehicles, from diagnostic systems in healthcare to algorithmic trading in finance - AI is everywhere. Large language models like ChatGPT have completely changed how people access information and create content.</p>
<h2>AI in Education</h2>
<p>Personalized learning experiences, automatic assessment and intelligent tutoring systems are adding a new dimension to education. Students can now learn at their own pace, focused on their own interests.</p>
<h2>Transformation in Business</h2>
<p>While there are fears that some professions will disappear, AI is actually transforming professions. As repetitive tasks are automated, creative and strategic thinking skills become more valuable.</p>
<h2>Ethical Concerns</h2>
<p>Issues such as data privacy, AI bias, deepfakes and autonomous weapons are raising important ethical debates. It is essential that these technologies are developed responsibly.</p>`
    },
    category: "teknoloji",
    date: "2026-02-20",
    icon: "fa-brain",
    gradient: "var(--primary)",
    author: "Hasan"
  },
  {
    id: 3,
    title: { tr: "Ilk Projemi Nasil Gelistirdim?", en: "How I Developed My First Project?" },
    summary: { tr: "Ilk yazilim projemi gelistirirken yasadigim deneyimler ve ogrendiklerim. Hata yapmaktan korkmamak gerektigini...", en: "My experiences and learnings while developing my first software project. That you shouldn't be afraid of making mistakes..." },
    content: {
      tr: `<p>Herkesin bir ilk projesi vardir ve genellikle o proje hayatindaki en ogretici deneyimlerden biri olur.</p>
<h2>Fikir Asamasi</h2>
<p>Ilk projemi dusunurken cok buyuk hedeflerim vardi. Bir sosyal medya platformu yapmak istiyordum! Tabii ki bu gercekci degildi. Sonra kucuk baslayip bir kisisel blog sitesi yapmayi sectim.</p>
<h2>Ilk Satirlar</h2>
<p>HTML'de ilk "Hello World" yazdigimda hissetttigim heyecan tarif edilemezdi. Sayfamin basligini degistirmek bile beni mutlu ediyordu. CSS ogrenmeye basladigimda ise isler biraz karisik hale geldi.</p>
<h2>Hatalar ve Ogrenme</h2>
<p>Sayisiz hata yaptim. CSS'te margin ve padding farkini anlamam gunlerimi aldi. JavaScript'te ilk for dongusu yazmam saatlerimi aldi. Ama her hata beni daha iyi bir gelistirici yapti.</p>
<h2>Projeyi Tamamlamak</h2>
<p>Sonunda projeyi tamamladigimda muhtesem bir his yasadim. Mukemmel degildi ama benim eserimd. GitHub'a yukledim ve ilk commit'imi attim.</p>`,
      en: `<p>Everyone has a first project and usually that project is one of the most educational experiences in their life.</p>
<h2>Idea Phase</h2>
<p>When thinking about my first project, I had very big goals. I wanted to build a social media platform! Of course, this wasn't realistic. Then I chose to start small and build a personal blog site.</p>
<h2>First Lines</h2>
<p>The excitement I felt when I wrote my first "Hello World" in HTML was indescribable. Even changing my page title made me happy. When I started learning CSS, things got a bit complicated.</p>
<h2>Mistakes and Learning</h2>
<p>I made countless mistakes. Understanding the difference between margin and padding in CSS took me days. Writing my first for loop in JavaScript took me hours. But every mistake made me a better developer.</p>
<h2>Completing the Project</h2>
<p>When I finally completed the project, I felt amazing. It wasn't perfect but it was my creation. I uploaded it to GitHub and made my first commit.</p>`
    },
    category: "kisisel",
    date: "2026-02-15",
    icon: "fa-laptop-code",
    gradient: "var(--primary-light)",
    author: "Hasan"
  },
  {
    id: 4,
    title: { tr: "Veritabani Temelleri: SQL vs NoSQL", en: "Database Basics: SQL vs NoSQL" },
    summary: { tr: "Veritabani secimi yaparken dikkat etmeniz gerekenler. Hangi proje icin hangi veritabani uygun?", en: "Things to consider when choosing a database. Which database is suitable for which project?" },
    content: {
      tr: `<p>Veritabani secimi, bir projenin basarisi icin kritik oneme sahiptir. Yanlis secim ileride buyuk sorunlara yol acabilir.</p>
<h2>SQL Veritabanlari</h2>
<p>SQL veritabanlari (MySQL, PostgreSQL, SQLite) iliskisel veri modeli kullanir. Veriler tablolarda saklanir ve tablolar arasinda iliskiler kurulur. ACID uyumluluklari sayesinde veri butunlugu garanti altindadir.</p>
<h2>NoSQL Veritabanlari</h2>
<p>NoSQL veritabanlari (MongoDB, Redis, Cassandra) esnek veri modelleri sunar. Dokuman tabanlı, anahtar-deger, sutun ailesi veya graf tabanlı olabilirler. Yatay olcekleme konusunda avantajlıdırlar.</p>
<h2>Hangisini Secmeliyim?</h2>
<p>Yapilandirilmis veri ve karmasik sorgular icin SQL, esnek sema ve buyuk olcekli veri icin NoSQL tercih edilebilir. Cogu modern projede her ikisi birlikte kullanilmaktadir.</p>`,
      en: `<p>Database selection is critical for the success of a project. The wrong choice can lead to big problems later on.</p>
<h2>SQL Databases</h2>
<p>SQL databases (MySQL, PostgreSQL, SQLite) use a relational data model. Data is stored in tables and relationships are established between tables. Data integrity is guaranteed through ACID compliance.</p>
<h2>NoSQL Databases</h2>
<p>NoSQL databases (MongoDB, Redis, Cassandra) offer flexible data models. They can be document-based, key-value, column-family or graph-based. They have advantages in horizontal scaling.</p>
<h2>Which Should I Choose?</h2>
<p>SQL can be preferred for structured data and complex queries, NoSQL for flexible schemas and large-scale data. In most modern projects, both are used together.</p>`
    },
    category: "yazilim",
    date: "2026-02-10",
    icon: "fa-database",
    gradient: "var(--primary)",
    author: "Hasan"
  },
  {
    id: 5,
    title: { tr: "Siber Guvenlik: Temel Bilgiler", en: "Cybersecurity: Basic Knowledge" },
    summary: { tr: "Internet guvenliginizi saglamak icin bilmeniz gereken temel konular ve pratik ipuclari...", en: "Basic topics and practical tips you need to know to ensure your internet security..." },
    content: {
      tr: `<p>Dijital dunyada guvenlik her gecen gun daha da onemli hale geliyor. Iste bilmeniz gereken temel guvenlik konulari.</p>
<h2>Guclu Parola Kullanimi</h2>
<p>En az 12 karakter uzunlugunda, buyuk-kucuk harf, rakam ve ozel karakter iceren parolalar kullanin. Her hesap icin farkli parola belirleyin ve bir parola yoneticisi kullanmayi dusunun.</p>
<h2>Iki Faktorlu Dogrulama (2FA)</h2>
<p>Mumkun olan her yerde 2FA'yi aktif edin. SMS yerine authenticator uygulamasi kullanmak daha guvenlidir.</p>
<h2>Phishing Saldirilari</h2>
<p>Supheli e-postalardaki linklere tiklamaktan kacinin. Gonderen adresini dikkatli kontrol edin. Bankaniz veya onemli servisler asla e-posta ile sifrenizi istemez.</p>
<h2>Yazilim Guncellemeleri</h2>
<p>Isletim sisteminizi ve uygulamalarinizi guncel tutun. Guvenlik yamalari bilinen aciklari kapatir.</p>`,
      en: `<p>Security in the digital world is becoming more important every day. Here are the basic security topics you need to know.</p>
<h2>Strong Password Usage</h2>
<p>Use passwords that are at least 12 characters long, containing uppercase, lowercase, numbers and special characters. Set different passwords for each account and consider using a password manager.</p>
<h2>Two-Factor Authentication (2FA)</h2>
<p>Enable 2FA wherever possible. Using an authenticator app instead of SMS is more secure.</p>
<h2>Phishing Attacks</h2>
<p>Avoid clicking links in suspicious emails. Carefully check the sender address. Your bank or important services will never ask for your password via email.</p>
<h2>Software Updates</h2>
<p>Keep your operating system and applications up to date. Security patches close known vulnerabilities.</p>`
    },
    category: "teknoloji",
    date: "2026-02-05",
    icon: "fa-shield-alt",
    gradient: "var(--primary-light)",
    author: "Hasan"
  },
  {
    id: 6,
    title: { tr: "2026 Hedeflerim", en: "My 2026 Goals" },
    summary: { tr: "Bu yil kendime koydugum hedefler ve bunlara ulasmak icin planlarim. Kisisel gelisim ve kariyer planlari...", en: "The goals I set for myself this year and my plans to achieve them. Personal development and career plans..." },
    content: {
      tr: `<p>Yeni bir yil, yeni hedefler. 2026 icin kendime koydugum hedefleri ve bunlara nasil ulasmayi planladigimi paylasmak istiyorum.</p>
<h2>Teknik Hedefler</h2>
<p>React ve Next.js'i ileri seviyede ogrenmek, en az 3 acik kaynak projeye katki saglamak ve kendi SaaS projemi gelistirmek istiyorum.</p>
<h2>Kisisel Gelisim</h2>
<p>Haftada en az 2 teknik makale okumak, ayda 1 kitap bitirmek ve duzenli olarak blog yazmak hedeflerim arasinda.</p>
<h2>Saglik</h2>
<p>Haftada 3 gun spor yapmak, duzgun beslenme aliskanliklari edinmek ve uyku duzenimi iyilestirmek istiyorum.</p>
<h2>Kariyer</h2>
<p>Yaz donemi icin iyi bir staj bulmak, portfolyomu guclendirmek ve networking etkinliklerine katilmak onceliklerim.</p>`,
      en: `<p>A new year, new goals. I want to share the goals I set for myself for 2026 and how I plan to achieve them.</p>
<h2>Technical Goals</h2>
<p>I want to learn React and Next.js at an advanced level, contribute to at least 3 open source projects and develop my own SaaS project.</p>
<h2>Personal Development</h2>
<p>Reading at least 2 technical articles per week, finishing 1 book per month and writing blog posts regularly are among my goals.</p>
<h2>Health</h2>
<p>I want to exercise 3 days a week, develop proper eating habits and improve my sleep schedule.</p>
<h2>Career</h2>
<p>Finding a good internship for the summer period, strengthening my portfolio and attending networking events are my priorities.</p>`
    },
    category: "kisisel",
    date: "2026-02-01",
    icon: "fa-book",
    gradient: "var(--primary)",
    author: "Hasan"
  }
];

// Load custom posts from localStorage
function getAllPosts() {
  const customPosts = JSON.parse(localStorage.getItem('customBlogPosts') || '[]');
  return [...blogPosts, ...customPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
}

function getPostById(id) {
  return getAllPosts().find(p => p.id === Number(id));
}

function calculateReadingTime(content) {
  const text = content.replace(/<[^>]*>/g, '');
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function formatDate(dateStr, lang) {
  const months = {
    tr: ['Ocak', 'Subat', 'Mart', 'Nisan', 'Mayis', 'Haziran', 'Temmuz', 'Agustos', 'Eylul', 'Ekim', 'Kasim', 'Aralik'],
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  };
  const d = new Date(dateStr);
  const m = months[lang] || months.tr;
  return `${d.getDate()} ${m[d.getMonth()]} ${d.getFullYear()}`;
}
