function getCartID(){
  const cartID = localStorage.getItem('cartID')
  if (cartID) return cartID
  else { 
    fetch('http://localhost:8080/api/carts', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    })
    .then(res => res.json())
    .then(data => {
      localStorage.setItem('cartID', data.cartId)
      return data.cartId
    })
  }
}

function addToCart(product, cartID, quantity=1){
  fetch(`http://localhost:8080/api/carts/${cartID}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ product:product, quantity:quantity })
  })
  .then(res => res.json())
  .then(data => {
    if (data.status == 'success') { alert('Producto agregado!') }
    else { alert('Error al agregar producto') }
  })
}

const cartID = getCartID()

const products = document.querySelectorAll('.product')
products.forEach( product => {
  const productID = product.getAttribute('id')
  product.querySelector("button").addEventListener('click', () => {
    addToCart(productID, cartID)
  })
})

const carritoLink = document.getElementById('carrito-link')
carritoLink.href = `/carts/${cartID}`

const logoutButton = document.getElementById('logout-button')
logoutButton.addEventListener('click', async () => {
  const { status } = await fetch('/api/sessions', {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  if (status === 200) {
    window.location.href = '/'
  }
})