import styles from "./App.module.css"
import Alert from "./Components/Alert/Alert"
import Form from "./Components/Form/Form"
import Spinner from "./Components/Spinner/Spinner"
import WeatherDetail from "./Components/WeatherDetail/WeatherDetail"

import useWeather from "./hooks/useWeather"

function App() {

  const {fetchWeather, loading, weather, hasWeatherData, noEncontrado} = useWeather()

  return (
    <>
      <h1 className={styles.title}>Buscador de Clima</h1>

      <div className={styles.container}>
        <Form fetchWeather={fetchWeather} />
        
        {loading && <Spinner/>}
        {noEncontrado && <Alert>Ciudad No Encontrada</Alert>}
        {hasWeatherData && <WeatherDetail weather= {weather} /> }
          
  
      </div>
    </>
  )
}

export default App
