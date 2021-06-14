<template>
    <b-container >
      <b-row id="top">
        <topArea/>
      </b-row>
      
      <b-row>
          <b-container class="bv-example-row">
            <b-form inline>
                <b-card>
                    <b-form-input
                    id="input-1"
                    v-model="subject"
                    placeholder="제목을 입력해주세요."
                    required
                    class="subject"
                    >
                    {{ $route.detail }}
                    </b-form-input>
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

    <b-card bg-variant="dark" text-variant="white" title="Card Title">
        <b-card-text>
            With supporting text below as a natural lead-in to additional content.
        </b-card-text>
        <b-button href="#" variant="primary">Go somewhere</b-button>
    </b-card>
    
    <b-row>
        <b-col>
          <b-button class="confirm" to="/board" size="lg" variant="primary" v-b-modal.modal>등록</b-button>
          <b-button class="confirm" to="/board" size="lg" variant="secondary">취소</b-button>

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
