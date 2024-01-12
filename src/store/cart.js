export default {
  namespaced: true,
  state: {
    products: [],
  },
  getters: {
    products: (state) => state.products
  },
  mutations: {
    addProduct(state, value) {
      state.products.push(value)
    },
    deleteProducts(state) {
      state.products = []
    }
  },
  actions: {
    addProduct(context, value) {
      context.commit('addProduct', value)
    },
    deleteProducts(context) {
      context.commit('deleteProducts')
    }
  }
}
