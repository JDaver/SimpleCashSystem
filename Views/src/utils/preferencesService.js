import { apiFetch } from './fetchWrapper';

const BASE_URL = 'http://localhost:4444/api/preferences';

export function getPreferences() {
  return apiFetch(BASE_URL, {
    method: 'GET',
  });
}

export function updatePreferences(newPrefs) {
  return apiFetch(BASE_URL, {
    method: 'PATCH',
    body: JSON.stringify(newPrefs),
  });
}
