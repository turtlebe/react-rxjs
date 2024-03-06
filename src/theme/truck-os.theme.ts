import type {} from '@mui/x-date-pickers/themeAugmentation';
import { createTheme } from '@mui/material';
import colors from './colors';
import ProximaNovaThinTtf from './fonts/ProximaNovaT-Thin.ttf';
import ProximaNovaThinWoff from './fonts/ProximaNovaT-Thin.woff';
import ProximaNovaThinWoff2 from './fonts/ProximaNova-100-Thin.woff2';
import ProximaNovaLightTtf from './fonts/ProximaNova-Light.ttf';
import ProximaNovaLightWoff from './fonts/ProximaNova-Light.woff';
import ProximaNovaLightWoff2 from './fonts/ProximaNova-300-Light.woff2';
import ProximaNovaRegularTtf from './fonts/ProximaNova-Regular.ttf';
import ProximaNovaRegularWoff from './fonts/ProximaNova-Regular.woff';
import ProximaNovaRegularWoff2 from './fonts/ProximaNova-400-Regular.woff2';
import ProximaNovaSemiBoldTtf from './fonts/ProximaNova-Semibold.ttf';
import ProximaNovaSemiBoldWoff from './fonts/ProximaNova-Semibold.woff';
import ProximaNovaSemiBoldWoff2 from './fonts/ProximaNova-600-SemiBold.woff2';
import ProximaNovaBoldTtf from './fonts/ProximaNova-Bold.ttf';
import ProximaNovaBoldWoff from './fonts/ProximaNova-Bold.woff';
import ProximaNovaBoldWoff2 from './fonts/ProximaNova-700-Bold.woff2';
import ProximaNovaExtraBoldTtf from './fonts/ProximaNova-Extrabld.ttf';
import ProximaNovaExtraBoldWoff from './fonts/ProximaNova-Extrabld.woff';
import ProximaNovaExtraBoldWoff2 from './fonts/ProximaNova-800-ExtraBold.woff2';
import ProximaNovaBlackTtf from './fonts/ProximaNova-Black.ttf';
import ProximaNovaBlackWoff from './fonts/ProximaNova-Black.woff';
import ProximaNovaBlackWoff2 from './fonts/ProximaNova-900-Black.woff2';

declare module '@mui/material/styles' {
  interface PaletteColor {
    faded?: string;
  }
  interface SimplePaletteColorOptions {
    faded?: string;
  }
  interface TypeBackground {
    side?: string;
  }
}

