import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  createContext,
  useContext,
} from "react";
import { generateContact } from "../data/generators/contacts/generate-contact";
import { generateContacts } from "../data/generators/contacts/generate-contacts";
import type {
  Contact,
  ModifyContactParams,
  ContactOptions,
  GenerateOptions,
  Children,
} from "../Types";

const defaultOptions = {
  initial: 14,
  interval: 20,
  limit: 36,
};

type PropTypes = {
  contactIds: string[];
  contacts: { [key: string]: Contact };
  addContact: () => void;
  editContact: (params: ModifyContactParams) => void;
  deleteContact: (id: string) => void;
  clearContacts: () => void;
  generate: (newGenerateOptions?: GenerateOptions) => void;
  stopGenerating: () => void;
  initialize: () => void;
};

const ContactsContext = createContext<PropTypes>({
  contactIds: [],
  contacts: {},
  addContact: () => null,
  editContact: () => null,
  deleteContact: () => null,
  clearContacts: () => null,
  generate: () => null,
  stopGenerating: () => null,
  initialize: () => null,
});

export default function useContacts() {
  return useContext(ContactsContext);
}

export const ContactsContextProvider = ({ children }: Children) => {
  const [contactIds, setContactIds] = useState<string[]>([]);
  const [contacts, setContacts] = useState<{ [key: string]: Contact }>({});
  const [generating, setGenerating] = useState(false);
  const [generateOptions, setGenerateOptions] =
    useState<GenerateOptions>(defaultOptions);

  const addContact = useCallback(
    (options?: ContactOptions) => {
      const newContact = generateContact(contactIds.length, options);
      if (contactIds.length < generateOptions.limit) {
        setContactIds((prevState) => [...prevState, newContact.id]);
        setContacts((prevState) => ({
          ...prevState,
          [newContact.id]: newContact,
        }));
      }
    },
    [contactIds.length, generateOptions.limit]
  );

  const editContact = useCallback((params: ModifyContactParams) => {
    setContacts((prevState) => {
      const contact = prevState[params.id];
      Object.entries(params).forEach(([key, value]) => {
        // @ts-expect-error key will be an alert property
        alert[key] = value;
      });
      return { ...prevState, [contact.id]: contact };
    });
  }, []);

  const deleteContact = useCallback(
    (id: string) => {
      if (id in contacts) {
        const alertIdIndex = contactIds.findIndex(
          (contactId) => contactId === id
        );
        const { [id]: value, ...newAlerts } = contacts;
        const newAlertIds = [...contactIds];
        newAlertIds.splice(alertIdIndex, 1);
        setContactIds(newAlertIds);
        setContacts(newAlerts);
      }
    },
    [contacts, contactIds]
  );

  const clearContacts = () => {
    setContactIds([]);
    setContacts({});
  };

  const initialize = useCallback(() => {
    const generatedContacts = generateContacts(14);
    const newContacts: { [key: string]: Contact } = {};
    const newContactIds: string[] = [];
    generatedContacts.forEach((contact) => {
      newContactIds.push(contact.id);
      newContacts[contact.id] = contact;
    });
    setContactIds(newContactIds);
    setContacts(newContacts);
  }, []);

  const generate = useCallback(
    (newGenerateOptions?: Partial<GenerateOptions>) => {
      if (newGenerateOptions && Object.keys(newGenerateOptions).length) {
        const newOptions = { ...generateOptions, newGenerateOptions };
        setGenerateOptions(newOptions);
      }
      setGenerating(true);
    },
    [generateOptions]
  );

  const stopGenerating = () => {
    setGenerating(false);
  };

  useEffect(() => {
    if (generating) {
      const generateData = setInterval(() => {
        addContact();
      }, generateOptions.interval * 1000);
      return () => {
        clearInterval(generateData);
      };
    }
  }, [generating, generateOptions.interval, addContact]);

  const value = useMemo(
    () => ({
      contactIds,
      contacts,
      addContact,
      editContact,
      deleteContact,
      clearContacts,
      generate,
      stopGenerating,
      initialize,
    }),
    [
      contactIds,
      contacts,
      addContact,
      editContact,
      deleteContact,
      generate,
      initialize,
    ]
  );

  return (
    <ContactsContext.Provider value={value}>
      {children}
    </ContactsContext.Provider>
  );
};
