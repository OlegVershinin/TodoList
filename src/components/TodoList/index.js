import React from 'react';
import TodoForm from '../TodoForm/index';
import s from './TodoList.module.scss';
import { Input } from 'antd';
import shortid from 'shortid';
import Preloader from '../WrapBlock/img/757.svg';

const { Search } = Input;

class TodoList extends React.Component {
  state = {
    // todos: [],
    id: '',
    text: '',
    value: '',
    isBusy: true,
  };

  handleInputChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  handleSubmitForm = () => {
    // e.preventDefault();
    const { value } = this.state;
    this.props.onAppendItem({
      text: value,
      id: shortid.generate(),
    });
    this.setState({
      value: '',
    });
  };

  render() {
    const { item = [], onDeletedItem, isBusy } = this.props;
    const { value } = this.state;
    return (
      <React.Fragment>
        <div className={s.form}>
          <Search
            placeholder="input todo"
            title="ПОЛЕ НЕ МОЖЕТ БЫТЬ ПУСТЫМ !"
            enterButton="ADD"
            size="large"
            value={value}
            loading={isBusy}
            onChange={this.handleInputChange}
            onSearch={this.handleSubmitForm}
          />
        </div>
        {this.props.isFetching ? <img src={Preloader} alt="page" /> : null}

        <div>
          {item.map(({ text, id }) => (
            <TodoForm
              onDeleted={() => onDeletedItem(id)}
              key={id}
              text={text}
            />
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default TodoList;
