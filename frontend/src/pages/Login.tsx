import { useState } from 'react'
import { API } from '../services/api'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const res = await API.post('/auth/login', { username, password })
      localStorage.setItem('token', res.data.token)
      alert('Login successful!')
      navigate('/dashboard')
    } catch (err) {
      alert('Login failed')
    }
  }

  return (
    <div style={{ textAlign: 'center', marginTop: 100 }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        /><br/><br/>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br/><br/>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
