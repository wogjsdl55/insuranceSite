<template>
  <div id="app">
    <router-view/>
  </div>
</template>


<script>
const GoogleFontsPlugin = require("google-fonts-webpack-plugin")
export default {
  name: 'App'
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Noto+Sans+KR');

#app {
  font-family: 'Avenir', Helvetica, Arial, 'Noto Sans KR';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
