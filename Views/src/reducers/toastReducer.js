export function toastReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [...state, action.toast];
    case 'OPEN':
      return state.map(toast => (toast.id === action.id ? { ...toast, isOpen: true } : toast));
    case 'CLOSE':
      return state.map(toast => (toast.id === action.id ? { ...toast, isOpen: false } : toast));
    case 'REMOVE':
      return state.filter(toast => toast.id !== action.id);
    default:
      return state;
  }
}
