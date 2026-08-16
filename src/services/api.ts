import type { ProjectItem, MomentItem, JourneyItem, ServiceItem } from '../types';

export interface ContactMessage {
  id: string;
  name: string;
  contactInfo: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface AuthUser {
  id: string;
  username: string;
}

const API_BASE = '/api';

// Helper to get stored auth token
export const getAuthToken = (): string | null => {
  return localStorage.getItem('trungluanmmo_token');
};

export const setAuthToken = (token: string | null) => {
  if (token) {
    localStorage.setItem('trungluanmmo_token', token);
  } else {
    localStorage.removeItem('trungluanmmo_token');
  }
};

// Helper for authenticated requests
const authHeaders = () => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

// Helper to safely handle fetch responses and prevent "Unexpected end of JSON input" errors
async function handleResponse<T = any>(res: Response): Promise<T> {
  const contentType = res.headers.get('content-type') || '';
  
  if (contentType.includes('application/json')) {
    try {
      const data = await res.json();
      return data;
    } catch {
      throw new Error('Không thể đọc dữ liệu JSON phản hồi từ máy chủ.');
    }
  }

  const text = await res.text();
  if (!res.ok) {
    if (res.status === 502 || res.status === 504 || res.status === 500 || !text) {
      throw new Error('Máy chủ Backend (Port 5000) chưa được khởi chạy hoặc không phản hồi. Hãy chạy lệnh "npm run dev" trong terminal.');
    }
    throw new Error(`Máy chủ trả về lỗi ${res.status}: ${text || res.statusText}`);
  }

  if (!text || text.trim() === '') {
    return { success: true } as unknown as T;
  }

  try {
    return JSON.parse(text);
  } catch {
    return { success: true, raw: text } as unknown as T;
  }
}

const safeFetch = async <T = any>(url: string, options?: RequestInit): Promise<T> => {
  try {
    const res = await fetch(url, options);
    return await handleResponse<T>(res);
  } catch (err: any) {
    if (err.message && (err.message.includes('Failed to fetch') || err.message.includes('NetworkError') || err.message.includes('fetch failed'))) {
      throw new Error('Không thể kết nối đến Backend Server (Port 5000). Vui lòng chạy "npm run dev" để khởi động đầy đủ hệ thống.');
    }
    throw err;
  }
};

export const api = {
  // Auth
  login: async (username: string, password: string) => {
    return safeFetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
  },

  getMe: async () => {
    return safeFetch(`${API_BASE}/auth/me`, {
      headers: authHeaders(),
    });
  },

  // Projects
  getProjects: async (): Promise<{ success: boolean; data: ProjectItem[] }> => {
    return safeFetch(`${API_BASE}/projects`);
  },

  createProject: async (project: Partial<ProjectItem>) => {
    return safeFetch(`${API_BASE}/projects`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(project),
    });
  },

  updateProject: async (id: string, project: Partial<ProjectItem>) => {
    return safeFetch(`${API_BASE}/projects/${id}`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(project),
    });
  },

  deleteProject: async (id: string) => {
    return safeFetch(`${API_BASE}/projects/${id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
  },

  // Moments
  getMoments: async (): Promise<{ success: boolean; data: MomentItem[] }> => {
    return safeFetch(`${API_BASE}/moments`);
  },

  createMoment: async (moment: Partial<MomentItem>) => {
    return safeFetch(`${API_BASE}/moments`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(moment),
    });
  },

  updateMoment: async (id: string, moment: Partial<MomentItem>) => {
    return safeFetch(`${API_BASE}/moments/${id}`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(moment),
    });
  },

  deleteMoment: async (id: string) => {
    return safeFetch(`${API_BASE}/moments/${id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
  },

  // Journey
  getJourney: async (): Promise<{ success: boolean; data: JourneyItem[] }> => {
    return safeFetch(`${API_BASE}/journey`);
  },

  createJourneyStep: async (step: Partial<JourneyItem>) => {
    return safeFetch(`${API_BASE}/journey`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(step),
    });
  },

  updateJourneyStep: async (id: string, step: Partial<JourneyItem>) => {
    return safeFetch(`${API_BASE}/journey/${id}`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(step),
    });
  },

  deleteJourneyStep: async (id: string) => {
    return safeFetch(`${API_BASE}/journey/${id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
  },

  // Contact
  submitContact: async (data: { name: string; email: string; message: string }) => {
    return safeFetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  },

  getMessages: async (): Promise<{ success: boolean; data: ContactMessage[] }> => {
    return safeFetch(`${API_BASE}/contact/messages`, {
      headers: authHeaders(),
    });
  },

  toggleMessageRead: async (id: string) => {
    return safeFetch(`${API_BASE}/contact/messages/${id}/read`, {
      method: 'PATCH',
      headers: authHeaders(),
    });
  },

  deleteMessage: async (id: string) => {
    return safeFetch(`${API_BASE}/contact/messages/${id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
  },

  // Services
  getServices: async (): Promise<{ success: boolean; data: ServiceItem[] }> => {
    return safeFetch(`${API_BASE}/services`);
  },

  createService: async (service: Partial<ServiceItem>) => {
    return safeFetch(`${API_BASE}/services`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(service),
    });
  },

  updateService: async (id: string, service: Partial<ServiceItem>) => {
    return safeFetch(`${API_BASE}/services/${id}`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(service),
    });
  },

  deleteService: async (id: string) => {
    return safeFetch(`${API_BASE}/services/${id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
  },

  // Settings
  getSettings: async (): Promise<{ success: boolean; data: Record<string, any> }> => {
    return safeFetch(`${API_BASE}/settings`);
  },

  updateSetting: async (key: string, value: any) => {
    return safeFetch(`${API_BASE}/settings/${key}`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify({ value }),
    });
  },

  // Image Upload
  uploadImage: async (file: File): Promise<{ success: boolean; url: string; message?: string }> => {
    const formData = new FormData();
    formData.append('image', file);

    const token = getAuthToken();
    return safeFetch(`${API_BASE}/upload`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    });
  },
};
