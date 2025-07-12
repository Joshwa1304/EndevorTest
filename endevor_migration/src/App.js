import './App.css';
import Button from './Components/Button';
import Container from './Components/Container';
import { useState } from 'react';

function App() {
  const [selectedAction, setSelectedAction] = useState('');

  return (
    <>
      <header className='heading'>
        <h1 className='heading_style'>zMigGIT</h1>
      </header>
      <div className='btnsandcontainer'>
        <div className='Btns_container'>
          <div className="btn_with_arrow">
            <Button label="Endeavor Extract" onClick={() => setSelectedAction('extract')} active={selectedAction === 'extract'} />
            {selectedAction === 'extract' && <span className="arrow_mark">➡</span>}
          </div>

          <div className="btn_with_arrow">
            <Button label="Load MongoDB" onClick={() => setSelectedAction('load')} active={selectedAction === 'load'} />
            {selectedAction === 'load' && <span className="arrow_mark">➡</span>}
          </div>

          <div className="btn_with_arrow">
            <Button label="Transform Load to Git" onClick={() => setSelectedAction('transform')} active={selectedAction === 'transform'} />
            {selectedAction === 'transform' && <span className="arrow_mark">➡</span>}
          </div>

          <div className="btn_with_arrow">
            <Button label="Validate & Report" onClick={() => setSelectedAction('validate')} active={selectedAction === 'validate'} />
            {selectedAction === 'validate' && <span className="arrow_mark">➡</span>}
          </div>
        </div>

        {selectedAction ? (
          <Container action={selectedAction} />
        ) : (
          <div className="welcome_message">
            <h2>Welcome to zMigGIT</h2>
            <p>Please select an action to get started.</p>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
