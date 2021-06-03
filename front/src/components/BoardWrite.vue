<template>
    <b-container >
      <b-row id="top">
        <topArea/>
      </b-row>
      <b-row>
          <b-form inline>
          <b-container class="bv-example-row">
            <b-row>
                <b-col>
                    <b-form-input 
                         v-model="userName"
                        id="inline-form-input-name"
                        :state="validationName"
                        class="mb-2 mr-sm-8 mb-sm-0"
                        placeholder="이름"
                        size="lg"
                    ></b-form-input>
                    <b-form-invalid-feedback :state="validationName">
                       이름을 제대로 작성해주시기 바랍니다.
                    </b-form-invalid-feedback>
                </b-col>

                <b-col>
                     <b-form-input 
                         v-model="userBrith"
                        id="inline-form-input-name"
                        :state="validationBrith"
                        class="mb-2 mr-sm-8 mb-sm-0"
                        placeholder="생년월일 예) 1990101"
                        size="lg"
                    ></b-form-input>
                    <b-form-invalid-feedback :state="validationBrith">
                        생년월일을 작성해주시기 바랍니다.
                    </b-form-invalid-feedback>
                </b-col>
                <div class="w-100"></div>
                <b-col>Column</b-col>
                <b-col>Column</b-col>
            </b-row>
            </b-container>
          </b-form>
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
      userName: '',
      userbirth: '',
    }
  },

  computed: {
      rows() {
        return this.items.length
      },
      validationName() {
        return this.userName.length > 1 && this.userName.length < 5 ? true : false
      },
      validationBrith() {
        return this.userBirth.length > 6 && this.userBirth.length < 8 ? true : false
      },
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
