
import './App.css'


import Home from './components/Home'
import { DataProvider } from './components/context/DataProvider'

function App() {

  return (
    <>
      <DataProvider >
        <Home />
      </DataProvider>
    </>
  )
}

export default App
