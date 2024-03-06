import { memo, useMemo } from 'react';
import { CardLineItem, CardSection } from 'components/Card';
import { Typography } from 'components/Typography';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { useDateFormat } from 'hooks/useDateFormat';
import { OrderLoadTimeAndPlace } from 'api/types';
import { EditButton } from '../../PaymentsFinalConfirmation/EditButton';

const phrases = (t: TranslateFn) => ({
  title: t('Place of loading'),
  titleUnloading: t('Place of unloading'),
  to: t('to'),
});

export interface PlaceOfLoadingProps extends Pick<OrderLoadTimeAndPlace, 'timeWindow' | 'venue'> {
  className?: string;
  editPath: string;
  hideEdit?: boolean;
  unloading?: boolean;
}

const timeFormat: Intl.DateTimeFormatOptions = {
  hourCycle: 'h23',
  hour: '2-digit',
  minute: '2-digit',
};

export const PlaceOfLoadingSection = memo((props: PlaceOfLoadingProps) => {
  const { className, editPath, hideEdit, timeWindow, unloading, venue } = props;
  const translations = useTranslatedText(phrases);
  const startDate = useDateFormat(timeWindow?.start);
  const endDate = useDateFormat(timeWindow?.end);
  const startTime = useDateFormat(timeWindow?.start, timeFormat);
  const endTime = useDateFormat(timeWindow?.end, timeFormat);

  const formattedTime = useMemo(
    () =>
      timeWindow?.end ? (
        startDate === endDate ? (
          <>
            {startDate}
            <br />
            {startTime} - {endTime}
          </>
        ) : (
          <>
            {startDate} ({startTime})<br /> {translations.to} {endDate} ({endTime})
          </>
        )
      ) : (
        <>
          {startDate}
          <br />
          {startTime}
        </>
      ),
    [timeWindow?.end, startDate, endDate, startTime, endTime, translations.to]
  );

  return (
    <CardSection
      className={className}
      rightHeaderElement={!hideEdit && <EditButton to={editPath} />}
      title={unloading ? translations.titleUnloading : translations.title}
    >
      <CardLineItem
        value={<Typography variant="body2">{formattedTime}</Typography>}
        valueAlignment="right"
        label={
          <Typography variant="body2">
            {venue?.venueName}
            {venue?.venueName ? <br /> : ''}
            {venue?.address?.streetAndNumber}
            <br />
            {venue?.address?.postcode} {venue?.address?.city}
          </Typography>
        }
      />
    </CardSection>
  );
});
