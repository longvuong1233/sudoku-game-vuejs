export default class Permumation{
    constructor(){
        this.list=[];
    }
    swap(arr,i,j){
        let tempt= arr[i];
        arr[i]=arr[j];
        arr[j]=tempt;
    }
    permute(arr,l,r){
        if(l==r){
            var tempt=[];
            arr.forEach(element => {
                tempt.push(element);
            });
            this.list.push(tempt);
        }
        else{
            for (let index = l; index <= r; index++) {
                this.swap(arr,l,index);
                this.permute(arr,l+1,r);
                this.swap(arr,l,index);
                
            }
        }
    }
    permute_ex(){
        var arr=[1,2,3];
        this.permute(arr,0,2);
        return this.list;
    }


} 