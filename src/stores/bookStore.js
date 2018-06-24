import { observable, action, computed, runInAction } from 'mobx'
import service from '../services'

class BookStore {
  @observable list = []
  @observable cart = []

  constructor() {
    this.fetchBookList()
  }

  @computed
  get totalPrice() {
    return this.cart.reduce((prev, cur) => (prev += cur.price), 0)
  }

  @computed
  get isShopping() {
    return this.cart.length > 0
  }

  @action
  async fetchBookList() {
    const data = await service.getBooks()
    runInAction('changeList', () => (this.list = data))
  }

  @action.bound
  changePrice() {
    setInterval(
      action(() => {
        this.list[0].price += 1
      }),
      1000
    )
  }

  @action.bound
  addToCart(book) {
    let item = this.cart.find(item => item.name === book.name)
    if (item) {
      return item
    }

    item = book
    this.cart.push(item)
    return item
  }

  @action.bound
  removeFromCart(book) {
    this.cart.remove(book)
  }
}

export default new BookStore()
