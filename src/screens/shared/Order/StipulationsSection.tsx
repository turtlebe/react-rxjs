import { memo } from 'react';
import { css, Theme } from '@emotion/react';
import { CardLineItem, CardSection } from 'components/Card';
import { Typography } from 'components/Typography';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { OrderDetails } from 'api/types';
import { EditButton } from '../../PaymentsFinalConfirmation/EditButton';

const phrases = (t: TranslateFn) => ({
  title: t('Other stipulations'),
});

export interface StipulationsSectionProps extends Pick<OrderDetails, 'stipulations'> {
  className?: string;
  editPath: string;
  hideEdit?: boolean;
}

const bulletsStyle = (theme: Theme) =>
  css({
    textAlign: 'left',
    paddingInlineStart: theme.spacing(2.5),
    minHeight: theme.spacing(2),
  });

export const StipulationsSection = memo((props: StipulationsSectionProps) => {
  const { className, editPath, hideEdit, stipulations } = props;
  const translations = useTranslatedText(phrases);

  return (
    <CardSection
      className={className}
      rightHeaderElement={!hideEdit && <EditButton to={editPath} />}
      title={translations.title}
    >
      <CardLineItem
        label={
          <Typography component="ul" css={bulletsStyle} variant="body1">
            {stipulations?.map((stipulation) => (
              <li key={stipulation}>{stipulation}</li>
            ))}
          </Typography>
        }
      />
    </CardSection>
  );
});
