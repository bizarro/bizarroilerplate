import Page from 'components/Page'

export default class extends Page {
  constructor () {
    super({
      classes: {
        active: 'about--active',
      },
      element: '.about',
      elements: {
        wrapper: '.about__content',
      }
    })
  }

  /**
   * Animations.
   */
  async show (url) {
    this.element.classList.add(this.classes.active)

    return super.show(url)
  }

  async hide (url) {
    this.element.classList.remove(this.classes.active)

    return super.hide(url)
  }
}
