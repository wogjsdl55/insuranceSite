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
                          <b-form-invalid-feedback :state="validationName"  style="font-size: 0.5rem;">
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
                          <b-form-invalid-feedback :state="validationBrith">
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
                              v-model="tel"
                              id="inline-form-input-name"
                              :state="validationName"
                              class="mb-2 mr-sm-8 mb-sm-0"
                              placeholder="010-0000-0000"
                          >
                          </b-form-input>
                          <b-form-invalid-feedback :state="validationName"  style="font-size: 0.5rem;">
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
                      style="font-size: 2rem; margin-top: 30px;"
                    ></b-form-input>



              </b-card>
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


export default {
  name: 'App',
  components: {
    'topArea': topArea,
    'footerArea': footerArea,
  },
    data() {
      return {
        userName: '',
        userBrith: '',
        gender: 'M',
        tel:'',
        subject: '',
        checkbox:'',
        options: [
            { text: '남성', value: 'M' },
            { text: '여성', value: 'W' },
        ],
        checkOptions: [
          { text: 'Orange', value: 'orange' },
          { text: 'Apple', value: 'apple' },
          { text: 'Pineapple', value: 'pineapple' },
          { text: 'Grape', value: 'grape' }
        ]

      }
  },
  method: {
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

.card-header{
  font-size: 2rem;
  font-weight: bold;
  padding-right: 88%;
}

.input-group-text{
  padding: 0.5rem 0.75rem;
}
.card-text{
  font-size: 1.5rem;
}
.gender {
  width: 39rem;
  height: 2.5rem;
}

@media (max-width: 576px) {
  .card-header{
    padding-right: 0;
  }
  .card-body {
    padding-top: 1rem;
  }
  .card-text{
    font-size: 10px;
  }
  .btn-group-toggle{
    width: 9.5rem;
  }
}
</style>
