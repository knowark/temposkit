
export class Identifier { 
  constructor (context = {}) {
    this.global = context.global || window
  }

  /** @return {string} **/
  uuid () {
    /* @ts-ignore */
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ this.global.crypto.getRandomValues(
        new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
  }
}

