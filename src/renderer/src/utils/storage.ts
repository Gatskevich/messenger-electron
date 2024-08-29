const setItem = (key, value) => {
  if (!value) return null
  const sValue = JSON.stringify(value)
  localStorage.setItem(key, sValue)
  return true
}

const getItem = (key) => {
  const item = localStorage.getItem(key)
  return item ? JSON.parse(item) : {}
}

const storage = {
  setItem,
  getItem
}

export default storage
