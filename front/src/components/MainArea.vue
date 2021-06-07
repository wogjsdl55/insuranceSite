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
              <b-col size="sm">
                <b-card  style="height: 120%;">
                  <a href=""><b-button  size="lg" style="width:100%; height: 80%;"><b class="main_button">상담문의 하기</b></b-button></a>
                </b-card>
              </b-col>
            </b-card>

           <b-card>
             <b-card>
                 <b-col style="padding-bottom: 1rem;"><b-img class="kakao" :src="require('../assets/main/kakao_plus_img.png')" ></b-img></b-col>

                 <b-col><a><b-button  variant="success" size="sm" class="success_btn" ><b class="button_q">자주묻는질문</b></b-button></a></b-col>
              </b-card>
          </b-card>

            <b-card>
                <b-col>
                  <b-card-text>
                      <span class="main_tel1" style="padding-top: 1rem; font-weight: bold;" >Kim & Lim 전화번호</span><br>
                      <span class="main_tel3" >010-5427-3793 </span>
                      <span class="main_tel3" >, 010-6744-3789 </span>
                      <br>
                      <br>
                      <br>
                      <span class="main_tel2" >010-5427-3793 </span><br>
                      <span class="main_tel2" >010-6744-3789 </span>
                  </b-card-text>
                </b-col>
            </b-card>
        </b-card-group>

        <h2 style="font-weight:bold">상담문의 게시판</h2>
        <b-card>
          <b-table 
            :items="items" 
            :fields="fields"
            outlined
            hover
            noCollapse
            :per-page="perPage"
            :current-page="currentPage"
            :tbody-td-class="status"
          >
            <template #table-colgroup="scope">
              <col
                v-for="field in scope.fields"
                :key="field.key"
                class="subject"
                :style="{ width: field.key === '제목' ? '500px' : '100px' }"
              >
            </template>
            <template #cell(제목)="data">
              <b class="text-left" style="float:left">{{ data.value }}</b>
            </template>
            <template #cell(상담상태)="data">
              <b-button v-if="data.상담상태">
              </b-button>
              <b-button :class="status">{{ data.value }}</b-button>
          </template>
          </b-table>
        </b-card>

        <b-col>
          <b-button to="/board" size="sm" style="color: white; font-weight: bold;" variant="info">글쓰기</b-button>
          <b-pagination
              v-model="currentPage"
              :total-rows="rows"
              :per-page="perPage"
              aria-controls="my-table"
              align="center"
              size="sm"
            ></b-pagination>
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
    'footerArea': footerArea,
  },
    data() {
    return {
      slide: 0,
      sliding: null,
      currentPage: 1,
      perPage: 10,
      fields: ['NO', '제목' , '작성자', '작성시간', '상담상태'],
      items: [
          { NO: 10, 제목 : '제목 테스트입니다.', 작성자: 'Macdonald', 작성시간 : '2020-05-31', 상담상태 : "상담신청", status: 'register' },
          { NO: 9,  제목 : '제목 테스트입니다.', 작성자: 'Shaw',      작성시간 : '2020-05-31', 상담상태 : "상담신청", status: 'register' },
          { NO: 8,  제목 : '제목 테스트입니다.', 작성자: 'Wilson',    작성시간 : '2020-05-31', 상담상태 : "상담신청", status: 'register' },
          { NO: 7,  제목 : '제목 테스트입니다.', 작성자: 'Carney',    작성시간 : '2020-05-31', 상담상태 : "상담신청", status: 'register' },
          { NO: 10, 제목 : '제목 테스트입니다.', 작성자: 'Macdonald', 작성시간 : '2020-05-31', 상담상태 : "상담신청", status: 'register' },
          { NO: 9,  제목 : '제목 테스트입니다.', 작성자: 'Shaw',      작성시간 : '2020-05-31', 상담상태 : "상담신청", status: 'register' },
          { NO: 8,  제목 : '제목 테스트입니다.', 작성자: 'Wilson',    작성시간 : '2020-05-31', 상담상태 : "상담완료", status: 'complete' },
          { NO: 7,  제목 : '제목 테스트입니다.', 작성자: 'Carney',    작성시간 : '2020-05-31', 상담상태 : "상담완료", status: 'complete' },
          { NO: 10, 제목 : '제목 테스트입니다.', 작성자: 'Macdonald', 작성시간 : '2020-05-31', 상담상태 : "상담중", status: 'ongoing' },
          { NO: 9,  제목 : '제목 테스트입니다.', 작성자: 'Shaw',      작성시간 : '2020-05-31', 상담상태 : "상담중", status: 'ongoing' },
          { NO: 8,  제목 : '제목 테스트입니다.', 작성자: 'Wilson',    작성시간 : '2020-05-31', 상담상태 : "상담중", status: 'ongoing' },
          { NO: 7,  제목 : '제목 테스트입니다.', 작성자: 'Carney',    작성시간 : '2020-05-31', 상담상태 : "상담중", status: 'ongoing' },
          { NO: 10, 제목 : '제목 테스트입니다.', 작성자: 'Macdonald', 작성시간 : '2020-05-31', 상담상태 : "상담중", status: 'ongoing' },
          { NO: 9,  제목 : '제목 테스트입니다.', 작성자: 'Shaw',      작성시간 : '2020-05-31', 상담상태 : "상담완료", status: 'complete' },
          { NO: 8,  제목 : '제목 테스트입니다.', 작성자: 'Wilson',    작성시간 : '2020-05-31', 상담상태 : "상담완료", status: 'complete' },
          { NO: 7,  제목 : '제목 테스트입니다.', 작성자: 'Carney',    작성시간 : '2020-05-31', 상담상태 : "상담완료", status: 'complete' }
        ]
    }
  },

  methods: {
    onSlideStart(slide) {
      this.sliding = true
    },
    onSlideEnd(slide) {
      this.sliding = false
    },
    status(item, type) {
        if (!item || type !== 'row') return
        if (item.status === 'register') return 'table-success'
      }
  },
  computed: {
      rows() {
        return this.items.length
      }
  },

}
</script>

