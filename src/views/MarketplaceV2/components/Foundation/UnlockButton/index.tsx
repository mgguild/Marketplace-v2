import React from 'react'
import { Button, useWalletModal } from '@metagg/mgg-uikit'
import styled from 'styled-components'
import useAuth from 'hooks/useAuth'
import useMarketplaceV2 from 'hooks/useMarketplaceV2'
import { useTranslation } from 'contexts/Localization'
import { COLORS } from 'views/MarketplaceV2/styles/constants'

const UnlockButton = (props) => {
  const { customTitle } = props
  const { t } = useTranslation()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout)
  const { controllers } = useMarketplaceV2()
  const { modal } = controllers

  const handleClick = () => {
    modal.handleClose('auth')
    onPresentConnectModal()
  }

  return (
    <StyledConnect onClick={handleClick} {...props} fullWidth>
      {!customTitle ? 'Connect Wallet' : customTitle}
    </StyledConnect>
  )
}

export default UnlockButton

const StyledConnect = styled(Button)`
  background-color: ${COLORS.MAIN};
  border: 1px solid ${({ theme }) => theme.colors.text};
`
