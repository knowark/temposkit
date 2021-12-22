import { ApiClient, config } from 'common'

export class DeliveryManager {
  constructor(context = {}) {
    this.client = context.client || new ApiClient({ url: config.apiUrl })
    this.addressesQuery = `
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
    }`
  }

  async setAddresses(input) {
    return await this.client.fetch(this.addressesQuery, {input})
  }
}
