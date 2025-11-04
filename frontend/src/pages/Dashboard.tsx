import { useEffect, useState } from 'react'
import { API } from '../services/api'
import { useNavigate } from 'react-router-dom'

interface Model {
  name: string
  id?: number
  createdAt?: string
}

export default function Dashboard() {
  const [models, setModels] = useState<Model[]>([])
  const navigate = useNavigate()

  const fetchModels = async () => {
    const res = await API.get('/models')
    setModels(res.data)
  }

  useEffect(() => {
    fetchModels()
  }, [])

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Dashboard</h2>
      <button onClick={() => navigate('/builder')}>+ Create New Model</button>
      <h3>Existing Models</h3>
      <ul>
        {models.map((m) => (
          <li key={m.name}>{m.name}</li>
        ))}
      </ul>
    </div>
  )
}
