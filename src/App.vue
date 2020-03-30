<template>
  <div id="app" class="container p-4">
       <sudoku ></sudoku>
  </div>
</template>

<script>
import sudoku from './components/sudoku.vue'
export default {
  data(){
    return{
    }
  },
  components:{
    sudoku: sudoku
  }
}
</script>

<style>

</style>
