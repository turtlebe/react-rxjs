import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { css, Theme } from '@emotion/react';
import { startOfDay } from 'date-fns';
import { Button } from 'components/Button';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { DateTimeFormField } from 'screens/shared/FormFields/DateTimeFormField';

export interface LoadTimeWindowProps {
  endTimeFieldName: string;
  endTimeLabel: string;
  isTimeWindow: boolean;
  setIsTimeWindow: (isTimeWindow: boolean) => void;
  startTimeFieldName: string;
  startTimeLabel: string;
  timeLabel: string;
}

const phrases = (t: TranslateFn) => ({
  timeWindow: t('Time window instead of exact time?'),
  exactTime: t('Exact time instead of time window?'),
});

const wrapperStyle = (theme: Theme) =>
  css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: theme.spacing(1),
  });

const fieldWrapperStyle = () =>
  css({
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  });

export const LoadTimeWindow = memo((props: LoadTimeWindowProps) => {
  const {
    endTimeFieldName,
    endTimeLabel,
    isTimeWindow,
    setIsTimeWindow,
    startTimeFieldName,
    startTimeLabel,
    timeLabel,
  } = props;
  const translations = useTranslatedText(phrases);
  const [showEndTimeField, setShowEndTimeField] = useState<boolean>(isTimeWindow);
  const today = useMemo(() => startOfDay(new Date()), []);

  const handleClickShowEndTime = useCallback(() => {
    setIsTimeWindow(!showEndTimeField);
    setShowEndTimeField(!showEndTimeField);
  }, [showEndTimeField, setIsTimeWindow]);

  useEffect(() => {
    setShowEndTimeField(isTimeWindow);
  }, [isTimeWindow]);

  return (
    <div css={wrapperStyle}>
      <div css={fieldWrapperStyle}>
        <DateTimeFormField
          defaultCalendarMonth={today}
          label={showEndTimeField ? startTimeLabel : timeLabel}
          name={startTimeFieldName}
        />
        {showEndTimeField && (
          <DateTimeFormField
            defaultCalendarMonth={today}
            label={endTimeLabel}
            name={endTimeFieldName}
          />
        )}
      </div>
      <Button
        color="tertiary"
        css={(theme) => ({
          width: '115px',
          height: '40px',
          fontSize: theme.spacing(1.25),
          padding: theme.spacing(0.5),
          marginTop: theme.spacing(1),
        })}
        onClick={handleClickShowEndTime}
      >
        {showEndTimeField ? translations.exactTime : translations.timeWindow}
      </Button>
    </div>
  );
});
