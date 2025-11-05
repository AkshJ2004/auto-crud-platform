import { useState } from 'react'
import { API } from '../services/api'
import { useNavigate } from 'react-router-dom'

interface Field {
  name: string
  type: string
  required?: boolean
  default?: any
  unique?: boolean
  relation?: string
}

interface Model {
  name: string
  tableName?: string
  fields: Field[]
  ownerField?: string
  rbac: {
    Admin: string[]
    Manager: string[]
    Viewer: string[]
  }
}

export default function ModelBuilder() {
  const [model, setModel] = useState<Model>({
    name: '',
    tableName: '',
    fields: [],
    ownerField: '',
    rbac: { Admin: ['all'], Manager: ['read', 'create', 'update'], Viewer: ['read'] },
  })
  
  const [field, setField] = useState<Field>({ 
    name: '', 
    type: 'string',
    required: false,
    unique: false
  })
  
  const navigate = useNavigate()

  const addField = () => {
    if (!field.name.trim()) return alert('Enter field name')
    
    // Create clean field object without empty values
    const newField: Field = {
      name: field.name.trim(),
      type: field.type
    }
    
    if (field.required) newField.required = true
    if (field.unique) newField.unique = true
    if (field.default !== undefined && field.default !== '') {
      newField.default = field.type === 'number' ? Number(field.default) : 
                         field.type === 'boolean' ? field.default === 'true' : 
                         field.default
    }
    if (field.relation?.trim()) newField.relation = field.relation.trim()
    
    setModel({ ...model, fields: [...model.fields, newField] })
    setField({ name: '', type: 'string', required: false, unique: false })
  }

  const removeField = (index: number) => {
    setModel({ ...model, fields: model.fields.filter((_, i) => i !== index) })
  }

  const updateRBAC = (role: keyof Model['rbac'], permission: string, checked: boolean) => {
    const newRbac = { ...model.rbac }
    if (checked) {
      if (!newRbac[role].includes(permission)) {
        newRbac[role] = [...newRbac[role].filter(p => p !== 'all'), permission]
      }
    } else {
      newRbac[role] = newRbac[role].filter(p => p !== permission)
    }
    setModel({ ...model, rbac: newRbac })
  }

  const toggleAllPermissions = (role: keyof Model['rbac']) => {
    const newRbac = { ...model.rbac }
    if (newRbac[role].includes('all')) {
      newRbac[role] = []
    } else {
      newRbac[role] = ['all']
    }
    setModel({ ...model, rbac: newRbac })
  }

  const publishModel = async () => {
    if (!model.name.trim()) {
      return alert('Model name is required')
    }
    
    if (model.fields.length === 0) {
      return alert('Add at least one field')
    }

    try {
      // Create clean model object
      const modelToPublish: Model = {
        name: model.name.trim(),
        fields: model.fields,
        rbac: model.rbac
      }
      
      if (model.tableName?.trim()) {
        modelToPublish.tableName = model.tableName.trim()
      }
      
      if (model.ownerField?.trim()) {
        modelToPublish.ownerField = model.ownerField.trim()
      }

      await API.post('/publish', modelToPublish)
      alert('Model published successfully!')
      navigate('/dashboard')
    } catch (err: any) {
      alert('Publish failed: ' + (err.response?.data?.error || err.message))
    }
  }

  return (
    <div style={{ padding: 20, maxWidth: 1200, margin: '0 auto' }}>
      <h2>Create New Model</h2>

      <div style={{ marginBottom: 20 }}>
        <h3>Basic Information</h3>
        <div style={{ marginBottom: 10 }}>
          <label style={{ display: 'block', marginBottom: 5 }}>Model Name *</label>
          <input
            style={{ width: '100%', padding: 8 }}
            placeholder="e.g., Employee, Product"
            value={model.name}
            onChange={(e) => setModel({ ...model, name: e.target.value })}
          />
        </div>
        
        <div style={{ marginBottom: 10 }}>
          <label style={{ display: 'block', marginBottom: 5 }}>Table Name (optional)</label>
          <input
            style={{ width: '100%', padding: 8 }}
            placeholder="Default: lowercase plural"
            value={model.tableName}
            onChange={(e) => setModel({ ...model, tableName: e.target.value })}
          />
        </div>
        
        <div style={{ marginBottom: 10 }}>
          <label style={{ display: 'block', marginBottom: 5 }}>Owner Field (optional)</label>
          <input
            style={{ width: '100%', padding: 8 }}
            placeholder="e.g., ownerId, userId"
            value={model.ownerField}
            onChange={(e) => setModel({ ...model, ownerField: e.target.value })}
          />
        </div>
      </div>

      <div style={{ marginBottom: 20 }}>
        <h3>Fields</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 2fr auto', gap: 10, marginBottom: 10 }}>
          <input
            placeholder="Field Name"
            value={field.name}
            onChange={(e) => setField({ ...field, name: e.target.value })}
            style={{ padding: 8 }}
          />
          
          <select
            value={field.type}
            onChange={(e) => setField({ ...field, type: e.target.value })}
            style={{ padding: 8 }}
          >
            <option value="string">String</option>
            <option value="number">Number</option>
            <option value="boolean">Boolean</option>
            <option value="date">Date</option>
          </select>
          
          <input
            placeholder="Default"
            value={field.default || ''}
            onChange={(e) => setField({ ...field, default: e.target.value })}
            style={{ padding: 8 }}
          />
          
          <div style={{ display: 'flex', gap: 10 }}>
            <label>
              <input
                type="checkbox"
                checked={field.required || false}
                onChange={(e) => setField({ ...field, required: e.target.checked })}
              />
              Required
            </label>
            <label>
              <input
                type="checkbox"
                checked={field.unique || false}
                onChange={(e) => setField({ ...field, unique: e.target.checked })}
              />
              Unique
            </label>
          </div>
          
          <input
            placeholder="Relation (optional)"
            value={field.relation || ''}
            onChange={(e) => setField({ ...field, relation: e.target.value })}
            style={{ padding: 8 }}
          />
          
          <button onClick={addField} style={{ padding: 8 }}>Add Field</button>
        </div>

        {model.fields.length > 0 && (
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 10 }}>
            <thead>
              <tr style={{ background: '#f5f5f5' }}>
                <th style={{ padding: 8, textAlign: 'left' }}>Name</th>
                <th style={{ padding: 8, textAlign: 'left' }}>Type</th>
                <th style={{ padding: 8, textAlign: 'left' }}>Required</th>
                <th style={{ padding: 8, textAlign: 'left' }}>Unique</th>
                <th style={{ padding: 8, textAlign: 'left' }}>Default</th>
                <th style={{ padding: 8, textAlign: 'left' }}>Relation</th>
                <th style={{ padding: 8, textAlign: 'left' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {model.fields.map((f, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: 8 }}>{f.name}</td>
                  <td style={{ padding: 8 }}>{f.type}</td>
                  <td style={{ padding: 8 }}>{f.required ? '✓' : ''}</td>
                  <td style={{ padding: 8 }}>{f.unique ? '✓' : ''}</td>
                  <td style={{ padding: 8 }}>{f.default !== undefined ? String(f.default) : ''}</td>
                  <td style={{ padding: 8 }}>{f.relation || ''}</td>
                  <td style={{ padding: 8 }}>
                    <button onClick={() => removeField(i)} style={{ color: 'red' }}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div style={{ marginBottom: 20 }}>
        <h3>RBAC Permissions</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f5f5f5' }}>
              <th style={{ padding: 8, textAlign: 'left' }}>Role</th>
              <th style={{ padding: 8 }}>All</th>
              <th style={{ padding: 8 }}>Create</th>
              <th style={{ padding: 8 }}>Read</th>
              <th style={{ padding: 8 }}>Update</th>
              <th style={{ padding: 8 }}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {(['Admin', 'Manager', 'Viewer'] as const).map(role => (
              <tr key={role} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: 8 }}><strong>{role}</strong></td>
                <td style={{ padding: 8, textAlign: 'center' }}>
                  <input
                    type="checkbox"
                    checked={model.rbac[role].includes('all')}
                    onChange={(e) => toggleAllPermissions(role)}
                  />
                </td>
                {['create', 'read', 'update', 'delete'].map(perm => (
                  <td key={perm} style={{ padding: 8, textAlign: 'center' }}>
                    <input
                      type="checkbox"
                      checked={model.rbac[role].includes('all') || model.rbac[role].includes(perm)}
                      disabled={model.rbac[role].includes('all')}
                      onChange={(e) => updateRBAC(role, perm, e.target.checked)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginBottom: 20 }}>
        <button 
          onClick={publishModel}
          style={{ 
            padding: '12px 24px', 
            background: '#0066cc', 
            color: 'white', 
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
            fontSize: 16,
            fontWeight: 'bold'
          }}
        >
          Publish Model
        </button>
      </div>

      <div>
        <h3>Model Preview</h3>
        <pre style={{ background: '#f5f5f5', padding: 10, overflow: 'auto' }}>
          {JSON.stringify({
            name: model.name,
            ...(model.tableName && { tableName: model.tableName }),
            fields: model.fields,
            ...(model.ownerField && { ownerField: model.ownerField }),
            rbac: model.rbac
          }, null, 2)}
        </pre>
      </div>
    </div>
  )
}