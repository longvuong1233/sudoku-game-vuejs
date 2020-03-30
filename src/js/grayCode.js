export default class GrayCode{
    constructor(){
        this.comb=[];
    }
    comRevoluting(c,k){
        let ar=[];
        let tempt=[];
        for (let index = 0; index < k; index++) {
            ar.push(index+1);
            tempt.push(ar[index]);
        }
        let r=ar.length;
        let j=r-1;
        this.comb.push(tempt);
        out:while(true){
            let j_old=j;
            while(j>=0 && ar[j]==c-r+j+1){
                j--;
            }
            if(j>=0){
                ar[j]++;
                if(j!=j_old){
                    for (let index = j+1; index <=r-1 ; index++){
                        ar[index]=ar[index-1]+1;
                    }
                    j=r-1;
                }
                tempt=[];
                ar.forEach(element => {
                    tempt.push(element);
                });
                this.comb.push(tempt);
            }
            else{
                break out;
            }
        }
        return this.comb;
    }
}