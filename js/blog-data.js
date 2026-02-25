// ===== BLOG POST DATA =====

// In-memory cache
let _postsCache = null;

async function getAllPosts() {
  if (_postsCache) return _postsCache;
  _postsCache = await fetchAllPosts();
  return _postsCache;
}

function invalidatePostsCache() {
  _postsCache = null;
}

async function getPostById(id) {
  // Try cache first
  if (_postsCache) {
    const cached = _postsCache.find(p => p.id === Number(id));
    if (cached) return cached;
  }
  return await fetchPostById(id);
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
