import {pipe} from 'fp-ts/function';
import * as E from 'fp-ts/Either';
import * as T from 'fp-ts/Task';
import React, {useEffect, useState} from 'react';
import {hello} from 'basic-server/api/app';
import './App.css';

function App() {
  const [text, setText] = useState('');

  useEffect(() => {
    pipe(
      () => hello(),
      T.map(E.getOrElse(() => 'Error()')),
      T.chainFirstIOK(x => () => setText(x)),
      f => f());
  }, [setText]);

  return (
    <div className="App">
      <header className="App-header">
        {text}
      </header>
    </div>
  );
}

export default App;
