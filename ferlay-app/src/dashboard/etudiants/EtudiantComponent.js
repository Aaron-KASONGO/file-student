import React from 'react'
import { CardEtudiant } from '../../components/CardEtudiant'
import { TitleTypography } from '../../components/commonComponents'

export const EtudiantComponent = () => {
  return (
    <>
      <TitleTypography>Etudiants</TitleTypography>
      <CardEtudiant />
    </>
  )
}
