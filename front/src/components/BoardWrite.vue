<template>
    <b-container >
      <b-row id="top">
        <topArea/>
      </b-row>
      
      <b-row>
          <b-container class="bv-example-row">
            <b-form inline>
               <b-card border-variant="primary"  header="상담문의" align="left">
                <b-row>
                    <b-col>
                        <b-input-group class="mb-3">
                          <b-input-group-prepend is-text>
                            <b-icon icon="person-fill" ></b-icon>
                          </b-input-group-prepend>
                          <b-form-input 
                              v-model="userName"
                              id="inline-form-input-name"
                              :state="validationName"
                              class="mb-2 mr-sm-8 mb-sm-0"
                              placeholder="이름"
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
                            <b-icon icon="calendar-check" ></b-icon>
                          </b-input-group-prepend>
                          <b-form-input 
                              v-model="userBrith"
                              id="inline-form-input-name"
                              :state="validationBrith"
                              class="mb-2 mr-sm-8 mb-sm-0"
                              placeholder="생년월일 예) 1990101"
                          ></b-form-input>
                          <b-form-invalid-feedback :state="validationBrith" class="message">
                              생년월일을 작성해주시기 바랍니다.
                          </b-form-invalid-feedback>
                        </b-input-group>
                    </b-col>
                    <div class="w-100"></div>

                    <b-col>
                       <b-form-group id="input-group-4" v-slot="{ ariaDescribedby }">
                        <b-form-radio-group
                          class="gender"
                          v-model="gender"
                          :options="options"
                          :aria-describedby="ariaDescribedby"
                          button-variant="outline-primary"
                          name="radios-btn-default"
                          buttons
                        ></b-form-radio-group>
                       </b-form-group>
                  </b-col>
                  <b-col>
                      <b-input-group class="mb-3">
                          <b-input-group-prepend is-text>
                            <b-icon icon="telephone-fill" ></b-icon>
                          </b-input-group-prepend>
                          <b-form-input 
                              v-model="userTel"
                              id="inline-form-input-name"
                              :state="validationTel"
                              class="mb-2 mr-sm-8 mb-sm-0"
                              placeholder="010-0000-0000"
                          >
                          </b-form-input>
                          <b-form-invalid-feedback :state="validationTel" class="message">
                            휴대폰 번호 확인바랍니다
                          </b-form-invalid-feedback>
                        </b-input-group>
                  </b-col>
                
                   <b-card-text align="left" >* 이름은 게시판에 그대로 노출되지 않습니다. 예) 임동우 => 임*우</b-card-text>
                   <b-card-text align="left" >* 생년월일은 비밀번호로 이용됩니다.</b-card-text>
                   <b-card-text align="left" style="color: red;">* 보험상담 특직상 전화번호는 꼭 틀리지 않게 부탁드립니다.</b-card-text>
                </b-row>

                      <b-form-input
                        id="input-1"
                        v-model="subject"
                        placeholder="제목을 입력해주세요."
                        required
                        class="subject"
                      ></b-form-input>
              </b-card>
              <b-card>
                  <b-form-group v-slot="{ ariaDescribedby }">
                    <b-form-checkbox-group
                      id="checkbox-group-1"
                      v-model="checkbox"
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
        <vue-editor v-model="content" :editor-toolbar="customToolbar"  />
      </b-row>

  
      <b-row>  
          <b-input-group>
            <b-input-group-prepend is-text>
              <b-icon icon="telephone-fill" ></b-icon>
            </b-input-group-prepend>
            <b-form-input 
                v-model="userTel"
                :state="validationTel"
                placeholder="010-0000-0000"
                style="width:50px;"
            >
            </b-form-input>
            <b-form-invalid-feedback :state="validationTel" class="message">
              휴대폰 번호 확인바랍니다
            </b-form-invalid-feedback>
          </b-input-group>
      </b-row>
      <b-row>
        <b-col>
          <b-button class="confirm" to="/board" size="lg" variant="primary" v-b-modal.modal>등록</b-button>
          <b-button class="confirm" to="/board" size="lg" variant="secondary">취소</b-button>

          <b-modal id="modal" modal-title="no" centered  ok-only okTitle="확인"> 
            <p class="my-4"  style="text-align: center;">
              상담신청이 완료되었습니다.
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
  name: 'App',
  components: {
    'topArea': topArea,
    'footerArea': footerArea,
    VueEditor
  },
    data() {
      return {
        userName: '',
        userBrith: '',
        gender: 'M',
        userTel:'',
        subject: '',
        checkbox:[],
        content: "",
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
          { text: '보험료부담',   value: '1' },
          { text: '보장부족',     value: '2' },
          { text: '보장분석',     value: '3' },
          { text: '보험금청구',   value: '4' }
        ]

      }
  },
  methods: {
     onSubmit() {
        event.preventDefault()
        alert(JSON.stringify(this.form))
      }
  },

  computed: {
      rows() {
        return this.items.length
      },
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
