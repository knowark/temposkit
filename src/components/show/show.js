import 'components/button'
import 'components/card'
import 'components/icon'
import 'components/spinner'
import { Component } from 'base/component'
import { ApiClient, config } from 'common'

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
      `
    }
    return super.render()
  }

  renderProduct (product) {
    return `
    <ark-card title="${product.name}" subtitle="Descripción...">
      <img class="tempos-show__product-picture" src="${product.picture}"
        alt="Product picture" slot="media">
      <div class="tempos-show__product-id">${product.id}</div>
      <div class="tempos-show__product-price">\$ ${product.price}</div>
      <ark-button background="success" color="dark" fab slot="actions">
        <ark-icon type="mat" name="add_shopping_cart" slot="icon"></ark-icon>
      </ark-button>
    </ark-card>
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

const styles = `
.tempos-show__content {
  display: grid;
  padding: 0.5rem;
  align-items: center;
  grid-gap: 1rem;
  grid-template-columns: repeat(
  auto-fit, minmax(min(100%, 200px), 1fr));
}
.tempos-show__product-picture {
  padding: 1rem;
}
.tempos-show__product-price {
  color: var(--danger);
}
`

Component.define(tag, TemposShowComponent, styles)
