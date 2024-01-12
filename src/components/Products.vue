<template>
  <div class="content-items p-7">
    <div class="p-4 flex justify-content-center">
      <Button @click="goTo('about')" class="" size="large" rounded label="Ordenes"></Button>
    </div>
    <DataView :value="items" layout="grid">
      <template #grid="slotProps">
            <div class="grid grid-nogutter">
                <div v-for="(item, index) in slotProps.items" :key="index" class="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
                    <div class="p-4 border-1 surface-border surface-card border-round">
                        <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                            <div class="flex align-items-center gap-2">
                                <span class="font-semibold">{{ item.category }}</span>
                            </div>
                        </div>
                        <div class="flex flex-column align-items-center gap-3 py-5">
                            <img class="w-9 shadow-2 border-round" src="https://primefaces.org/cdn/primevue/images/product/gaming-set.jpg" :alt="item.name" />
                            <div class="text-2xl font-bold">{{ item.name }}</div>
                        </div>
                        <div class="flex align-items-center justify-content-between">
                            <span class="text-2xl font-semibold">${{ item.price }}</span>
                            <Button @click="addProduct(item)" icon="pi pi-plus" rounded></Button>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </DataView>
    <Cart />
  </div>
</template>
<script>
import Cart from '@/components/Cart.vue'
import Button from 'primevue/button';
import DataView from 'primevue/dataview';

export default {
  name: 'Products',
  components: {
    Cart,
    DataView,
    Button
  },
  data() {
    return {
      items: [],
      url: 'items'
    };
  },
  created() {
    this.getData();
  },
  methods: {
    addProduct(item) {
      let itemObject = {
        item_id: item.id,
        name: item.name,
        price: item.price
      }
      this.$store.dispatch('cart/addProduct', itemObject);
      this.$toast.add({
        severity: 'success', summary: 'Exito', detail: `Se agrego ${item.name}, al carrito`, life: 5000,
      });
    },
    async getData() {
      const response = await this.axios.get(`${this.url}`);
      this.items = response.data;
    },
    goTo(link, data = null) {
      this.$router.push({ name: link, params: data });
    }
  },
};
</script>

