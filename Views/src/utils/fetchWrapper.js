export async function apiFetch(url, bodyOpt = {}) {
  const session = sessionStorage.getItem('session');
  const headers = {
    'Content-Type': 'application/json',
    ...(bodyOpt.headers || {}),
    ...(session ? { 'X-Session': session } : {}),
  };
  try {
    const res = await fetch(url, { ...bodyOpt, headers });
    if (!res.ok) throw new Error(`Errore API: ${res.status}`);

    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      return await res.json();
    }
    return res.text();
  } catch (err) {
    throw err;
  }
}
