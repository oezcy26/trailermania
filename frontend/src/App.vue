<template>
  <div>
    <label>url:</label>
    <input type="text" size="70" v-model="url" />
    <button @click="sendurl">ok</button>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";

export default {
  name: "App",
  setup() {

    const url = ref("https://filmpalast.to/search/genre/Abenteuer");

    const sendurl = async () => {
      console.log(url.value);
      let res = await axios.post('api/sendurl', {url: url.value })
      console.log(res.data);
    };

    return { sendurl, url };
  },
};
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
