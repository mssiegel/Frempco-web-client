import Filter from 'bad-words';

export function getRandom<T>(arr: Array<T>): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function swap<T>(arr: Array<T>, i1: number, i2: number) {
  const temp = arr[i2];
  arr[i2] = arr[i1];
  arr[i1] = temp;
}

export function currentTime() {
  return new Date().toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
  });
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

export interface ClassroomProps {
  classroomName: string;
}

export interface Student {
  socketId: string;
  realName: string;
  character?: string;
}
