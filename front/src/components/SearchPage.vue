<template>
    <b-container style="zoom: 80%;">>
      <b-row id="top">
        <topArea/>
      </b-row>
      
      <b-row>
        <b-container class="bv-example-row">
 
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
  name: 'SearchPage',
  components: {
    'topArea': topArea,
    'footerArea': footerArea,
  },  

  data() {
  },
  methods: {

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


@media (max-width: 576px) {
}
</style>
