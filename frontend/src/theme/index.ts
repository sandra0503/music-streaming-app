import { ThemeType } from 'grommet';

export const theme: ThemeType = {
  global: {
    colors: {
      'text-weak': {
        dark: '#CCCCCC',
        light: '#7c7b7bff',
      },
    },
    size: {
      controlsHeight: '90px',
    },
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px',
    },
  },
  anchor: {
    fontWeight: 400,
  },
  textInput: {
    extend: `
      font-weight: 500;
    `,
  },
  tab: {
    color: 'text-weak',
    active: {
      color: 'text',
    },
    hover: {
      color: 'text',
    },
    margin: {
      top: 'small',
      bottom: '30px',
    },
    border: {
      color: 'white',
      active: {
        color: 'brand',
      },
      hover: {
        color: 'brand',
      },
    },
  },
};
