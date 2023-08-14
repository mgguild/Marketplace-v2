import React from 'react'
import styled from 'styled-components'
import { Button, useModal } from '@metagg/mgg-uikit'
import useMarketplaceV2 from 'hooks/useMarketplaceV2'
import { FONTSTYLE } from 'views/MarketplaceV2/styles/constants'
import useTheme from 'hooks/useTheme'
import useFirebaseAuth from 'hooks/useFirebaseAuth'
import { H3, TextWrapper } from '../Text'
import Iconloader from '../Iconloader'
import Authentication from '../Authentication'



const Container = styled.div`
  border: 1px solid red;
  display: flex;
  justify-content: center;
  color: white;
`

export default function Login() {
  const { controllers } = useMarketplaceV2()
  const { theme } = useTheme()
  const { modal } = controllers;

  return (
    <>
      <ConnectApp onClick={modal.handleOpen} variant='text' className="icon-button">
        <TextWrapper>
          <H3>
            <Iconloader {...iconSettings.signIn} /> &nbsp; Sign In
          </H3>
        </TextWrapper>
      </ConnectApp>
      <Authentication />
    </>
  )
}

const iconSettings = {
  signIn: {
    type: 'fi',
    name: 'LogIn',
  },
}

const ConnectApp = styled(Button)`
  color: ${({ theme }) => theme.colors.MGG_accent2};
  border-radius: 10px;
  padding: 5px;
  font-family: ${FONTSTYLE.font2};
  font-weight: 300;
  height: 20px;
`
