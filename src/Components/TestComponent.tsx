
import { useSyncExternalStore } from "react"
import { ContactsService } from "@astrouxds/mock-data"

export const contactsService = new ContactsService({
  initial: 14,
  interval: 20,
  limit: 36,
})
const {subscribe, getContacts } = contactsService

const useStore = () => { 
  const state = useSyncExternalStore(subscribe, getContacts)


  return state
}




const TestComponent = () => {
  const contacts = useStore()
  console.log(contacts)
  return (
    <div>TEST COMPONENT</div>
  )
}

export default TestComponent