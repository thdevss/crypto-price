<template>
  <b-container class="bv-example-row">
    <b-row>
      <CryptoPrice symbol="BTCUSDT" color="success" />
      <CryptoPrice symbol="BNBUSDT" />
      <CryptoPrice symbol="ADAUSDT" />
      <CryptoPrice symbol="XRPUSDT" />

    </b-row>
  </b-container>
</template>

<script>
import CryptoPrice from './components/CryptoPrice.vue'

export default {
  name: 'App',
  components: {
    CryptoPrice
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
