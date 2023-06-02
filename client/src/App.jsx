import { useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { themeSettings } from './theme';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import HistoryPage from './pages/HistoryPage';
import Navbar from './components/Navbar';

function App() {
  const mode = useSelector((state) => {
    return state.mode;
  });

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/history' element={<HistoryPage />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
    </>
  );
}

export default App;
