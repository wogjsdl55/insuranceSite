<template>
    <b-container >
      <b-row id="top">
        <topArea/>
      </b-row>
      
      <b-row>
          <b-container class="bv-example-row">
            <h3 v-if="this.$route.params.res.data[1] ===0">
             성별 :  {{ gender }}, 생일: {{ userBrith }}, 번호: {{ userTel }} 
            </h3>
            
            <b-form inline @submit="onSubmit">
                <b-card>
                    <b-form-input
                    id="input-1"
                    v-model="subject"
                    placeholder="제목을 입력해주세요."
                    required
                    class="subject"
                    >
                    </b-form-input>
              </b-card>
              <b-card>
                  <b-form-group v-slot="{ ariaDescribedby }">
                    <b-form-checkbox-group
                      id="checkbox-group-1"
                      v-model="checkOption"
                      :options="checkOptions"
                      :aria-describedby="ariaDescribedby"
                      name="flavour-1"
                      plain
                    ></b-form-checkbox-group>
                  </b-form-group>
               </b-card>

            </b-form>
            </b-container>
      </b-row>
      <b-row>
         <b-col><h3 style="float: left;">작성자 : {{ userName }}</h3></b-col>
         <b-col><h3>작성일 : {{  $moment(regdate).format('YYYY-MM-DD HH:mm') }}</h3></b-col>
      </b-row>
      <b-row>
        <vue-editor v-model="content" :editor-toolbar="customToolbar"  />
      </b-row>
    <b-row   style="margin-top: 6rem;">
      <b-card bg-variant="default" style="background: #f3f1ee">
          <ul class="demo">
            <li v-for="reply in replys" v-bind:key = "reply.seq">
              {{ reply.comment }}
            </li>
          </ul>
      
      </b-card>
      <b-card bg-variant="default" style="background: #f3f1ee">
         <b-card-text>
            <b-form inline  @submit="onReplySubmit" method="post">
              <b-input-group class="mb-3">
                <b-input-group-prepend is-text>
                  <b-icon icon="reply" ></b-icon>
                </b-input-group-prepend>
                <b-form-input 
                    v-model="form.comment"
                    class="mb-2 mr-sm-8 mb-sm-0"
                    placeholder="댓글을 입력해주시기 바랍니다."
                    required
                >
                </b-form-input>
            </b-input-group>
            <b-button type="submit" variant="primary">댓글등록</b-button>
            </b-form>
         </b-card-text>
      </b-card>
    </b-row>
    
    <b-row>
        <b-col>
          <b-button class="confirm" to="/board" size="lg" variant="primary" v-b-modal.modal>수정</b-button>
          <b-button class="confirm" to="/" size="lg" variant="secondary">취소</b-button>

          <b-modal id="modal" modal-title="no" centered  ok-only okTitle="확인"> 
            <p class="my-4"  style="text-align: center;">
              상담신청시  빠른시일내로 <br>
            </p>
          </b-modal>
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
import { VueEditor } from "vue2-editor";

export default {
  name: 'detail',
  components: {
    'topArea': topArea,
    'footerArea': footerArea,
    VueEditor
  },
  mounted() { 
    //페이지 시작하면은 자동 함수 실행
		this.dataList();
	},
  beforeCreate(){
    if(this.$route.params.res === undefined) { this.$router.go(-1) }
  },
  data() {
      return {
        data: [],
        form: {
          comment:''
        },
        seq: this.$route.params.res.data[0].seq,
        subject: this.$route.params.res.data[0].subject,
        userName: this.$route.params.res.data[0].userName,
        userBrith: this.$route.params.res.data[0].userBrith,
        gender: this.$route.params.res.data[0].gender,
        userTel:this.$route.params.res.data[0].userTel,
        content: this.$route.params.res.data[0].content,
        pwd: this.$route.params.res.data[0].pwd,
        regdate: this.$route.params.res.data[0].regdate,
        checkOption: [this.$route.params.res.data[0].checkOption],
        replys: [],
        customToolbar: [
        []
        ],
        options: [
            { text: '남성', value: 'M' },
            { text: '여성', value: 'W' },
        ],
        checkOptions: [
          { text: '보험료부담',   value: '1' },
          { text: '보장부족',     value: '2' },
          { text: '보장분석',     value: '3' },
          { text: '보험금청구',   value: '4' }
        ]

      }
  },
  methods: {
    dataList(){
      this.data = { "seq": this.seq }
      this.$http.post("/api/boardreplyList", this.data) 
        .then(res => {        
          this.replys = res.data;
        })
        .catch(function (error) {
          alert(error);
        })
    },
     onSubmit() {
        event.preventDefault()
        alert(JSON.stringify(this.form))
      },
      onReplySubmit() {
        event.preventDefault()
   
        this.data = { "comment": this.form.comment, "seq": this.seq, "userName": this.userName, "adminYN" :this.$route.params.res.data[1] }

        this.$http.post("/api/boardReply", this.data) 
        .then(res => {         
          alert('댓글등록이 완료되었습니다.');
        })
        .catch(function (error) {
          alert(error);
        })
      }
  },
  computed: {
      validationName() {
        return this.userName.length > 1 && this.userName.length < 5 ? true : false
      },
      validationBrith(){
        return this.userBrith.length > 6 && this.userBrith.length < 8 ? true : false
      },
      validationTel(){
        return this.userTel.length > 10 && this.userTel.length < 15 ? true : false
      }
    },
}
</script>

<style scoped>

h1, h2 { font-weight: normal; }
ul { list-style-type: none; padding: 0;}
li { display: inline-block; margin: 0 10px; }

.card { border: 0; }
.card-body { padding: 1rem 0.5rem; }
.col { height: 100%; }
.btn-info{ background-color: rgb(13 110 253 / 25%); }

.pagination { float:right; }
.btn-info{ float:right; }
.btn-primary { float:right; }
.btn-secondary { float:right; }
.card-header{ font-size: 2rem; font-weight: bold; padding-right: 88%; }
.input-group-text{ padding: 0.5rem 0.75rem; }
.card-text{ font-size: 1.5rem; }
.gender { width: 39rem; height: 2.5rem; }
.message { font-size: 1rem;}
.bv-no-focus-ring { font-size: 1.5rem; }
.subject { font-size: 2rem; margin-top: 30px; }
.confirm { margin-top: 6rem; margin-left: 0.5rem;}

@media (max-width: 576px) {
  .message { font-size: 0.5rem;}
  .card-header{ padding-right: 0; }
  .card-body { padding-top: 1rem;}
  .card-text{ font-size: 10px;}
  .btn-group-toggle{ width: 9.5rem; }
  .bv-no-focus-ring { font-size: 0.7rem; }
  .subject { font-size: 1rem; margin-top: 20px; }
}
</style>
