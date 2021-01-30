class Detection {
  isMobile () {
    if (!this.isMobileChecked) {
      this.isMobileChecked = true

      this.isMobileCheck = document.documentElement.classList.contains('mobile')
    }

    return this.isMobileCheck
  }

  isWebPSupported () {
    if (!this.isWebPChecked) {
      this.isWebPChecked = true

      const element = document.createElement('canvas')

      if (element.getContext && element.getContext('2d')) {
        this.isWebPCheck = element.toDataURL('image/webp').indexOf('data:image/webp') === 0
      }
    }

    return this.isWebPCheck
  }
}

const DetectionManager = new Detection()

export default DetectionManager
