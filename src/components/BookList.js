import React from 'react'
import { trace } from 'mobx'
import { observer, inject } from 'mobx-react'
import BookItem from './BookItem'

const BookList = ({ bookStore }) => {
  const {
    list,
    cart,
    totalPrice,
    addToCart,
    removeFromCart,
    isShopping,
  } = bookStore
  trace()
  return (
    <div>
      <div className="book-list">
        <h3>书店</h3>
        <ul>
          {list.map((item, idx) => (
            <BookItem type="shop" method={addToCart} item={item} key={idx} />
          ))}
        </ul>
      </div>
      {isShopping ? (
        <div className="book-list">
          <h3>购物车</h3>
          <ul>
            {cart.map((item, idx) => (
              <BookItem
                type="cart"
                method={removeFromCart}
                item={item}
                key={idx}
              />
            ))}
          </ul>
          <p>总计：{totalPrice}</p>
        </div>
      ) : null}
    </div>
  )
}

export default inject('bookStore')(observer(BookList))
