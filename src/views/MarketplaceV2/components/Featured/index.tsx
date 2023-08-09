import React from 'react'
import styled from 'styled-components'
import { Grid } from '@mui/material'
import { COLORS } from 'views/MarketplaceV2/styles/constants'
import { sectionProp } from '../Foundation/layout'
import { Props as CardType } from '../Card/index.d'
import Card from '../Card'
import Cards from './Cards'
import { H1, TextWrapper } from '../Foundation/Text'

const placeholder: CardType[] = [
  {
    name: 'Voidmancer',
    spriteName: 'Voidmancer- Wizard',
    rarity: 'Rare',
    badge: 'Wizard',
    price: {
      token: '100 MGG',
      fiat: '1000',
    },
  },
  {
    name: 'Voidmancer',
    spriteName: 'Voidmancer- Wizard',
    rarity: 'Rare',
    badge: 'Wizard',
    price: {
      token: '100 MGG',
      fiat: '1000',
    },
  },
  {
    name: 'Voidmancer',
    spriteName: 'Voidmancer- Wizard',
    rarity: 'Rare',
    badge: 'Wizard',
    price: {
      token: '100 MGG',
      fiat: '1000',
    },
  },
]

export default function Featured() {
  return (
    <Container>
      <Board>
        <TextWrapper>
          <H1 fsize="1.5em">LOREM IPSUM</H1>
        </TextWrapper>
        <Cards items={placeholder} />
      </Board>
    </Container>
  )
}

const Container = styled.div`
  ${sectionProp}
  background-color: transparent;
  display: flex;
  align-items: center;
  position: relative;
  min-height: inherit;
`

const Board = styled.div`
  flex: 1;
  background: linear-gradient(0deg, rgba(41, 30, 92, 1) 0%, rgba(210, 136, 244, 1) 0%, rgba(9, 9, 121, 1) 100%);
  padding: 25px;
  margin: 25px;
  display: flex;
  flex-direction: column;
  width: 250px;
  & > * {
    flex: 1;
  }
`
