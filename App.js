import logo from './logo.svg';
import './App.css';
import AppContainer from './container/App';
import AppRoutes from './Route/route'
import { CustomTheme, ThemeProvider } from './contexts/ThemeContext'


function App() {
  const theme = CustomTheme();
  return (
    <div data-theme={theme} className="App">
      <AppContainer />
    </div>
  );
}

export default App;
