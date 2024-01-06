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
