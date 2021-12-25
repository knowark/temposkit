import { ContactManager } from "src/components/checkout/managers/contact.manager"

describe("ContactManager", () => {
  let manager = null

  beforeEach(() => {
    class MockClient {
      async fetch(query, variables) {
        this.query = query
        this.variables = variables
        return {}
      }
    }
    manager = new ContactManager({ client: new MockClient() })
  })

  afterEach(() => {
    manager = null
  })

  it("can be instantiated", () => {
    expect(manager).toBeTruthy()
  })

  it("can be instantiated without arguments", () => {
    const manager = new ContactManager()
    expect(manager).toBeTruthy()
  })

  it("ensures a contact record given its details", async () => {
    const client = manager.client
    const input = { tenant: "knowark", email: "jdoe@example.com" }

    const contact = await manager.ensureContact(input)

    expect(client.variables).toEqual({
      input: { tenant: "knowark", email: "jdoe@example.com" },
    })
    expect(client.query.replace(/\s/g, "")).toEqual(
      `
    mutation EnsureContact($input: EnsureContactInput!) {              
      ensureContact(input: $input) {                       
        contact {
          id
          email
          firstName
          firstSurname
        }
      }                                                  
    }`.replace(/\s/g, "")
    )
  })
})
