// ===== BLOG POST DATA =====

// In-memory cache
let _postsCache = null;
let _seriesCache = null;

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

// ===== SERIES CACHE =====
async function getAllSeries() {
  if (_seriesCache) return _seriesCache;
  _seriesCache = await fetchAllSeries();
  return _seriesCache;
}

function invalidateSeriesCache() {
  _seriesCache = null;
}

async function getSeriesById(id) {
  if (_seriesCache) {
    const cached = _seriesCache.find(s => s.id === Number(id));
    if (cached) return cached;
  }
  return await fetchSeriesById(id);
}

async function getSeriesWithPostCount() {
  const series = await getAllSeries();
  const posts = await getAllPosts();
  return series.map(s => {
    const seriesPosts = posts.filter(p => p.series_id === s.id);
    return { ...s, postCount: seriesPosts.length };
  });
}

async function getSeriesNavigation(postId) {
  const posts = await getAllPosts();
  const post = posts.find(p => p.id === Number(postId));
  if (!post || !post.series_id) return null;

  const series = await getSeriesById(post.series_id);
  if (!series) return null;

  const seriesPosts = posts
    .filter(p => p.series_id === post.series_id)
    .sort((a, b) => a.series_order - b.series_order);

  const currentIndex = seriesPosts.findIndex(p => p.id === post.id);
  return {
    series,
    posts: seriesPosts,
    currentIndex,
    currentOrder: post.series_order,
    total: seriesPosts.length,
    prev: currentIndex > 0 ? seriesPosts[currentIndex - 1] : null,
    next: currentIndex < seriesPosts.length - 1 ? seriesPosts[currentIndex + 1] : null
  };
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
