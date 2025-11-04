export default function ModelForm({ fields, onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {}
    fields.forEach((f) => (data[f.name] = e.target[f.name].value))
    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((f, i) => (
        <div key={i}>
          <label>{f.name}</label>
          <input name={f.name} type={f.type === 'number' ? 'number' : 'text'} />
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  )
}
