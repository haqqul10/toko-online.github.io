<template>
  <div>
    <HeaderShayna :updateKeranjang="keranjangUser" />

    <!-- Breadcrumb Section Begin -->
    <div class="breacrumb-section">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 text-left">
            <div class="breadcrumb-text product-more">
              <router-link to="/"><i class="fa fa-home"></i> Home</router-link>
              <span>Shopping Cart</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Breadcrumb Section Begin -->

    <!-- Shopping Cart Section Begin -->
    <section class="shopping-cart spad">
      <div class="container">
        <div class="row">
          <div class="col-lg-8">
            <div class="row">
              <div class="col-lg-12">
                <div class="cart-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th class="p-name text-center">Product Name</th>
                        <th>Price</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody v-if="keranjangUser.length > 0">
                      <tr
                        v-for="(keranjang, index) in keranjangUser"
                        :key="keranjang.id"
                      >
                        <td class="cart-pic first-row">
                          <img :src="keranjang.photo" />
                        </td>
                        <td class="cart-title first-row text-center">
                          <h5>{{ keranjang.name }}</h5>
                        </td>
                        <td class="p-price first-row">
                          ${{ keranjang.price }}
                        </td>
                        <td class="delete-item">
                          <a href="#" @click="removeKeranjang(index)"
                            ><i class="material-icons"> close </i></a
                          >
                        </td>
                      </tr>
                    </tbody>
                    <tbody v-else>
                      <tr>
                        <p>Belum ada data yang di checkout</p>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="col-lg-8">
                <h4 class="mb-4 text-left">Informasi Pembeli:</h4>
                <div class="user-checkout">
                  <form class="text-left">
                    <div class="form-group">
                      <label for="namaLengkap">Nama lengkap</label>
                      <input
                        type="text"
                        class="form-control"
                        id="namaLengkap"
                        aria-describedby="namaHelp"
                        placeholder="Masukan Nama"
                        v-model="costumerInfo.nama"
                      />
                    </div>
                    <div class="form-group">
                      <label for="namaLengkap">Email Address</label>
                      <input
                        type="email"
                        class="form-control"
                        id="emailAddress"
                        aria-describedby="emailHelp"
                        placeholder="Masukan Email"
                        v-model="costumerInfo.email"
                      />
                    </div>
                    <div class="form-group">
                      <label for="namaLengkap">No. HP</label>
                      <input
                        type="text"
                        class="form-control"
                        id="noHP"
                        aria-describedby="noHPHelp"
                        placeholder="Masukan No. HP"
                        v-model="costumerInfo.noHp"
                      />
                    </div>
                    <div class="form-group">
                      <label for="alamatLengkap">Alamat Lengkap</label>
                      <textarea
                        class="form-control"
                        id="alamatLengkap"
                        rows="3"
                        v-model="costumerInfo.alamat"
                      ></textarea>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="row">
              <div class="col-lg-12">
                <div class="proceed-checkout text-left">
                  <ul>
                    <li class="subtotal">
                      ID Transaction <span>#SH12000</span>
                    </li>
                    <li class="subtotal mt-3">
                      Subtotal <span>${{ totalHarga }}.00</span>
                    </li>
                    <li class="subtotal mt-3">
                      Pajak <span>10% ${{ ditambahPajak }}.00</span>
                    </li>
                    <li class="subtotal mt-3">
                      Total Biaya <span>${{ totalBiaya }}.00</span>
                    </li>
                    <li class="subtotal mt-3">
                      Bank Transfer <span>Mandiri</span>
                    </li>
                    <li class="subtotal mt-3">
                      No. Rekening <span>2208 1996 1403</span>
                    </li>
                    <li class="subtotal mt-3">
                      Nama Penerima <span>Shayna</span>
                    </li>
                  </ul>
                  <a @click="checkout()" class="proceed-btn">I ALREADY PAID</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Shopping Cart Section End -->
  </div>
</template>

<script>
import HeaderShayna from "@/components/HeaderShayna.vue";
import axios from "axios";

export default {
  name: "ShoopingCart",
  components: {
    HeaderShayna,
  },
  data() {
    return {
      keranjangUser: [],
      costumerInfo: {
        nama: "",
        email: "",
        noHp: "",
        alamat: "",
      },
    };
  },
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
    checkout() {
      let productId = this.keranjangUser.map(function (product) {
        return product.id;
      });

      let checkoutData = {
        name: this.costumerInfo.nama,
        email: this.costumerInfo.email,
        number: this.costumerInfo.noHp,
        address: this.costumerInfo.alamat,
        transaction_total: this.totalBiaya,
        transaction_status: "PENDING",
        transaction_details: productId,
      };

      axios
        .post(
          "http://shayna-backend.buildwithangga.id/api/checkout",
          checkoutData
        )
        .then(() => this.$router.push({ path: "/success" }))
        .catch((err) => console.log(err));

      this.keranjangUser.splice(productId);
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
    ditambahPajak() {
      return (this.totalHarga * 10) / 100;
    },
    totalBiaya() {
      return this.totalHarga + this.ditambahPajak;
    },
  },
};
</script>

<style>
</style>