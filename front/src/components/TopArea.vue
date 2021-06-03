<template>
  <b-container>
    <b-navbar toggleable="sm" type="light">

      <a href="/test" ><b-img :src="require('../assets/main/main_logo.jpg')" alt="Left image"  width="250" /> </a>
      
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
            <b-nav-item class="menu" href="#">보험케어 소개</b-nav-item >
            <b-nav-item class="menu" href="#">상담게시판</b-nav-item >
            <b-nav-item class="menu" href="#">보험TIP</b-nav-item >
            <b-nav-item class="menu" href="#">내보험 다찾아줌</b-nav-item >
        </b-navbar-nav>
      </b-collapse>
  </b-navbar>

    <hr style="height: 5px; color: #0d6efd;"/>

    <hr style="height: 5px; color: #42b983; margin: auto;"/>  
  </b-container>
  
</template>
 
<script>
export default {
  name: 'top_area'
  
}
</script>

<style>
.menu {
  font-size: 1.5vw;
  
  font-weight: bold;
}

 
</style>