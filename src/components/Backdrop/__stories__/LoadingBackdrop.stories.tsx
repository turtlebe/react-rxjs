import { useEffect, useRef, useState } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { Button } from 'components/Button';
import { LoadingBackdrop } from '../LoadingBackdrop';

export default {
  title: 'components/LoadingBackdrop',
  component: LoadingBackdrop,
} as Meta<typeof LoadingBackdrop>;

const Template: StoryFn<typeof LoadingBackdrop> = () => {
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef<number>();

  useEffect(() => {
    if (loading) {
      timeoutRef.current = window.setTimeout(() => setLoading(false), 3000);
    }

    return () => {
      window.clearTimeout(timeoutRef.current);
    };
  }, [loading]);

  return (
    <>
      <Button css={{ width: 200 }} onClick={() => setLoading(true)}>
        Start loading
      </Button>
      <LoadingBackdrop loading={loading} />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {};
