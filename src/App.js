import './Styles/Styles.scss';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useContext } from 'react';
import { DarkModeContext } from './Context/DarkModeContext';

import Login from './Components/Login';

function App() {
    const {darkMode} = useContext(DarkModeContext)
  return (
      <div className={darkMode ? `body dark` : `body light`}>
            <Login/>        
      </div>
    );
}   

export default App;
