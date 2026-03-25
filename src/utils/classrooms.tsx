import Filter from 'bad-words';

export const TEST_CLASSROOM_NAME = '0000';
export const PAIRED = 'PAIRED';
export const SOLO = 'SOLO';
export const DEV_TEST_USER_QUERY_PARAM = 'isDevTestUser';

export function getRandom<T>(arr: Array<T>): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function swap<T>(arr: Array<T>, i1: number, i2: number) {
  const temp = arr[i2];
  arr[i2] = arr[i1];
  arr[i1] = temp;
}

export function filterWords(words: string) {
  const filter = new Filter();
  try {
    return filter.clean(words);
    // the filter throws an error if the string only has non-letter characters
  } catch (e) {
    return words;
  }
}

export function scrollToBottomOfElement(refObject) {
  /* used to ensure the user always sees the latest chat messages by automatically scrolling to
     the bottom of a chatbox whenever a new message is received */
  refObject.current.scrollTop = refObject.current.scrollHeight;
}

export function getRandomPin(pinLength: number) {
  const randomPin = Math.random().toString();
  return randomPin.slice(2, pinLength + 2);
}
