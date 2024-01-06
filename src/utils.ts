export function html2dom(html: string): Element {
  const dom = new DOMParser().parseFromString(html, "text/html").body
    .firstElementChild!;
  return dom;
}

export function assertHTMLElement(elm: Element): asserts elm is HTMLElement {
  if (!(elm instanceof HTMLElement)) {
    throw new Error(`Element is not an HTML element`);
  }
}

export function markAsProcessed(elm: Element) {
  elm.setAttribute("bq-confirm-dialog", "processed");
}

const re = /(\d+(\.\d+)?)\s*(\S?)B/;
export class Cost {
  text: string;
  bytes: number;

  constructor(text: string) {
    const matched = text.match(re);
    if (!matched) {
      throw new Error("cannot extract cost");
    }
    this.text = matched[0];
    let bytes = Number(matched[1]);
    switch (matched[3]) {
      case "K":
        bytes *= 1000;
        break;
      case "M":
        bytes *= 1000 ** 2;
        break;
      case "G":
        bytes *= 1000 ** 3;
        break;
      case "T":
        bytes *= 1000 ** 4;
        break;
      case "P":
        bytes *= 1000 ** 5;
        break;
    }
    this.bytes = bytes;
  }
}
