export function selectedItemsReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE':
      return state.some(item => item.id === action.item.id)
        ? state.filter(item => item.id !== action.item.id)
        : [...state, action.item];
    case 'SELECT_ALL':
      return [...action.items];
    case 'CLEAR':
      return [];
    default:
      return state;
  }
}
