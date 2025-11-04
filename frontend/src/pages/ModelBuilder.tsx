import { useState } from 'react'
import { API } from '../services/api'
import { useNavigate } from 'react-router-dom'

interface Field {
  name: string
  type: string
}

interface Model {
  name: string
  fields: Field[]
  rbac: {
    Admin: string[]
    Manager: string[]
    Viewer: string[]
  }
}

export default function ModelBuilder() {
  const [model, setModel] = useState<Model>({
    name: '',
    fields: [],
    rbac: { Admin: ['all'], Manager: ['read', 'create'], Viewer: ['read'] },
  })
  const [field, setField] = useState<Field>({ name: '', type: 'string' })
  const navigate = useNavigate()

  const addField = () => {
    if (!field.name) return alert('Enter field name')
    setModel({ ...model, fields: [...model.fields, field] })
    setField({ name: '', type: 'string' })
  }

  const publishModel = async () => {
    try {
      await API.post('/publish', model)
      alert('Model published successfully!')
      navigate('/dashboard')
    } catch (err) {
      alert('Publish failed')
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Create New Model</h2>

      <input
        placeholder="Model Name"
        value={model.name}
        onChange={(e) => setModel({ ...model, name: e.target.value })}
      />

      <h4>Fields</h4>
      <input
        placeholder="Field Name"
        value={field.name}
        onChange={(e) => setField({ ...field, name: e.target.value })}
      />
      <select
        value={field.type}
        onChange={(e) => setField({ ...field, type: e.target.value })}
      >
        <option value="string">string</option>
        <option value="number">number</option>
        <option value="boolean">boolean</option>
      </select>
      <button onClick={addField}>Add Field</button>

      <ul>
        {model.fields.map((f, i) => (
          <li key={i}>
            {f.name} : {f.type}
          </li>
        ))}
      </ul>

      <button onClick={publishModel}>Publish</button>

      <pre style={{ background: '#f5f5f5', padding: 10, marginTop: 20 }}>
        {JSON.stringify(model, null, 2)}
      </pre>
    </div>
  )
}
