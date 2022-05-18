// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  email: '',
  password: '',
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'USER_ACTION':
    return { ...action.state };
  default:
    return state;
  }
}

export default user;
