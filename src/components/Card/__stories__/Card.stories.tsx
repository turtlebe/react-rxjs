import { StoryFn, Meta } from '@storybook/react';
import { Typography } from 'components/Typography';
import { Card } from '../Card';

export default {
  title: 'components/Card',
  component: Card,
  args: {
    children: (
      <>
        <Typography gutterBottom variant="h1">
          h1. Heading
        </Typography>
        <Typography gutterBottom variant="h2">
          h2. Heading
        </Typography>
        <Typography gutterBottom variant="h3">
          h3. Heading
        </Typography>
        <Typography gutterBottom variant="h4">
          h4. Heading
        </Typography>
        <Typography gutterBottom variant="h5">
          h5. Heading
        </Typography>
        <Typography gutterBottom variant="h6">
          h6. Heading
        </Typography>
        <Typography gutterBottom variant="subtitle1">
          subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis
          tenetur
        </Typography>
        <Typography gutterBottom variant="subtitle2">
          subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis
          tenetur
        </Typography>
        <Typography gutterBottom variant="body1">
          body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
          unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate
          numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
        </Typography>
        <Typography gutterBottom variant="body2">
          body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
          unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate
          numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
        </Typography>
        <Typography gutterBottom display="block" variant="button">
          button text
        </Typography>
        <Typography gutterBottom display="block" variant="caption">
          caption text
        </Typography>
        <Typography gutterBottom display="block" variant="overline">
          overline text
        </Typography>
      </>
    ),
  },
} as Meta<typeof Card>;

const Template: StoryFn<typeof Card> = (args) => <Card {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const Outlined = Template.bind({});
Outlined.args = {
  variant: 'outlined',
};

export const Elevation = Template.bind({});
Elevation.args = {
  variant: 'elevation',
};

export const WithTitle = Template.bind({});
WithTitle.args = {
  title: 'This is a title',
};

export const WithSubtitle = Template.bind({});
WithSubtitle.args = {
  title: 'This is a title',
  subtitle:
    'subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur',
};

export const PrimaryColor = Template.bind({});
PrimaryColor.args = {
  color: 'primary',
};
