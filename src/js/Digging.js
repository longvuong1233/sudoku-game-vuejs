import GrayCode from './grayCode'
var grayCode= new GrayCode();
export default class Digging{
    find(a,element,l,r){
        
        if(r>=l){
            let mid=l+Math.ceil((r-l)/2);
            if(a[mid]==element){
                return 1;
            }
            if(a[mid]>element){
                return this.find(a,element,l,mid-1);
            }
            return this.find(a,element,mid+1,r);
        }
        return -1;
    }
    digging(sudoku, number_digging){
        let sudoku_digging=[];
        for(let i=0;i<9;i++){
            sudoku_digging.push([-1,-1,-1,-1,-1,-1,-1,-1,-1]);
        }
        let comb_sudoku_dig=grayCode.comRevoluting(9,number_digging);
        for(let z=1;z<=9;z++){
            let position_digging=comb_sudoku_dig[Math.floor(Math.random()*comb_sudoku_dig.length)];
            let index=1;
            for(let i=0;i<3;i++){
                for(let j=0;j<3;j++){
                    let k=0;
                    switch(z){
                        case 1: case 2: case 3:{
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
                    k+=i;
                    let l=((z-1)%3)*3+j;
                    if(this.find(position_digging,index,0,position_digging.length-1)==1){
                        sudoku_digging[k][l]=null;
                    }
                    else{
                        sudoku_digging[k][l]=sudoku[k][l];
                    }
                    index++;
                }
            }
        }
        return sudoku_digging;
        
    }
}