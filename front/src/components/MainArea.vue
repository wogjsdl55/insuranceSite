<template>
    <b-container >
      <b-row id="top">
        <topArea/>
      </b-row>
          <b-carousel
            v-model="slide"
            :interval="10000"    
            
            indicators
            @sliding-start="onSlideStart"
            @sliding-end="onSlideEnd"
            img-width="1024"
          img-height="480"
            style="text-shadow: 1px 1px 2px #333;"
          >
            <!-- Slides with image only -->
            <b-carousel-slide
        caption="First slide"
        text="Nulla vitae elit libero, a pharetra augue mollis interdum."
        img-src="https://picsum.photos/1024/480/?image=52"
      ></b-carousel-slide>

      <!-- Slides with custom text -->
      <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=54">
        <h1>Hello world!</h1>
      </b-carousel-slide>

          </b-carousel>
 
        <b-row>
          <b-card-group>
            <b-card img-top>
                <b-button disabled size="lg">Also Disabled</b-button>
            </b-card>

            <b-card img-top>
                <b-button disabled size="lg">Also Disabled</b-button>
            </b-card>

            <b-card img-top>
                <b-button disabled size="lg">Also Disabled</b-button>
            </b-card>
        </b-card-group>
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
