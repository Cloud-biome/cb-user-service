import { useState } from 'react'

function App() {
  const [registerForm, setRegisterForm] = useState({ name: '', email: '' })
  const [registerStatus, setRegisterStatus] = useState(null)

  const [lookupId, setLookupId] = useState('')
  const [lookupStatus, setLookupStatus] = useState(null)
  const [userData, setUserData] = useState(null)

  const [isLoading, setIsLoading] = useState(false)

  const handleRegister = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setRegisterStatus(null)

    try {
      const response = await fetch('http://localhost:8080/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerForm)
      })

      const data = await response.json()

      if (response.ok) {
        setRegisterStatus({ type: 'success', message: 'User registered successfully!' })
        setUserData(data)
        setRegisterForm({ name: '', email: '' })
      } else {
        setRegisterStatus({ type: 'error', message: data.message || 'Failed to register user.' })
      }
    } catch (error) {
      setRegisterStatus({ type: 'error', message: 'Network error. Make sure the backend is running.' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleLookup = async (e) => {
    e.preventDefault()
    if (!lookupId.trim()) return

    setIsLoading(true)
    setLookupStatus(null)
    setUserData(null)

    try {
      const response = await fetch(`http://localhost:8080/users/${lookupId}`)

      if (response.ok) {
        const data = await response.json()
        setUserData(data)
      } else if (response.status === 404) {
        setLookupStatus({ type: 'error', message: 'User not found.' })
      } else {
        setLookupStatus({ type: 'error', message: 'Failed to fetch user.' })
      }
    } catch (error) {
      setLookupStatus({ type: 'error', message: 'Network error. Make sure the backend is running.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="app-container">
      <header className="header">
        <h1>User Management Service</h1>
        <p>Cloud Biome - User Management</p>
      </header>

      <div className="content-grid">
        <div className="glass-card">
          <h2>Register User</h2>
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                value={registerForm.name}
                onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                placeholder="Your Name"
                required
              />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                value={registerForm.email}
                onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                placeholder="abc@xyz.com"
                required
              />
            </div>
            <button type="submit" className="btn" disabled={isLoading}>
              Register
            </button>
          </form>

          {registerStatus && (
            <div className={`message ${registerStatus.type}`}>
              {registerStatus.message}
            </div>
          )}
        </div>

        <div className="glass-card">
          <h2>Find User</h2>
          <form onSubmit={handleLookup}>
            <div className="form-group">
              <label>User ID</label>
              <input
                type="text"
                value={lookupId}
                onChange={(e) => setLookupId(e.target.value)}
                placeholder="550e8400-e29b-41d4-a716-446655440000"
                required
              />
            </div>
            <button type="submit" className="btn" disabled={isLoading}>
              Lookup User
            </button>
          </form>

          {lookupStatus && (
            <div className={`message ${lookupStatus.type}`}>
              {lookupStatus.message}
            </div>
          )}

          {userData && (
            <div className="user-details">
              <div className="user-details-item">
                <span className="user-details-label">User ID</span>
                <span className="user-details-value">{userData.userId}</span>
              </div>
              <div className="user-details-item">
                <span className="user-details-label">Name</span>
                <span className="user-details-value">{userData.name}</span>
              </div>
              <div className="user-details-item">
                <span className="user-details-label">Email</span>
                <span className="user-details-value">{userData.email}</span>
              </div>
              <div className="user-details-item">
                <span className="user-details-label">Created At</span>
                <span className="user-details-value">
                  {new Date(userData.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
