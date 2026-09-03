const API_BASE_URL = 'http://localhost:5000/api/auth';

// Helper to get registered users from localStorage
export const getRegisteredUsers = () => {
  try {
    const data = localStorage.getItem('sahakaar_registered_users');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

// Helper to save registered user to localStorage
export const saveRegisteredUser = (user, password) => {
  try {
    const users = getRegisteredUsers();
    const existingIndex = users.findIndex(u => u.phone === user.phone || u.email === user.email);
    const record = { ...user, password };
    if (existingIndex >= 0) {
      users[existingIndex] = record;
    } else {
      users.push(record);
    }
    localStorage.setItem('sahakaar_registered_users', JSON.stringify(users));
  } catch (e) {
    console.error('Failed to save registered user:', e);
  }
};

// Helper to get stored auth state
export const getStoredAuth = () => {
  try {
    const token = localStorage.getItem('sahakaar_jwt_token');
    const userStr = localStorage.getItem('sahakaar_user_session');
    const user = userStr ? JSON.parse(userStr) : null;
    return { token, user };
  } catch {
    return { token: null, user: null };
  }
};

// Helper to save auth state
export const saveAuthSession = (token, user) => {
  try {
    if (token) localStorage.setItem('sahakaar_jwt_token', token);
    if (user) localStorage.setItem('sahakaar_user_session', JSON.stringify(user));
  } catch (e) {
    console.error('Failed to save session:', e);
  }
};

// Helper to clear auth state
export const clearAuthSession = () => {
  try {
    localStorage.removeItem('sahakaar_jwt_token');
    localStorage.removeItem('sahakaar_user_session');
  } catch (e) {
    console.error('Failed to clear session:', e);
  }
};

// REGISTER API with fallback
export const registerUserApi = async (formData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
      signal: AbortSignal.timeout(3000)
    });

    if (res.ok) {
      const data = await res.json();
      saveAuthSession(data.token, data.user);
      saveRegisteredUser(data.user, formData.password);
      return { success: true, data };
    } else {
      const errData = await res.json();
      return { success: false, message: errData.message || 'Registration failed.' };
    }
  } catch (err) {
    // Offline / Mock Fallback
    console.warn('Backend unavailable, using mock registration session');
    const mockUser = {
      id: `usr-${Date.now()}`,
      name: formData.name || 'Cooperative Member',
      phone: formData.phone,
      email: formData.email || `${formData.phone}@sahakaar.org`,
      role: formData.role || 'customer',
      cooperativeName: formData.cooperativeName || 'Nagpur Labour Cooperative Society',
      tradeSkill: formData.tradeSkill || 'Plumber',
      registrationNo: formData.registrationNo || ''
    };
    saveRegisteredUser(mockUser, formData.password);
    const mockToken = `mock_jwt_token_${Date.now()}`;
    saveAuthSession(mockToken, mockUser);
    return { success: true, data: { token: mockToken, user: mockUser } };
  }
};

// LOGIN API with fallback
export const loginUserApi = async (credentials) => {
  try {
    const res = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
      signal: AbortSignal.timeout(3000)
    });

    if (res.ok) {
      const data = await res.json();
      saveAuthSession(data.token, data.user);
      return { success: true, data };
    } else {
      const errData = await res.json();
      return { success: false, message: errData.message || 'Invalid login credentials.' };
    }
  } catch (err) {
    // Offline / Mock Fallback
    console.warn('Backend unavailable, using mock login session');
    const identifier = credentials.identifier || credentials.phone || '';
    const password = credentials.password || '';
    const role = credentials.role || 'customer';

    const registeredUsers = getRegisteredUsers();
    const matchedUser = registeredUsers.find(u => 
      (u.phone && String(u.phone) === String(identifier)) || 
      (u.email && String(u.email).toLowerCase() === String(identifier).toLowerCase())
    );

    if (matchedUser) {
      if (password && matchedUser.password && matchedUser.password !== password) {
        return { success: false, message: 'Invalid password. Please check your credentials.' };
      }
      const mockToken = `mock_jwt_token_${Date.now()}`;
      saveAuthSession(mockToken, matchedUser);
      return { success: true, data: { token: mockToken, user: matchedUser } };
    }

    // Quick Demo logins
    if (identifier === '9823011223' || identifier === '9422100998' || identifier === '9823010101' || password === 'demo123' || password === 'coop123') {
      const mockUser = {
        id: `usr-${role}-demo`,
        name: role === 'cooperative' ? 'Nagpur Co-op Admin' : role === 'worker' ? 'Ramesh Kumar (Plumber)' : 'Demo Customer',
        phone: identifier || '9823011223',
        email: `${identifier || 'user'}@sahakaar.org`,
        role: role
      };
      const mockToken = `mock_jwt_token_${Date.now()}`;
      saveAuthSession(mockToken, mockUser);
      return { success: true, data: { token: mockToken, user: mockUser } };
    }

    // Direct fallback session
    const mockUser = {
      id: `usr-${Date.now()}`,
      name: role === 'cooperative' ? `${identifier} Admin` : role === 'worker' ? `${identifier} (Worker)` : `${identifier} Customer`,
      phone: identifier,
      email: `${identifier}@sahakaar.org`,
      role: role
    };
    saveRegisteredUser(mockUser, password);
    const mockToken = `mock_jwt_token_${Date.now()}`;
    saveAuthSession(mockToken, mockUser);
    return { success: true, data: { token: mockToken, user: mockUser } };
  }
};

// GET CURRENT USER ME API
export const fetchCurrentUserApi = async () => {
  const { token } = getStoredAuth();
  if (!token) return null;

  try {
    const res = await fetch(`${API_BASE_URL}/me`, {
      headers: { 
        'Authorization': `Bearer ${token}` 
      },
      signal: AbortSignal.timeout(2000)
    });

    if (res.ok) {
      const user = await res.json();
      saveAuthSession(token, user);
      return user;
    }
  } catch {}

  const { user } = getStoredAuth();
  return user;
};

