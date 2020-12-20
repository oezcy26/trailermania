<template>
  <div>
    <label>url:</label>
    <input type="text" size="70" v-model="url" />
    <button @click="sendurl">ok</button>

    <table>
      <tr v-for="m in movies" :key="m">
        <td>{{ m.title }}</td>
        <td>
          <iframe
            width="322"
            height="181"
            :src="'https://www.youtube.com/embed/' + m.iframeUrl"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </td>
        <td><a :href="m.youtubeUrl" target="_blank">Youtube Suche</a></td>
        <td>
          <a :href="'https:' + m.url" target="_blank">Filmpalast-Seite</a>
        </td>
        <td><button @click="getVivo(m)">get Vivo</button></td>
        
      </tr>
    </table>
  </div>
</template>



<script>
import axios from "axios";
import { ref } from "vue";

export default {
  name: "App",
  setup() {
    const url = ref("https://filmpalast.to/search/genre/Abenteuer");
    const movies = ref([]);
    movies.value.push({
      iframeUrl: "P2YbykbdJ1E",
      title: "TEST!!!!!Orc Wars",
      url: "//filmpalast.to/stream/orc-wars",
      youtubeUrl:
        "https://www.youtube.com/results?search_query=trailer+german+Orc+Wars",
    });

    const sendurl = async () => {
      console.log(url.value);
      movies.value = [];
      let res = await axios.post("api/sendurl", { url: url.value });
      console.log(res.data);
      movies.value = res.data;
    };

    const getVivo = async (movie) => {
      let resp = await axios.post("api/getvivo", { detailurl: movie.url });
      console.log(resp.data);
      movie.vivoEmbed = resp.data.vivoEmbed;
    };

    return { sendurl, url, movies, getVivo };
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
