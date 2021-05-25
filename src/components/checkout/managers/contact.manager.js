export class ContactManager {
  constructor(context) {
    this.client = context.client
    this.ensureQuery = `
    mutation EnsureContact($tenant: String!, $input: ContactInput) {
      ensureContact(tenant: $tenant, input: $input) {
        id
        email
        name
        surname
      }
    }`
  }

  async ensureContact(contactInput) {
    return await this.client.fetch(this.ensureQuery, contactInput)
  }
}
