import { CatalogPage } from './components/CatalogPage'
import { Footer } from './components/Footer'
import { GlobalModals } from './components/GlobalModals'
import { Navbar } from './components/Navbar'

function App() {

  return (
    <>
      <Navbar />
      <GlobalModals />
      <CatalogPage />
      <Footer />
    </>
  )
}

export default App