import {
  ShowInformer
} from 'src/components/show/informers/show.informer'

describe('ShowInformer', () => {
  let informer = null

  beforeEach(() => {
    class MockClient {
      constructor() {
        this.result = {
          showProducts: {
            products: [
              {id: '001', name: 'Ball'},
              {id: '002', name: 'Car'},
            ]
          } 
        } 
      }

      async fetch(query, variables) {
        this.query = query
        this.variables = variables
        return this.result
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
    const filter= { limit: 6, offset: 0}
    const subdomain = 'demo-12252qwe'
    const products = await informer.showProducts({tenant, filter, subdomain})

    expect(products).toEqual([
      {id: '001', name: 'Ball'},
      {id: '002', name: 'Car'}
    ])
    expect(client.query.replace(/\s/g, '')).toEqual(`
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
    }`.replace(/\s/g, ''))
    expect(client.variables).toEqual({
      input:{
        tenant: 'demo',
        subdomain: 'demo-12252qwe',
        filter: { limit: 6, offset: 0 }
      }
    })
  })

  it("returns an empty list when no products are fetched", async () => {
    const client = informer.client

    const tenant = 'demo'
    const subdomain = 'demo-12252qwe'
    const filter= { limit: 6, offset: 0}

    informer.client.result = {
      showProducts: {
        products: null
      }
    }

    const products = await informer.showProducts({tenant, filter, subdomain})

    expect(products).toEqual([])
    expect(client.variables).toEqual({
      input:{
        tenant: 'demo',
        subdomain: 'demo-12252qwe',
        filter: { limit: 6, offset: 0 }
      }
    })
  })

})

