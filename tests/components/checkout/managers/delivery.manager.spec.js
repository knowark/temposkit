import { DeliveryManager } from "src/components/checkout/managers/delivery.manager"

describe("DeliveryManager", () => {
  let manager = null

  beforeEach(() => {
    class MockClient {
      async fetch(query, variables) {
        this.query = query
        this.variables = variables
        return {}
      }
    }
    manager = new DeliveryManager({ client: new MockClient() })
  })

  afterEach(() => {
    manager = null
  })

  it("can be instantiated", () => {
    expect(manager).toBeTruthy()
  })

  it("can be instantiated without arguments", () => {
    const manager = new DeliveryManager()
    expect(manager).toBeTruthy()
  })

  it("ensures a delivery record given its details", async () => {
    const client = manager.client
    const input = { country: "Japan", city: "Kioto" }

    const delivery = await manager.setAddresses(input)

    expect(client.variables).toEqual({
      input: { country: "Japan", city: "Kioto" },
    })

    expect(client.query.replace(/\s/g, "")).toEqual(
      `
    mutation setAddresses($input: SetAddressesInput!) {              
      setAdresses(input: $input) {                       
        addresses {
          id
          country
          city
          address
          contactid
        }
      }                                                  
    }`.replace(/\s/g, "")
    )
  })
})
