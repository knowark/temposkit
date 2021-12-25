import { ApiClient, config } from 'common'

export class DeliveryManager {
  constructor(context = {}) {
    this.client = context.client || new ApiClient({ url: config.apiUrl })
    this.addressesQuery = `
    mutation ensureAddress($input: EnsureAddressInput!) {
      ensureAddress(input: $input) {
        address {
          id
          country
          city
          address
          contactId
        }
      }
    }`
  }

  async ensureAddress(input) {
    return await this.client.fetch(this.addressesQuery, {input})
  }
}
