// TODO(P404) : Étape 4 puis 5.
// Liste des auteurs chargés depuis l'API.
import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { API_URL } from '../constants'
import { lireJson } from '../api'
import EtatRequete from '../components/EtatRequete'

function Auteurs() {
  const [auteurs, setAuteurs] = useState([])
  const [chargement, setChargement] = useState(true)
  const [erreur, setErreur] = useState(null)

  useEffect(() => {
    const controleur = new AbortController()

    lireJson(API_URL + '/users', controleur.signal)
      .then(donnees => {
        setAuteurs(donnees)
        setChargement(false)
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          setErreur(err.message)
          setChargement(false)
        }
      })

    return () => controleur.abort()
  }, [])

  return (
    <div>
      <h1>Auteurs</h1>
      <EtatRequete chargement={chargement} erreur={erreur}>
        <ul>
          {auteurs.map(a => (
            <li key={a.id}>
              <Link to={'/auteurs/' + a.id}>{a.name}</Link> ({a.company.name})
            </li>
          ))}
        </ul>
      </EtatRequete>
    </div>
  )
}

export default Auteurs;