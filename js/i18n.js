// ===== INTERNATIONALIZATION (TR/EN) =====
const translations = {
  tr: {
    // Navbar
    "nav.home": "Ana Sayfa",
    "nav.blog": "Blog",
    "nav.projects": "Projeler",
    "nav.cv": "CV",
    "nav.contact": "Iletisim",
    "nav.series": "Seriler",

    // Hero
    "hero.greeting": "Merhaba, ben",
    "hero.description": "Teknoloji, yazilim ve hayata dair dusuncelerimi paylastigim kisisel web sitem. Blog yazilarim ve projelerime goz atabilirsiniz.",
    "hero.blog_btn": "Blog Yazilarim",
    "hero.contact_btn": "Iletisime Gec",

    // About
    "about.title_1": "Hakkimda",
    "about.title_2": "Kisaca",
    "about.subtitle": "Kim oldugumu ve neler yaptigimi ogrenmek ister misiniz?",
    "about.dev": "DevOps",
    "about.dev_desc": "DevOps, otomasyon ve altyapi projelerine ilgi duyuyorum.",
    "about.blog": "Blog",
    "about.blog_desc": "Teknoloji, yazilim ve hayata dair yazilar yaziyorum.",
    "about.projects": "Projeler",
    "about.projects_desc": "Fikirlerimi hayata gecirdigim projelerimi inceleyebilirsiniz.",

    // Latest posts
    "latest.title_1": "Son",
    "latest.title_2": "Yazilarim",
    "latest.subtitle": "En son paylastigim blog yazilarim",
    "latest.all_btn": "Tum Yazilar",

    // Blog page
    "blog.page_title": "Blog",
    "blog.page_subtitle": "Teknoloji, yazilim ve hayata dair yazilarim",
    "blog.filter_all": "Tumunu Goster",
    "blog.filter_tech": "Teknoloji",
    "blog.filter_dev": "DevOps",
    "blog.filter_personal": "Kisisel",
    "blog.read_more": "Devamini Oku",
    "blog.search_placeholder": "Yazi ara...",
    "blog.no_results": "Aramanizla eslesen yazi bulunamadi.",
    "blog.prev": "Onceki",
    "blog.next": "Sonraki",

    // Blog detail
    "blog.back": "Blog'a Don",
    "blog.share": "Paylas",
    "blog.reading_time": "dk okuma",
    "blog.comments": "Yorumlar",
    "blog.comment_name": "Adiniz",
    "blog.comment_text": "Yorumunuz",
    "blog.comment_submit": "Yorum Yap",
    "blog.no_comments": "Henuz yorum yok. Ilk yorumu siz yapin!",
    "blog.likes": "Begeni",
    "blog.tags": "Etiketler",
    "blog.related": "Ilgili Yazilar",

    // Projects
    "projects.page_title": "Projelerim",
    "projects.page_subtitle": "Gelistirdigim ve uzerinde calistigim projeler",
    "projects.filter_all": "Tumu",
    "projects.filter_web": "Web",
    "projects.filter_tool": "Arac",
    "projects.filter_app": "Uygulama",
    "projects.live": "Canli Demo",
    "projects.source": "Kaynak Kod",

    // CV
    "cv.page_title": "CV / Ozgecmis",
    "cv.page_subtitle": "Egitim, deneyim ve yeteneklerim",
    "cv.edu_title_1": "Egitim",
    "cv.edu_title_2": "Gecmisim",
    "cv.edu_subtitle": "Akademik yolculugum",
    "cv.exp_title_1": "Deneyim ve",
    "cv.exp_title_2": "Projeler",
    "cv.exp_subtitle": "Is ve proje deneyimlerim",
    "cv.skills_title_1": "Teknik",
    "cv.skills_title_2": "Yeteneklerim",
    "cv.skills_subtitle": "Kullandigim teknolojiler ve araclar",
    "cv.download": "CV'mi Indir (PDF)",

    // Contact
    "contact.page_title": "Iletisim",
    "contact.page_subtitle": "Benimle iletisime gecmek icin asagidaki formu kullanabilirsiniz",
    "contact.email": "E-posta",
    "contact.location": "Konum",
    "contact.hours": "Calisma Saatleri",
    "contact.hours_val": "Pazartesi - Cuma: 09:00 - 18:00",
    "contact.form_name": "Adiniz Soyadiniz",
    "contact.form_name_ph": "Adinizi giriniz...",
    "contact.form_email": "E-posta Adresiniz",
    "contact.form_email_ph": "E-posta adresinizi giriniz...",
    "contact.form_subject": "Konu",
    "contact.form_subject_ph": "Mesajinizin konusu...",
    "contact.form_message": "Mesajiniz",
    "contact.form_message_ph": "Mesajinizi buraya yaziniz...",
    "contact.form_submit": "Mesaj Gonder",
    "contact.err_name": "Lutfen adinizi giriniz (en az 2 karakter)",
    "contact.err_email": "Lutfen gecerli bir e-posta adresi giriniz",
    "contact.err_subject": "Lutfen bir konu giriniz (en az 3 karakter)",
    "contact.err_message": "Lutfen mesajinizi giriniz (en az 10 karakter)",

    // Newsletter
    "newsletter.title": "Bulten Aboneligi",
    "newsletter.desc": "Yeni yazilarimdan haberdar olmak icin e-posta adresinizi birakin.",
    "newsletter.placeholder": "E-posta adresiniz",
    "newsletter.btn": "Abone Ol",
    "newsletter.success": "Basariyla abone oldunuz!",

    // Series
    "series.page_title": "Blog Serileri",
    "series.page_subtitle": "Adim adim ogrenin, seri seri okuyun",
    "series.posts_count": "yazi",
    "series.status_active": "Devam Ediyor",
    "series.status_completed": "Tamamlandi",
    "series.status_draft": "Taslak",
    "series.part": "Bolum",
    "series.prev": "Onceki Bolum",
    "series.next": "Sonraki Bolum",
    "series.toc_title": "Seri Icerigi",
    "series.progress": "Ilerleme",
    "series.view_all": "Tum Seriyi Gor",
    "series.in_series": "Bu seri icindeki yazilar",
    "series.no_series": "Henuz seri eklenmemis.",
    "series.active_series": "Aktif Seriler",

    // Footer
    "footer.desc": "Teknoloji, yazilim ve hayata dair dusuncelerimi paylastigim kisisel web sitem.",
    "footer.pages": "Sayfalar",
    "footer.social": "Sosyal Medya",
    "footer.rights": "Tum haklari saklidir.",
    "footer.guestbook": "Ziyaretci Defteri",
    "footer.sitemap": "Site Haritasi"
  },
  en: {
    "nav.home": "Home",
    "nav.blog": "Blog",
    "nav.projects": "Projects",
    "nav.cv": "CV",
    "nav.contact": "Contact",
    "nav.series": "Series",

    "hero.greeting": "Hello, I'm",
    "hero.description": "My personal website where I share my thoughts on technology, software and life. Check out my blog posts and projects.",
    "hero.blog_btn": "Blog Posts",
    "hero.contact_btn": "Get in Touch",

    "about.title_1": "About",
    "about.title_2": "Me",
    "about.subtitle": "Would you like to learn who I am and what I do?",
    "about.dev": "DevOps",
    "about.dev_desc": "I'm interested in DevOps, automation and infrastructure projects.",
    "about.blog": "Blog",
    "about.blog_desc": "I write about technology, software and life.",
    "about.projects": "Projects",
    "about.projects_desc": "You can check out the projects where I bring my ideas to life.",

    "latest.title_1": "Latest",
    "latest.title_2": "Posts",
    "latest.subtitle": "My most recent blog posts",
    "latest.all_btn": "All Posts",

    "blog.page_title": "Blog",
    "blog.page_subtitle": "My posts about technology, software and life",
    "blog.filter_all": "Show All",
    "blog.filter_tech": "Technology",
    "blog.filter_dev": "DevOps",
    "blog.filter_personal": "Personal",
    "blog.read_more": "Read More",
    "blog.search_placeholder": "Search posts...",
    "blog.no_results": "No posts found matching your search.",
    "blog.prev": "Previous",
    "blog.next": "Next",

    "blog.back": "Back to Blog",
    "blog.share": "Share",
    "blog.reading_time": "min read",
    "blog.comments": "Comments",
    "blog.comment_name": "Your Name",
    "blog.comment_text": "Your Comment",
    "blog.comment_submit": "Post Comment",
    "blog.no_comments": "No comments yet. Be the first to comment!",
    "blog.likes": "Likes",
    "blog.tags": "Tags",
    "blog.related": "Related Posts",

    "projects.page_title": "My Projects",
    "projects.page_subtitle": "Projects I've developed and worked on",
    "projects.filter_all": "All",
    "projects.filter_web": "Web",
    "projects.filter_tool": "Tools",
    "projects.filter_app": "Apps",
    "projects.live": "Live Demo",
    "projects.source": "Source Code",

    "cv.page_title": "CV / Resume",
    "cv.page_subtitle": "Education, experience and skills",
    "cv.edu_title_1": "Education",
    "cv.edu_title_2": "History",
    "cv.edu_subtitle": "My academic journey",
    "cv.exp_title_1": "Experience &",
    "cv.exp_title_2": "Projects",
    "cv.exp_subtitle": "My work and project experience",
    "cv.skills_title_1": "Technical",
    "cv.skills_title_2": "Skills",
    "cv.skills_subtitle": "Technologies and tools I use",
    "cv.download": "Download CV (PDF)",

    "contact.page_title": "Contact",
    "contact.page_subtitle": "You can use the form below to get in touch with me",
    "contact.email": "Email",
    "contact.location": "Location",
    "contact.hours": "Working Hours",
    "contact.hours_val": "Monday - Friday: 09:00 - 18:00",
    "contact.form_name": "Full Name",
    "contact.form_name_ph": "Enter your name...",
    "contact.form_email": "Email Address",
    "contact.form_email_ph": "Enter your email...",
    "contact.form_subject": "Subject",
    "contact.form_subject_ph": "Subject of your message...",
    "contact.form_message": "Message",
    "contact.form_message_ph": "Write your message here...",
    "contact.form_submit": "Send Message",
    "contact.err_name": "Please enter your name (at least 2 characters)",
    "contact.err_email": "Please enter a valid email address",
    "contact.err_subject": "Please enter a subject (at least 3 characters)",
    "contact.err_message": "Please enter your message (at least 10 characters)",

    "newsletter.title": "Newsletter",
    "newsletter.desc": "Leave your email to be notified about new posts.",
    "newsletter.placeholder": "Your email address",
    "newsletter.btn": "Subscribe",
    "newsletter.success": "Successfully subscribed!",

    "series.page_title": "Blog Series",
    "series.page_subtitle": "Learn step by step, read series by series",
    "series.posts_count": "posts",
    "series.status_active": "In Progress",
    "series.status_completed": "Completed",
    "series.status_draft": "Draft",
    "series.part": "Part",
    "series.prev": "Previous Part",
    "series.next": "Next Part",
    "series.toc_title": "Series Contents",
    "series.progress": "Progress",
    "series.view_all": "View Full Series",
    "series.in_series": "Posts in this series",
    "series.no_series": "No series added yet.",
    "series.active_series": "Active Series",

    "footer.desc": "My personal website where I share my thoughts on technology, software and life.",
    "footer.pages": "Pages",
    "footer.social": "Social Media",
    "footer.rights": "All rights reserved.",
    "footer.guestbook": "Guestbook",
    "footer.sitemap": "Sitemap"
  }
};

function getLang() {
  return localStorage.getItem('lang') || 'tr';
}

function setLang(lang) {
  localStorage.setItem('lang', lang);
  applyTranslations();
}

function t(key) {
  const lang = getLang();
  return (translations[lang] && translations[lang][key]) || key;
}

function applyTranslations() {
  const lang = getLang();
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = t(key);
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = val;
    } else {
      el.textContent = val;
    }
  });

  // Update lang toggle button
  const langBtn = document.querySelector('.lang-toggle');
  if (langBtn) {
    langBtn.textContent = lang === 'tr' ? 'EN' : 'TR';
  }

  document.documentElement.lang = lang;
}

// Init on load
document.addEventListener('DOMContentLoaded', applyTranslations);
