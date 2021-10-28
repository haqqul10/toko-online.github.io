<template>
  <!-- Header Section Begin -->
  <header class="header-section">
    <div class="header-top">
      <div class="container">
        <div class="ht-left">
          <div class="mail-service">
            <i class="fa fa-envelope"></i> hello.shayna@gmail.com
          </div>
          <div class="phone-service">
            <i class="fa fa-phone"></i> +628 22081996
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="inner-header">
        <div class="row">
          <div class="col-lg-2 col-md-2">
            <div class="logo">
              <router-link to="/">
                <img src="img/logo_website_shayna.png" alt="" />
              </router-link>
            </div>
          </div>
          <div class="col-lg-7 col-md-7"></div>
          <div class="col-lg-3 text-right col-md-3">
            <ul class="nav-right">
              <li class="cart-icon">
                Keranjang Belanja &nbsp;
                <a href="#">
                  <i class="icon_bag_alt"></i>
                  <span>{{updateKeranjang ? updateKeranjang.length : keranjangUser.length}}</span>
                </a>
                <div class="cart-hover">
                  <div class="select-items">
                    <table>
                      <tbody v-if="keranjangUser.length > 0">
                        <tr
                          v-for="(keranjang, index) in keranjangUser"
                          :key="keranjang.index"
                        >
                          <td class="si-pic">
                            <img
                              class="photo-items"
                              :src="keranjang.photo"
                              alt=""
                            />
                          </td>
                          <td class="si-text">
                            <div class="product-selected">
                              <p>${{ keranjang.price }} x 1</p>
                              <h6>{{ keranjang.name }}</h6>
                            </div>
                          </td>
                          <td class="si-close" @click="removeKeranjang(index)">
                            <i class="ti-close"></i>
                          </td>
                        </tr>
                      </tbody>

                      <tbody v-else>
                        <tr>
                          <p>Keranjang Kosong</p>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="select-total">
                    <span>total:</span>
                    <h5>${{ totalHarga }}</h5>
                  </div>
                  <div class="select-button">
                    <router-link
                      to="/shoopingcart"
                      href="#"
                      class="primary-btn view-card"
                      >VIEW CARD</router-link
                    >
                    <a href="#" class="primary-btn checkout-btn">CHECK OUT</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </header>
  <!-- Header End -->
</template>

<script>
export default {
  name: "HeaderShayna",
  components: {
    // HeaderShayna,
  },
  data() {
    return {
      keranjangUser: [],
    };
  },
  props: ['updateKeranjang'],
  mounted() {
    if (localStorage.getItem("keranjangUser")) {
      try {
        this.keranjangUser = JSON.parse(localStorage.getItem("keranjangUser"));
      } catch (e) {
        localStorage.removeItem("keranjangUser");
      }
    }
  },
  methods: {
    removeKeranjang(index) {
      this.keranjangUser.splice(index, 1);
      const parsed = JSON.stringify(this.keranjangUser);
      localStorage.setItem("keranjangUser", parsed);
    },
  },
  computed: {
    totalHarga() {
      return this.keranjangUser.reduce(function (items, data) {
        return items + data.price;
      }, 0);
    },
  },
};
</script>

<style scoped>
.photo-items {
  width: 100px;
  height: 80px;
}
</style>