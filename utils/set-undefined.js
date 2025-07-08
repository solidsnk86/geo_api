export default function checkIfUndefined(fx) {
  return typeof navigator !== 'undefined' ? fx : null
}
