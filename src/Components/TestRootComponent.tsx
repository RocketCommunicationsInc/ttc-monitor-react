import { useEffect } from "react";
import { useActions, useRootState } from "./RootStateProvider";

const TestRootComponent = () => {
  const { addContact, deleteContact, modifyContact } = useActions();
  const state = useRootState();

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <div>
      Contacts Total: {state.contacts.length}
      <button onClick={addContact}>Add Contact</button>
      <button
        onClick={() => {
          deleteContact(state.contacts[state.contacts.length - 1].id);
        }}
      >
        Delete Contact
      </button>
    </div>
  );
};

export default TestRootComponent;
