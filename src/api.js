export function lireJson(url, signal) {
  return fetch(url, { signal }).then(r => {
    if (!r.ok) throw new Error(`Erreur ${r.status}`)
    return r.json()
  })
}