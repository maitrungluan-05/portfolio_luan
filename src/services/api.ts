import type { ProjectItem, MomentItem, JourneyItem } from '../types';

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

export const api = {
  // Auth
  login: async (username: string, password: string) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    return res.json();
  },

  getMe: async () => {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: authHeaders(),
    });
    return res.json();
  },

  // Projects
  getProjects: async (): Promise<{ success: boolean; data: ProjectItem[] }> => {
    const res = await fetch(`${API_BASE}/projects`);
    return res.json();
  },

  createProject: async (project: Partial<ProjectItem>) => {
    const res = await fetch(`${API_BASE}/projects`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(project),
    });
    return res.json();
  },

  updateProject: async (id: string, project: Partial<ProjectItem>) => {
    const res = await fetch(`${API_BASE}/projects/${id}`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(project),
    });
    return res.json();
  },

  deleteProject: async (id: string) => {
    const res = await fetch(`${API_BASE}/projects/${id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    return res.json();
  },

  // Moments
  getMoments: async (): Promise<{ success: boolean; data: MomentItem[] }> => {
    const res = await fetch(`${API_BASE}/moments`);
    return res.json();
  },

  createMoment: async (moment: Partial<MomentItem>) => {
    const res = await fetch(`${API_BASE}/moments`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(moment),
    });
    return res.json();
  },

  updateMoment: async (id: string, moment: Partial<MomentItem>) => {
    const res = await fetch(`${API_BASE}/moments/${id}`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(moment),
    });
    return res.json();
  },

  deleteMoment: async (id: string) => {
    const res = await fetch(`${API_BASE}/moments/${id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    return res.json();
  },

  // Journey
  getJourney: async (): Promise<{ success: boolean; data: JourneyItem[] }> => {
    const res = await fetch(`${API_BASE}/journey`);
    return res.json();
  },

  createJourneyStep: async (step: Partial<JourneyItem>) => {
    const res = await fetch(`${API_BASE}/journey`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(step),
    });
    return res.json();
  },

  updateJourneyStep: async (id: string, step: Partial<JourneyItem>) => {
    const res = await fetch(`${API_BASE}/journey/${id}`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(step),
    });
    return res.json();
  },

  deleteJourneyStep: async (id: string) => {
    const res = await fetch(`${API_BASE}/journey/${id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    return res.json();
  },

  // Contact
  submitContact: async (data: { name: string; email: string; message: string }) => {
    const res = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  getMessages: async (): Promise<{ success: boolean; data: ContactMessage[] }> => {
    const res = await fetch(`${API_BASE}/contact/messages`, {
      headers: authHeaders(),
    });
    return res.json();
  },

  toggleMessageRead: async (id: string) => {
    const res = await fetch(`${API_BASE}/contact/messages/${id}/read`, {
      method: 'PATCH',
      headers: authHeaders(),
    });
    return res.json();
  },

  deleteMessage: async (id: string) => {
    const res = await fetch(`${API_BASE}/contact/messages/${id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    return res.json();
  },

  // Settings
  getSettings: async (): Promise<{ success: boolean; data: Record<string, any> }> => {
    const res = await fetch(`${API_BASE}/settings`);
    return res.json();
  },

  updateSetting: async (key: string, value: any) => {
    const res = await fetch(`${API_BASE}/settings/${key}`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify({ value }),
    });
    return res.json();
  },

  // Image Upload
  uploadImage: async (file: File): Promise<{ success: boolean; url: string; message?: string }> => {
    const formData = new FormData();
    formData.append('image', file);

    const token = getAuthToken();
    const res = await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    });
    return res.json();
  },
};
