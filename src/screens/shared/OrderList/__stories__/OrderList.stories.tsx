import { Meta, StoryFn } from '@storybook/react';
import { subDays } from 'date-fns';
import { OrderStatus } from 'api/types';
import { OrderCardSummary } from 'ref-data/orders';
import { withRouter } from 'utils/storybook/decorators';
import { OrderList } from '../OrderList';

export default {
  title: 'screens/Orderbook/OrderList',
  component: OrderList,
  decorators: [withRouter()],
} as Meta<typeof OrderList>;

const Template: StoryFn<typeof OrderList> = (args) => <OrderList {...args} />;
const mockOrders: OrderCardSummary[] = [
  {
    orderId: 'order_1',
    customerName: 'DHL Supply Chain',
    status: 'OVERDUE' as OrderStatus,
    deliveryDate: new Date(),
    amount: '1040',
    sortIndex: 0,
  },
  {
    orderId: 'order_11',
    customerName: 'Dachser SE',
    status: 'IN_COLLECTION' as OrderStatus,
    deliveryDate: new Date(),
    amount: '1040',
    sortIndex: 0,
  },
  {
    orderId: 'order_111',
    customerName: 'Dachser SE',
    status: 'WRITEOFF' as OrderStatus,
    deliveryDate: new Date(),
    amount: '1040',
    sortIndex: 0,
  },
  {
    orderId: 'order_2',
    customerName: 'Dachser SE',
    status: 'CREATED' as OrderStatus,
    deliveryDate: new Date(),
    amount: '0',
    sortIndex: 0,
  },
  {
    orderId: 'order_22',
    customerName: 'DHL Supply Chain',
    status: 'DELIVERED' as OrderStatus,
    deliveryDate: subDays(new Date(), 36),
    amount: '1040',
    sortIndex: 0,
  },
  {
    orderId: 'order_3',
    customerName: 'DHL Supply Chain',
    status: 'WAITING_FOR_PAYMENT' as OrderStatus,
    deliveryDate: new Date(),
    amount: '1040',
    sortIndex: 0,
  },
  {
    orderId: 'order_4',
    customerName: 'DHL Supply Chain',
    status: 'PAID' as OrderStatus,
    deliveryDate: new Date(),
    amount: '1040',
    sortIndex: 0,
  },
  {
    orderId: 'order_5',
    customerName: 'DHL Supply Chain',
    status: 'DELIVERED' as OrderStatus,
    deliveryDate: new Date(),
    amount: '1040',
    sortIndex: 0,
  },
  {
    orderId: 'order_6',
    customerName: 'DHL Supply Chain',
    status: 'DELIVERED' as OrderStatus,
    amount: '1040.3',
    sortIndex: 2,
  },
  {
    orderId: 'order_7',
    customerName: 'DHL Supply Chain',
    status: 'DELIVERED' as OrderStatus,
    deliveryDate: new Date(),
    amount: '1233.55',
    sortIndex: 2,
  },
  {
    orderId: 'order_8',
    customerName: 'DB Schenker',
    status: 'DELIVERED' as OrderStatus,
    deliveryDate: new Date(),
    amount: '1040',
    sortIndex: 3,
  },
  {
    orderId: 'order_9',
    customerName: 'DB Schenker',
    status: 'DELIVERED' as OrderStatus,
    deliveryDate: new Date(),
    amount: '1040',
    sortIndex: 4,
  },
  {
    orderId: 'order_12',
    customerName: 'DB Schenkerer',
    status: 'DELIVERED' as OrderStatus,
    deliveryDate: new Date(),
    amount: '1233.55',
    sortIndex: 4,
  },
];
export const Default = Template.bind({});
Default.args = {
  orders: mockOrders,
};
