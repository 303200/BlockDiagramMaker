import React from 'react'
import './Block.css';
import { useState, useEffect, useRef } from 'react';
import { useDrag } from '@use-gesture/react';

const Block = (props) => {

  //odpowiedzialne za przesuwanie
  const [blockPosition, setBlockPosition] = useState({ x: 10, y: 10});

  const bind = useDrag((params) => {
      setBlockPosition({
        x: params.offset[0],
        y: params.offset[1],
      })
    })

    //odpowiedzialne za edytor
    const [backgroundColor, setBackgroundColor] = useState(props.backgroundColor);

    const [fontColor, setFontColor] = useState(props.fontColor);

    const [content, setContent] = useState(`Moje Id to: ${props.text}`);

    const [formContent, setFormContent] = useState(content);

    const [isSelected, setIsSelected] = useState(true);

    const block = useRef([]);

    useEffect(() => {
        const checkIfClickedOutside = e => {
          // Jesli blok jest wybrany i klikniecie wystapilo poza dozwolonym obszarem to zamykamy edytor
          if (isSelected && (block.current[0] || block.curren[1]) && (!block.current[0].contains(e.target) && !block.current[1].contains(e.target))) {
            setIsSelected(false);
          }
          // Jesli edytor jest zamkniety i klikniemy na blok to pokazujemy edytor
          else if(!isSelected && block.current[0] && block.current[0].contains(e.target)) {
            setIsSelected(true);
          }
        }
    
        document.addEventListener("mousedown", checkIfClickedOutside);
    
        return () => {
          document.removeEventListener("mousedown", checkIfClickedOutside);
        }

      }, [isSelected])
      
    return (
      <div>
          <div style={{position: 'absolute', backgroundColor: 'red'}}>
            
              <div className={[`blockContainer ${props.blockType}`]} ref={(element) => {block.current[0] = element}} {...bind()} style={{
                  top: blockPosition.y,
                  left: blockPosition.x,
                  outline: isSelected ? '1px solid blue' : '1px solid black',
                  backgroundColor: backgroundColor,
                  color: fontColor,
              }} onClick={props.onClick}>

                <div /*style={ props.blockType === 'ioBlock' ? {transform: 'skew(20deg)'} : {} }*/>
                  {content}
                </div>
              </div>
          </div>
          
          <div className='editor' ref={(element) => {block.current[1] = element}} style={ isSelected ? {visibility: 'visible'} : {visibility: 'hidden'}}>
              <div className='tit'>Edytor</div>
              <textarea className="textArea" value={formContent} onChange={(e) => setFormContent(e.target.value)}/>
              <div className='input'>
                <div>Kolor tła: </div>
                <input type='color' value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)}/>
              </div>
              <div className='input'>
                <div>Kolor czcionki: </div>
                <input type='color' value={fontColor} onChange={(e) => setFontColor(e.target.value)}/>
              </div>
              <button className='przycisk' onClick={() => setContent(formContent)}>Zatwierdź zmiany</button>
          </div>
      </div>
    )
}

export default Block;