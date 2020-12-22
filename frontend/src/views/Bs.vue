<template>
  <div>
      <b-row class="divider-bottom" style="padding: 20px 0px;">
        <b-col></b-col>
        <b-col cols="8">
          <b-input-group prepend="Url:">
            <b-form-input size="70" v-model="url" placeholder="Url"></b-form-input>
            <b-input-group-append>
              <b-button @click="getSerieUrls">ok</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-col>
        <b-col></b-col>
      </b-row>


  <div v-for="(x,idx) in movies" :key="idx">
    <span><a :href="x">{{x}}</a></span>
  </div>
  </div>
</template>



<script>
import axios from "axios";
import { ref } from "@vue/composition-api";

export default {
  name: "Bs",
  setup() {
    const url = ref("https://bs.to/serie/The-Mandalorian/2/de")
    const movies = ref([])

    const getSerieUrls = async ()=>{
      let res = await axios.post('/api/getserieurl', {url : url.value})
      console.log(res.data);
      movies.value = res.data
    }

    return {url, getSerieUrls, movies};
  },
};
</script>

<style>
</style>
