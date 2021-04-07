import { Component } from 'base/component'

const tag = 'tempos-show'
export class TemposShowComponent extends Component {
  init (context = {}) {
    this.binding = 'tempos-show-listen'
    return super.init(context)
  }
}
Component.define(tag, TemposShowComponent)
