import GSAP from 'gsap'

export function lerp (p1, p2, t) {
  return GSAP.utils.interpolate(p1, p2, t)
}

export function clamp (min, max, number) {
  return GSAP.utils.clamp(min, max, number)
}

export function random (min, max) {
  return GSAP.utils.random(min, max)
}

export function map (valueToMap, inMin, inMax, outMin, outMax) {
  return GSAP.utils.mapRange(inMin, inMax, outMin, outMax, valueToMap)
}
