<template>
  <div class="product">
    <HeaderShayna />

    <!-- Breadcrumb Section Begin -->
    <div class="breacrumb-section text-left">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="breadcrumb-text product-more">
              <router-link to="/"><i class="fa fa-home"></i> Home</router-link>
              <span>Detail</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Breadcrumb Section Begin -->

    <!-- Product Shop Section Begin -->
    <section class="product-shop spad page-details">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="row">
              <div class="col-lg-6">
                <div class="product-pic-zoom">
                  <img class="product-big-img" :src="gambar_default" alt="" />
                </div>
                <div
                  class="product-thumbs"
                  v-if="ProductDetails.galleries.length > 0"
                >
                  <carousel
                    class="product-thumbs-track ps-slider"
                    :items="3"
                    :nav="false"
                    :dots="false"
                  >
                    <div
                      v-for="img in ProductDetails.galleries"
                      :key="img.id"
                      class="pt"
                      :class="img.photo == gambar_default ? 'active' : ''"
                      @click="changeImage(img.photo)"
                    >
                      <img :src="img.photo" alt="" />
                    </div>
                  </carousel>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="product-details">
                  <div class="pd-title text-left">
                    <span>{{ ProductDetails.type }}</span>
                    <h3>{{ ProductDetails.name }}</h3>
                  </div>
                  <div class="pd-desc text-left">
                    <p v-html="ProductDetails.description"></p>
                    <h4>${{ ProductDetails.price }}</h4>
                  </div>
                  <div class="quantity">
                      <router-link to="/shoopingcart">
                        <a @click="saveKeranjang(ProductDetails.id,ProductDetails.name,ProductDetails.price,ProductDetails.galleries[0].photo)" href="#" class="primary-btn pd-cart"
                        >Add To Cart</a>
                      </router-link>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Product Shop Section End -->

    <!-- Related -->
    <RelatedShayna />

    <FooterShayna />
  </div>
</template>

<script>
import HeaderShayna from "@/components/HeaderShayna.vue";
import FooterShayna from "@/components/FooterShayna.vue";
import RelatedShayna from "@/components/RelatedShayna.vue";
import carousel from "vue-owl-carousel";
import axios from "axios";

export default {
  name: "Product",
  components: {
    HeaderShayna,
    RelatedShayna,
    FooterShayna,
    carousel,
  },
  
  data() {
    return {
      gambar_default: [],
      IdProduct: this.$route.params.id,
      ProductDetails: [],
      keranjangUser: [],
    };
  },
  methods: {
    changeImage(urlImage) {
      this.gambar_default = urlImage;
      console.log(this.IdProduct);
    },
    load() {
      if (localStorage.getItem("keranjangUser")) {
        try {
          this.keranjangUser = JSON.parse(
            localStorage.getItem("keranjangUser")
          );
        } catch (e) {
          localStorage.removeItem("keranjangUser");
        }
      }
      axios
        .get("https://shayna-backend.buildwithangga.id/api/products", {
          params: { id: this.IdProduct },
        })
        .then((res) => this.setDataPicture(res.data.data))
        .catch((err) => console.log(err));
    },
    setDataPicture(data) {
      // replace object product detail dengan data dari api
      this.ProductDetails = data;
      // replace nilai gambar default dengan data dari api (galleries)
      this.gambar_default = data.galleries[0].photo;
    },
    saveKeranjang(IdProduct, nameProduct, priceProduct, photoProduct) {
      var dataLocalStorage = {
          "id" : IdProduct,
          "name" : nameProduct,
          "price": priceProduct,
          "photo": photoProduct
      }
      this.keranjangUser.push(dataLocalStorage);
      const parsed = JSON.stringify(this.keranjangUser);
      localStorage.setItem("keranjangUser", parsed);
    },
  },
  mounted() {
    this.load();
  },
};
</script>

<style scoped>
.ps-slider .pt img {
  height: 250px;
}
.ps-slider .pt {
  margin-right: 14px;
}
</style>
