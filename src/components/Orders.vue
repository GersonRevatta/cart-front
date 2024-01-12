<template>
  <div class="card">
    <DataView :value="orders">
      <template #list="slotProps">
        <div class="grid grid-nogutter">
          <div v-for="(order, index) in slotProps.items" :key="index" class="col-12 order-element">
            <h3>
              <b>
                Orden N: {{ index + 1 }}
              </b>
            </h3>
            <div class="content-order">
              <div v-for="(product, indexItem) in order.order_items" :key="indexItem" class="col-12">
                <div class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                  <img class="w-10 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" :src="`https://primefaces.org/cdn/primevue/images/product/gaming-set.jpg`" :alt="product.name" />
                  <div class="flex flex-column align-items-center sm:align-items-start gap-3">
                    <div class="text-2xl font-bold text-900">{{ product.name }}</div>
                  </div>
                  <div class="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                      <span class="text-2xl font-semibold">${{ product.price }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <b>Total: ${{ order.amountTotal }}</b>
              <Button @click="deleteOrder(order)" label="Eliminar Orden" severity="danger" outlined />
            </div>
          </div>
        </div>
      </template>
    </DataView>
  </div>
</template>
<script>

import Button from 'primevue/button';
import DataView from 'primevue/dataview';
export default {
  name: 'Orders',
  props: {
  },
  components: {
    DataView,
    Button
  },
  computed: {
  },
  data() {
    return {
      url: 'orders',
      orders: []
    };
  },
  created() {
    setTimeout(() => {
      this.getData();
    }, 500);
  },
  methods: {
    async deleteOrder(order) {
      await this.axios.delete(`${this.url}/${order.id}`);
      this.message();
      this.getData();
    },
    message() {
      this.$toast.add({
        severity: 'error', summary: 'Exito', detail: `Se elimino la orden`, life: 5000,
      });
    },
    async getData() {
      const response = await this.axios.get(`${this.url}`);
      this.orders = response.data;
    },
  }
}
</script>

<style scoped>
  .order-element {
    border: solid;
    padding: 1em;
    margin: 1em;
  }
</style>