import '@fontsource/playfair-display';
import '@fontsource/lato';
import '@fontsource/akshar';
import '@fontsource/lobster';

const themeOptions = {
  palette: {
    type: 'bright',
    primary: {
      main: '#0E0F15',
      background: {
        default: 'black',
      },
    },
    secondary: {
      main: '#fff',
      text: '#fff',
    },
  },

  typography: {
    fontFamily: 'akshar',
    h1: {
      fontFamily: 'Playfair Display, serif',
    },
    h2: {
      fontFamily: 'Playfair Display, serif',
    },
    h3: {
      fontFamily: 'Playfair Display, serif',
    },
    h6: {
      color: '#CFB53B',
      fontFamily: 'lobster',
    },
  },
};

export {themeOptions};
