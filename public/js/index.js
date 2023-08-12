function addToCart(product, cartID, quantity=1){
  fetch(`http://localhost:8080/api/carts/${cartID}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify([{ product:product, quantity:quantity }])
  })
}

const products = document.querySelectorAll('.product')
products.forEach( product => {
  const productID = product.getAttribute('id')
  product.querySelector("button").addEventListener('click', () => {
    addToCart(productID, 'mycart')
  })
})

const carritoLink = document.getElementById('carrito-link')
carritoLink.href = `/carts/mycart`

const logoutButton = document.getElementById('logout-button')
logoutButton.addEventListener('click', async () => {
  const { status } = await fetch('/api/users/logout', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  if (status === 200) {
    window.location.href = '/'
  }
})