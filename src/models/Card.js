/* ---------------------------------
Card
--------------------------------- */

export class Card {
  constructor(url, label, favicon) {
    this.id = Date.now();
    this.url = url;
    this.label = label;
    this.favicon = favicon;
  }
}
