import { Anchor, Header, Menu, Paragraph } from 'grommet';
import React from 'react';

type AppHeaderProps = {
  onLogout: () => void;
};

const AppHeader: React.FC<AppHeaderProps> = ({ onLogout }: AppHeaderProps) => {
  return (
    <Header
      background="light-3"
      justify="between"
      pad={{ left: 'medium', right: 'small', vertical: 'small' }}
    >
      <Paragraph margin="xsmall" size="small">
        <Anchor
          label="Luma"
          href="/"
          size="large"
          style={{
            textDecoration: 'none',
            fontWeight: 'bold',
          }}
        />{' '}
        __ Discover Releases
      </Paragraph>
      <Menu
        aira-label="Menu"
        items={[
          {
            label: 'Logout',
            onClick: () => {
              onLogout();
            },
          },
        ]}
      />
    </Header>
  );
};
export default AppHeader;