<style lang="css" scoped>

ul { list-style-type: none; padding: 0; }
li { display: inline-block; margin: 0 10px; }
a { color: #42b983; }

.card { border: 0; }

.pagination{ padding-left: 10%;}
 
.card-body { padding: 1rem 0.5rem; }
.col { height: 100%; }
.btn-info{ background-color: rgb(13 110 253 / 25%); }

.btn-info{ float:right; }
.main_button{ font-size: 2.5rem; font-family: arial; }
.main_tel1 { float:left; font-size:2rem; }
.main_tel2 { font-size:1.5rem; font-weight:bold }
.main_tel3{ display: none;}
.btn-secondary{ background-color: #32a4c5a8; border: 0; border-radius: 20px / 25px; }
.btn-secondary:hover{ background-color: #0a47a2d1; }
.btn-success { background-color: #8bd29196; border: 0; border-radius: 20px / 25px; }
.btn-success:hover{ background-color: #116d1996; }
.kakao {height: 5rem; width: 25rem; }
.button_q { font-size: 2.5rem; }
.success_btn { width:100%; height: 5rem; }
.status{ font-size: 1rem;}

@media (max-width: 576px) {
  table { font-size:0.5rem; }

  .card-body { padding: 0; }
  .btn{ margin-top: 2%; }
  .main_button{ font-size: 1.5rem; }
  .button_q{ font-size: 1.5rem; }
  .success_btn{ height: 3rem; font-size: 1.5rem}
  .main_tel1{ font-size:1.5rem; font-weight: bold;     float: none; }
  .main_tel2{ display: none;}
  .main_tel3{ display: inline; font-size:1.5rem;}
  .kakao{ height: 4rem; width: 22rem; }
  .status{ font-size: 0.5rem;}
}
</style>

