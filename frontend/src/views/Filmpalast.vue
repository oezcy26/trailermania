<template>
  <div>
    <b-row style="padding: 20px 0px;">
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
    <b-overlay :show="loading">
      <b-row v-for="m in movies" :key="m" align-v="center" style="padding: 0px 20px;">
        <b-col cols="2">
          <h2>{{ m.title }}</h2>
        </b-col>
        <b-col>
          <iframe
            width="560"
            height="315"
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
import { ref } from "@vue/composition-api";

export default {
  name: "Filmpalast",
  setup() {
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
    return { sendurl, url, movies, loading };
  },
};
</script>

<style>
.vertical {
  writing-mode: vertical-lr;
}
</style>
