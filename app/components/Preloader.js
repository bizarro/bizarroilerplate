import GSAP from 'gsap'
import Prefix from 'prefix'

import Component from 'classes/Component'

export default class extends Component {
  constructor () {
    super({
      classes: {

      },
      element: '.preloader',
      elements: {

      }
    })

    this.counter = 0
    this.index = 0

    this.transformPrefix = Prefix('transform')

    this.onComplete()
  }

  onComplete () {
    this.timeline = GSAP.timeline()

    this.timeline.to(this.element, {
      autoAlpha: 0,
      duration: 1
    })

    this.timeline.call(_ => {
      this.emit('complete')
    })
  }
}
