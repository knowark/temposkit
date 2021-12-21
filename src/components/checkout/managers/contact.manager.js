import { ApiClient, config } from 'common'

export class ContactManager {
  constructor(context = {}) {
    this.client = context.client || new ApiClient({ url: config.apiUrl })
    this.ensureQuery = `
    mutation EnsureContact($input: EnsureContactInput!) {
      ensureContact(input: $input) {
        contact {
          id
          email
          firstName
          firstSurname
        }
      }
    }`
  }

  async ensureContact(input) {
    return await this.client.fetch(this.ensureQuery, {input})
  }
}
