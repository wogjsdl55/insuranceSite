<template>
    <b-container >
      <b-row id="top">
        <topArea/>
      </b-row>
      <b-row>
          <b-carousel
            v-model="slide"
            :interval="10000"    
            indicators
            @sliding-start="onSlideStart"
            @sliding-end="onSlideEnd"
            img-width="1024"
          img-height="500"
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
 

          <b-card-group>
            <b-card>
                 <b-col><b-button  variant="info" size="sm" style="width:100%; height: 100%;"><b>상담문의 하기</b></b-button></b-col>
            </b-card>

           <b-card>
             <b-card>
                 <b-col><b-button  variant="info" size="sm" style="width:100%; height: 100%;"><b>상담문의 하기</b></b-button></b-col>
             </b-card>
              <b-card>
                 <b-col><b-button  variant="info" size="sm" style="width:100%; height: 100%;"><b>상담문의 하기</b></b-button></b-col>
              </b-card>
          </b-card>

            <b-card img-top>
                <b-col><b-button  variant="info" size="sm" style="width:100%; height: 100%;"><b>상담문의 하기</b></b-button></b-col>
            </b-card>
        </b-card-group>

        <b-card>
          <b-table 
            :items="items" 
            :fields="fields"
            outlined
            hover
            noCollapse
            :per-page="perPage"
            :current-page="currentPage"
          >
          </b-table>

        </b-card>

        <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="my-table"
            align="center"
            size="sm"
          ></b-pagination>

        <b-col>
            <b-button size="sm" variant="info">글쓰기</b-button>
          </b-col>
      </b-row>

      <b-row id="footer">
        <footerArea/>
      </b-row>
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
      currentPage: 1,
      perPage: 5,
      fields: ['NO', '제목', '작성자', '작성시간', '상담상태'],
      items: [
          { NO: 10, 제목 : '제목 테스트입니다.', 작성자: 'Macdonald', 작성시간 : '2020-05-31', 상담상태 : "상담신청" },
          { NO: 9,  제목 : '제목 테스트입니다.', 작성자: 'Shaw',      작성시간 : '2020-05-31', 상담상태 : "상담신청" },
          { NO: 8,  제목 : '제목 테스트입니다.', 작성자: 'Wilson',    작성시간 : '2020-05-31', 상담상태 : "상담중" },
          { NO: 7,  제목 : '제목 테스트입니다.', 작성자: 'Carney',    작성시간 : '2020-05-31', 상담상태 : "상담완료" },
          { NO: 10, 제목 : '제목 테스트입니다.', 작성자: 'Macdonald', 작성시간 : '2020-05-31', 상담상태 : "상담신청" },
          { NO: 9,  제목 : '제목 테스트입니다.', 작성자: 'Shaw',      작성시간 : '2020-05-31', 상담상태 : "상담신청" },
          { NO: 8,  제목 : '제목 테스트입니다.', 작성자: 'Wilson',    작성시간 : '2020-05-31', 상담상태 : "상담중" },
          { NO: 7,  제목 : '제목 테스트입니다.', 작성자: 'Carney',    작성시간 : '2020-05-31', 상담상태 : "상담완료" },
          { NO: 10, 제목 : '제목 테스트입니다.', 작성자: 'Macdonald', 작성시간 : '2020-05-31', 상담상태 : "상담신청" },
          { NO: 9,  제목 : '제목 테스트입니다.', 작성자: 'Shaw',      작성시간 : '2020-05-31', 상담상태 : "상담신청" },
          { NO: 8,  제목 : '제목 테스트입니다.', 작성자: 'Wilson',    작성시간 : '2020-05-31', 상담상태 : "상담중" },
          { NO: 7,  제목 : '제목 테스트입니다.', 작성자: 'Carney',    작성시간 : '2020-05-31', 상담상태 : "상담완료" },
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
  computed: {
      rows() {
        return this.items.length
      }
    }
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
.card {
  border: 0;
}

.card-body {
  padding: 1rem 0.5rem;
}
.col {
  height: 100%;
}
.btn-info{
  background-color: rgb(13 110 253 / 25%);
}
a {
  color: #42b983;
}

.pagination {
  float:right;
}
.btn-info{
  float:right;
}
@media (max-width: 576px) {
  .card-body {
    padding: 0;
  }
}
</style>
