export function selectedItemsReducer(state, action) {
  // the reducer, now with this implementation, will work only on ids and not on full product objects
  switch (action.type) {
    case 'TOGGLE': {
      const index = state.indexOf(action.id);
      if (index !== -1) {
        return [...state.slice(0, index), ...state.slice(index + 1)];
      } else {
        return [...state, action.id];
      }
    }

    case 'SELECT_ALL': {
      if (state.length === action.ids.length && state.every((id, i) => id === action.ids[i])) {
        return state;
      }
      return [...action.ids];
    }

    case 'CLEAR':
      return state.length > 0 ? [] : state;

    default:
      return state;
  }
}
