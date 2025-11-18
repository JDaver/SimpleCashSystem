export async function apiFetch(url, bodyOpt = {}) {
  const storedSession = sessionStorage.getItem('session');

  let sessionToken;
  try {
    sessionToken = storedSession ? JSON.parse(storedSession) : null;
  } catch (e) {
    sessionToken = null;
  }
  const headers = {
    'Content-Type': 'application/json',
    ...(bodyOpt.headers || {}),
    ...(sessionToken ? { 'x-session': sessionToken.token } : {}),
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
