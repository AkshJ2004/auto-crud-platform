import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav style={{ padding: 10, background: '#222', color: 'white' }}>
      <Link to="/dashboard" style={{ color: 'white', marginRight: 20 }}>Dashboard</Link>
      <Link to="/builder" style={{ color: 'white' }}>Model Builder</Link>
    </nav>
  )
}
