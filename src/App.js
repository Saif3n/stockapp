
import './App.css';
import StockSearch from './pages/StockSearch';
import OverlayProgress from './pages/OverlayProgress';
import Welcome from './pages/Welcome';






function App() {
  
  return (
    <div className="App">
      <OverlayProgress/> 
      <StockSearch/> 
      <Welcome/>
    </div>
  );
}

export default App;
