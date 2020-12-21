<template>
  <div>
    <b-container>
      <b-row>
        <b-col></b-col>
        <b-col cols="8">
          <b-input-group prepend="Url:">
            <b-form-input size="70" v-model="url" placeholder="Url"></b-form-input>
            <b-input-group-append>
              <b-button @click="sendurl">ok</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-col>
        <b-col></b-col>
      </b-row>
    </b-container>
    <b-card>
      <table>
        <tr v-for="m in movies" :key="m">
          <td>{{ m.title }}</td>
          <td>
            <iframe
              width="560"
              height="315"
              :src="'https://www.youtube.com/embed/' + m.iframeUrl"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </td>
          <td>
            <a :href="m.youtubeUrl" target="_blank">Youtube Suche</a>
          </td>
          <td>
            <a :href="'https:' + m.url" target="_blank">Filmpalast-Seite</a>
          </td>
        </tr>
      </table>
    </b-card>
  </div>
</template>
<script>
import axios from "axios";
import { ref } from "@vue/composition-api";

export default {
  name: "Filmpalast",
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
    return { sendurl, url, movies };
  },
};
</script>

<style>
</style>
