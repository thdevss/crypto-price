<template>
    <b-col col lg="3" md="auto">
        <b-overlay :show="isLoading" rounded="sm">
            <b-alert show :variant="variant">
                <h4>{{ symbol }}</h4>
                <h2>$ <span>{{ this.price }}</span></h2>
                <div class="text-end">
                    <small>Total Vol: {{ this.volume }}</small><br />
                    <small>H: {{ this.highPrice }}, L: {{ this.lowPrice }}</small>

                </div>
            </b-alert>
        </b-overlay>
    </b-col>

</template>

<script>
import { HTTP } from '@/axios.js';

export default {
    name: 'CryptoPrice',
    props: {
        symbol: String,
        color: String
    },
    data(props) {
        return {
            price: "",
            volume: "",
            lowPrice: "",
            highPrice: "",
            variant: (props.color) ? props.color : 'primary',
            isLoading: false
        }
    },
    mounted() {
        this.getPriceFromBinance()
        this.getInformationFromBinance()

        setInterval(this.getPriceFromBinance, 5000)
        setInterval(this.getInformationFromBinance, 30000)

    },
    methods: {
        async getPriceFromBinance() {
            this.isLoading = true;
            await HTTP.get(`/ticker/price?symbol=${this.symbol}`).then(res => {
                if(res.data.symbol == this.symbol) {
                    this.isLoading = false;
                    if(this.price < res.data.price) {
                        this.variant = 'success'
                    } else {
                        this.variant = 'danger'
                    }

                    this.price = res.data.price
                }
            })
        },
        async getInformationFromBinance() {
            await HTTP.get(`/ticker/24hr?symbol=${this.symbol}`).then(res => {
                if(res.data.symbol == this.symbol) {
                    if(res.data.priceChange < 0 && this.variant == 'primary') {
                        this.variant = 'danger'
                    }

                    this.lowPrice = res.data.lowPrice
                    this.highPrice = res.data.highPrice
                    this.volume = res.data.volume

                }
            })
        }
    }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
