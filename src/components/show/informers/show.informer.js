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


  async showProducts({tenant, filter, subdomain}) {
    const input = {
      tenant: tenant,
      filter: filter,
      subdomain: subdomain
    }
    const data = await this.client.fetch(this.showQuery, {input})
    return data.showProducts && data.showProducts.products || []
  }
}
