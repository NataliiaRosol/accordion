import { useState } from "react"
import './styles.css'
import data from "./data";



export default function Accordeon(){

  const [selected, setSelected] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multipleSelected, setMultipleSelected] = useState([])

  function handleSingleSelection(getId){
    setSelected(getId === selected ? null : getId)
  }

  function handleMultiSelection(getId){
    let copyMultipleSelected = [...multipleSelected];
    const finIndexOfId = copyMultipleSelected.indexOf(getId);
    if(finIndexOfId === -1) copyMultipleSelected.push(getId);
    else copyMultipleSelected.splice(finIndexOfId, 1)
    
    setMultipleSelected(copyMultipleSelected);
    
  }
  return(
    <div className="wrapper">
      <button onClick={()=> setEnableMultiSelection(!enableMultiSelection)}>{enableMultiSelection ? 'Enable multiselection' : 'Multiselection enabled'}</button>
      <div className="accordeon"> 
        {
          data && data.length > 0 ? 
          data.map(item => (
            <div className="item" key={item.id}>
              <div onClick={enableMultiSelection ? ()=> handleMultiSelection(item.id) : ()=> handleSingleSelection(item.id)} className="title">
                <h3>{item.question}</h3>
                <span>+</span>
              </div>
              {
                selected === item.id || multipleSelected.indexOf(item.id) !==-1 ? 
                <div className="content">{item.answer}</div>
                : null
              }
            </div>
          ) )
          : <h2>No data found</h2>
        }
      </div>
    </div>
  )
}