<template>
    <div>
      <b-container>
        <b-row id="top">
          <topArea/>
        </b-row>
      </b-container>
        <b-row>
            <b-carousel
              v-model="slide"
              :interval="1000000"    
              indicators
              @sliding-start="onSlideStart"
              @sliding-end="onSlideEnd"
              img-width="1024"
              img-height="300"
              style="text-shadow: 1px 1px 2px #333;"
            >
              <!-- Slides with image only -->
              <b-carousel-slide
                img-src="https://picsum.photos/1024/480/?image=52"
                class="main_big_img"
              ></b-carousel-slide>

          <!-- Slides with custom text -->
          <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=54">
            <h1>Hello world!</h1>
          </b-carousel-slide>

          </b-carousel>
        </b-row>
      <b-container>
        <b-row>
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
                  <b-col style="padding-bottom: 1rem;"><b-img class="kakao" :src="require('../assets/main/kakao_plus_img.png')" @click="kakao"></b-img></b-col>

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
        </b-row>
        <b-row>
          <h2 style="font-weight:bold; padding-top: 3rem;">상담문의 게시판</h2>
          <b-card>
            <b-table 
              :items="items" 
              :fields="fields"
              outlined
              hover
              noCollapse
              :per-page="perPage"
              :current-page="currentPage"
              selectable
              select-mode="single"
              @row-selected="clickEvent"
            >
              <template #table-colgroup="scope">
                <col
                  v-for="field in scope.fields"
                  :key="field.key"
                  class="subject"
                  :style="{ width: field.key === 'subject' ? '500px' : '100px' }"
                >
              </template>
              
              <template v-slot:cell(subject)="data">
                <span v-html ="data.value" style="float:left;">{{ data.value }}</span>
              </template>
              
              <template v-slot:cell(userName)="data">
                <span>{{ data.value.replace(/.$/, "*") }}</span>
              </template>

              <template v-slot:cell(regdate)="data">
                <span>{{ $moment(data.value).format('YYYY-MM-DD HH:mm') }}</span>
              </template>

              <template v-slot:cell(counselStatus)="data">
                <b-button v-if="data.item.counselStatus ==='0'"  variant="danger" > 상담중 </b-button>
                <b-button v-if="data.item.counselStatus ==='1'"  variant="warning"> 상담신청 </b-button>
                <b-button v-if="data.item.counselStatus ==='2'"  > 상담완료 </b-button>
            </template>
            </b-table>

            <b-modal
                :id="'pwdCheck'"
                ref="modal"
                @ok="handleOk"
                ok-title="확인"
                cancel-title="취소"
                centered
              >
                <form ref="form" @submit.stop.prevent="handleSubmit">
                  <b-form-group
                    label="비밀번호 입력"
                    label-for="name-input"
                    invalid-feedback="비밀번호를 입력해주시기 바랍니다."
                    :state="nameState" 
                  >
                    <b-form-input
                      id="name-input"
                      v-model="pwd"
                      :state="nameState"
                      required
                    ></b-form-input>
                  </b-form-group>
                </form>
              </b-modal>
          </b-card>

          <b-col>
            <b-button to="/board" size="sm" style="color: white; font-weight: bold;  width: 5rem;     margin-top: 0%;" variant="info">글쓰기</b-button>
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
    </div>
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
  mounted() { 
    //페이지 시작하면은 자동 함수 실행
		this.dataList();
	},
  data() {
    return {
      pwd:'',
      slide: 0,
      sliding: null,
      currentPage: 1,
      perPage: 10,
      seq: '',
      subject: '',
      userName: '',
      regdate: '',
      counselStatus: '',
      nameState: null,
      fields: [ { key: 'seq', label: '번호'}, { key: 'subject', label: '제목'} , { key: 'userName', label: '작성자'}, { key: 'regdate', label: '작성일'}, { key: 'counselStatus', label: '상당상태'} ],
      items: [],
    }
  },

  methods: {
    dataList(){
      this.$http.get("/api/boardList") 
        .then(res => {         
          this.items = res.data;
        })
        .catch(function (error) {
          alert(error);
        })
    },
    clickEvent(item) {
      this.seq = item[0].seq;
      this.$bvModal.show("pwdCheck");
    },
    onSlideStart(slide) {
      this.sliding = true
    },
    onSlideEnd(slide) {
      this.sliding = false
    },
    status(item, type) {
        if (!item || type !== 'row') return
        if (item.status === 'register') return 'table-success'
    },
    checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.nameState = valid
        return valid
      },
      handleOk(bvModalEvt) {
        // Prevent modal from closing
        bvModalEvt.preventDefault()
        // Trigger submit handler
        this.handleSubmit()
      },
      kakao(){
        this.$kakao.Channel.addChannel({
          channelPublicId: '_xcLqmC',
        })
      },
      handleSubmit() {
        // Exit when the form isn't valid
        if (!this.checkFormValidity()) {
          return
        }
        this.$http.post("/api/boardCheck", { seq: this.seq, pwd: this.pwd}) 
        .then(res => {      
          if(res.data == '0'){
            alert('비밀번호가 일치하지않습니다.');
          }else {
            this.$router.push( { name : 'BoardDetail', params : { res } });
          }
        })
        .catch(function (error) {
          alert(error);
        })

        
        this.$nextTick(() => {
          this.$bvModal.hide('modal-prevent-closing')
        })
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
.btn-danger{ border-radius: 20px / 25px; color: white; }
.btn-warning{ border-radius: 20px / 25px; color: white; }
.main_big_img  { height: 40rem;}
.kakao:hover { cursor: pointer; }

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
  .btn-secondary{ font-size: 0.5rem; }
  .btn-danger{ font-size: 0.5rem; }
  .btn-warning{ font-size: 0.5rem; }
  .main_big_img { height: 10rem;  }
}
</style>

