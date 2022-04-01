import React from 'react';
import './App.css';

function App() {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        fetch("/events?category=severeStorms")
            .then((res) => res.json())
            .then((data) => setData(data));
    }, []);

  return (
    <div className="App">
      <header className="App-header">
      {JSON.stringify(data, null, 2)}
      </header>
    </div>
  );
}

export default App;
