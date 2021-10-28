<template>
  <!-- Women Banner Section Begin -->
  <section class="women-banner spad">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-12 mt-5" v-if="products.length > 0">
          <carousel
            class="product-slider"
            :items="3"
            :dots="false"
            :nav="false"
            :autoplay="true"
          >
            <div
              class="product-item"
              v-for="product in products"
              :key="product.id"
            >
              <div class="pi-pic">
                <img v-bind:src="product.galleries[0].photo" />
                <ul>
                  <li
                    class="w-icon active"
                    @click="
                      saveKeranjang(
                        product.id,
                        product.name,
                        product.price,
                        product.galleries[0].photo
                      )
                    "
                  >
                    <router-link to="/"
                      ><i class="icon_bag_alt"></i
                    ></router-link>
                  </li>
                  <li class="quick-view">
                    <router-link :to="'/product/' + product.id"
                      >+ Quick View</router-link
                    >
                  </li>
                </ul>
              </div>
              <div class="pi-text">
                <div class="catagory-name">{{ product.type }}</div>
                <router-link to="/product">
                  <h5>{{ product.name }}</h5>
                </router-link>
                <div class="product-price">
                  ${{ product.price }}
                  <span>$200</span>
                </div>
              </div>
            </div>
          </carousel>
        </div>
        <div class="col-lg-12 mt-5" v-else>
          <p>Product terbaru belum tersedia untuk saat ini.</p>
        </div>
      </div>
    </div>
  </section>
  <!-- Women Banner Section End -->
</template>


<script>
import carousel from "vue-owl-carousel";
import axios from "axios";

export default {
  name: "BannerShayna",
  components: {
    carousel,
  },
  data() {
    return {
      products: [],
      keranjangUser: [],
    };
  },
  props : ['updateKeranjang'],
  methods: {
    load() {
      axios
        .get("https://shayna-backend.buildwithangga.id/api/products")
        .then((res) => (this.products = res.data.data.data))
        .catch((err) => console.log(err));

      if (localStorage.getItem("keranjangUser")) {
        try {
          this.keranjangUser = JSON.parse(
            localStorage.getItem("keranjangUser")
          );
        } catch (e) {
          localStorage.removeItem("keranjangUser");
        }
      }
    },
    saveKeranjang(IdProduct, nameProduct, priceProduct, photoProduct) {
      var dataLocalStorage = {
        id: IdProduct,
        name: nameProduct,
        price: priceProduct,
        photo: photoProduct,
      };
      this.keranjangUser.push(dataLocalStorage);
      const parsed = JSON.stringify(this.keranjangUser);
      localStorage.setItem("keranjangUser", parsed);

      window.location.reload();
      // this.$router.push({ path: '/'});
    },
  },
  mounted() {
    this.load();
  },
  computed: {},
};
</script>

<style scoped>
.product-item {
  margin-right: 25px;
}
</style>