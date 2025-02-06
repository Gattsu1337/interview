import { useState } from 'preact/hooks'
import preactLogo from './assets/preact.svg'
import viteLogo from '/vite.svg'
import './app.css'
import MovieCard from './components/PreviewPage/MovieCard'
import Button from './components/Button'
import UploadForm from './components/MovieUpload/UploadForm'
import AddMovieForm from './components/AddMovie/AddMovieForm'

export function App() {

  return (
    <>
      <UploadForm></UploadForm>
    </>
  )
}
