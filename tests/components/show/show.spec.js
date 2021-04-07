import 'src/components/show'


describe('Show', () => {
  let container = null
  let component = null

  beforeEach(() => {
    container = document.createElement('div')
    document.body.append(container)
    container.innerHTML = '<tempos-show></tempos-show>'
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
})
