<template>
  <div id="app">
    <b-navbar type="dark" variant="dark">
      <b-navbar-brand href="#">Trailermania</b-navbar-brand>
      <b-navbar-nav>

        <!-- Anbiter -->
        <b-nav-item-dropdown text="Anbieter" right>
          <b-dropdown-item href="#/">Filmpalast.to</b-dropdown-item>
          <b-dropdown-item href="#/bs">bs.to</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>

    <router-view id="content"/>
  </div>
</template>

<style>


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}


</style>
