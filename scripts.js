// LYRIC INFO
const songLyricsArray = "They're tryin' to build a prison, They're tryin' to build a prison, Oh! Followin' the rights movements, You clamped down with your iron fists, Drugs became conveniently, Available for all the kids, Followin' the rights movements, You clamped down with your iron fists, Drugs became conveniently, Available for all the kids".split(', ');

// INITIAL REDUX STATE
const initialState = {
  songLyricsArray: songLyricsArray,
  arrayPosition: 0,
}

// REDUX REDUCER
const reducer = (state = initialState, action) => {
  let newState;
  switch(action.type) {
    case 'NEXT_LYRIC':
      let newArrayPosition = state.arrayPosition + 1;
      newState = {
        songLyricsArray: state.songLyricsArray,
        arrayPosition: newArrayPosition,
      }
      return newState;
    case 'RESTART_SONG':
      newState = initialState;
      return newState;
    default:
      return state;
  }
}

// JEST TESTS + SETUP WILL GO HERE
const { expect } = window;

expect(reducer(initialState, { type: null })).toEqual(initialState);

expect(reducer(initialState, { type: 'NEXT_LYRIC'})).toEqual({
  songLyricsArray: songLyricsArray,
  arrayPosition: 1
});

expect(reducer({
    songLyricsArray: songLyricsArray,
    arrayPosition: 1,
  },
  { type: 'RESTART SONG' }) 
).toEqual(initialState);

// REDUX STORE
const { createStore } = Redux;
const store = createStore(reducer);
console.log(store.getState());

// RENDERING STATE IN DOM
const renderLyrics = () => {
  // defines a lyricsDisplay constant referring to the div with a 'lyrics' ID in index.html
  const lyricsDisplay = document.getElementById('lyrics');
  // if there are already lyrics in this div, remove them one-by-one until it is empty:
  while (lyricsDisplay.firstChild) {
    lyricsDisplay.removeChild(lyricsDisplay.firstChild);
  }
  // Locates the song lyric at the current arrayPosition:
  const currentLine = store.getState().songLyricsArray[store.getState().arrayPosition];
  // Creates DOM text node containing the song lyric identified in line above:
  const renderedLine = document.createTextNode(currentLine);
  // Adds text node created in line above to 'lyrics' div in DOM
  document.getElementById('lyrics').appendChild(renderedLine);
}
// runs renderLyrics() method from above when page is finished loading.
// window.onload is HTML5 version of jQuery's $(document).ready()                                    

window.onload = function() {
  renderLyrics();
}

// CLICK LISTENER
const userClick = () => {
  const currentState = store.getState();
  if (currentState.arrayPosition === currentState.songLyricsArray.length - 1) {
    store.dispatch({ type: 'RESTART_SONG' } );
  } else {
    store.dispatch({ type: 'NEXT_LYRIC'} );
  }
}

// SUBSCRIBE TO THE REDUX STORE
store.subscribe(renderLyrics);