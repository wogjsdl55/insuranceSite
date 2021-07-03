<template>
    <b-container style="zoom: 80%;">
      <b-row id="top">
        <topArea/>
      </b-row>
      
      <b-row>
          <b-container class="bv-example-row">
            <h3 v-if="this.admin === '1' && this.notice === '0' ">
             성별 :  {{ gender }}, 생일: {{ userBrith }}, 번호: {{ userTel }} , 지역: {{ area }}
            </h3>
            
            <b-form inline @submit="onSubmit" method="post">
                  <b-card>
                     <b-form-group v-slot="{ ariaDescribedby }" v-if="this.admin === '0' && this.notice === '0'">
                      <b-form-radio-group
                        id="radio-group-1"
                        v-model="form.counselStatus"
                        :options="csStatusList"
                        :aria-describedby="ariaDescribedby"
                        plain
                        name="radio-options"
                      ></b-form-radio-group>
                    </b-form-group>
                    
                    
                     <b-form-input id="input-1" v-model="form.subject" placeholder="제목을 입력해주세요." required class="subject" v-if="this.notice === '0'" > </b-form-input>
                     <p class="subject_font" v-html="form.subject" v-if="this.notice === '1'"></p>
                </b-card>
                <b-card v-if="this.notice === '0'">
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
                </b-card>
          <b-row>
            <b-col><h3 class="info" style="float: left;">작성자 : {{ userName }}</h3></b-col>
            <b-col><h3 class="info" >작성일 : {{  $moment(regdate).format('YYYY-MM-DD HH:mm') }}</h3></b-col>
          </b-row>
          <b-row  v-if="this.notice === '0'" class="content" >
            <vue-editor v-model="form.content" :editor-toolbar="customToolbar" useCustomImageHandler  @image-added="handleImageAdded" />
          </b-row>

          <b-row  v-if="this.notice === '1'" class="content">
            <vue-editor v-model="form.content" :editor-toolbar="noticeToolbar"  disabled />
          </b-row>

        <b-row   style="margin-top: 6rem; overflow: auto; height: 25rem;">
          <b-card bg-variant="default" v-if="this.notice === '0'" style="background-color: lightgray;">
              <ul class="demo">
                <li v-for="reply in replys" v-bind:key = "reply.seq" style="width: 100%;">
                  <p  v-if="reply.adminYN === '0'" style="float:left">
                      <b-button variant="light" disable class="replycss">
                          {{ reply.comment }}
                      </b-button>
                      {{ $moment(reply.regdate).format('A HH:mm') }}
                  </p>
                  <p  v-if="reply.adminYN === '1'" style="float:right">
                      {{ $moment(reply.regdate).format('A HH:mm') }}
                      <b-button variant="success" disable class="replycss" >
                        {{ reply.comment }}
                      </b-button>
                  </p>
                </li>
              </ul>
          
          </b-card>
        </b-row>
        <b-row>
         <b-card bg-variant="default" v-if="this.notice === '0'">
            <b-card-text >
                <b-form inline  @submit="onReplySubmit" method="post" >
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
                <b-button type="submit" variant="primary" >댓글등록</b-button>
                </b-form>
            </b-card-text>
          </b-card>
        </b-row>
        <b-row v-if="this.notice === '0'">
            <b-col>
              <b-button class="confirm" type="submit" size="lg" variant="primary" >수정</b-button>
              <b-button class="confirm" size="lg" variant="danger" @click="deleteBoard" >삭제</b-button>
              <b-button class="confirm" to="/" size="lg" variant="secondary">취소</b-button>     
            </b-col>
          </b-row>
      </b-form>
      </b-container>
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
  data() {

      if(this.$route.params.res != undefined) {
        sessionStorage.setItem("userName", this.$route.params.res.data[0].userName);
        sessionStorage.setItem("adminYN", this.$route.params.res.data[0].adminYN);
        sessionStorage.setItem("regdate", this.$route.params.res.data[0].regdate);
        sessionStorage.setItem("userBrith", this.$route.params.res.data[0].userBrith);
        sessionStorage.setItem("gender", this.$route.params.res.data[0].gender);
        sessionStorage.setItem("userTel", this.$route.params.res.data[0].userTel);
        sessionStorage.setItem("notice", this.$route.params.res.data[0].notice);
        sessionStorage.setItem("area", this.$route.params.res.data[0].area);
        sessionStorage.setItem("counselStatus", this.$route.params.res.data[0].counselStatus);
        sessionStorage.setItem("seq", this.$route.params.res.data[0].seq);
        sessionStorage.setItem("subject", this.$route.params.res.data[0].subject);
        sessionStorage.setItem("content", this.$route.params.res.data[0].content);
        sessionStorage.setItem("checkOption",  this.$route.params.res.data[0].checkOption);
        sessionStorage.setItem("admin",  this.$route.params.res.data[1]);
      }

      return {
        data: [],
        userName: sessionStorage.getItem("userName"),
        adminYN: sessionStorage.getItem("adminYN"),
        regdate: sessionStorage.getItem("regdate"),
        userBrith: sessionStorage.getItem("userBrith"),
        gender: sessionStorage.getItem("gender"),
        userTel: sessionStorage.getItem("userTel"),
        notice: sessionStorage.getItem("notice"),
        area: sessionStorage.getItem("area"),
        admin: sessionStorage.getItem("admin"),
        form: {
          comment:'',
          pwd: '',
          counselStatus: sessionStorage.getItem("counselStatus"),
          seq: sessionStorage.getItem("seq"),
          subject: sessionStorage.getItem("subject"),
          content: sessionStorage.getItem("content"),
          checkOption: sessionStorage.getItem("checkOption").split(','),
        },
        replys: [],
        noticeToolbar: [
          []
        ],
        customToolbar: [
          ["bold", "italic", "underline"],
          [{ list: "ordered" }, { list: "bullet" },],
          [{ align: "" }, { align: "center" }, { align: "right" }, { align: "justify" } ],
          ["image"],[{color: [] }]
        ],
        options: [
            { text: '남성', value: 'M' },
            { text: '여성', value: 'W' },
        ],
        checkOptions: [
          { text: '보험료부담',   value: 1 },
          { text: '보장부족',     value: 2 },
          { text: '보장분석',     value: 3 },
          { text: '보험금청구',   value: 4 }
        ],
        csStatusList: [
          { text: '상담중',       value: 0 },
          { text: '상담신청',     value: 1 },
          { text: '상담완료',     value: 2 },
        ]

      }
  },
  methods: {
    dataList(){
      this.data = { "seq": this.form.seq }
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
        this.$http.post("/api/boardUpdate", this.form) 
        .then(res => {         
          alert('수정 되었습니다.');
          this.$router.go(-1);
        })
        .catch(function (error) {
          alert(error);
        })
      },
      onReplySubmit() {
        event.preventDefault()
   
        this.data = { "comment": this.form.comment, "seq": this.form.seq, "userName": this.userName, "adminYN" :this.admin }
        this.$http.post("/api/boardReply", this.data) 
        .then(res => {         
          alert('댓글등록이 완료되었습니다.');
          this.dataList();
        })
        .catch(function (error) {
          alert(error);
        })
      },
      deleteBoard(){
        event.preventDefault()
        this.$bvModal.msgBoxConfirm('정말 삭제하시겠습니까?', {
          okTitle: '확인',
          cancelTitle: '취소',
          okVariant: 'danger',
          buttonSize: 'sm',
          centered: true
        })
          .then(value => {

            this.$http.post("/api/boardDelete", this.form) 
            .then(res => {         
              alert('삭제 되었습니다.');
              this.$router.go();
            })
            .catch(function (error) {
              alert(error);
            })
          })
          .catch(err => {
            // An error occurred
          })
      },
      handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {

      var formData = new FormData();      
      formData.append("image", file);


      this.$http.post("/api/upload", formData) 
        .then(result => {
          
          var fileName = result.data; // Get url from response
          Editor.insertEmbed(cursorLocation, "image", '/public/static/img' + fileName);
          resetUploader();
        })
        .catch(err => {
          alert('파일 업로드에 실패했습니다.');
        });
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
      },
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
.btn-danger { float:right; }
.btn-secondary { float:right; }
.card-header{ font-size: 2rem; font-weight: bold; padding-right: 88%; }
.input-group-text{ padding: 0.5rem 0.75rem; }
.card-text{ font-size: 1.5rem; }
.gender { width: 39rem; height: 2.5rem; }
.message { font-size: 1rem;}
.bv-no-focus-ring { font-size: 1.5rem; }
.subject { font-size: 2rem; margin-top: 30px; }
.confirm { margin-top: 6rem; margin-left: 0.5rem;}
.replycss { font-size: 1.2rem; font-weight: 400; }
.info {font-size: calc(1.2rem + 0.6vw); }
.subject_font { float: left; font-size: 2.5rem; }
.content { height: 50rem; overflow: scroll; }

@media (max-width: 576px) {
  .message { font-size: 0.5rem;}
  .card-header{ padding-right: 0; }
  .card-body { padding-top: 1rem;}
  .card-text{ font-size: 10px;}
  .btn-group-toggle{ width: 9.5rem; }
  .bv-no-focus-ring { font-size: 0.7rem; }
  .subject { font-size: 1rem; margin-top: 20px; }
  .replycss{ font-size: 1rem; font-weight: 400;}
  .info {font-size: calc(0.5rem + 0.6vw); }
  .subject_font { font-size: 1.5rem; }
  .content { height: 30rem; overflow: scroll; }
}
</style>
