import React, { SFC } from 'react';
import ReactMarkdown from 'react-markdown';

type Props = {
  match: {
    params: {
      name: string
    }
  }
};

const Game: SFC<Props> = ({ match: { params: { name } } }) => {
  if (!name) {
    let source = require('./readme.md');
    return <ReactMarkdown source={source} escapeHtml={false} />
  }
  let Comp = require(`./${name}/index.tsx`).default;
  return <div><Comp /></div>;
}

export default Game;