import { memo } from 'react';
import { BalanceOverview } from 'components/BalanceOverview';
import { LoadingBackdrop } from 'components/Backdrop/LoadingBackdrop';
import { PENDING } from 'state';
import { useBalanceOverview } from 'state/payments';

export const BalanceOverviewSection = memo(() => {
  const balances = useBalanceOverview();
  const loading = balances === PENDING;

  return (
    <div css={(theme) => ({ position: 'relative', marginBottom: theme.spacing(2.75) })}>
      <BalanceOverview
        openAmount={loading || !balances ? 0 : balances.open}
        receivedAmount={loading || !balances ? 0 : balances.received}
      />
      <LoadingBackdrop loading={loading} />
    </div>
  );
});
