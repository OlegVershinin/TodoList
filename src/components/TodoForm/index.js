import React from 'react';
import s from './TodoForm.module.scss';
import cl from 'classnames';
import { CheckSquareOutlined, DeleteOutlined } from '@ant-design/icons';

class TodoForm extends React.Component {
  state = {
    done: false,
    isRemembered: false,
    iconsRed: true,
  };

  handleTodoClick = () => {
    this.setState(({ done, isRemembered }) => {
      return {
        isRemembered: !isRemembered,
        done: !done,
      };
    });
  };

  handleDeletedClick = () => {
    console.log('####: 1 level');
    this.props.onDeleted();
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { text } = this.props;
    const { done, isRemembered, iconsRed } = this.state;

    return (
      <div className={s.root}>
        <div
          className={cl(s.card, {
            [s.done]: done,
            [s.isRemembered]: isRemembered,
          })}
          onClick={this.handleTodoClick}
        >
          <div className={s.cardInner}>
            <div className={s.cardFront}>{text}</div>
            <div className={s.cardBack}>{text}</div>
          </div>
        </div>
        <div className={s.icons}>
          <CheckSquareOutlined onClick={this.handleTodoClick} />
        </div>
        <div
          className={cl(s.icons, {
            [s.iconsd]: iconsRed,
          })}
        >
          <DeleteOutlined onClick={this.handleDeletedClick} />
        </div>
      </div>
    );
  }
}

export default TodoForm;
