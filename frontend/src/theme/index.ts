import { ThemeType } from 'grommet';
import { Menu } from 'grommet-icons';

export const theme: ThemeType = {
  global: {
    colors: {
      'text-weak': {
        dark: '#CCCCCC',
        light: '#7c7b7bff',
      },
    },
    font: {
      family: 'Roboto',
      size: '16px',
      height: '20px',
    },
    size: {
      headerHeight: '52px',
      footerHeight: '140px',
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
  checkBox: {
    size: '16px',
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
  menu: {
    background: 'brand',
    container: {
      pad: 'medium',
      gap: 'medium',
      width: '50vw',
      elevation: 'small',
    },
    icons: {
      down: Menu,
      up: Menu,
    },
    item: {
      color: 'white',
      style: { fontWeight: 'bold' },
    },
  },
};
