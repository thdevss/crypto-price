<template>
    <b-container class="bv-example-row">
    
        <b-row >
            <b-col col sm="12" class="text-start" style="margin-bottom:1%;">
                <h4 class="float-left">
                    Crypto Table..
                    <b-button class="float-end" @click="modalShow = !modalShow" variant="outline-primary">+ Add symbol</b-button>
                </h4>
            </b-col>

            <CryptoPrice v-for="(symbol, key) in symbols" :key="key" :symbol="symbol" />

        </b-row>
    </b-container>

    <b-modal v-model="modalShow" id="add-crypto" hide-footer title="Add new Symbol">
        <div class="d-block">
            <b-form-group id="input-group-3" label="Symbol:" label-for="input-3">
                <b-form-select id="input-3" v-model="sel_symbol" :options="all_symbols" required>
                    <b-form-option> -- please select symbol -- </b-form-option>
                </b-form-select>
            </b-form-group>
            <b-button class="btn-block btn-primary mt-3" style="width:100%;" @click="addSymbolToPage">Add symbol</b-button>
        </div>
    </b-modal>
</template>

<script>
import { HTTP } from '@/axios.js';

import CryptoPrice from './CryptoPrice.vue'
export default {
    name: 'CryptoTable',
    components: {
        CryptoPrice
    },
    props: {},
    data() {
        return {
            modalShow: false,
            symbols: [],
            all_symbols: [],
            sel_symbol: null
        }
    },
    created() {
        this.symbols.push("BTCUSDT")
        this.symbols.push("BNBUSDT")
        this.symbols.push("ADAUSDT")
        this.symbols.push("XRPUSDT")
        this.symbols.push("ZILUSDT")
        this.symbols.push("ZECUSDT")
        this.symbols.push("IOTAUSDT")
        this.symbols.push("LINKUSDT")
        this.symbols.push("HOTUSDT")

        this.getAllSymbols()
    },
    methods: {
        async getAllSymbols() {
            await HTTP.get(`/exchangeInfo`).then(res => {
                res.data.symbols.forEach(ele => {
                    this.all_symbols.push(ele.symbol)
                });
            })
            this.all_symbols = this.all_symbols.filter(item => !this.symbols.includes(item))
        },
        addSymbolToPage() {
            if(!this.sel_symbol) 
                return;

            this.symbols.push(this.sel_symbol)
            this.sel_symbol = null
            this.modalShow = false;
            // $bvModal.hide('add-crypto')
            this.all_symbols = this.all_symbols.filter(item => !this.symbols.includes(item))
        }
        // async getPriceFromBinance() {
        //     this.isLoading = true;
        //     await HTTP.get(`/ticker/price?symbol=${this.symbol}`).then(res => {
        //         if(res.data.symbol == this.symbol) {
        //             this.isLoading = false;
        //             if(this.price < res.data.price) {
        //                 this.variant = 'success'
        //             } else {
        //                 this.variant = 'danger'
        //             }

        //             this.price = this.numberWithCommas(parseFloat(res.data.price).toFixed(4));
        //         }
        //     })
        // },
        // async getInformationFromBinance() {
        //     await HTTP.get(`/ticker/24hr?symbol=${this.symbol}`).then(res => {
        //         if(res.data.symbol == this.symbol) {
        //             if(res.data.priceChange < 0 && this.variant == 'primary') {
        //                 this.variant = 'danger'
        //             } else {
        //                 if(this.price < res.data.price) {
        //                     this.variant = 'success'
        //                 } else {
        //                     this.variant = 'danger'
        //                 }
        //             }

        //             this.price = this.numberWithCommas(parseFloat(res.data.lastPrice).toFixed(4));
        //             this.lowPrice = this.numberWithCommas(parseFloat(res.data.lowPrice).toFixed(4))
        //             this.highPrice = this.numberWithCommas(parseFloat(res.data.highPrice).toFixed(4))
        //             this.volume = this.numberWithCommas(parseFloat(res.data.volume).toFixed(4))

        //         }
        //     })
        // },
        // numberWithCommas(x) {
        //     return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        // }
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
