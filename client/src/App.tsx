import React, { useState } from 'react';
import './App.css';
import {HelloRequest} from './hello/hello_pb';
import {HelloServiceClient} from './hello/HelloServiceClientPb';

function App() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onClick = async () => {
    const request = new HelloRequest();
    request.setName(name);
    const client = new HelloServiceClient("http://localhost:8080");
    const response = await client.sayHello(request, {});
    setMessage(response.getMessage());
  };

  return (
    <div className="App">
      <input 
        type="text"
        value={name}
        onChange={onChange}
      />
      <button onClick={onClick}>Send</button>
      <p>{message}</p>
    </div>
  );
}

export default App;
