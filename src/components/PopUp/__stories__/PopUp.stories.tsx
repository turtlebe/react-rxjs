import { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { css, Theme } from '@emotion/react';
import { Button } from 'components/Button';
import { Typography } from 'components/Typography';
import { PopUp } from '../PopUp';

export default {
  title: 'components/PopUp',
  component: PopUp,
} as Meta<typeof PopUp>;

const buttonGroupStyle = (theme: Theme) =>
  css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: `${theme.spacing(1.25)}, 0`,
    gap: theme.spacing(2.5),
  });

const Template: StoryFn<typeof PopUp> = (args) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Show Modal</Button>
      <PopUp {...args} open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export const VerificationModal = Template.bind({});
VerificationModal.args = {
  title: 'Proceed to verification',
  body: (
    <Typography>
      To use truckOS pay, please complete an initial verification - you will only have to do this
      once
    </Typography>
  ),
  footer: (
    <div css={buttonGroupStyle}>
      <Button color="tertiary" fullWidth={false}>
        Cancel
      </Button>
      <Button fullWidth={false}>Proceed</Button>
    </div>
  ),
};

export const DeleteModal = Template.bind({});
DeleteModal.args = {
  title: 'Delete request',
  body: (
    <Typography>
      Are you sure you want to delete the request? All entered information will be lost.
    </Typography>
  ),
  footer: (
    <div css={buttonGroupStyle}>
      <Button color="secondary" fullWidth={false}>
        Cancel
      </Button>
      <Button fullWidth={false}>Delete</Button>
    </div>
  ),
};

export const NextModal = Template.bind({});
NextModal.args = {
  title: "What's next?",
  body: (
    <Typography>
      Please make sure to send your invoice containing the assignment note to your customer via
      e-mail
    </Typography>
  ),
  footer: (
    <div css={buttonGroupStyle}>
      <Button>Got it</Button>
    </div>
  ),
};

export const NextModalWithDescription = Template.bind({});
NextModalWithDescription.args = {
  title: "What's next?",
  body: (
    <>
      <Typography>
        Our partner Walbing will send an email to your debtor with you in cc to inform them to pay
        to your virtual IBAN
      </Typography>
      <Typography>You don’t have to do anything!</Typography>
    </>
  ),
  footer: (
    <div css={buttonGroupStyle}>
      <Button>Got it</Button>
    </div>
  ),
};

export const ContactModal = Template.bind({});
ContactModal.args = {
  title: 'We are here for you!',
  titleSize: 'h3',
  body: 'You have a question, a problem, a suggestion or anything else? Call us or write us an email:',
  footer: (
    <>
      <Typography css={(theme) => ({ color: theme.palette.primary.main })}>
        support@truck-os.de
      </Typography>
      <Typography css={(theme) => ({ color: theme.palette.primary.main })}>
        +49-89-2000-29910
      </Typography>
    </>
  ),
};
