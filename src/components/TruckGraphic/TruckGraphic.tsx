import { memo } from 'react';
import { css, Theme } from '@emotion/react';
import TruckPersonImg from 'assets/truck_person_money.png';

export interface TruckGraphicProps {
  className?: string;
}

const truckImgStyle = (theme: Theme) =>
  css({
    height: theme.spacing(19.5),
    width: '100%',
    backgroundImage: `url(${TruckPersonImg})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
  });

export const TruckGraphic = memo((props: TruckGraphicProps) => {
  const { className } = props;

  return <div className={className} css={truckImgStyle} />;
});
