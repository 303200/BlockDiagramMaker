import './App.css';
import { useState } from 'react';
import Block from './components/Block/Block';
import Button from './components/Button/Button';

const App = () => {
  //odpowiedzialne za przechowywanie i tworzenie blokow
  const [blocksList, setBlocksList] = useState([]);
  
  const spawnBlock = (blockType, backColor, fontColor) => {
    setBlocksList(blocksList.concat(<Block key={blocksList.length} text={blocksList.length} blockType={blockType} backgroundColor={backColor} fontColor={fontColor}/>));
  }

  //podstawowe kolory bloku
  const [BorderColor, setBorderColor] = useState({back: '#FFFFFF', font: '#000000'});

  const [IOColor, setIOColor] = useState({back: '#FFFFFF', font: '#000000'});

  const [OperationColor, setOperationColor] = useState({back: '#FFFFFF', font: '#000000'});

  return (
    <div className='wrapper'>
      <div className='menu'>
        <div className='title'>Rodzaj bloku</div>
        <div className='button'>
          <Button text="Stwórz blok graniczny" onClick={() => spawnBlock('borderBlock', BorderColor.back, BorderColor.font)}/>
          <input type='color' value={BorderColor.back} onChange={(e) => setBorderColor({back: e.target.value, font: BorderColor.font})}/>
          <input type='color' value={BorderColor.font} onChange={(e) => setBorderColor({back: BorderColor.back, font: e.target.value})}/>
        </div>


        <div className='button'>
          <Button text="Stwórz blok wejścia wyjścia" onClick={() => spawnBlock('ioBlock', IOColor.back, IOColor.font)}/>
          <input type='color' value={IOColor.back} onChange={(e) => setIOColor({back: e.target.value, font: IOColor.font})}/>
          <input type='color' value={IOColor.font} onChange={(e) => setIOColor({back: IOColor.back, font: e.target.value})}/>
        </div>
        <div className='button'>
          <Button text="Stwórz blok operacyjny" onClick={() => spawnBlock('operationBlock', OperationColor.back, OperationColor.font)}/>
          <input type='color' value={OperationColor.back} onChange={(e) => setOperationColor({back: e.target.value, font: OperationColor.font})}/>
          <input type='color' value={OperationColor.font} onChange={(e) => setOperationColor({back: OperationColor.back, font: e.target.value})}/>
        </div>
      </div>

      <div className='canvas'>
        {blocksList}
      </div>
    </div>
  );
}

export default App;