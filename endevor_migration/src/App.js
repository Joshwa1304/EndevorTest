import './App.css';
import Button from './Components/Button';
import Container from './Components/Container';
import { useState } from 'react';

function App() {
  const [selectedAction, setSelectedAction] = useState('');

  return (
    <>
      <header className="heading">
        <h1 className="heading_style">zMigGIT</h1>
      </header>

      <div className="btnsandcontainer">
        <div className="Btns_container">
          <Button label="Endeavor Extract" onClick={() => setSelectedAction('extract')} />
          <Button label="Load MongoDB" onClick={() => setSelectedAction('load')} />
          <Button label="Transform Load to Git" onClick={() => setSelectedAction('transform')} />
          <Button label="Validate & Report" onClick={() => setSelectedAction('validate')} />
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
