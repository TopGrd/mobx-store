import { observable, action, computed, runInAction, flow, spy } from 'mobx'
import service from '../services'

class BookStore {
  @observable list = []
  @observable cart = []

  constructor() {
    this.fetchBookList()
    spy(event => {
      if (event.type === 'action') {
        console.log(`${event.name} with args: ${JSON.stringify(event.arguments)}`)
      }
    })
  }

  @computed
  get totalPrice() {
    return this.cart.reduce((prev, cur) => (prev += cur.price), 0)
  }

  @computed
  get isShopping() {
    return this.cart.length > 0
  }

  /* @action
  async fetchBookList() {
    try {
      const data = await service.getBooks()
      runInAction('changeList', () => (this.list = data))
    } catch (err) {
      console.log(err)
    }
  }
 */
  fetchBookList = flow(function*() {
    try {
      const data = yield service.getBooks()
      // 异步代码块会被自动包装成动作并修改状态
      this.list = data
    } catch (err) {
      console.log(err)
    }
  })

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
