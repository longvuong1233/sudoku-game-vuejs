import Permutation from './permutation';
export default class LatinSquare{    
    createLatin(list){
        var latins=[];
        for(let i=0;i<list.length;i++){
            var latin=[];
            for(let m=0;m<3;m++){
                var element=[];
                latin.push(element);
                for(let n=0;n<3;n++){
                    if(m==0){
                        latin[m][n]=list[i][n];
                    }
                    else{
                        let reverse_n=n-1;
                        if(reverse_n<0){
                            reverse_n+=3;
                        }
                        latin[m][n]=latin[m-1][reverse_n];
                    }
                }
            }
            latins.push(latin);
            latin=[];
            for(let m=0;m<3;m++){
                element=[];
                latin.push(element);
                for(let n=0;n<3;n++){
                    let k=m;
                    if(m==1){
                        k=m+1;
                    }
                    else if(m==2){
                        k=m-1;
                    }
                    latin[m][n]=latins[i][k][n];
                }
            }
            latins.push(latin);
        }
        return latins;
    }
    ex_latin(){
        var ex = new Permutation();
        return this.createLatin(ex.permute_ex());
    }


}