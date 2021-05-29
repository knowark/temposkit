import '../components'

async function main() {
  const client = {
    fetch: async (query, variable) => {
      return {
        showProducts: {
          products: [
            { id: '001', name: 'Ball', price: 20, images: [] },
            { id: '002', name: 'Car', price: 50, images: [] },
            { id: '003', name: 'Sword', price: 30, images: [] },
            { id: '004', name: 'Computer', price: 2000, images: [] },
            { id: '005', name: 'Phone', price: 300, images: [] },
            { id: '006', name: 'Monitor', price: 500, images: [] },
          ],
        },
      }
    },
  }

  const temposShow = document.querySelector('tempos-show')
  //await temposShow.update({ client })
}

setTimeout(main, 1000)
