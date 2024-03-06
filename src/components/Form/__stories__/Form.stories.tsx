/* eslint-disable no-console */
import { StoryFn, Meta } from '@storybook/react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { TextInput } from 'components/TextInput';
import { Form } from '../Form';

export default {
  title: 'components/Form',
  component: Form,
} as Meta<typeof Form>;

const Template: StoryFn<typeof Form> = (args) => {
  const api = useForm();
  const { control, handleSubmit } = api;

  const onSubmit: SubmitHandler<any> = (data, event) => {
    console.log(data);
    event?.preventDefault();
  };

  return (
    <Form {...args} api={api} onSubmit={handleSubmit(onSubmit) as any}>
      <Controller
        control={control}
        name="companyName"
        render={({ field }) => <TextInput {...field} label="Company Name" />}
        rules={{ required: true }}
      />
      <Controller
        control={control}
        name="postcode"
        render={({ field }) => <TextInput {...field} label="Postcode" />}
        rules={{ required: true }}
      />
      <Controller
        control={control}
        name="street"
        render={({ field }) => <TextInput {...field} label="Street" />}
        rules={{ required: true }}
      />
    </Form>
  );
};

export const Default = Template.bind({});
Default.args = {};

export const Narrow = Template.bind({});
Narrow.parameters = {
  viewport: {
    defaultViewport: 'mobile1',
  },
};
