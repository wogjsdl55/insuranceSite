<template>
    <b-container >
      <b-row id="top">
        <topArea/>
      </b-row>
          <b-carousel
            id="carousel-1"
            v-model="slide"
            :interval="100000"
            indicators
            background="#ababab"
            img-width="1024"
            img-height="500"
            @sliding-start="onSlideStart"
            @sliding-end="onSlideEnd"
          >
            <!-- Slides with image only -->
            <b-carousel-slide img-src="/static/img/main_img.5e72a57.png"></b-carousel-slide>
            <b-carousel-slide img-src="/static/img/main_img2.5a5ad45.png"></b-carousel-slide>
            <b-carousel-slide img-src="/static/img/main_img.5e72a57.png"></b-carousel-slide>
          </b-carousel>
 
        <b-row class="main_button">
          <b-col>
              <b-button variant="info">Info</b-button>
          </b-col>
          <b-col>
              <b-button variant="info">카카오톡</b-button>
          </b-col>
          <b-col>3 of 3</b-col>
        </b-row>

   
        <b-row>
          <b-table 
            :items="items" 
            :fields="fields"
          >
          </b-table>
        </b-row>
      <div id="footer">
        <footerArea/>
      </div>
    </b-container>
</template>

<script>
import topArea from './TopArea.vue'
import footerArea from './FooterArea.vue'

export default {
  name: 'App',
  components: {
    'topArea': topArea,
    'footerArea': footerArea
  },
    data() {
    return {
      slide: 0,
      sliding: null,
      fields: ['NO', '제목', '작성자', '작성시간', '상담상태'],
      items: [
          { NO: 10, 제목 : '제목 테스트입니다.', 작성자: 'Macdonald', 작성시간 : '2020-05-31', 상담상태 : "상담신청" },
          { NO: 9,  제목 : '제목 테스트입니다.', 작성자: 'Shaw',      작성시간 : '2020-05-31', 상담상태 : "상담신청" },
          { NO: 8,  제목 : '제목 테스트입니다.', 작성자: 'Wilson',    작성시간 : '2020-05-31', 상담상태 : "상담중" },
          { NO: 7,  제목 : '제목 테스트입니다.', 작성자: 'Carney',    작성시간 : '2020-05-31', 상담상태 : "상담완료" }
        ]
    }
  },

  methods: {
    onSlideStart(slide) {
      this.sliding = true
    },
    onSlideEnd(slide) {
      this.sliding = false
    }
  },
}
</script>

<style scoped>

h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

</style>