export const truckOsTheme = createTheme({
  palette: {
    primary: {
      main: colors.Forest,
      light: colors.ForestLight,
      contrastText: colors.Snow,
      faded: colors.ForestFaded,
    },
    secondary: {
      main: colors.RavenDark,
      light: colors.RavenLight,
      dark: colors.Raven,
      contrastText: colors.Snow,
    },
    background: {
      default: colors.Snow,
      paper: colors.Dust,
      side: colors.Cloud,
    },
    text: {
      primary: colors.RavenDark,
      disabled: colors.RavenLight,
      secondary: colors.Raven,
    },
    error: {
      main: colors.Rose,
      faded: colors.RoseFaded,
    },
    success: {
      main: colors.Forest,
      contrastText: colors.Snow,
      light: colors.Mint,
    },
    divider: colors.RavenLight,
  },
  typography: {
    fontFamily: 'ProximaNova, Arial',
    h1: {
      fontSize: 40,
      lineHeight: 1.3, // 52
      fontWeight: 600,
    },
    h2: {
      fontSize: 24,
      lineHeight: 1.25, // 30
      fontWeight: 600,
    },
    h3: {
      fontSize: 20,
      lineHeight: 1.25, // 25
      fontWeight: 600,
    },
    h4: {
      fontSize: 16,
      lineHeight: 1.25, // 20
      fontWeight: 600,
    },
    h5: {
      fontSize: 14,
      lineHeight: 1.28, // 18
      fontWeight: 600,
      textTransform: 'none',
    },
    h6: {
      fontSize: 10,
      lineHeight: 1.3, // 13
      fontWeight: 600,
    },
    body1: {
      fontSize: 16,
      lineHeight: 1.25, // 20
      fontWeight: 400,
    },
    body2: {
      fontSize: 14,
      lineHeight: 1.28, // 18
      fontWeight: 400,
    },
    subtitle1: {
      fontSize: 12,
      lineHeight: 1.5, // 18
      fontWeight: 400,
      textTransform: 'none',
    },
    caption: {
      fontSize: 10,
      lineHeight: 1.3, // 13
      fontWeight: 400,
    },
    button: {
      fontSize: 18,
      lineHeight: 1.25, // 20
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 10,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 480,
      md: 900,
      lg: 1024,
      xl: 1440,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        body {
          height: 100vh;
        }

        div#root {
          height: 100%;
          padding: 20px;
        }

        @font-face {
          font-family: 'ProximaNova';
          font-style: normal;
          font-display: swap;
          font-weight: 100;
          src: local('ProximaNova'), 
               local('ProximaNova-Thin'), 
               url(${ProximaNovaThinWoff2}) format('woff2'),
               url(${ProximaNovaThinWoff}) format('woff'),
               url(${ProximaNovaThinTtf}) format('truetype');
        }
        @font-face {
          font-family: 'ProximaNova';
          font-style: normal;
          font-display: swap;
          font-weight: 300;
          src: local('ProximaNova'), 
               local('ProximaNova-Light'), 
               url(${ProximaNovaLightWoff2}) format('woff2'),
               url(${ProximaNovaLightWoff}) format('woff'),
               url(${ProximaNovaLightTtf}) format('truetype');
        }
        @font-face {
          font-family: 'ProximaNova';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('ProximaNova'), 
               local('ProximaNova-Regular'), 
               url(${ProximaNovaRegularWoff2}) format('woff2'),
               url(${ProximaNovaRegularWoff}) format('woff'),
               url(${ProximaNovaRegularTtf}) format('truetype');
        }
        @font-face {
          font-family: 'ProximaNova';
          font-style: normal;
          font-display: swap;
          font-weight: 600;
          src: local('ProximaNova'), 
               local('ProximaNova-SemiBold'), 
               url(${ProximaNovaSemiBoldWoff2}) format('woff2'),
               url(${ProximaNovaSemiBoldWoff}) format('woff'),
               url(${ProximaNovaSemiBoldTtf}) format('truetype');
        }
        @font-face {
          font-family: 'ProximaNova';
          font-style: normal;
          font-display: swap;
          font-weight: 700;
          src: local('ProximaNova'), 
               local('ProximaNova-Bold'), 
               url(${ProximaNovaBoldWoff2}) format('woff2'),
               url(${ProximaNovaBoldWoff}) format('woff'),
               url(${ProximaNovaBoldTtf}) format('truetype');
        }
        @font-face {
          font-family: 'ProximaNova';
          font-style: normal;
          font-display: swap;
          font-weight: 800;
          src: local('ProximaNova'), 
               local('ProximaNova-ExtraBold'), 
               url(${ProximaNovaExtraBoldWoff2}) format('woff2'),
               url(${ProximaNovaExtraBoldWoff}) format('woff'),
               url(${ProximaNovaExtraBoldTtf}) format('truetype');
        }
        @font-face {
          font-family: 'ProximaNova';
          font-style: normal;
          font-display: swap;
          font-weight: 900;
          src: local('ProximaNova'), 
               local('ProximaNova-Black'), 
               url(${ProximaNovaBlackWoff2}) format('woff2'),
               url(${ProximaNovaBlackWoff}) format('woff'),
               url(${ProximaNovaBlackTtf}) format('truetype');
        }

        .MuiFormControl-root .MuiFormHelperText-root {
          margin-bottom: 2px;
          margin-top: 2px;
        }
      `,
    },
    MuiButton: {
      defaultProps: {
        size: 'small',
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '50px',
          boxShadow: 'none',
        },
      },
    },
    MuiButtonGroup: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiCheckbox: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiFab: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiFormControl: {
      defaultProps: {
        margin: 'dense',
        size: 'small',
      },
    },
    MuiFormHelperText: {
      defaultProps: {
        margin: 'dense',
      },
    },
    MuiIconButton: {
      defaultProps: {
        size: 'small',
      },
      styleOverrides: {
        root: {
          '&.MuiIconButton-sizeSmall': {
            fontSize: 14,
          },
          '&.MuiIconButton-sizeMedium': {
            fontSize: 18,
          },
          '&.MuiIconButton-sizeLarge': {
            fontSize: 24,
          },
        },
      },
    },
    MuiInputBase: {
      defaultProps: {
        margin: 'dense',
      },
    },
    MuiInputLabel: {
      defaultProps: {
        margin: 'dense',
      },
    },
    MuiModal: {
      styleOverrides: {
        root: {
          '&.MuiModal-root': {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          },
        },
      },
    },
    MuiRadio: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiSwitch: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiTextField: {
      defaultProps: {
        margin: 'dense',
        size: 'small',
      },
      styleOverrides: {
        root: ({ ownerState }) => ({
          '& .MuiInputBase-root': {
            ...(ownerState.disabled && {
              backgroundColor: colors.Cloud,
            }),
          },
        }),
      },
    },
  },
});
