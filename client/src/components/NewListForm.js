import React from 'react'

const NewListForm = ({onNewList = f => f}) => {
  let title, exerpt
  const submit = e => {
    e.preventDefault();
    onNewList(_title.value, _excerpt.value)
    title.value = ''
    excerpt.value = ''
    title.focus()
  }

  return (
    <form onSubmit = { submit }>
      <input ref={ input => title = input }
             type = "text"
             placeholder = "Title..." required/>
      <input ref = {input => excerpt = input}
             type = "text"
             placeholder = "Excerpt..." required/>
      <button>Add List</button>
    </form>
  )
}