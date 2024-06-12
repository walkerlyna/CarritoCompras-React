import { Header } from "./components/Header"
import { Guitar } from "./components/Guitar"
import { useState } from "react"
import { db } from "./data/guitars.js"

function App() {
  const [data, setData] = useState(db)
  const [cart, setCart] = useState([])


  // Agregar items al carrito
  const addCart = (item) => {
    setCart(prevCart => {
      const itemExists = prevCart.some(guitar => guitar.id === item.id)
      if (itemExists) {
        return prevCart.map(guitar => guitar.id === item.id ? { ...guitar, cantidad: guitar.cantidad + 1 } : guitar)
      } else {
        return [...prevCart, {...item, cantidad: 1}]
      }
    })
  }

  // Eliminar items del carrito
  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
  }

  // Agregar cantidad a cada item del carrito
  const moreGuitar = (id) => {
    setCart(prevCart =>
      prevCart.map(guitar =>
        guitar.id === id ? { ...guitar, cantidad: guitar.cantidad + 1 } : guitar
      )
    );
  }

  // Disminuir cantidad a cada item del carrito
  const lessGuitar = (id) => {
    setCart(prevCart =>
      prevCart
        .map(guitar =>
          guitar.id === id && guitar.cantidad > 1
            ? { ...guitar, cantidad: guitar.cantidad - 1 }
            : guitar
        )
    );
  }

  console.log(cart)

  return (
    <>
      <Header
        cart={cart}
        setCart={setCart}
        removeFromCart={removeFromCart}
        moreGuitar={moreGuitar}
        lessGuitar={lessGuitar}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar
              key={guitar.id}
              guitar={guitar}
              addCart={addCart}
            />
          ))}
        </div>
      </main>


      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      </footer>
    </>
  )
}

export default App
