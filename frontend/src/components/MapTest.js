import Slots from './slots'
import { useState } from 'react';
import {useEffect} from 'react'
import Popup from 'reactjs-popup';
import './MapTest.css'
function MapTest({shelf,row,col}){

    //Making dynamic map
    let mainList=[];
    for(let i=1;i<=shelf;i++){
        let rowList=[];
        for(let j=1;j<=row;j++){
            let colList=[];
            for(let k=1;k<=col;k++){
                let temp="S"+i+"R"+j+"C"+k;
                //colList.push(<Slots id={temp} className="slots"/>)
                colList.push(<Slots id={temp} className="slots" color="darkseagreen" />)
            }
            rowList.push(colList);
        }
        mainList.push(rowList);
    }
//---------------------------------------------------------------------//
//Managing hover
const arr1 = Array.from({ length: shelf+1 }, () => 
  Array.from({ length: row+1 }, () => 
    Array.from({ length: col+1 }, () => false)
  )
);
const putInMap=(size)=>{
    for(let i=1;i<=shelf;i++){
        for(let j=1;j<=row;j++){
            for(let k=1;k<=col;k++){
                if(size==2){
                    if(k==col)    break;
                    if(arr1[i][j][k]==false && arr1[i][j][k+1]==false){
                        arr1[i][j][k]=true;arr1[i][j][k+1]=true;
                        console.log(""+i+j+k);
                        return;
                    }
                }
                else if(size==3){
                    if(k==col-1) break;
                    if(arr1[i][j][k]==false && arr1[i][j][k+1]==false && arr1[i][j][k+2]){
                        arr1[i][j][k]=true;arr1[i][j][k+1]=true;arr1[i][j][k+2]=true;
                        console.log(""+i+j+k);
                        return;
                    }
                }
                else{
                    if(arr1[i][j][k]==false){
                        arr1[i][j][k]=true;
                        console.log(""+i+j+k);
                        return;
                    }
                }
            }
        }
    }
};

const changeColor = (id) => {
    const element = document.getElementById("S1R1C2");
    if (element) {
      element.setSlotColor("red");
    }
  };

const removeFromMap=(MapId,size)=>{
    //let MapId="S12R3C90";
    let vals=[];
    let temp=MapId.search("R"); let temp2=MapId.search("C");
    vals.push(MapId.slice(1,temp)); vals.push(MapId.slice(temp+1,temp2)); vals.push(MapId.slice(temp2+1));
    if(size==1) {arr1[vals[0]][vals[1]][vals[2]]=false;changeColor(MapId)}
    else if(size==2){
        arr1[vals[0]][vals[1]][vals[2]]=false;
        arr1[vals[0]][vals[1]][vals[2]+1]=false;
    }
    else {
        arr1[vals[0]][vals[1]][vals[2]]=false;
        arr1[vals[0]][vals[1]][vals[2]+1]=false;
        arr1[vals[0]][vals[1]][vals[2]+2]=false;
    }
    
}
putInMap();
putInMap();
removeFromMap("S1R1C2");

    return(
        <div >  
        {mainList.map((items, index) => {
          return (
            <>
              {items.map((subItems, sIndex) => {
                return(
                    <div>
                    {subItems.map((innerItems,innerIndex)=>{
                        return <span className="slot">{innerItems}</span>
                    })}
                    </div>
                );
              })}
              <br/>
            </>
          );
        })}
      </div>
    );
}
export default MapTest;
