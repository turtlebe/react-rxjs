import { memo, ReactNode } from 'react';
import { BackButton } from 'components/Button';
import { Page } from 'components/Page';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';

const phrases = (t: TranslateFn) => ({ backLabel: t('Back') });

export interface WorkflowPageProps {
  children?: ReactNode;
  onBack?: () => void;
  onClose: () => void;
}

export const WorkflowPage = memo((props: WorkflowPageProps) => {
  const { children, onBack, onClose } = props;
  const translations = useTranslatedText(phrases);

  return (
    <Page
      header={onBack ? <BackButton label={translations.backLabel} onClick={onBack} /> : undefined}
      onClose={onClose}
    >
      {children}
    </Page>
  );
});
