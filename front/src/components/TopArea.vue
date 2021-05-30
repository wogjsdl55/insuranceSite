<template>
  <b-container>
    <b-navbar toggleable="lg">

      <b-nav href="#" align="start" > <img src="@/assets/logo.png" alt="logo"  style="width:50px"> </b-nav>

      <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

      <b-collapse id="nav-text-collapse" is-nav>
        <b-nav class="ml-auto" right>
            <b-nav-item class="menu" href="#">보험케어 소개</b-nav-item >
            <b-nav-item class="menu" href="#">상담게시판</b-nav-item >
            <b-nav-item class="menu" href="#">보험TIP</b-nav-item >
            <b-nav-item class="menu" href="#">내보험 다찾아줌</b-nav-item >
        </b-nav>
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