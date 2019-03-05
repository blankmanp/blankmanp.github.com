import React, { MouseEvent, SFC } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import PageLayout from './component/Layout';

type Props = { onClick(e: MouseEvent<HTMLElement>): void };

const Button: SFC<Props> = ({ onClick: handleClick, children }) => (
  <button onClick={handleClick}>{children}</button>
)

const initialState = { count: 0 };
type State = Readonly<typeof initialState>;

class ButtonCounter extends React.Component<object, State> {
  readonly state: State = initialState;

  private handleIncrement = () => {
    this.setState({
      count: this.state.count + 1
    });
  }

  private handleDecrement = () => {
    this.setState({
      count: this.state.count - 1
    });
  }

  render() {
    const { count } = this.state;
    return (
      <PageLayout />
    );
  }
}

ReactDOM.render(
  <BrowserRouter>
    <ButtonCounter />
  </BrowserRouter>,
  document.getElementById('app')
);