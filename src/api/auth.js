const API_BASE_URL = 'http://localhost:5000/api/auth';

// Helper to get stored auth state
export const getStoredAuth = () => {
  try {
    const token = localStorage.getItem('kaamsetu_jwt_token');
    const userStr = localStorage.getItem('kaamsetu_user_session');
    const user = userStr ? JSON.parse(userStr) : null;
    return { token, user };
  } catch {
    return { token: null, user: null };
  }
};

// Helper to save auth state
export const saveAuthSession = (token, user) => {
  try {
    if (token) localStorage.setItem('kaamsetu_jwt_token', token);
    if (user) localStorage.setItem('kaamsetu_user_session', JSON.stringify(user));
  } catch (e) {
    console.error('Failed to save session:', e);
  }
};

// Helper to clear auth state
export const clearAuthSession = () => {
  try {
    localStorage.removeItem('kaamsetu_jwt_token');
    localStorage.removeItem('kaamsetu_user_session');
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
      email: formData.email || `${formData.phone}@kaamsetu.org`,
      role: formData.role || 'customer',
      cooperativeName: formData.cooperativeName,
      tradeSkill: formData.tradeSkill
    };
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
    const role = credentials.role || 'customer';
    const mockUser = {
      id: `usr-${role}-demo`,
      name: role === 'cooperative' ? 'Nagpur Co-op Admin' : role === 'worker' ? 'Ramesh Kumar (Plumber)' : 'Demo Customer',
      phone: credentials.identifier || credentials.phone || '9823011223',
      email: `${credentials.identifier || 'user'}@kaamsetu.org`,
      role: role
    };
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
