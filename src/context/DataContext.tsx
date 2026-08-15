import React, { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { ProjectItem, MomentItem, JourneyItem, WhatIDoItem, StoryCardItem } from '../types';
import {
  PROJECTS as DEFAULT_PROJECTS,
  MOMENTS as DEFAULT_MOMENTS,
  JOURNEY_STEPS as DEFAULT_JOURNEY,
  PERSONAL_INFO as DEFAULT_PERSONAL_INFO,
  WHAT_I_DO_ITEMS as DEFAULT_WHAT_I_DO,
  ABOUT_TEXT as DEFAULT_ABOUT_TEXT,
  ABOUT_FRAGMENTS as DEFAULT_ABOUT_FRAGMENTS,
  HOMETOWN_STORY as DEFAULT_HOMETOWN,
  STORY_MARQUEE_ROW_1 as DEFAULT_MARQUEE_1,
  STORY_MARQUEE_ROW_2 as DEFAULT_MARQUEE_2,
} from '../data/portfolioData';
import { api, setAuthToken, getAuthToken, type ContactMessage, type AuthUser } from '../services/api';

export type PersonalInfoType = typeof DEFAULT_PERSONAL_INFO;
export type HometownStoryType = typeof DEFAULT_HOMETOWN;

interface DataContextType {
  projects: ProjectItem[];
  moments: MomentItem[];
  journey: JourneyItem[];
  personalInfo: PersonalInfoType;
  whatIDo: WhatIDoItem[];
  aboutText: string;
  aboutFragments: typeof DEFAULT_ABOUT_FRAGMENTS;
  hometownStory: HometownStoryType;
  storyMarqueeRow1: StoryCardItem[];
  storyMarqueeRow2: StoryCardItem[];
  messages: ContactMessage[];
  unreadMessagesCount: number;
  isLoading: boolean;
  isBackendConnected: boolean;
  authUser: AuthUser | null;
  isAdmin: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  refreshData: () => Promise<void>;
  
  // Projects CRUD
  createProject: (project: Partial<ProjectItem>) => Promise<{ success: boolean; message: string }>;
  updateProject: (id: string, project: Partial<ProjectItem>) => Promise<{ success: boolean; message: string }>;
  deleteProject: (id: string) => Promise<{ success: boolean; message: string }>;

  // Moments CRUD
  createMoment: (moment: Partial<MomentItem>) => Promise<{ success: boolean; message: string }>;
  updateMoment: (id: string, moment: Partial<MomentItem>) => Promise<{ success: boolean; message: string }>;
  deleteMoment: (id: string) => Promise<{ success: boolean; message: string }>;

  // Journey CRUD
  createJourneyStep: (step: Partial<JourneyItem>) => Promise<{ success: boolean; message: string }>;
  updateJourneyStep: (id: string, step: Partial<JourneyItem>) => Promise<{ success: boolean; message: string }>;
  deleteJourneyStep: (id: string) => Promise<{ success: boolean; message: string }>;

  // Profile & Site Settings CRUD
  updatePersonalInfo: (data: Partial<PersonalInfoType>) => Promise<{ success: boolean; message: string }>;
  updateAbout: (data: { text: string; fragments?: any[] }) => Promise<{ success: boolean; message: string }>;
  updateHometown: (data: Partial<HometownStoryType>) => Promise<{ success: boolean; message: string }>;
  updateWhatIDo: (items: WhatIDoItem[]) => Promise<{ success: boolean; message: string }>;

  // Contact
  sendMessage: (data: { name: string; email: string; message: string }) => Promise<{ success: boolean; message: string }>;
  fetchMessages: () => Promise<void>;
  toggleMessageRead: (id: string) => Promise<void>;
  deleteMessage: (id: string) => Promise<void>;

  // Upload
  uploadImage: (file: File) => Promise<{ success: boolean; url: string; message?: string }>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<ProjectItem[]>(DEFAULT_PROJECTS);
  const [moments, setMoments] = useState<MomentItem[]>(DEFAULT_MOMENTS);
  const [journey, setJourney] = useState<JourneyItem[]>(DEFAULT_JOURNEY);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfoType>(DEFAULT_PERSONAL_INFO);
  const [whatIDo, setWhatIDo] = useState<WhatIDoItem[]>(DEFAULT_WHAT_I_DO);
  const [aboutText, setAboutText] = useState<string>(DEFAULT_ABOUT_TEXT);
  const [aboutFragments, setAboutFragments] = useState(DEFAULT_ABOUT_FRAGMENTS);
  const [hometownStory, setHometownStory] = useState<HometownStoryType>(DEFAULT_HOMETOWN);
  const [storyMarqueeRow1, setStoryMarqueeRow1] = useState<StoryCardItem[]>(DEFAULT_MARQUEE_1);
  const [storyMarqueeRow2, setStoryMarqueeRow2] = useState<StoryCardItem[]>(DEFAULT_MARQUEE_2);

  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isBackendConnected, setIsBackendConnected] = useState<boolean>(false);
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);

  // Fetch all live data from backend with fallback
  const refreshData = useCallback(async () => {
    try {
      const [pRes, mRes, jRes, sRes] = await Promise.allSettled([
        api.getProjects(),
        api.getMoments(),
        api.getJourney(),
        api.getSettings(),
      ]);

      let backendOk = false;

      if (pRes.status === 'fulfilled' && pRes.value?.success && pRes.value.data?.length > 0) {
        setProjects(pRes.value.data);
        backendOk = true;
      }
      if (mRes.status === 'fulfilled' && mRes.value?.success && mRes.value.data?.length > 0) {
        setMoments(mRes.value.data);
        backendOk = true;
      }
      if (jRes.status === 'fulfilled' && jRes.value?.success && jRes.value.data?.length > 0) {
        setJourney(jRes.value.data);
        backendOk = true;
      }
      if (sRes.status === 'fulfilled' && sRes.value?.success && sRes.value.data) {
        const s = sRes.value.data;
        if (s.personal_info) setPersonalInfo((prev) => ({ ...prev, ...s.personal_info }));
        if (s.what_i_do) setWhatIDo(s.what_i_do);
        if (s.about) {
          if (s.about.text) setAboutText(s.about.text);
          if (s.about.fragments) setAboutFragments(s.about.fragments);
        }
        if (s.hometown) setHometownStory((prev) => ({ ...prev, ...s.hometown }));
        if (s.marquee) {
          if (s.marquee.row1) setStoryMarqueeRow1(s.marquee.row1);
          if (s.marquee.row2) setStoryMarqueeRow2(s.marquee.row2);
        }
        backendOk = true;
      }

      setIsBackendConnected(backendOk);
    } catch (err) {
      console.warn('Backend server unreachable, falling back to static portfolioData.ts', err);
      setIsBackendConnected(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Check auth status on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = getAuthToken();
      if (!token) return;
      try {
        const res = await api.getMe();
        if (res?.success && res.user) {
          setAuthUser(res.user);
        } else {
          setAuthToken(null);
          setAuthUser(null);
        }
      } catch {
        setAuthToken(null);
        setAuthUser(null);
      }
    };

    checkAuth();
    refreshData();
  }, [refreshData]);

  // Messages fetch
  const fetchMessages = useCallback(async () => {
    if (!authUser) return;
    try {
      const res = await api.getMessages();
      if (res.success && res.data) {
        setMessages(res.data);
      }
    } catch (err) {
      console.error('Lỗi lấy messages:', err);
    }
  }, [authUser]);

  useEffect(() => {
    if (authUser) {
      fetchMessages();
    }
  }, [authUser, fetchMessages]);

  // Login handler
  const login = async (username: string, password: string) => {
    try {
      const res = await api.login(username, password);
      if (res.success && res.token) {
        setAuthToken(res.token);
        setAuthUser(res.user);
        await fetchMessages();
        return { success: true, message: 'Đăng nhập thành công' };
      }
      return { success: false, message: res.message || 'Đăng nhập thất bại' };
    } catch (err: any) {
      return { success: false, message: err.message || 'Lỗi kết nối tới Backend' };
    }
  };

  // Logout handler
  const logout = () => {
    setAuthToken(null);
    setAuthUser(null);
    setMessages([]);
  };

  // Projects CRUD
  const createProject = async (project: Partial<ProjectItem>) => {
    try {
      const res = await api.createProject(project);
      if (res.success) {
        await refreshData();
        return { success: true, message: 'Tạo dự án thành công' };
      }
      return { success: false, message: res.message || 'Lỗi tạo dự án' };
    } catch (err: any) {
      return { success: false, message: err.message };
    }
  };

  const updateProject = async (id: string, project: Partial<ProjectItem>) => {
    try {
      const res = await api.updateProject(id, project);
      if (res.success) {
        await refreshData();
        return { success: true, message: 'Cập nhật dự án thành công' };
      }
      return { success: false, message: res.message || 'Lỗi cập nhật dự án' };
    } catch (err: any) {
      return { success: false, message: err.message };
    }
  };

  const deleteProject = async (id: string) => {
    try {
      const res = await api.deleteProject(id);
      if (res.success) {
        await refreshData();
        return { success: true, message: 'Đã xóa dự án' };
      }
      return { success: false, message: res.message || 'Lỗi xóa dự án' };
    } catch (err: any) {
      return { success: false, message: err.message };
    }
  };

  // Moments CRUD
  const createMoment = async (moment: Partial<MomentItem>) => {
    try {
      const res = await api.createMoment(moment);
      if (res.success) {
        await refreshData();
        return { success: true, message: 'Thêm khoảnh khắc thành công' };
      }
      return { success: false, message: res.message || 'Lỗi thêm khoảnh khắc' };
    } catch (err: any) {
      return { success: false, message: err.message };
    }
  };

  const updateMoment = async (id: string, moment: Partial<MomentItem>) => {
    try {
      const res = await api.updateMoment(id, moment);
      if (res.success) {
        await refreshData();
        return { success: true, message: 'Cập nhật khoảnh khắc thành công' };
      }
      return { success: false, message: res.message || 'Lỗi cập nhật' };
    } catch (err: any) {
      return { success: false, message: err.message };
    }
  };

  const deleteMoment = async (id: string) => {
    try {
      const res = await api.deleteMoment(id);
      if (res.success) {
        await refreshData();
        return { success: true, message: 'Đã xóa khoảnh khắc' };
      }
      return { success: false, message: res.message || 'Lỗi xóa' };
    } catch (err: any) {
      return { success: false, message: err.message };
    }
  };

  // Journey CRUD
  const createJourneyStep = async (step: Partial<JourneyItem>) => {
    try {
      const res = await api.createJourneyStep(step);
      if (res.success) {
        await refreshData();
        return { success: true, message: 'Thêm cột mốc thành công' };
      }
      return { success: false, message: res.message || 'Lỗi thêm' };
    } catch (err: any) {
      return { success: false, message: err.message };
    }
  };

  const updateJourneyStep = async (id: string, step: Partial<JourneyItem>) => {
    try {
      const res = await api.updateJourneyStep(id, step);
      if (res.success) {
        await refreshData();
        return { success: true, message: 'Cập nhật cột mốc thành công' };
      }
      return { success: false, message: res.message || 'Lỗi cập nhật' };
    } catch (err: any) {
      return { success: false, message: err.message };
    }
  };

  const deleteJourneyStep = async (id: string) => {
    try {
      const res = await api.deleteJourneyStep(id);
      if (res.success) {
        await refreshData();
        return { success: true, message: 'Đã xóa cột mốc' };
      }
      return { success: false, message: res.message || 'Lỗi xóa' };
    } catch (err: any) {
      return { success: false, message: err.message };
    }
  };

  // Profile & Site Settings CRUD
  const updatePersonalInfo = async (data: Partial<PersonalInfoType>) => {
    try {
      const updated = { ...personalInfo, ...data };
      const res = await api.updateSetting('personal_info', updated);
      if (res.success) {
        setPersonalInfo(updated);
        return { success: true, message: 'Đã cập nhật thông tin cá nhân' };
      }
      return { success: false, message: res.message || 'Lỗi cập nhật' };
    } catch (err: any) {
      return { success: false, message: err.message };
    }
  };

  const updateAbout = async (data: { text: string; fragments?: any[] }) => {
    try {
      const updated = { text: data.text, fragments: data.fragments || aboutFragments };
      const res = await api.updateSetting('about', updated);
      if (res.success) {
        setAboutText(data.text);
        if (data.fragments) setAboutFragments(data.fragments);
        return { success: true, message: 'Đã cập nhật phần giới thiệu' };
      }
      return { success: false, message: res.message || 'Lỗi cập nhật' };
    } catch (err: any) {
      return { success: false, message: err.message };
    }
  };

  const updateHometown = async (data: Partial<HometownStoryType>) => {
    try {
      const updated = { ...hometownStory, ...data };
      const res = await api.updateSetting('hometown', updated);
      if (res.success) {
        setHometownStory(updated);
        return { success: true, message: 'Đã cập nhật thông tin quê hương' };
      }
      return { success: false, message: res.message || 'Lỗi cập nhật' };
    } catch (err: any) {
      return { success: false, message: err.message };
    }
  };

  const updateWhatIDo = async (items: WhatIDoItem[]) => {
    try {
      const res = await api.updateSetting('what_i_do', items);
      if (res.success) {
        setWhatIDo(items);
        return { success: true, message: 'Đã cập nhật danh sách dịch vụ' };
      }
      return { success: false, message: res.message || 'Lỗi cập nhật' };
    } catch (err: any) {
      return { success: false, message: err.message };
    }
  };

  // Contact
  const sendMessage = async (data: { name: string; email: string; message: string }) => {
    try {
      const res = await api.submitContact(data);
      if (res.success) {
        if (authUser) fetchMessages();
        return { success: true, message: res.message || 'Tin nhắn đã gửi thành công!' };
      }
      return { success: false, message: res.message || 'Lỗi khi gửi tin nhắn' };
    } catch (err: any) {
      return { success: false, message: err.message || 'Không thể kết nối máy chủ' };
    }
  };

  const toggleMessageRead = async (id: string) => {
    try {
      const res = await api.toggleMessageRead(id);
      if (res.success) {
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, isRead: !m.isRead } : m))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMessage = async (id: string) => {
    try {
      const res = await api.deleteMessage(id);
      if (res.success) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const uploadImage = async (file: File) => {
    try {
      return await api.uploadImage(file);
    } catch (err: any) {
      return { success: false, url: '', message: err.message || 'Lỗi upload ảnh' };
    }
  };

  const unreadMessagesCount = messages.filter((m) => !m.isRead).length;

  return (
    <DataContext.Provider
      value={{
        projects,
        moments,
        journey,
        personalInfo,
        whatIDo,
        aboutText,
        aboutFragments,
        hometownStory,
        storyMarqueeRow1,
        storyMarqueeRow2,
        messages,
        unreadMessagesCount,
        isLoading,
        isBackendConnected,
        authUser,
        isAdmin: !!authUser,
        login,
        logout,
        refreshData,
        createProject,
        updateProject,
        deleteProject,
        createMoment,
        updateMoment,
        deleteMoment,
        createJourneyStep,
        updateJourneyStep,
        deleteJourneyStep,
        updatePersonalInfo,
        updateAbout,
        updateHometown,
        updateWhatIDo,
        sendMessage,
        fetchMessages,
        toggleMessageRead,
        deleteMessage,
        uploadImage,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
