import {useState, useEffect} from 'react';
function Slots({id, setFilled}) {
    // const [filled,setFilled]=useState(false);
   const [slotColor, setSlotColor] = useState("darkseagreen")
    const mystyle = {
        width: "60px",
        height: "60px",
        borderRadius: "20px",
        backgroundColor: slotColor,
        display: "inline-block",
        margin:"2px",
      };

    // useEffect(()=>{
    //   mystyle.backgroundColor = slotColor;
    // },[slotColor])

      const handleClick=()=>{
        if(slotColor=="darkseagreen"){setSlotColor("green")}
        else{
           setSlotColor("darkseagreen")
           //setFilled(true)
        }
      }
     


      // const giveId=()=>{
      //   for(let i=0;i<shelf;i++){
      //     for(let j=0;j<row;j++){
      //       for(let k=0;k<col;k++){

      //       }
      //     }
      //   }
      // }
      const [DisplayPop,setDisplayPop]=useState(false);
      const [hovered, sethovered] = useState(false);
      const mouseEnterHandler = () => {
          sethovered(true);
         // setDisplayPop(true);
      }
      const mouseLeaveHandler = () => {
          sethovered(false);
         // setDisplayPop(false);
      }
      const onTimeout = () => {
        console.log("Functional component, TIMED OUT!!!"+id);
      //  console.log(DisplayPop);
      };
      useEffect(() => {
          const timer = hovered && setTimeout(onTimeout, 1000);
          return () => {
            clearTimeout(timer);
            console.log("Functional component, cleared timeout");
           // setDisplayPop(false);
            //console.log(DisplayPop)
          };
      }, [hovered]);

    return (
      <div id={id} className="slot" hovered={hovered}  onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler} style={mystyle} onClick={handleClick}  >
        {/* <span style={mystyle}></span> */}
        <p>{id}</p>
      </div>
    );
  }
export default Slots;
  
