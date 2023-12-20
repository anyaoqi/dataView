export function observerDomResize(dom, callback) {
  const MutationObserver = window.MutationObserver

  const observer = new MutationObserver(callback)

  observer.observe(dom, {
    attributes: true,
    attributeFilter: ['style'],
    attributeOldValue: true,
  })

  return observer
}

/**
 * @description Clone an object or array
 * @param {Object|Array} object Cloned object
 * @param {Boolean} recursion   Whether to use recursive cloning
 * @return {Object|Array} Clone object
 */
export function deepClone(object, recursion) {
  if (!object) {
    return object
  }
  const { parse, stringify } = JSON
  if (!recursion) {
    return parse(stringify(object))
  }
  const clonedObj = Array.isArray(object) ? [] : {}

  if (object && typeof object === 'object') {
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        if (object[key] && typeof object[key] === 'object') {
          clonedObj[key] = deepClone(object[key], true)
        } else {
          clonedObj[key] = object[key]
        }
      }
    }
  }

  return clonedObj
}

export function deepMerge(target, merged) {
  for (const key in merged) {
    if (target[key] && typeof target[key] === 'object') {
      deepMerge(target[key], merged[key])

      continue
    }

    if (typeof merged[key] === 'object') {
      target[key] = deepClone(merged[key], true)

      continue
    }

    target[key] = merged[key]
  }

  return target
}
