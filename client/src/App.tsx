import React, { useState } from 'react';
import './App.css';
import {HelloRequest} from './hello/hello_pb';
import {HelloServiceClient} from './hello/HelloServiceClientPb';

function App() {
  const [name, setName] = useState('world');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onClick = async () => {
    const request = new HelloRequest();
    request.setName(name);
    const client = new HelloServiceClient("http://localhost:8080");
    const response = await client.sayHello(request, {});
    setName(response.getMessage());
  };

  return (
    <div className="App">
      <input 
        type="text"
        value={name}
        onChange={onChange}
      />
      <button onClick={onClick}>Send</button>
      <p>Hello + {name} + !</p>
    </div>
  );
}

export default App;
