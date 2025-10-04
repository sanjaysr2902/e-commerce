import React from 'react'
import Footer from '../component/Footer'
import Navbar from '../component/Navbar'
import Banner from '../component/Banner'
import ProductsPage from '../component/Products'
import Cart from './cart'
import Whishlist from './Wishlist'

export default function Home() {
  return (
<div>
<Navbar/>
<Banner/>
{/* <ProductsPage/>
<Cart/>
<Whishlist/> */}
<Footer/>

</div>


  )
}
