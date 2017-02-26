const initialState = [
    'issue 1',
    'issue 2',
    'issue 3'
];

export default function issueList(state = initialState, action) {
  if (action.type === 'ADD_ISSUE') {
    return [
      ...state,
      action.payload
    ];
  }
  return state;
}