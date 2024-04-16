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

export function displayBottomOfElement(refObject) {
  // used to display the bottom of a chatbox whenever a new message comes in
  // used on pages with multiple chatboxes, i.e. teachers page
  refObject.current.scrollTop = refObject.current.scrollHeight;
}

export function scrollSlowlyIntoView(refObject) {
  // used to display the bottom of a chatbox whenever a new message comes in
  // used on pages with only one chatbox, i.e. students page
  // do not use this function on pages with multiple chatboxes as then it'd scroll other chatboxes into view whenever a new message arrives
  if (refObject.current)
    refObject.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

export interface ClassroomProps {
  classroomName: string;
}

export interface Student {
  socketId: string;
  realName: string;
  character?: string;
}
