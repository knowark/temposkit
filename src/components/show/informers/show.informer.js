import { ApiClient, config } from 'common'

export class ShowInformer {
  constructor(context = {}) {
    this.client = context.client || new ApiClient({ url: config.apiUrl })
    this.showQuery = `
    query ShowProducts($tenant: String!, $input: FilterInput) {              
      showProducts(tenant: $tenant, input: $input) {                       
        products {                                       
          id                                             
          name                                           
          price
          images {
            name
            url
            sequence
          }
        }                                                
      }                                                  
    }
    `
  }

  async showProducts(tenant, filterInput) {
    const variables = {
      tenant: tenant,
      input: filterInput
    }
    const data = await this.client.fetch(this.showQuery, variables)
    return data.showProducts.products
  }
}
