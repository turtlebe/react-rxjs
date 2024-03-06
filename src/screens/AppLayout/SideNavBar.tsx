import { ChangeEvent, useCallback } from 'react';
import { css, Theme } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'components/Card';
import { Logo } from 'components/Logo';
import { NavMenu } from 'components/NavMenu';
import { Select } from 'components/Select';
import { CompanyAvatar } from 'components/CompanyAvatar';
import { Typography } from 'components/Typography';
import { User } from 'api/types';
import { setSelectedCompanyId, useSelectedCompany, useUserCompanyOptions } from 'state/user';
import { fromRoot, paths } from 'paths';

const DEFAULT_AVATAR = '/files/logo.png';

export interface SideNavBarProps {
  className?: string;
  user: User;
}

const style = (theme: Theme) =>
  css({
    background: theme.palette.background.side,
    maxWidth: 300,
    overflow: 'hidden',
    padding: theme.spacing(3, 2.5),
    display: 'grid',
    gridTemplateColumns: '1fr',
    rowGap: theme.spacing(3.75),
    gridAutoRows: 'min-content',
    position: 'relative',
  });

const CompaniesDropdown = () => {
  const companyOptions = useUserCompanyOptions();
  const selectedCompany = useSelectedCompany();
  const navigate = useNavigate();

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setSelectedCompanyId(value);
      navigate(fromRoot(paths.root.orders.path));
    },
    [navigate]
  );

  return (
    <Select
      css={() => ({ textAlign: 'center' })}
      options={companyOptions}
      value={selectedCompany?.companyId}
      onChange={handleChange}
    />
  );
};

export const SideNavBar = (props: SideNavBarProps) => {
  const { className, user } = props;
  const accountCompany = useSelectedCompany();

  return (
    <Card className={className} css={style}>
      <Logo css={(theme) => ({ padding: theme.spacing(0, 5.5, 0, 5.5) })} />
      <div css={{ display: 'flex', alignItems: 'center', flexFlow: 'column' }}>
        <CompanyAvatar
          avatarUrl={accountCompany?.accountCompanyLogo?.logoUrl || DEFAULT_AVATAR}
          name={`${user.firstName} ${user.lastName}`}
        />
        {user.companies.length === 1 && (
          <Typography variant="body2">{user.companies[0].companyName}</Typography>
        )}
        {user.companies.length > 1 && <CompaniesDropdown />}
      </div>
      <NavMenu />
    </Card>
  );
};
