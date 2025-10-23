import { Anchor, Header, Menu, Paragraph } from 'grommet';
import { Music, Power, Star, StarOutline } from 'grommet-icons';
import React from 'react';

type AppHeaderProps = {
  onLogout: () => void;
};

const AppHeader: React.FC<
  AppHeaderProps &
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >
> = ({ onLogout, ...props }: AppHeaderProps) => {
  return (
    <Header
      background="light-3"
      justify="between"
      pad={{ left: 'medium', right: 'small', vertical: 'small' }}
      {...props}
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
        plain
        items={[
          {
            label: 'Discover',
            icon: <Music size="20" />,
            gap: 'medium',
          },
          {
            label: 'My selection',
            icon: <StarOutline size="20" />,
            gap: 'medium',
          },
          {
            label: 'Logout',
            icon: <Power size="20" />,
            gap: 'medium',
            onClick: () => {
              onLogout();
            },
          },
        ]}
        dropProps={{ align: { top: 'bottom', left: 'left' } }}
        aria-label="Actions"
      />
    </Header>
  );
};
export default AppHeader;
