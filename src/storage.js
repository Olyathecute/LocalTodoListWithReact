export async function save(data) {
  console.log(data)
  localStorage.setItem('todos', JSON.stringify(data))
}

export function load() {
  console.log(localStorage.getItem('todos'))
  let data = JSON.parse(localStorage.getItem('todos')) || []
  console.log(data)
  return data
  // ...
}
