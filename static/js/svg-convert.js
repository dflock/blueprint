// Convert an svg img element into inline SVG.
// This allows the inline SVG to function normally, be styled, etc..
// but to also be loaded async and cached by the browser as an external resource.
const convertSVG = (image, callback) => {
  // Parse the SVG text and turn it into DOM nodes

  // Get the SVG file from the cache
  fetch(image.src, { cache: 'force-cache' })
    .then((res) => res.text())
    .then((data) => {
      // Parse the SVG text and turn it into DOM nodes
      const parser = new DOMParser()
      const svg = parser
        .parseFromString(data, 'image/svg+xml')
        .querySelector('svg')

      // Pass along any class or IDs from the parent <img> element
      if (image.id) svg.id = image.id
      if (image.className) svg.classList = image.classList

      // Replace the parent <img> with our inline SVG
      image.parentNode.replaceChild(svg, image)
    })
    .then(callback)
    .catch((error) => console.error(error))
}
