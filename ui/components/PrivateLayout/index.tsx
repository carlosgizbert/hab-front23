import { Typography } from '@mui/material'
import React from 'react'
import * as S from './style'

interface IPrivateLayout {
  title: string
  children: JSX.Element | JSX.Element[]
}

export default function PrivateLayout({title, children}: IPrivateLayout) {
  return (
    <>
    <S.Header>
      <S.HeaderContainer>
        <Typography variant='h4'>{title}</Typography>
      </S.HeaderContainer>
    </S.Header>
    <S.Container>
      <S.Body>
        {children}
      </S.Body>
    </S.Container>
    </>
  )
}