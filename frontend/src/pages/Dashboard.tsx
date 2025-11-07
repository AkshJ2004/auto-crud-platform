import { useEffect, useState } from 'react'
import { API } from '../services/api'
import { useNavigate } from 'react-router-dom'

interface Model {
  name: string
  fields: Array<{ name: string; type: string; required?: boolean }>
}

interface Record {
  id: number
  [key: string]: any
}

export default function Dashboard() {
  const [models, setModels] = useState<Model[]>([])
  const [selectedModel, setSelectedModel] = useState<string>('')
  const [records, setRecords] = useState<Record[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingRecord, setEditingRecord] = useState<Record | null>(null)
  const [formData, setFormData] = useState<any>({})
  const navigate = useNavigate()

  const fetchModels = async () => {
    try {
      const res = await API.get('/models')
      setModels(res.data)
      if (res.data.length > 0 && !selectedModel) {
        setSelectedModel(res.data[0].name)
      }
    } catch (err) {
      console.error('Error fetching models:', err)
    }
  }

  const fetchRecords = async () => {
    if (!selectedModel) return
    try {
      const res = await API.get(`/${selectedModel.toLowerCase()}s`)
      setRecords(res.data)
    } catch (err) {
      console.error('Error fetching records:', err)
    }
  }

  useEffect(() => {
    fetchModels()
  }, [])

  useEffect(() => {
    if (selectedModel) {
      fetchRecords()
      setShowForm(false)
      setEditingRecord(null)
      setFormData({})
    }
  }, [selectedModel])

  const handleModelSelect = (modelName: string) => {
    setSelectedModel(modelName)
  }

  const handleCreate = () => {
    setEditingRecord(null)
    setFormData({})
    setShowForm(true)
  }

  const handleEdit = (record: Record) => {
    setEditingRecord(record)
    setFormData({ ...record })
    setShowForm(true)
  }

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return
    try {
      await API.delete(`/${selectedModel.toLowerCase()}s/${id}`)
      alert('Record deleted successfully')
      fetchRecords()
    } catch (err: any) {
      alert('Delete failed: ' + (err.response?.data?.error || err.message))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingRecord) {
        await API.put(`/${selectedModel.toLowerCase()}s/${editingRecord.id}`, formData)
        alert('Record updated successfully')
      } else {
        await API.post(`/${selectedModel.toLowerCase()}s`, formData)
        alert('Record created successfully')
      }
      setShowForm(false)
      setFormData({})
      setEditingRecord(null)
      fetchRecords()
    } catch (err: any) {
      alert('Operation failed: ' + (err.response?.data?.error || err.message))
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setFormData({})
    setEditingRecord(null)
  }

  const currentModel = models.find(m => m.name === selectedModel)

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <div style={{ 
        width: 250, 
        background: '#2c3e50', 
        color: 'white', 
        padding: 20,
        overflowY: 'auto'
      }}>
        <h2 style={{ marginBottom: 20 }}>Dashboard</h2>
        <button 
          onClick={() => navigate('/builder')}
          style={{ 
            width: '100%', 
            padding: 10, 
            marginBottom: 20,
            background: '#27ae60',
            color: 'white',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer'
          }}
        >
          + Create New Model
        </button>
        
        <h3 style={{ marginBottom: 10, fontSize: 14, opacity: 0.7 }}>MODELS</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {models.map((m) => (
            <li 
              key={m.name}
              onClick={() => handleModelSelect(m.name)}
              style={{ 
                padding: '10px 15px',
                marginBottom: 5,
                background: selectedModel === m.name ? '#34495e' : 'transparent',
                cursor: 'pointer',
                borderRadius: 4,
                transition: 'background 0.2s'
              }}
            >
              {m.name}
            </li>
          ))}
        </ul>
        
        {models.length === 0 && (
          <p style={{ opacity: 0.7, fontSize: 14 }}>No models yet. Create your first model!</p>
        )}
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: 30, overflowY: 'auto', background: '#ecf0f1' }}>
        {!selectedModel ? (
          <div style={{ textAlign: 'center', marginTop: 100 }}>
            <h2>Welcome to Your Dashboard</h2>
            <p>Select a model from the sidebar or create a new one</p>
          </div>
        ) : (
          <>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: 20
            }}>
              <h2>{selectedModel} Records</h2>
              <button 
                onClick={handleCreate}
                style={{ 
                  padding: '10px 20px',
                  background: '#3498db',
                  color: 'white',
                  border: 'none',
                  borderRadius: 4,
                  cursor: 'pointer',
                  fontSize: 16
                }}
              >
                + Add New {selectedModel}
              </button>
            </div>

            {showForm && currentModel && (
              <div style={{ 
                background: 'white', 
                padding: 20, 
                borderRadius: 8,
                marginBottom: 20,
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                <h3>{editingRecord ? 'Edit' : 'Create'} {selectedModel}</h3>
                <form onSubmit={handleSubmit}>
                  {currentModel.fields.map((field) => (
                    <div key={field.name} style={{ marginBottom: 15 }}>
                      <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>
                        {field.name} {field.required && <span style={{ color: 'red' }}>*</span>}
                      </label>
                      <input
                        type={field.type === 'number' ? 'number' : field.type === 'date' ? 'date' : 'text'}
                        value={formData[field.name] || ''}
                        onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                        required={field.required}
                        style={{ 
                          width: '100%', 
                          padding: 8,
                          borderRadius: 4,
                          border: '1px solid #ddd'
                        }}
                      />
                    </div>
                  ))}
                  <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
                    <button 
                      type="submit"
                      style={{ 
                        padding: '10px 20px',
                        background: '#27ae60',
                        color: 'white',
                        border: 'none',
                        borderRadius: 4,
                        cursor: 'pointer'
                      }}
                    >
                      {editingRecord ? 'Update' : 'Create'}
                    </button>
                    <button 
                      type="button"
                      onClick={handleCancel}
                      style={{ 
                        padding: '10px 20px',
                        background: '#95a5a6',
                        color: 'white',
                        border: 'none',
                        borderRadius: 4,
                        cursor: 'pointer'
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Records Table */}
            <div style={{ background: 'white', borderRadius: 8, overflow: 'hidden' }}>
              {records.length === 0 ? (
                <p style={{ padding: 20, textAlign: 'center' }}>
                  No records found. Click "Add New {selectedModel}" to create one.
                </p>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#34495e', color: 'white' }}>
                      {Object.keys(records[0]).map((key) => (
                        <th key={key} style={{ padding: 12, textAlign: 'left' }}>
                          {key}
                        </th>
                      ))}
                      <th style={{ padding: 12, textAlign: 'center' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((record, index) => (
                      <tr 
                        key={record.id}
                        style={{ 
                          borderBottom: '1px solid #ecf0f1',
                          background: index % 2 === 0 ? 'white' : '#f8f9fa'
                        }}
                      >
                        {Object.entries(record).map(([key, value]) => (
                          <td key={key} style={{ padding: 12 }}>
                            {String(value)}
                          </td>
                        ))}
                        <td style={{ padding: 12, textAlign: 'center' }}>
                          <button
                            onClick={() => handleEdit(record)}
                            style={{
                              padding: '6px 12px',
                              background: '#3498db',
                              color: 'white',
                              border: 'none',
                              borderRadius: 4,
                              cursor: 'pointer',
                              marginRight: 8
                            }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(record.id)}
                            style={{
                              padding: '6px 12px',
                              background: '#e74c3c',
                              color: 'white',
                              border: 'none',
                              borderRadius: 4,
                              cursor: 'pointer'
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}