const main = document.querySelector('main')
main.innerHTML = `

<template id="product-template">
  <div>
    <h1>Product</h1>
    <span>\${product.name}</span>
  </div>
</template>

<h1 style="color: red;">¡Mi Super Tienda En Línea!</h1>

<tempos-show template="#product-template"></tempos-show>

`
