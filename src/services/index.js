class Service {
  getBooks() {
    return fetch('/hot.json').then(res => res.json())
  }
}

export default new Service()
