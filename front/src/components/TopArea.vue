<template>
  <b-container>
    <div>
    <b-navbar toggleable="sm" type="light">

      <a href="/" ><b-img class="main_img" :src="require('../assets/main/main_logo.jpg')" alt="Left image"  width="350" /> </a>
      
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
            <b-nav-item class="menu" to="/intro">보험케어 소개</b-nav-item >
            <b-nav-item class="menu" @click="tip" >내보험 설명서</b-nav-item >
            <b-nav-item class="menu" to="/search">내보험 다찾아줌</b-nav-item >
        </b-navbar-nav>
      </b-collapse>
  </b-navbar>
    </div>
    <hr style="height: 5px; color: #0d6efd;  margin: 0 0 1rem;"/>

    <hr style="height: 5px; color: #42b983; margin: auto;"/>  
  </b-container>
  
</template>
 
<script>
export default {
  name: 'top_area',
  methods: {
    tip(){
      alert("현재 페이지 준비중입니다.");
    }
  }
}
</script>

<style>
.menu { font-size: 1.3rem; font-weight: bold; font-family: 맑은고딕, Malgun Gothic, dotum, gulim, sans-serif; }
.navbar-collapse{ padding-left: 29rem; padding-top: 9.5rem; }
.main_img{ padding-top: 2.5rem; }
.navbar-light .navbar-nav .nav-link:hover{  color: #0dcaf0; }

@media (max-width: 576px) {
.navbar-collapse{  padding-left: 0; padding-top: 0rem; }
.main_img{ padding-top: 0; width: 200px; }
.menu   { font-size: 1rem; }
}
 
</style>