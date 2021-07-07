<template>
    <b-container style="zoom: 90%;">
      <b-row id="top">
        <topArea/>
      </b-row>
      
      <b-row>
          <b-container class="bv-example-row">
            <b-form inline  @submit="onSubmit" method="post">
               <b-card border-variant="primary"  header="상담문의" align="left">
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

                    <b-col>
                        <b-input-group class="mb-3">
                          <b-input-group-prepend is-text>
                            <b-icon icon="key-fill" ></b-icon>
                          </b-input-group-prepend>
                          <b-form-input 
                              v-model="form.userPwd"
                              type="password"
                              required
                              placeholder="작성글 비밀번호를 입력바랍니다.">
                          </b-form-input>
                        </b-input-group>
                    </b-col>
                    <div class="w-100"></div>

                    <b-col>
                       <b-form-group id="input-group-4" v-slot="{ ariaDescribedby }">
                        <b-form-radio-group
                          class="gender"
                          v-model="form.gender"
                          :options="genders"
                          required
                          :aria-describedby="ariaDescribedby"
                          button-variant="outline-primary"
                          name="radios-btn-default"
                          buttons
                        ></b-form-radio-group>
                       </b-form-group>
                  </b-col>
                  
                  <div class= "lineCss"></div>
                  <b-col>
                    <b-form-select v-model="form.area" :options="areaName" class="select"></b-form-select>
                  </b-col>
                  <b-col>
                      <b-input-group class="mb-3">
                          <b-input-group-prepend is-text>
                            <b-icon icon="calendar-check" ></b-icon>
                          </b-input-group-prepend>
                          <b-form-input 
                              v-model="form.userBrith"
                              id="inline-form-input-name"
                              :state="validationBrith"
                              class="mb-2 mr-sm-8 mb-sm-0"
                              placeholder="생년월일 예) 1990101"
                              required
                          ></b-form-input>
                          <b-form-invalid-feedback :state="validationBrith" class="message">
                              생년월일을 작성해주시기 바랍니다.
                          </b-form-invalid-feedback>
                        </b-input-group>
                  </b-col>
                   <div class= "lineCss"></div>
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
                
                   <b-card-text align="left" >* 이름은 게시판에 그대로 노출되지 않습니다. 예) 임동우 => 임*우</b-card-text>
                   <b-card-text align="left" style="color: red;">* 보험상담 특직상 전화번호는 꼭 틀리지 않게 부탁드립니다.</b-card-text>
                </b-row>

                      <b-form-input
                        id="input-1"
                        v-model="form.subject"
                        placeholder="제목을 입력해주세요."
                        required
                        class="subject"
                      ></b-form-input>
              </b-card>
              <b-card>
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
          <vue-editor v-model="form.content" :editor-toolbar="customToolbar"  />
        </b-row>

        <b-row>
          <b-col>
            <b-button class="confirm" type="submit" size="lg" variant="primary" >등록</b-button>
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
  name: 'App',
  components: {
    'topArea': topArea,
    'footerArea': footerArea,
    VueEditor
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
        customToolbar: [
          ["bold", "italic", "underline"],
          [{ list: "ordered" }, { list: "bullet" },],
          [{ align: "" }, { align: "center" }, { align: "right" }, { align: "justify" } ],
          ["image"],[{color: [] }]
        ],
        genders: [
            { text: '남성', value: 'M' },
            { text: '여성', value: 'W' },
        ],
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
     onSubmit() {
        event.preventDefault()
        this.$http.post("/api/boardSubmit", this.form) 
        .then(res => {         
          alert('상담신청이 완료되었습니다.');
          this.$router.push('/');
        })
        .catch(function (error) {
          console.log(error);
          alert(error);
        })
      }
  },

  computed: {
      rows() {
        return this.items.form.length
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
.gender { width: 19rem; height: 2.5rem; }
.message { font-size: 1rem;}
.bv-no-focus-ring { font-size: 1.5rem; }
.subject { font-size: 2rem; margin-top: 30px; }
.confirm { margin-top: 8rem; margin-left: 1rem;}
.ql-quillWrapper { stroke: rgb(34 164 234 / 95%);}
.lineCss { display: none;}
.select { display: inline-block; width: 17rem; height: calc(1.5em + .75rem + 2px); padding: .375rem 1.75rem .375rem .75rem; font-size: 1rem; font-weight: 400; line-height: 1.5; color: #495057; vertical-align: middle; background: #fff url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='5'%3E%3Cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E") no-repeat right .75rem center/8px 10px;  border: 1px solid #ced4da; border-radius: .25rem; -webkit-appearance: none; -moz-appearance: none;appearance: none; }  

@media (max-width: 576px) {
  .message { font-size: 0.5rem;}
  .card-header{ padding-right: 0; }
  .card-body { padding-top: 1rem;}
  .card-text{ font-size: 10px;}
  .btn-group-toggle{ width: 21rem; }
  .bv-no-focus-ring { font-size: 0.7rem; }
  .subject { font-size: 1rem; margin-top: 20px; }
  .lineCss { display: block; }
  .select { width: 21rem;  margin-top: 1rem; margin-bottom: 1rem;} 
}
</style>
