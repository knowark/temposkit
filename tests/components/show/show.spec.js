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

  it('has a search bar', () => {
    const search = component.select('.tempos-show__search')

    expect(search).toBeTruthy()
  })

  it('renders products after being fetched', async () => {
    const products = [
      { id: '001', name: 'Orange Juice' },
      { id: '002', name: 'Chocolate Cake' },
      { id: '003', name: 'Special Brownie' }
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
    query ShowProducts($tenant: String = "demo", $input: FilterInput) {              
      showProducts(tenant: $tenant, filter: $input) {                       
        products {                                       
          id                                             
          name                                           
        }                                                
      }                                                  
    }`.replace(/\s/g, ''))
    expect(expectedVariables).toEqual({ limit: 12 })
  })
})
