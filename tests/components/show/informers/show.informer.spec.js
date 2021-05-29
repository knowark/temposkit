import {
  ShowInformer
} from 'src/components/show/informers/show.informer'

describe('ShowInformer', () => {
  let informer = null

  beforeEach(() => {
    class MockClient {
      async fetch(query, variables) {
        this.query = query
        this.variables = variables
        return {
          showProducts: {
            products: [
              {id: '001', name: 'Ball'},
              {id: '002', name: 'Car'},
            ]
          } 
        } 
      }
    }

    informer = new ShowInformer({ client: new MockClient() })
  })

  afterEach(() => {
    informer = null
  })

  it('can be instantiated', () => {
    expect(informer).toBeTruthy()
  })

  it('can be instantiated without arguments', () => {
    const informer = new ShowInformer()
    expect(informer).toBeTruthy()
  })


  it("shows the tenant's products", async () => {
    const client = informer.client

    const tenant = 'demo'
    const filterInput = { limit: 6, offset: 0}
    const products = await informer.showProducts(tenant, filterInput)

    expect(products).toEqual([
      {id: '001', name: 'Ball'},  {id: '002', name: 'Car'}])
    expect(client.query.replace(/\s/g, '')).toEqual(`
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
    }`.replace(/\s/g, ''))
    expect(client.variables).toEqual({
      tenant: 'demo',
      input: { limit: 6, offset: 0 }
    })
  })

})

