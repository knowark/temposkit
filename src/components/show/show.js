import { Component } from 'base/component'
import { ApiClient, config } from 'common'
import 'components/spinner'

const tag = 'tempos-show'
export class TemposShowComponent extends Component {
  init (context = {}) {
    this.url = config.apiUrl 
    this.binding = 'tempos-show-listen'
    this.global = context.global || window 
    this.client = new ApiClient()
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
    const variables = { limit: 20 }

    this.data = this.client.fetch(query, variables)

    this.render()

    return super.load()
  }
}

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

const styles = `
.tempos-show {
  --primary: blue;
}
`

Component.define(tag, TemposShowComponent, styles)
