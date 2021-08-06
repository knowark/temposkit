import { ApiClient, config } from 'common'

export class ShowInformer {
  constructor(context = {}) {
    this.client = context.client || new ApiClient({ url: config.apiUrl })
    this.showQuery = `
    query ShowProducts($input: ShowProductsInput) {              
      showProducts(input: $input) {                       
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

  async showProducts({tenant, filter}) {
    const variables = {
      tenant: tenant,
      filter: filter
    }
    const data = await this.client.fetch(this.showQuery, variables)
    return data.showProducts && data.showProducts.products || []
  }
}
