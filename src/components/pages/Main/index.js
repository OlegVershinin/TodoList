import React, { Component } from 'react';
import TodoList from '../../TodoList';
import WrapBlock from '../../WrapBlock';
import database from '../../servises/firebase';
import Paragraph from '../../Paragraph';
import IconLabelButtons from '../../Button/index';

class Main extends Component {
  state = {
    todosArr: [],
    isBusy: true,
    isFetching: true,
  };

  urlRequest = `/todos/${this.props.user.uid}`;

  componentDidMount() {
    database.ref(this.urlRequest).on('value', (res) => {
      console.log('#### res.val:', res.val());

      this.setState({
        todosArr: res.val() || [],
        isBusy: false,
        isFetching: false,
      });
    });
  }

  // TODO: такой вариант если в БД использовать on, тогда не нужен setState, его роль выполняет res - следит за изменениями в БД

  handleAppendItem = (item) => {
    console.log('#### item:', item);
    const { todosArr } = this.state;
    const newTodosdArr = [...todosArr, item];
    database.ref(this.urlRequest).set(newTodosdArr);
  };

  handleDeletedItem = (id) => {
    const { todosArr } = this.state;
    console.log('#### id:', id);
    const newTodosdArr = todosArr.filter((item) => item.id !== id);
    console.log('#### newTodosArr:', newTodosdArr);
    database.ref(this.urlRequest).set(newTodosdArr);
  };

  // TODO: такой вариант если в БД использовать once

  // handleAppendItem = (item) => {
  //   console.log('#### item:', item);
  //   this.setState(({ todosArr }) => {
  //     const newTodosdArr = [...todosArr, item];
  //     database.ref('/todos/').set(newTodosdArr);
  //     return {
  //       todosArr: newTodosdArr,
  //     };
  //   });
  // };

  // handleDeletedItem = (id) => {
  //   this.setState(({ todosArr }) => {
  //     const idx = todosArr.findIndex((item) => item.id === id);
  //     console.log('####: idx', idx);
  //     console.log('####: state before', this.state.todosArr);
  //     const newTodosArr = [
  //       ...todosArr.slice(0, idx),
  //       ...todosArr.slice(idx + 1),
  //     ];
  //     console.log('####: state after', this.state.todosArr);
  //     return {
  //       todosArr: newTodosArr,
  //     };
  //   });
  // };
  render() {
    const { todosArr, isBusy, isFetching } = this.state;
    console.log('####:', this.props.user.uid);
    return (
      <React.Fragment>
        <WrapBlock>
          <Paragraph>Мой первый TodoList</Paragraph>
          <IconLabelButtons></IconLabelButtons>
          <TodoList
            onAppendItem={this.handleAppendItem}
            onDeletedItem={this.handleDeletedItem}
            item={todosArr}
            isBusy={isBusy}
            isFetching={isFetching}
          />
        </WrapBlock>
      </React.Fragment>
    );
  }
}

export default Main;
