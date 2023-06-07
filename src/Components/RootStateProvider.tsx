import {
  useEffect,
  useState,
  useCallback,
  createContext,
  useContext,
} from "react";
import {
  Alert,
  Contact,
  ContactsService,
  Mnemonic,
  ModifyContactParams,
} from "@astrouxds/mock-data";

import type { Children } from "../Types";

export const contactsService = new ContactsService({
  initial: 14,
  // interval: 20,
  limit: 36,
  alertsPercentage: 25,
});

export const useActions = () => {
  const addContact = useCallback(() => {
    return contactsService.addContact();
  }, []);

  const deleteContact = useCallback((id: string) => {
    return contactsService.deleteContact(id);
  }, []);

  const modifyContact = useCallback((params: ModifyContactParams) => {
    return contactsService.modifyContact(params);
  }, []);

  return {
    addContact,
    deleteContact,
    modifyContact,
  };
};

type RootState = {
  contacts: Contact[];
  alerts: Alert[];
  mnemonics: Mnemonic[];
};

const initialState = {
  alerts: [],
  contacts: [],
  mnemonics: [],
};

const RootStateContext = createContext<RootState>(initialState);

export const useRootState = () => useContext(RootStateContext);

const RootStateProvider = ({ children }: Children) => {
  const [state, setState] = useState<RootState>(initialState);

  useEffect(() => {
    const unsubscribe = contactsService.subscribe((contactsMap) => {
      const contacts = Array.from(contactsMap.values());
      const alerts = contacts.flatMap((contact) => contact.alerts);
      const mnemonics = contacts.flatMap((contact) => contact.mnemonics);

      setState({ alerts, contacts, mnemonics });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <RootStateContext.Provider value={state}>
      {children}
    </RootStateContext.Provider>
  );
};

export default RootStateProvider;
