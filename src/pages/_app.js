import Tina from '../../.tina/components/TinaDynamicProvider.js'


const App = ({ Component, pageProps }) => {
  return (
    <Tina>
      <Component {...pageProps} />
    </Tina>
  )
}

export default App
