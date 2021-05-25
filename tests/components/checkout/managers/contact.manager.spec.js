import {
  ContactManager
} from 'src/components/checkout/managers/contact.manager'

describe('ContactManager', () => {
  let manager = null

  beforeEach(() => {
    class MockClient {
      async fetch(query, variables) {
        this.query = query
        this.variables = variables
        return Object.assign({id: '007'}, variables)
      }
    }
    manager = new ContactManager({ client: new MockClient() })
  })

  afterEach(() => {
    manager = null
  })

  it('can be instantiated', () => {
    expect(manager).toBeTruthy()
  })

  it('ensures a contact record given its details', async () => {
    const client = manager.client
    const contactInput = {email: 'jdoe@example.com'}

    const contact = await manager.ensureContact(contactInput)

    expect(contact).toEqual({ id: '007', email: 'jdoe@example.com' })
    expect(client.variables).toEqual({ email: 'jdoe@example.com' })
    expect(client.query.replace(/\s/g, '')).toEqual(`
    mutation EnsureContact($tenant: String!, $input: ContactInput) {              
      ensureContact(tenant: $tenant, input: $input) {                       
        id
        email
        name
        surname
      }                                                  
    }`.replace(/\s/g, ''))
  })

})

