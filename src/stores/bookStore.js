import { observable, action } from 'mobx'
import service from '../services'

class BookStore {
  @observable bookList = []

  constructor() {
    this.fetchBookList()
  }

  @action
  async fetchBookList() {
    const data = await service.getBooks()
    console.log(data);
  }
}

export default new BookStore()
