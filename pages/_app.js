import '../styles/globals.css'
import { EthersProvider } from '../context/ethersProviderContext'

function MyApp({ Component, pageProps }) {
  return (
    <EthersProvider>
      <Component {...pageProps} />
  </EthersProvider>
  )
}

export default MyApp
