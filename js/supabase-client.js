// ===== SUPABASE CLIENT =====
// Supabase URL ve anon key - kendi degerlerinizle degistirin
const SUPABASE_URL = 'https://sydrlrecxpoyrdxefavc.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5ZHJscmVjeHBveXJkeGVmYXZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwMDg1ODksImV4cCI6MjA4NzU4NDU4OX0.nLihElmWt2hrg42MabBFuc5oMIup1ObuYEZbm4etsIo';

const _supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ===== AUTH HELPERS =====
async function signIn(email, password) {
  const { data, error } = await _supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

async function signOut() {
  const { error } = await _supabase.auth.signOut();
  if (error) throw error;
}

async function getSession() {
  const { data: { session } } = await _supabase.auth.getSession();
  return session;
}

// ===== BLOG SERIES =====
function transformSeries(row) {
  return {
    id: row.id,
    title: { tr: row.title_tr, en: row.title_en || row.title_tr },
    description: { tr: row.description_tr || '', en: row.description_en || row.description_tr || '' },
    icon: row.icon || 'fa-layer-group',
    gradient: row.gradient || 'var(--primary)',
    status: row.status || 'active',
    created_at: row.created_at
  };
}

async function fetchAllSeries() {
  const { data, error } = await _supabase
    .from('blog_series')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) { console.error('fetchAllSeries error:', error); return []; }
  return data.map(transformSeries);
}

async function fetchSeriesById(id) {
  const { data, error } = await _supabase
    .from('blog_series')
    .select('*')
    .eq('id', id)
    .single();
  if (error) { console.error('fetchSeriesById error:', error); return null; }
  return transformSeries(data);
}

async function fetchPostsBySeries(seriesId) {
  const { data, error } = await _supabase
    .from('blog_posts')
    .select('*')
    .eq('series_id', seriesId)
    .order('series_order', { ascending: true });
  if (error) { console.error('fetchPostsBySeries error:', error); return []; }
  return data.map(transformPost);
}

async function insertSeries(series) {
  const { data, error } = await _supabase
    .from('blog_series')
    .insert({
      title_tr: series.title.tr,
      title_en: series.title.en,
      description_tr: series.description.tr,
      description_en: series.description.en,
      icon: series.icon,
      gradient: series.gradient,
      status: series.status || 'active'
    })
    .select()
    .single();
  if (error) throw error;
  return transformSeries(data);
}

async function updateSeries(id, series) {
  const { data, error } = await _supabase
    .from('blog_series')
    .update({
      title_tr: series.title.tr,
      title_en: series.title.en,
      description_tr: series.description.tr,
      description_en: series.description.en,
      icon: series.icon,
      gradient: series.gradient,
      status: series.status || 'active'
    })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return transformSeries(data);
}

