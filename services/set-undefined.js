export default function checkUndefined({ fx }) {
    return typeof navigator !== "undefined" ? fx : null
}