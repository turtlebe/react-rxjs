import { ReactNode } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { BreadcrumbItems } from 'components/Breadcrumbs';
import { useWorkflow } from 'hooks/useWorkflow';
import { BankAccountEntry } from 'screens/BankAccountEntry/BankAccountEntry';
import { paths } from 'paths';
import { WorkflowLayout } from '../WorkflowLayout';

const breadcrumbs: BreadcrumbItems = [
  {
    label: 'Business data',
    path: paths.root.kyc.businessData.path,
  },
  {
    label: 'Bank account',
    path: paths.root.kyc.bankAccount.path,
  },
  {
    label: 'Legal rep.',
    path: paths.root.kyc.legalRepresentatives.path,
  },
  {
    label: 'Beneficial owners',
    path: paths.root.kyc.beneficialOwners.path,
  },
];

const MockWorkflow = (props: {
  breadcrumbs: BreadcrumbItems;
  children: ReactNode;
  progress?: number;
}) => {
  const { WorkflowProvider } = useWorkflow({
    initialProgress: props.progress,
    breadcrumbs: props.breadcrumbs,
  });

  return <WorkflowProvider>{props.children}</WorkflowProvider>;
};

const routes = [
  {
    path: '/workflow/*',
    element: (
      <MockWorkflow breadcrumbs={breadcrumbs} progress={2}>
        <WorkflowLayout onClose={() => {}}>
          <BankAccountEntry />
        </WorkflowLayout>
      </MockWorkflow>
    ),
  },
];

export default {
  title: 'screens/shared/WorkflowLayout',
  component: WorkflowLayout,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta<typeof WorkflowLayout>;

const Template: StoryFn<typeof WorkflowLayout> = () => {
  const router = createMemoryRouter(routes, {
    initialEntries: [`/workflow`],
  });
  return <RouterProvider router={router} />;
};

export const Default = Template.bind({});
Default.args = {};
