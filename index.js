let verifyField = ()=>{
    let table=[];
    let columns=[];

    // get default rows
    for(let row=0; row<9; row++){
        table.push([]);
        columns.push([]);
        for(let col=0; col<9; col++){
            let val=document.querySelector(".sodoku-table").rows[row].cells[col].innerHTML;
            let colval=document.querySelector(".sodoku-table").rows[col].cells[row].innerHTML;
            val!=""?val=parseInt(val):val=0;
            colval!=""?colval=parseInt(colval):colval=0;
            table[row].push(val);
            columns[row].push(colval);
        }
        
    }


    document.querySelectorAll(".sodoku--td").forEach((x)=>{
        if(Array.from(x.classList).includes("sodoku--td--faulty")){
            x.classList.remove("sodoku--td--faulty");
        }
    });

    let AffectedRow=getResultArr(table);
    let AffectedColumn=getResultArr(columns);
    //let newArr= AffectedRow.concat(AffectedColumn)
    //showWrong(newArr);
    //console.log(AffectedRow,AffectedColumn);
    //console.log(AffectedColumn);
    showWrong(AffectedRow,AffectedColumn);

}

let getResultArr=(arr) =>{
    expected_row=[1,2,3,4,5,6,7,8,9];
    let originpos=0;
    let expectedSum=expected_row.reduce((x,y)=>x+y,0);
    let ResultArr=[];
    arr.filter((x)=>{
        
        if(x.reduce((a,b)=>a+b,0)!==expectedSum){
            ResultArr.push([x,originpos]);
        }
        originpos+=1;
        
    });
    return ResultArr;
}

let showWrong= (arr1,arr2)=>{
    //console.log(AffectedRow);
    let positions=[0,1,2,3,4,5,6,7,8];
    for(let k=0; k<arr1.length; k++){
        for (let m=0; m<positions.length; m++){
            document.querySelector(".sodoku-table").rows[arr1[k][1]].cells[positions[m]].classList.add("sodoku--td--faulty");
        }
        
    }

    for(let r=0; r<arr2.length; r++){
        for (let m=0; m<positions.length; m++){
            document.querySelector(".sodoku-table").rows[positions[m]].cells[ arr2[r][1]].classList.add("sodoku--td--faulty");
        }
        
    }
}








let create_sodoku= () =>{
    let data= [
        [5,3,4,6,7,,9,1,2],
        [6,7,,1,9,5,3,4,8],
        [1,9,8,3,4,2,5,6,7],
        [8,5,9,7,6,,4,2,3],
        [4,2,,8,5,3,7,9,1],
        [7,1,3,9,2,4,8,5,6],
        [,6,1,5,3,7,,8,4],
        [2,8,7,4,1,9,6,3,5],
        [3,,5,2,8,6,1,,9]
    ]

    //console.log(data[0][0]);

    let sodokuBox=document.querySelector(".sodoku-table");
    for(let i=0; i<data.length; i++){
        let tablerow=document.createElement("tr");
        tablerow.className="sodoku--row";
        for (let j=0; j<data[i].length; j++){
            let tabledetail= document.createElement("td");
            data[i][j]!=undefined?tabledetail.innerHTML=data[i][j]:tabledetail.innerHTML="";
            //tabledetail.innerHTML=data[i][j];
            tabledetail.className="sodoku--td";
            tabledetail.contentEditable=true;
            //tabledetail.addEventListener('onkeyup',verifyField);
            tablerow.appendChild(tabledetail);

            
        }
        
        sodokuBox.appendChild(tablerow);
        
        
    }
    /*if(document.querySelectorAll(".sodoku--td").classList.includes("sodoku--td--faulty")){
        document.querySelectorAll(".sodoku--td").classList.remove("sodoku--td--faulty");
    }*/

    

    document.querySelectorAll(".sodoku--td").forEach((x)=>x.onkeyup=verifyField);
    
}

create_sodoku();



