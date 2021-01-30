import map from 'lodash/map'

export const getOffset = (element, top = 0) => {
  const box = element.getBoundingClientRect()

  return {
    bottom: box.bottom,
    height: box.height,
    left: box.left,
    top: box.top + top,
    width: box.width
  }
}

export function mapEach (element, callback) {
  if (element instanceof window.HTMLElement) {
    return [callback(element)]
  }

  return map(element, callback)
}

