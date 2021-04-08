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

  xit('fetches tempos products from its api', async () => {
    const fetch = jest.fn(mockFetch({ data: {} }))
    component.init({global: { fetch }})

    const query = `
      query ShowProducts($input: ShowInput) {
        showProducts(input: $input) {
          products {
            id
            name
          }
        }
      }
    `

    const variables = { limit: 20 }

    await component.update()

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch.mock.calls[0][0]).toEqual(
      'https://api.tempos.shop/graphql') 
    expect(fetch.mock.calls[0][1].method).toEqual('POST') 
    expect(fetch.mock.calls[0][1].headers).toEqual({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }) 
    const body = JSON.parse(fetch.mock.calls[0][1].body)
    expect(body.query.replace(/\s/g, '')).toEqual(
      query.replace(/\s/g, '')) 
    expect(body.variables).toEqual(variables)
 })

  xit('renders products after being fetched', async () => {
    const products = [
      { id: '001', name: 'Orange Juice' },
      { id: '002', name: 'Chocolate Cake' },
      { id: '003', name: 'Special Brownie' }
    ] 

    const fetch = jest.fn(mockFetch({
      data: {
        showProducts: {products}
      }
    }))
    component.init({global: { fetch }})

    const variables = { limit: 20 }

    await component.update()

    const content = component.select('.tempos-show__content')

    expect(content.children.length).toEqual(products.length)

  })
})
