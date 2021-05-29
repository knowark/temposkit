import 'components/button'
import 'components/card'
import 'components/icon'
import 'components/spinner'
import temposProductImage from 'common/assets/product_placeholder_2.svg'
import { Component } from 'base/component'
import { ShowInformer } from './informers/show.informer'

const tag = 'tempos-show'
export class TemposShowComponent extends Component {
  init(context = {}) {
    this.binding = 'tempos-show-listen'
    this.global = context.global || window
    this.showInformer = context.showInformer || new ShowInformer(context)

    const urlParams = new URLSearchParams(this.global.location.search)
    this.tenant = this.tenant || urlParams.get('tenant') || 'demo'
    this.limit = this.limit || urlParams.get('limit') || 12
    this.offset = this.offset || urlParams.get('offset') || 0

    this.products = []
    return super.init(context)
  }

  reflectedProperties() {
    return ['tenant', 'limit', 'offset']
  }

  render() {
    if (this.products.length) {
      this.content = /* html */ `
      <div class="${tag}__search"></div>
      <div class="${tag}__content" data-content>
        ${this.products.map(this.renderProduct).join('')}
      </div>
      `
    } else {
      this.content = /* html */ `
      <ark-spinner></ark-spinner>
      `
    }
    return super.render()
  }

  renderProduct(product) {
    const [firstImage] = product.images
    const coverImage = (firstImage && firstImage.url) || temposProductImage
    return /* html */ `
    <ark-card background="primary" round="md"
      title="${product.name}" subtitle="Descripción...">
      <img class="tempos-show__product-picture" src="${coverImage}"
        alt="product picture" slot="media" width="100" height="200">
      <div class="tempos-show__product-id">${product.id}</div>
      <div class="tempos-show__product-price">\$ ${product.price}</div>
      <ark-button background="success" color="dark" slot="actions"
        tempos-show-listen on-click="onProductAddClick" fab
        data-product-id="${product.id}">
        <ark-icon type="mat" name="add_shopping_cart" slot="icon"></ark-icon>
      </ark-button>
    </ark-card>
    `
  }

  async load() {
    const tenant = this.tenant
    const input = {
      limit: parseInt(this.limit), offset: parseInt(this.offset) }

    this.products = await this.showInformer.showProducts(tenant, input)

    this.render()

    return super.load()
  }

  onProductAddClick(event) {
    event.stopPropagation()
    const addButton = event.target.closest('ark-button')
    const product = this.products.find(
      (item) => item.id == addButton.dataset.productId
    )
    this.emit('product-selected', product)
  }
}

const styles = /* css */ `
.tempos-show__content {
  display: grid;
  padding: 2rem;
  align-items: center;
  grid-gap: 1.5rem;
  grid-template-columns: repeat(
  auto-fit, minmax(min(100%, 200px), 1fr));
}
.tempos-show__product-picture {
  min-width:100%;
  background: white;
  padding: 1rem;
}
.tempos-show__product-price {
  font-size: 1.2rem;
  font-weight: 700;
  color: white;
}
.ark-card{
  box-shadow: -1px 1px 10px 2px rgba(56,43,255,0.42);
}
.ark-card__header,
.ark-card__actions,
.ark-card__body{
  padding: 0.5rem 1.2rem;
} 
`

Component.define(tag, TemposShowComponent, styles)