async function deleteSeries(id) {
  const { error } = await _supabase
    .from('blog_series')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

// ===== BLOG POSTS =====
// Flat DB columns -> nested {tr, en} object
function transformPost(row) {
  return {
    id: row.id,
    title: { tr: row.title_tr, en: row.title_en || row.title_tr },
    summary: { tr: row.summary_tr || '', en: row.summary_en || row.summary_tr || '' },
    content: { tr: row.content_tr || '', en: row.content_en || row.content_tr || '' },
    category: row.category || 'devops',
    icon: row.icon || 'fa-file-alt',
    gradient: row.gradient || 'var(--primary)',
    tags: row.tags || [],
    author: row.author || 'Hasan',
    date: row.date || row.created_at?.split('T')[0] || new Date().toISOString().split('T')[0],
    series_id: row.series_id || null,
    series_order: row.series_order || 0
  };
}

async function fetchAllPosts() {
  const { data, error } = await _supabase
    .from('blog_posts')
    .select('*')
    .order('date', { ascending: false })
    .order('created_at', { ascending: false });
  if (error) { console.error('fetchAllPosts error:', error); return []; }
  return data.map(transformPost);
}

async function fetchPostById(id) {
  const { data, error } = await _supabase
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .single();
  if (error) { console.error('fetchPostById error:', error); return null; }
  return transformPost(data);
}

async function insertBlogPost(post) {
  const row = {
    title_tr: post.title.tr,
    title_en: post.title.en,
    summary_tr: post.summary.tr,
    summary_en: post.summary.en,
    content_tr: post.content.tr,
    content_en: post.content.en,
    category: post.category,
    icon: post.icon,
    gradient: post.gradient,
    tags: post.tags,
    author: post.author || 'Hasan',
    date: post.date
  };
  if (post.series_id) row.series_id = post.series_id;
  if (post.series_order) row.series_order = post.series_order;
  const { data, error } = await _supabase
    .from('blog_posts')
    .insert(row)
    .select()
    .single();
  if (error) throw error;
  return transformPost(data);
}

async function updateBlogPost(id, post) {
  const row = {
    title_tr: post.title.tr,
    title_en: post.title.en,
    summary_tr: post.summary.tr,
    summary_en: post.summary.en,
    content_tr: post.content.tr,
    content_en: post.content.en,
    category: post.category,
    icon: post.icon,
    gradient: post.gradient,
    tags: post.tags,
    author: post.author || 'Hasan',
    date: post.date,
    series_id: post.series_id || null,
    series_order: post.series_order || 0
  };
  const { data, error } = await _supabase
    .from('blog_posts')
    .update(row)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return transformPost(data);
}

async function deleteBlogPost(id) {
  const { error } = await _supabase
    .from('blog_posts')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

// ===== PROJECTS =====
async function fetchProjects() {
  const { data, error } = await _supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) { console.error('fetchProjects error:', error); return []; }
  return data;
}

async function insertProject(project) {
  const { data, error } = await _supabase
    .from('projects')
    .insert({
      name: project.name,
      description: project.description,
      tech: project.tech,
      role: project.role,
      category: project.category,
      icon: project.icon
    })
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function updateProject(id, project) {
  const { data, error } = await _supabase
    .from('projects')
    .update({
      name: project.name,
      description: project.description,
      tech: project.tech,
      role: project.role,
      category: project.category,
      icon: project.icon
    })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function deleteProject(id) {
  const { error } = await _supabase
    .from('projects')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

// ===== EXPERIENCES =====
async function fetchExperiences() {
  const { data, error } = await _supabase
    .from('experiences')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) { console.error('fetchExperiences error:', error); return []; }
  return data;
}

async function insertExperience(exp) {
  const { data, error } = await _supabase
    .from('experiences')
    .insert({
      title: exp.title,
      company: exp.company,
      date: exp.date,
      description: exp.description
    })
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function updateExperience(id, exp) {
  const { data, error } = await _supabase
    .from('experiences')
    .update({
      title: exp.title,
      company: exp.company,
      date: exp.date,
      description: exp.description
    })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function deleteExperience(id) {
  const { error } = await _supabase
    .from('experiences')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

// ===== GUESTBOOK =====
async function fetchGuestbookMessages() {
  const { data, error } = await _supabase
    .from('guestbook_messages')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) { console.error('fetchGuestbookMessages error:', error); return []; }
  return data;
}

async function insertGuestbookMessage(msg) {
  const { data, error } = await _supabase
    .from('guestbook_messages')
    .insert({
      name: msg.name,
      location: msg.location,
      emoji: msg.emoji,
      message: msg.message
    })
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function deleteGuestbookMessage(id) {
  const { error } = await _supabase
    .from('guestbook_messages')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

// ===== CONTACT MESSAGES =====
async function insertContactMessage(msg) {
  const { data, error } = await _supabase
    .from('contact_messages')
    .insert({
      name: msg.name,
      email: msg.email,
      subject: msg.subject,
      message: msg.message
    })
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function fetchContactMessages() {
  const { data, error } = await _supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) { console.error('fetchContactMessages error:', error); return []; }
  return data;
}

async function markContactMessageRead(id) {
  const { error } = await _supabase
    .from('contact_messages')
    .update({ is_read: true })
    .eq('id', id);
  if (error) throw error;
}

async function deleteContactMessage(id) {
  const { error } = await _supabase
    .from('contact_messages')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

// ===== COMMENTS =====
async function fetchComments(postId) {
  const { data, error } = await _supabase
    .from('comments')
    .select('*')
    .eq('post_id', postId)
    .order('created_at', { ascending: true });
  if (error) { console.error('fetchComments error:', error); return []; }
  return data;
}

async function fetchAllComments() {
  const { data, error } = await _supabase
    .from('comments')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) { console.error('fetchAllComments error:', error); return []; }
  return data;
}

async function insertComment(postId, name, text) {
  const { data, error } = await _supabase
    .from('comments')
    .insert({
      post_id: postId,
      name: name,
      text: text
    })
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function approveComment(id) {
  const { error } = await _supabase
    .from('comments')
    .update({ approved: true })
    .eq('id', id);
  if (error) throw error;
}

async function deleteComment(id) {
  const { error } = await _supabase
    .from('comments')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

// ===== NEWSLETTER =====
async function insertNewsletterSub(email) {
  const { data, error } = await _supabase
    .from('newsletter_subs')
    .insert({ email })
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function fetchNewsletterSubs() {
  const { data, error } = await _supabase
    .from('newsletter_subs')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) { console.error('fetchNewsletterSubs error:', error); return []; }
  return data;
}
