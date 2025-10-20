export async function login(username) {
  try {
    const res = await fetch('http://localhost:4444/auth/login', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({ username }),
    });
    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.error || 'Errore login');
    }
    const data = await res.json();
    return data;
  } catch (err) {
    return err;
  }
}

export async function signin(new_username, new_email, new_avatar) {
  try {
    const res = await fetch('http://localhost:4444/auth/signin', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({ new_username, new_email, new_avatar }),
    });
    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.error || 'Errore login');
    }
    const data = await res.json();
    return data;
  } catch (err) {
    return err;
  }
}
