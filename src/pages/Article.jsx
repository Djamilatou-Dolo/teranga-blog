// TODO(P403) : Étape 4 puis 5.
// Détail d'un article (paramètre d'URL id) et ses commentaires.
import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { API_URL } from '../constants'
import { lireJson } from '../api'
import EtatRequete from '../components/EtatRequete'
import CommentaireForm from '../components/CommentaireForm'
import ListeCommentaires from '../components/ListeCommentaires'

function Article() {
  const { id } = useParams()
  const [article, setArticle] = useState(null)
  const [commentaires, setCommentaires] = useState([])
  const [chargement, setChargement] = useState(true)
  const [erreur, setErreur] = useState(null)

  useEffect(() => {
    const controleur = new AbortController()
    setChargement(true)
    setErreur(null)

    Promise.all([
      lireJson(API_URL + '/posts/' + id, controleur.signal),
      lireJson(API_URL + '/posts/' + id + '/comments', controleur.signal),
    ])
      .then(([articleRecu, commentairesRecus]) => {
        setArticle(articleRecu)
        setCommentaires(commentairesRecus)
        setChargement(false)
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          setErreur(err.message)
          setChargement(false)
        }
      })

    return () => controleur.abort()
  }, [id])

  function ajouter(commentaire) {
    setCommentaires([...commentaires, commentaire])
  }

  return (
    <EtatRequete chargement={chargement} erreur={erreur}>
      {article && (
        <div>
          <h1>{article.title}</h1>
          <p>{article.body}</p>
          <h2>Commentaires</h2>
          <ListeCommentaires commentaires={commentaires} />
          <CommentaireForm onAjouter={ajouter} />
        </div>
      )}
    </EtatRequete>
  )
}

export default Article