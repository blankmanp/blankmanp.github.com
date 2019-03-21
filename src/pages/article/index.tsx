import React, { SFC } from 'react';
import ReactMarkdown from 'react-markdown';

type Props = {
  match: {
    params: {
      parent: string,
      name: string
    }
  }
}

// const source = require('./201902/test.md');

const Article: SFC<Props> = ({ match: { params: { parent, name } } }) => {
  let source: string;
  if (!name || !parent) {
    source = require('./readme.md');
  } else {
    try {
      source = require(`./${parent}/${name}.md`);
    } catch (e) {
      console.error(e);
      source = "<h1>Sorry</h1><p>Can not find the article</p>";
    }
  }
  return <ReactMarkdown source={source} escapeHtml={false} />
}
export default Article;
