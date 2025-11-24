import { Anchor, Header, Menu, Paragraph } from 'grommet';
import { Music, Power, Star, StarOutline } from 'grommet-icons';
import React from 'react';
import { useNavigate } from 'react-router';

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
  const navigate = useNavigate();

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
            onClick: () => {
              navigate('/', { replace: true });
            },
          },
          {
            label: 'Favourites',
            icon: <StarOutline size="20" />,
            gap: 'medium',
            onClick: () => {
              navigate('/favourites', { replace: true });
            },
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
