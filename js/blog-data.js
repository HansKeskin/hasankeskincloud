// ===== BLOG POST DATA =====
const blogPosts = [];

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
