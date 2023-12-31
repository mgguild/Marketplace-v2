import React, { lazy } from 'react'
import { useWeb3React } from '@web3-react/core'
import NetworkRoute from 'components/NetworkRoute'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'
import { ResetCSS } from '@metagg/mgg-uikit'
import BigNumber from 'bignumber.js'
import { PlayFab } from 'playfab-sdk'
import useEagerConnect from 'hooks/useEagerConnect'
import { useFetchProfile, usePollBlockNumber, usePollCoreFarmData, useInitializePlayfab } from 'state/hooks'
import { RedirectToFarms } from 'views/Farms/Redirects'
import Footer from 'components/Footer'
import GlobalStyle from './style/Global'
import Menu from './components/Menu'
import SuspenseWithChunkError from './components/SuspenseWithChunkError'
import ToastListener from './components/ToastListener'
import PageLoader from './components/PageLoader'
import EasterEgg from './components/EasterEgg'
import NotSupported from './views/ComingSoon/notSupported'
import { getSupportedChain, isChainSupported } from './utils/settings'

// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page
const Farms = lazy(() => import('./views/Farms'))
const Pools = lazy(() => import('./views/Pools'))
const Gamefi = lazy(() => import('./views/Gamefi'))
const ComingSoon = lazy(() => import('./views/ComingSoon'))
const Marketplace = lazy(() => import('./views/Marketplace'))
const NftMarket = lazy(() => import('./views/Marketplace/Market'))
const HistoryMarketplace = lazy(() => import('./views/Marketplace/History'))
const UserProfile = lazy(() => import('./views/Marketplace/User'))
const NftPage = lazy(() => import('./views/Marketplace/components/NFT'))
const Guildpad = lazy(() => import('./views/GuildPad'))
const NotFound = lazy(() => import('./views/NotFound'))
const Pad = lazy(() => import('./views/GuildPad/Pad'))
const GamefiPage = lazy(() => import('./views/Gamefi/NewUI/StakingPage'))

// Marketplace pages import
const MarketplaceV2 = lazy(() => import('./views/MarketplaceV2'))
const NFTMarket = lazy(() => import('./views/MarketplaceV2/Views/Market/Market'))
const NFTPage = lazy(() => import('./views/MarketplaceV2/Views/NFTPage'))
const UserPage = lazy(() => import('./views/MarketplaceV2/Views/User'))
// This config is required for number formatting
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const ExternalRedirect = ({ to, ...routeProps }) => {
  return <Redirect to={to} />
}

const App: React.FC = () => {
  // Initialize playfab sdk settings
  PlayFab.settings.titleId = process.env.REACT_APP_PLAYFAB_TITLE_ID ?? ''
  PlayFab.settings.developerSecretKey = process.env.REACT_APP_PLAYFAB_DEV_KEY ?? ''

  const { chainId } = useWeb3React()

  usePollBlockNumber()
  useEagerConnect()
  useFetchProfile()
  usePollCoreFarmData()
  useInitializePlayfab()

  return (
    <HashRouter>
      <ResetCSS />
      <GlobalStyle />
      <SuspenseWithChunkError fallback={<PageLoader />}>
        <Switch>
          <Route path="/marketplace" exact component={MarketplaceV2} />
          <Route path="/marketplace/nft" exact component={NFTMarket} />
          <Route path="/marketplace/:type/:nftID" exact component={NFTPage} />
          <Route path="/marketplace/my-page" exact component={UserPage} />
          <Menu>
            <NetworkRoute
              path="/farms"
              Component={Farms}
              chainSupportConfig={{ title: 'LP_STAKING', id: chainId }}
              pageTitle="Farms"
            />
            <NetworkRoute
              path="/pools"
              Component={Pools}
              chainSupportConfig={{ title: 'POOL_STAKING', id: chainId }}
              pageTitle="Pools"
              exact
            />
            {/* <NetworkRoute
              path="/marketplace/nft-market"
              Component={NftMarket}
              chainSupportConfig={{ title: 'MARKETPLACE', id: chainId }}
              pageTitle="NFT Market"
              exact
            /> */}
            <Route
              exact
              path="/marketplace/nft-market/:nftID"
              component={(props) => {
                return isChainSupported('MARKETPLACE', chainId) ? (
                  <NftPage {...props} />
                ) : (
                  <NotSupported title="Marketplace" supportedChainId={getSupportedChain('MARKETPLACE')} />
                )
              }}
            />
            <NetworkRoute
              path="/marketplace/history"
              Component={HistoryMarketplace}
              chainSupportConfig={{ title: 'MARKETPLACE', id: chainId }}
              pageTitle="Marketplace History"
              exact
            />
            <NetworkRoute
              path="/marketplace/user-profile"
              Component={UserProfile}
              chainSupportConfig={{ title: 'MARKETPLACE', id: chainId }}
              pageTitle="Marketplace User Profile"
              exact
            />
            <NetworkRoute
              path="/gamefi"
              Component={Gamefi}
              chainSupportConfig={{ title: 'GAMEFI', id: chainId }}
              pageTitle="Gamefi Vaults"
              exact
            />
            <Route
              path="/gamefi/:type/:farmID"
              component={isChainSupported('GAMEFI', chainId) ? GamefiPage : NotSupported}
            />
            <NetworkRoute
              path="/launchpad"
              Component={Guildpad}
              chainSupportConfig={{ title: 'LAUNCHPAD', id: chainId }}
              pageTitle="Guildpad"
              exact
            />
            <NetworkRoute
              path="/"
              Component={Guildpad}
              chainSupportConfig={{ title: 'LAUNCHPAD', id: chainId }}
              pageTitle="Guildpad"
              exact
            />
            <Route
              path="/launchpad/:guildpadTitle"
              component={(props) => {
                const { guildpadTitle } = props.match.params
                return isChainSupported('LAUNCHPAD', chainId) ? (
                  <Pad guildpadTitle={guildpadTitle} />
                ) : (
                  <NotSupported title="Guildpad" supportedChainId={getSupportedChain('LAUNCHPAD')} />
                )
              }}
            />
            <Route path="/staking">
              <Redirect to="/farms" />
            </Route>
            <Route path="/" component={RedirectToFarms} />
            {/* 404 */}
            <Route component={NotFound} />
            {/* External link for redirect */}
            <ExternalRedirect exact path="/apply" to="https://www.google.com" />
          </Menu>
          <Footer />
        </Switch>
      </SuspenseWithChunkError>
      <ToastListener />
    </HashRouter>
  )
}

export default React.memo(App)
