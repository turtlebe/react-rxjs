import { CustomerCompanyContact, Order } from '../../api/types';
import { anyChildExistsOrUndefined } from '../../utils/api';

export interface OrderCustomerContactFormValues {
  bookKeepingContactId?: string;
  bookKeepingContactName?: string;
  bookKeepingEmail?: string;
  bookKeepingPhoneNumber?: string;
  dispositionContactId?: string;
  dispositionContactName?: string;
  dispositionEmail?: string;
  dispositionPhoneNumber?: string;
  // CTFU - Holding the order here for the case of update.
  originalOrder?: Order;
}

const addUseForIfDefined = (
  baseContact: CustomerCompanyContact | undefined,
  useFor: ('bookkeeping' | 'disposition')[]
): CustomerCompanyContact | undefined => {
  const resultContact = baseContact;
  if (resultContact) {
    resultContact.useFor = useFor;
    return resultContact;
  }
  return undefined;
};

export const mapCustomerContactsFromFormValues = (
  data: OrderCustomerContactFormValues
):
  | {
      bookkeepingContact: CustomerCompanyContact | undefined;
      dispositionContact: CustomerCompanyContact | undefined;
    }
  | undefined =>
  anyChildExistsOrUndefined({
    dispositionContact: addUseForIfDefined(
      anyChildExistsOrUndefined({
        contactId: data.dispositionContactId,
        contactName: data.dispositionContactName,
        contactDetails: anyChildExistsOrUndefined({
          email: data.dispositionEmail,
          phoneNumber: data.dispositionPhoneNumber,
        }),
      }),
      ['disposition']
    ),
    bookkeepingContact: addUseForIfDefined(
      anyChildExistsOrUndefined({
        contactId: data.bookKeepingContactId,
        contactName: data.bookKeepingContactName,
        contactDetails: anyChildExistsOrUndefined({
          email: data.bookKeepingEmail,
          phoneNumber: data.bookKeepingPhoneNumber,
        }),
      }),
      ['bookkeeping']
    ),
  });
