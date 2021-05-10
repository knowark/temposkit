import 'src/components/show'
import { mockFetch } from '../../__mocks__/fetchMock.js'


describe('Show', () => {
  let container = null
  let component = null

  global.fetch = jest.fn(mockFetch({data: {}}))

  beforeEach(() => {
    global.fetch.mockClear()
    container = document.createElement('div')
    document.body.append(container)
    container.innerHTML = `<tempos-show></tempos-show>`
    component = container.querySelector('tempos-show')
  })

  afterEach(() => {
    container.remove()
    container = null
    component = null
  })

  it('can be instantiated', () => {
    expect(component).toBeTruthy()
    expect(component).toBe(component.init())
  })

  it('can be instantiated', () => {
    expect(component).toBeTruthy()
    expect(component).toBe(component.init())
  })

  it('renders products after being fetched', async () => {
    const products = [
      { id: '001', name: 'Orange Juice', images: [] },
      { id: '002', name: 'Chocolate Cake', images: [] },
      { id: '003', name: 'Special Brownie', images: [
        {url: 'https://api.tempos.shop/rest/media/photo.jpg' }] }
    ] 

    let expectedQuery = null
    let expectedVariables = null
    const fetch = async (query, variables) => {
      expectedQuery = query
      expectedVariables = variables
      return { showProducts: {products} }
    }

    component.client.fetch = fetch

    await component.update()

    const content = component.select('.tempos-show__content')

    expect(content.children.length).toEqual(products.length)
    expect(expectedQuery.replace(/\s/g, '')).toEqual(`
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
    expect(expectedVariables).toEqual({
      tenant: 'demo',
      input:{ limit: 12, offset: 0 }
    })
  })
})
