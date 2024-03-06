import { memo } from 'react';
import { CardLineItem, CardSection } from 'components/Card';
import { Typography } from 'components/Typography';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { OrderLoadDetails } from 'api/types';
import { EditButton } from '../../PaymentsFinalConfirmation/EditButton';

const phrases = (t: TranslateFn) => ({
  title: t('Load'),
});

export interface LoadSectionProps extends Pick<OrderLoadDetails, 'loadDescription'> {
  className?: string;
  editPath: string;
  hideEdit?: boolean;
}

export const LoadSection = memo((props: LoadSectionProps) => {
  const { className, editPath, hideEdit, loadDescription } = props;
  const translations = useTranslatedText(phrases);

  return (
    <CardSection
      className={className}
      rightHeaderElement={!hideEdit && <EditButton to={editPath} />}
      title={translations.title}
    >
      <CardLineItem
        label={
          <Typography variant="body2">
            {loadDescription}
            <br />
          </Typography>
        }
      />
    </CardSection>
  );
});
