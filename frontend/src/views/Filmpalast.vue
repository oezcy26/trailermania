<template>
  <div>
    <b-row style="padding: 20px 0px;">
      <b-col>
        <b-overlay :show="genres.length == 0">
          <b-input-group prepend="Genre:">
            <b-form-select v-model="selectedGenre" :options="genres"></b-form-select>
          </b-input-group>
        </b-overlay>
      </b-col>
      <b-col cols="6">
        <b-input-group prepend="Url:">
          <b-form-input size="70" v-model="url" placeholder="Url"></b-form-input>
          <b-input-group-append>
            <b-button @click="sendurl">ok</b-button>
          </b-input-group-append>
        </b-input-group>
      </b-col>
      <b-col></b-col>
    </b-row>
    <b-overlay :show="loading">
      <b-row v-for="(m,idx) in movies" :key="idx" align-v="center" style="padding: 0px 20px;">
        <b-col>
          <h2>{{ m.title }}</h2>
        </b-col>
        <b-col md="auto">
          <iframe
            width="420"
            height="236"
            :src="'https://www.youtube.com/embed/' + m.iframeUrl"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </b-col>
        <b-col cols="1" class="vertical">
          <a :href="m.youtubeUrl" target="_blank">Youtube Suche</a>
        </b-col>
        <b-col cols="1" class="vertical">
          <a :href="'https:' + m.url" target="_blank">Filmpalast-Seite</a>
        </b-col>
      </b-row>
    </b-overlay>
  </div>
</template>
<script>
import axios from "axios";
import { onMounted, ref } from "@vue/composition-api";

export default {
  name: "Filmpalast",
  setup() {
    const genres = ref([]);
    const selectedGenre = ref();
    // get genres from site
    onMounted(async () => {
      let res = await axios.get("/api/genres");
      //make options with 'key - value'
      res.data.genres.forEach((element) => {
        genres.value.push({
          value: element,
          text: element,
        });
      });
    });

    const loading = ref(false);

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
      loading.value = true;
      console.log(url.value);
      movies.value = [];
      let res = await axios.post("api/sendurl", { url: url.value });
      console.log(res.data);
      movies.value = res.data;
      loading.value = false;
    };
    return { genres, selectedGenre, sendurl, url, movies, loading };
  },
};
</script>

<style>
.vertical {
  writing-mode: vertical-lr;
}
</style>
