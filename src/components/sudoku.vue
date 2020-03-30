<template>
    <div class="container ">
            <div class="p-3">
                <div v-if="!runGame">
                    <div class="input-group mb-3" >
                        <div class="input-group-prepend">
                            <label class="input-group-text" for="inputGroupSelect01">Level</label>
                        </div>
                        <select class="custom-select" id="inputGroupSelect01" v-model="level">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        <div>
                            <button @click='runGame=true' class="btn btn-success">Run Game</button>
                        </div>
                    </div> 
                
                    <div class="jumbotron jumbotron-fluid text-center">
                        <div class="container">
                            <h1>Sudoku Tutorial</h1>
                            <p class='tutorial'>Numbers in rows are not repeated</p>
                            <p class='tutorial'>Numbers in columns are not repeated</p>
                            <p class='tutorial'>Numbers in 3 × 3 blocks are not repeated</p>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div class="alert alert-success alert-dismissible" v-if="alert_sc">
                        <button type="button" class="close" @click='alert_sc=false'>&times;</button>
                        <strong>Success!</strong> Chúc mừng bạn đã hoàn thành câu đố.
                    </div>
                    <div class="alert alert-danger alert-dismissible" v-if="alert_fl">
                        <button type="button" class="close" @click='alert_fl=false'>&times;</button>
                        <strong>Noo!</strong> Bạn sai chỗ nào rồi, kiểm tra lại nhé !
                    </div>
                    <table align="center" >
                        <tr v-for="(row,i) in sudoku_show" :data="row" >
                            <td v-for="(col,j) in row" :data="col">
                                <div v-if='col!=null' >
                                    <input type="number" :value="col" disabled >
                                </div>
                                <div v-else >
                                    <input type="number" v-model="sudoku_diggingHole[i][j]">
                                </div>
                                
                            </td>
                        </tr>
                    </table>
                    <div align="center" class="pt-3">
                        <button @click='check()' class="btn btn-success">Kiểm Tra</button>
                    </div>
                    
                </div>
                
            </div>
    </div>
</template>

<script>
    import latinSquare from '../js/LatinSquare.js'
    import grayCode from '../js/grayCode.js'
    import GrayCode from '../js/grayCode.js';
    import Digging from '../js/Digging.js';

    var Digging_object= new Digging();
    var latins_object= new latinSquare();
    var graycode= new grayCode();
    export default{
        data(){
            return{
                level:1,
                runGame:false,
                latins:[],
                comb:[],
                sudoku_tempt:[],
                sudoku:[],
                sudoku_diggingHole:[],
                sudoku_show:[],
                alert_sc:false,
                alert_fl:false
            }
        },
        methods:{
            check(){
                let same=true;
                out:for(let i=0;i<9;i++){
                    for(let j=0;j<9;j++){
                        if(this.sudoku[i][j]!=this.sudoku_diggingHole[i][j]){
                            this.alert_fl=true;
                            same=false;
                            break out;
                        }
                        
                    }
                }
                if(same==true){
                    this.alert_sc=true;
                    setTimeout(
                        ()=>{
                            this.runGame=false;
                        },3000);
                }
            }
        },
        computed:{
            createSudoku(){
                this.latins=latins_object.ex_latin();
                this.comb=graycode.comRevoluting(12,9);
                var random=Math.floor(Math.random()* this.comb.length);
                var upTo=[];
                for(let i=0;i<3;i++){
                    for(let j=0;j<3;j++){
                        upTo.push(this.latins[this.comb[random][4]-1][i][j]);
                    }
                }
                for(let i=0;i<9;i++){
                    this.sudoku_tempt.push([]);
                }
                let index=0;
                for(let i=1;i<=9;i++){
                    for(let m=0;m<3;m++){
                        for(let n=0;n<3;n++){
                            let k=0;
                            switch(i){
                                case 1:case 2: case 3:{
                                    k=0;
                                    break;
                                }
                                case 4: case 5: case 6:{
                                    k=3;
                                    break;
                                }
                                case 7: case 8: case 9:{
                                    k=6;
                                    break;
                                }
                            }
                            k+=m;
                            let l=((i-1)%3)*3+n;
                            this.sudoku_tempt[k][l]=this.latins[this.comb[random][index]-1][m][n];
                            this.sudoku_tempt[k][l]=this.sudoku_tempt[k][l]+(upTo[index]-1)*3;
                        }
                    }
                    index++;
                }

                
                for(let i=0;i<9;i++){
                    this.sudoku.push([]);
                }
                for(let i=0;i<9;i++){
                    let k=i;
                    for(let j=0;j<9;j++){
                        switch(i){
                            case 1:{
                                k=3;
                                break;
                            }
                             case 3:{
                                k=1;
                                break;
                            }
                             case 2:{
                                k=6;
                                break;
                            }
                             case 6:{
                                k=2;
                                break;
                            }
                             case 5:{
                                k=7;
                                break;
                            }
                             case 7:{
                                k=5;
                                break;
                            }
                        }
                        this.sudoku[i][j]=this.sudoku_tempt[k][j];
                    }
                }
            },
            sudoku_digging(){
                    this.createSudoku;
                    this.sudoku_diggingHole= Digging_object.digging(this.sudoku,this.level);
            }
        },
        watch:{
            runGame:function(newValue){
                if(newValue==true){
                    this.sudoku_digging;
                    for(let i=0;i<9;i++){
                        let tempt=[];
                        tempt=this.sudoku_diggingHole[i].slice();
                        this.sudoku_show.push(tempt);
                    }
                }
                else{
                    this.latins=[],
                    this.comb=[],
                    this.sudoku_tempt=[],
                    this.sudoku=[],
                    this.sudoku_diggingHole=[],
                    this.sudoku_show=[]
                }
            }
        }
       
    }
</script>

<style scoped>
     td {
        border: 1px solid #000000;
        text-align: center;
        vertical-align: middle;  
      }
    table {
        border: 2px solid red ;
      }
      tr:nth-child(3),tr:nth-child(6) {
        border-bottom: 2px solid red ;
      }
      td:nth-child(3), td:nth-child(6){
        border-right: 2px solid red ;  
      }
    input {
        color: #000000;
        padding: 0;
        display: inline-block;
        border: 0;
        vertical-align: top ;
        width: 48px;
        height: 48px;
        text-align: center;
        font-size: 24px;
        background-color: #FFFFFF;
        
        outline: none;
    }
    input[type=number]::-webkit-inner-spin-button, 
    input[type=number]::-webkit-outer-spin-button { 
        -webkit-appearance: none; 
        margin: 0; 
    }
    input:disabled{
        text-align: center;
        width: 48px;
        height: 48px;
        font-size: 24px;
        background-color: #b6c5cb
    }
    .tutorial{
        color: brown;
        font-size: 17px;
    }

</style>