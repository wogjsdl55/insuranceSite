<template>
    <div style="zoom: 90%;">
      <b-container>
        <b-row id="top">
          <topArea/>
        </b-row>

        <b-row>
             <carousel class="carousel" :per-page="1" :mouse-drag="false" loop autoplay :autoplayTimeout = "10000" >
              <slide>
                <b-img :src="require('../assets/main/main_img.png')"  style="width: 100%;" />
              </slide>
              <slide>
                <b-img :src="require('../assets/main/main_img2.png')" style="width: 100%;"  />
              </slide>
              <slide>
                <b-img :src="require('../assets/main/main_img3.png')"  style="width: 100%;" />
              </slide>
            </carousel>
        </b-row>
        <b-row>
            <b-card-group>
              <b-card>
                <b-col size="sm">
                  <b-card  style="height: 120%;">
                    <b-button size="lg" style="width:100%; height: 80%;" white  v-b-modal.modal-multi-1><b class="main_button">상담문의 하기</b></b-button>
                  </b-card>
                </b-col>

                  <b-modal id="modal-multi-1" size="md" title="상담문의" centered ok-only okTitle='취소' no-stacking buttonSize= 'lg' footerClass= 'p-2'>
                    <b-button style="height: 5rem; float: left;" v-b-modal.modal-multi-2>전화 상담문의(연락처만 작성)</b-button>
                    <b-button style="height: 5rem; float: right; padding-top: 1.8rem;" to="/board" >게시판 상담문의(글 작성)</b-button>
                  </b-modal>

                  <b-modal id="modal-multi-2" title="전화 상담문의" okTitle='제출' ok-only centered @ok="Ok">
                    <b-form inline  ref="form" @submit.stop.prevent="Submit" method="post">
                      <b-row>
                          <b-col>
                              <b-input-group class="mb-3">
                                <b-input-group-prepend is-text>
                                  <b-icon icon="person-fill" ></b-icon>
                                </b-input-group-prepend>
                                <b-form-input 
                                    v-model="form.userName"
                                    id="inline-form-input-name"
                                    :state="validationName"
                                    class="mb-2 mr-sm-8 mb-sm-0"
                                    placeholder="이름"
                                    required
                                >
                                </b-form-input>
                                <b-form-invalid-feedback :state="validationName" class="message">
                                  이름을 작성해주시기 바랍니다
                                </b-form-invalid-feedback>
                              </b-input-group>
                          </b-col>
                      </b-row>
                      <b-row>
                           <b-col>
                            <b-input-group class="mb-3">
                                <b-input-group-prepend is-text>
                                  <b-icon icon="telephone-fill" ></b-icon>
                                </b-input-group-prepend>
                                <b-form-input 
                                    v-model="form.userTel"
                                    id="inline-form-input-name"
                                    :state="validationTel"
                                    class="mb-2 mr-sm-8 mb-sm-0"
                                    placeholder="010-0000-0000"
                                    required
                                >
                                </b-form-input>
                                <b-form-invalid-feedback :state="validationTel" class="message">
                                  휴대폰 번호 확인바랍니다
                                </b-form-invalid-feedback>
                              </b-input-group>
                        </b-col>
                      </b-row>

                      <b-row>
                          <b-col>
                            <b-form-group v-slot="{ ariaDescribedby }">
                              <b-form-checkbox-group
                                id="checkbox-group-1"
                                v-model="form.checkOption"
                                :options="checkOptions"
                                :aria-describedby="ariaDescribedby"
                                name="flavour-1"
                                plain
                              ></b-form-checkbox-group>
                            </b-form-group>
                            <b-form-select v-model="form.area" :options="areaName" class="select" style="margin-left: 0rem; float:right;"></b-form-select>
                          </b-col>
                      </b-row>
                    </b-form>
                  </b-modal>

              </b-card>

            <b-card>
              <b-card>
                  <b-col style="padding-bottom: 0.5rem;"><b-img class="kakao" :src="require('../assets/main/kakao_plus_img.png')" @click="kakao"></b-img></b-col>

                  <b-col><a><b-button  variant="success" size="sm" class="success_btn" ><b class="button_q">내보험 설명서</b></b-button></a></b-col>
                </b-card>
            </b-card>

              <b-card>
                  <b-col>
                    <b-card-text>
                        <span class="main_tel1" style="padding-top: 1rem; font-weight: bold;" >Kim & Lim 전화번호</span><br>
                        <span class="main_tel3" >임동우 010-5427-3793 <br></span>
                        <span class="main_tel3" >김수경 010-6744-3789 </span>
                        <br>
                        <br>
                        <br>
                        <span class="main_tel2" >임동우 010-5427-3793 </span><br>
                        <span class="main_tel2" >김수경 010-6744-3789 </span>
                    </b-card-text>
                  </b-col>
              </b-card>
          </b-card-group>
        </b-row>
        <b-row>
          <h2 style="font-weight:bold; padding-top: 3rem;">상담문의 게시판</h2>
          <b-col>
            <!-- <b-form-select v-model="selected" :options="options" class="select"></b-form-select>
            <b-form-input v-model="search" class="search"></b-form-input> -->
            <b-input-group class="mb-3">
              <b-input-group-prepend is-text >
                <b-icon icon="search" ></b-icon>
              </b-input-group-prepend>
              <b-form-input
                id="filter-input"
                v-model="filter"
                type="search"
              ></b-form-input>
            </b-input-group>
          </b-col>
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
              :filter="filter"
              :filter-included-fields="filterOn"
              @filtered="onFiltered"
            >
              <template #table-colgroup="scope">
                <col
                  v-for="field in scope.fields"
                  :key="field.key"
                  class="subject"
                  :style="{ width: field.key === 'subject' ? '200px' : '100px' }"
                >
              </template>
              
              <template v-slot:cell(subject)="data">
                <span v-html ="data.value" class="subject_tb"> {{ data.value }}</span>
              </template>

              <template v-slot:cell(userName)="data" >
                <span v-if="data.value === '관리자'" style="font-weight:bold" > {{ data.value }}</span>
                <span v-if="data.value !== '관리자'"> {{ data.value.replace(/.$/, "*") }}</span>
              </template>

              <template v-slot:cell(regdate)="data">
                <span>{{ $moment(data.value).format('YYYY-MM-DD HH:mm') }}</span>
              </template>

              <template v-slot:cell(counselStatus)="data">
                <b-button v-if="data.item.counselStatus ==='0'"  variant="danger" > 상담중 </b-button>
                <b-button v-if="data.item.counselStatus ==='1'"  variant="warning"> 상담신청 </b-button>
                <b-button v-if="data.item.counselStatus ==='2'"  > 상담완료 </b-button>
                <b-button v-if="data.item.counselStatus ==='3'"  > 공지 </b-button>
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
import topArea from './TopArea.vue';
import footerArea from './FooterArea.vue';
import { Buffer } from 'buffer';

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
       form: {
        userName: '',
        userPwd: '',
        userBrith: '',
        gender: 'M',
        userTel:'',
        subject: '',
        checkbox:[],
        content: "",
        checkOption: [],
        area: '서울'
      },
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
      notice: '',
      fields: [ { key: 'seq', label: '번호'}, { key: 'subject', label: '제목'} , { key: 'userName', label: '작성자'}, { key: 'regdate', label: '작성일'}, { key: 'counselStatus', label: '상당상태'} ],
      items: [],
      selected: '제목',
      options: ['제목', '작성자'],
      search: '',
      filter: null,
      filterOn: [],
      checkOptions: [
          { text: '보험료부담',   value: '1' },
          { text: '보장부족',     value: '2' },
          { text: '보장분석',     value: '3' },
          { text: '보험금청구',   value: '4' }
        ],
      areaName: [ '서울', '경기', '인천', '강원', '부산', '경남', '대구', '경북', '대전', '충남', '충북', '광주', '전남', '전북', '울산', '제주' ]
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
      this.notice = item[0].notice;

      if(this.notice == "1"){
        this.pwd = "admin"
        this.handleSubmit();
      }else {
        this.$bvModal.show("pwdCheck");
      }
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

        // Exit when the form isn't valid
        if (!this.checkFormValidity()) {
          return
        }

        // Trigger submit handler
        this.handleSubmit()
      },
      kakao(){
        this.$kakao.Channel.addChannel({
          channelPublicId: '_TcewK',
        })
      },
      handleSubmit() {
        var Buffer = require('buffer/').Buffer

        this.$http.post("/api/boardCheck", { seq: this.seq, pwd: this.pwd}) 
        .then(res => {      
          if(res.data == ' '){
            alert('비밀번호가 일치하지않습니다.');
          }else {
            const blob = Buffer.from( res.data[0].content.data );
            const content = blob.toString();
            
            res.data[0].content = content;
            this.$router.push( { name : 'BoardDetail', params : { res } });
          }
        })
        .catch(function (error) {
          alert(error);
        })

        
        this.$nextTick(() => {
          this.$bvModal.hide('modal-prevent-closing')
        })
      },
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      },
      Ok(bvModalEvt) {
        // Prevent modal from closing
        bvModalEvt.preventDefault()
        // Trigger submit handler
        this.Submit()
      },
      
      Submit() {
       event.preventDefault()
       
       if(this.validationTel == false){
         alert("휴대폰 번호 확인바랍니다.");
         return true;
       }
       else {   
          this.form.subject = "전화상담 문의입니다.";
          this.$http.post("/api/boardSubmit", this.form) 
          .then(res => {         
            alert('상담신청이 완료되었습니다.');
            this.$nextTick(() => {
              this.$bvModal.hide('modal-multi-2')
            })
          })
          .catch(function (error) {
            console.log(error);
            alert(error);
          })
        }
      }

  },
  computed: {
      rows() {
        return this.items.length
      },
      validationName() {
        return this.form.userName.length > 1 && this.form.userName.length < 10 ? true : false
      },
      validationBrith(){
        return this.form.userBrith.length > 4 && this.form.userBrith.length < 10 ? true : false
      },
      validationTel(){
        return this.form.userTel.length > 10 && this.form.userTel.length < 15 ? true : false
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
.main_tel2 { font-size:1.7rem; font-weight:bold }
.main_tel3{ display: none;}
.btn-secondary{ background-color: #32a4c5a8; border: 0; border-radius: 20px / 25px; color:white; }
.btn-secondary:hover{ background-color: #0a47a2d1; }
.btn-success { background-color: #8bd29196; border: 0; border-radius: 20px / 25px; }
.btn-success:hover{ background-color: #116d1996; }
.kakao {height: 5rem; width: 25rem; }
.button_q { font-size: 2.5rem; }
.success_btn { width:100%; height: 5rem; }
.status{ font-size: 1rem;}
.btn-danger{ border-radius: 20px / 25px; color: white; }
.btn-warning{ border-radius: 20px / 25px; color: white; }
.main_big_img  { height: 35rem;}
.kakao:hover { cursor: pointer; }
.select { display: inline-block; width: 8rem; height: calc(1.5em + .75rem + 2px); padding: .375rem 1.75rem .375rem .75rem; font-size: 1rem; font-weight: 400; line-height: 1.5; color: #495057; vertical-align: middle; background: #fff url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='5'%3E%3Cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E") no-repeat right .75rem center/8px 10px;  border: 1px solid #ced4da; border-radius: .25rem; -webkit-appearance: none; -moz-appearance: none;appearance: none; margin-left: 50rem;}  
.search{ width:20rem; float:right; }
.input-group { width: 30rem; float: right; padding: 0.5rem;}
.input-group-text { height: 100%;}
.btn-lg{padding: 3.5rem 1rem; }
.subject_tb { float:left;  font-size: 1.2rem; }
div.VueCarousel-pagination {   position: absolute;  margin-top: 25rem; }

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
  .search{ width:13rem; float:right; }
  .select { margin-left: -1rem; }
  .input-group { width: 21rem; }
  .btn-lg{padding: 0.5rem 1rem; }
  .subject_tb { font-size: 0.5rem; }
}
</style>

