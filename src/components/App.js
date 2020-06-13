import React from 'react';
import Main from './pages/Main';
import SignIn from './pages/SingIn';
import { fire } from './servises/firebase';
import Preloader from '../components/WrapBlock/img/757.svg';
import s from './pages/SingIn/SingIn.module.scss';

class App extends React.Component {
  state = {
    user: null,
    logout: fire.auth().signOut(),
  };

  componentDidMount() {
    fire.auth().onAuthStateChanged((user) => {
      console.log('#### user:', user);
      if (user) {
        this.setState({
          user,
        });
      } else {
        this.setState({
          user: false,
        });
      }
    });
  }

  render() {
    const { user } = this.state;
    if (user === null) {
      return <img className={s.loader_wrap} src={Preloader} alt="page" />;
    }
    return (
      <React.Fragment>
        {user ? <Main user={user} /> : <SignIn />}
      </React.Fragment>
    );
  }
}

export default App;
