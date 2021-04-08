import { Component } from 'base/component'
import { ApiClient, config } from 'common'
import 'components/spinner'

const tag = 'tempos-show'
export class TemposShowComponent extends Component {
  init (context = {}) {
    const url = config.apiUrl 
    this.binding = 'tempos-show-listen'
    this.client = new ApiClient({ url })
    this.data = {}
    return super.init(context)
  }

  render () {
    if (this.data.showProducts) {
      const products = this.data.showProducts.products
      this.content = /* html */ `
      <div class="${tag}__search"></div>
      <div class="${tag}__content">
        ${products.map(this.renderProduct).join('')}
      </div>
      `
    } else {
      this.content = /* html */ `
      <ark-spinner></ark-spinner>
      <div class="${tag}__search"></div>
      <div class="${tag}__content"></div>
      `
    }
    return super.render()
  }

  renderProduct (product) {
    return `
    <div class="tempos-show__product">
      <div class="tempos-show__product-name">${product.name}</div>
      <div class="tempos-show__product-id">${product.id}</div>
    </div>
    `
  }

  async load () {
    const variables = { limit: 12 }

    this.data = await this.client.fetch(query, variables)

    this.render()

    return super.load()
  }
}

const query = `                                        
query ShowProducts($tenant: String = "demo", $input: FilterInput) {              
  showProducts(tenant: $tenant, filter: $input) {                       
    products {                                       
      id                                             
      name                                           
    }                                                
  }                                                  
}                                                    
`                                                      

const styles = `
.tempos-show {
  --primary: blue;
}
`

Component.define(tag, TemposShowComponent, styles)
