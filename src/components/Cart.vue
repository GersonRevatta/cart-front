<template>
  <div>
    <div v-if="this.products.length > 0" class="content-element">
      <div class="card">
        <DataView :value="products">
            <template #list="slotProps">
                <div class="grid grid-nogutter">
                    <div v-for="(item, index) in slotProps.items" :key="index" class="col-12">
                        <div class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4" :class="{ 'border-top-1 surface-border': index !== 0 }">
                            <img class="w-10 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" :src="`https://primefaces.org/cdn/primevue/images/product/gaming-set.jpg`" :alt="item.name" />
                            <div class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                                <div class="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                                  <span class="text-2xl font-semibold"> ${{ item.price }}</span>
                                  <br>
                                  <span class="text-2xl"> {{ item.name }} </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </DataView>
      </div>
      <div class="content-footer">
        <div class="card flex justify-content-center flex-wrap gap-3">
          <p>
            <b>Total:</b>  
             ${{ total }}
          </p>
        </div>
        <div class="card flex justify-content-center flex-wrap gap-3">
          <Button @click="save" label="Guardar" severity="success" outlined />
          <Button @click="clean" label="Limpiar" severity="danger" outlined />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Button from 'primevue/button';
import DataView from 'primevue/dataview';
import { mapGetters } from 'vuex';

export default {
  name: 'Cart',
  components: {
    DataView,
    Button
  },
  computed: {
    ...mapGetters({
      products: 'cart/products'
    }),
    total() {
      if (this.products.length == 0) return 0
      return this.products.map(element => element.price)
                          .reduce((total, price) => total + price, 0)
    }
  },
  data() {
    return {
    };
  },
  methods: {
    save() {
      if (this.products.length == 0) return 
      let params = {
        order_items_attributes: this.products,
        amountTotal: this.total
      }
      let self = this
      this.axios.post('orders', {order: params}).then((response) => {
        self.$store.dispatch('cart/deleteProducts');
        self.successMessage()
      })
      this.goTo('about')
    },
    successMessage() {
      this.$toast.add({
        severity: 'success', summary: 'Exito', detail: `Se creo la orden correctamente`, life: 5000,
      });
    },
    cancelMessage() {
      this.$toast.add({
        severity: 'info', summary: 'Cancelado', detail: `Se cancelo la orden`, life: 5000,
      });
    },
    clean() {
      this.$store.dispatch('cart/deleteProducts');
      this.cancelMessage();
    },
    goTo(link, data = null) {
      this.$router.push({ name: link, params: data });
    }
  }
}

</script>
<style scoped>
.content-element {
  width: 22em;
  height: 20em;
  max-height: 30em;
  background-color: #ffffff;
  bottom: 0;
  position: fixed;
  right: 0;
  border: solid;
  margin-right: 1em;
  overflow-y: auto;
}

.content-footer {
  background-color: #ffffff;
  position: sticky;
  bottom: 0;
  z-index: 1;
  height: 5em !important;
  top: 15em;
}
.content-element .card {
  height: 2em;
  max-height: 10em;
}
.content-element .content-footer {
  height: 2em;
}
.content-cart .p-button-icon.pi.pi-shopping-cart {
  font-size: 2em !important;
}
.content-cart {
  right: 0;
}
.grid.grid-nogutter {
  margin-bottom: 4em;
}
</style>
