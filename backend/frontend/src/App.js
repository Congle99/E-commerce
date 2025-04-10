import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Shop from './pages/Shop'
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='Home.jsx' element={<Home />}/>
          <Route path='Shop.jsx' element={<Shop />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
