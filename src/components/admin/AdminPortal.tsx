import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  X,
  Lock,
  LogOut,
  Plus,
  Trash2,
  Edit3,
  Upload,
  CheckCircle2,
  FolderGit2,
  Image as ImageIcon,
  Milestone,
  Inbox,
  Sparkles,
  Save,
  Server,
  Database,
  Sliders,
  Briefcase,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import type { ProjectItem, MomentItem, JourneyItem, WhatIDoItem, ServiceItem } from '../../types';
import { analyzeImageWithAI } from '../../services/aiVisionService';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ isOpen, onClose }) => {
  const {
    projects,
    moments,
    journey,
    services,
    personalInfo,
    whatIDo,
    aboutText,
    aboutFragments,
    hometownStory,
    messages,
    unreadMessagesCount,
    isBackendConnected,
    authUser,
    isAdmin,
    login,
    logout,
    createProject,
    updateProject,
    deleteProject,
    createService,
    updateService,
    deleteService,
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
    toggleMessageRead,
    deleteMessage,
    uploadImage,
  } = useData();

  // Active Tab
  const [activeTab, setActiveTab] = useState<'projects' | 'services' | 'moments' | 'journey' | 'messages' | 'profile' | 'info'>('projects');
  const [profileSubTab, setProfileSubTab] = useState<'personal' | 'about' | 'hometown' | 'services'>('personal');

  // Login Form State
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Modals for CRUD
  const [editingProject, setEditingProject] = useState<Partial<ProjectItem> | null>(null);
  const [isNewProject, setIsNewProject] = useState(false);

  const [editingServiceItem, setEditingServiceItem] = useState<Partial<ServiceItem> | null>(null);
  const [isNewServiceItem, setIsNewServiceItem] = useState(false);

  const [editingMoment, setEditingMoment] = useState<Partial<MomentItem> | null>(null);
  const [isNewMoment, setIsNewMoment] = useState(false);

  const [editingJourney, setEditingJourney] = useState<Partial<JourneyItem> | null>(null);
  const [isNewJourney, setIsNewJourney] = useState(false);

  // Profile Form States
  const [personalForm, setPersonalForm] = useState(personalInfo);
  const [aboutFormText, setAboutFormText] = useState(aboutText);
  const [hometownForm, setHometownForm] = useState(hometownStory);
  const [servicesForm, setServicesForm] = useState<WhatIDoItem[]>(whatIDo);

  // Sync profile form states when context data updates
  useEffect(() => {
    setPersonalForm(personalInfo);
  }, [personalInfo]);

  useEffect(() => {
    setAboutFormText(aboutText);
  }, [aboutText]);

  useEffect(() => {
    setHometownForm(hometownStory);
  }, [hometownStory]);

  useEffect(() => {
    setServicesForm(whatIDo);
  }, [whatIDo]);

  const [actionMessage, setActionMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isAiAnalyzing, setIsAiAnalyzing] = useState(false);

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setActionMessage({ text, type });
    setTimeout(() => setActionMessage(null), 3000);
  };

  // AI Smart Auto-Fill for Moment
  const handleAiAutoFillMoment = async (imageSource?: string | File) => {
    if (!editingMoment) return;
    const targetSource = imageSource || editingMoment.image;
    if (!targetSource) {
      showToast('Vui lòng chọn hoặc nhập link ảnh trước', 'error');
      return;
    }

    setIsAiAnalyzing(true);
    try {
      const suggestion = await analyzeImageWithAI(targetSource, 'moment');
      setEditingMoment((prev) => ({
        ...prev,
        title: suggestion.title,
        category: suggestion.category,
        location: suggestion.location,
        aspectRatio: suggestion.aspectRatio,
        caption: suggestion.caption,
      }));
      showToast('✨ AI đã phân tích ảnh và tự động điền form thành công!');
    } catch {
      showToast('Không thể phân tích ảnh tự động', 'error');
    } finally {
      setIsAiAnalyzing(false);
    }
  };

  // AI Smart Auto-Fill for Project
  const handleAiAutoFillProject = async (imageSource?: string | File) => {
    if (!editingProject) return;
    const targetSource = imageSource || (editingProject.images && editingProject.images[0]);
    if (!targetSource) {
      showToast('Vui lòng upload ít nhất 1 ảnh dự án trước', 'error');
      return;
    }

    setIsAiAnalyzing(true);
    try {
      const suggestion = await analyzeImageWithAI(targetSource, 'project');
      setEditingProject((prev) => ({
        ...prev,
        name: prev?.name || suggestion.title,
        type: prev?.type || suggestion.category,
        description: suggestion.caption,
        longDescription: suggestion.description,
        technologies: suggestion.technologies || prev?.technologies || ['React', 'TypeScript', 'Node.js'],
      }));
      showToast('✨ AI đã phân tích ảnh dự án và tự điền thông tin!');
    } catch {
      showToast('Lỗi phân tích ảnh AI', 'error');
    } finally {
      setIsAiAnalyzing(false);
    }
  };

  // Handle Login
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);
    const res = await login(loginUser, loginPass);
    setLoginLoading(false);
    if (!res.success) {
      setLoginError(res.message);
    } else {
      showToast('Đăng nhập quản trị thành công!');
    }
  };

  // Handle Image Upload for Project
  const handleProjectImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setIsUploading(true);
    const res = await uploadImage(file);
    setIsUploading(false);
    if (res.success && editingProject) {
      const currentImages = editingProject.images || [];
      const updatedImages = [...currentImages, res.url];
      setEditingProject({
        ...editingProject,
        images: updatedImages,
      });
      showToast('Tải ảnh dự án lên thành công');
      // Auto-trigger AI if fields are blank
      if (!editingProject.name || !editingProject.description) {
        handleAiAutoFillProject(file);
      }
    } else {
      showToast(res.message || 'Lỗi tải ảnh', 'error');
    }
  };

  // Handle Image Upload for Moment
  const handleMomentImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setIsUploading(true);
    const res = await uploadImage(file);
    setIsUploading(false);
    if (res.success && editingMoment) {
      setEditingMoment({
        ...editingMoment,
        image: res.url,
      });
      showToast('Tải ảnh khoảnh khắc lên thành công');
      // Auto-trigger AI to auto-fill title, caption, location, category
      handleAiAutoFillMoment(file);
    } else {
      showToast(res.message || 'Lỗi tải ảnh', 'error');
    }
  };

  // Handle Image Upload for Hometown Hero
  const handleHometownImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setIsUploading(true);
    const res = await uploadImage(file);
    setIsUploading(false);
    if (res.success) {
      setHometownForm({
        ...hometownForm,
        heroImage: res.url,
      });
      showToast('Tải ảnh quê hương lên thành công');
    } else {
      showToast(res.message || 'Lỗi tải ảnh', 'error');
    }
  };

  // Save Project
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    if (isNewProject) {
      const res = await createProject(editingProject);
      if (res.success) {
        showToast(res.message);
        setEditingProject(null);
      } else {
        showToast(res.message, 'error');
      }
    } else if (editingProject.id) {
      const res = await updateProject(editingProject.id, editingProject);
      if (res.success) {
        showToast(res.message);
        setEditingProject(null);
      } else {
        showToast(res.message, 'error');
      }
    }
  };

  // Save Moment
  const handleSaveMoment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMoment) return;

    if (isNewMoment) {
      const res = await createMoment(editingMoment);
      if (res.success) {
        showToast(res.message);
        setEditingMoment(null);
      } else {
        showToast(res.message, 'error');
      }
    } else if (editingMoment.id) {
      const res = await updateMoment(editingMoment.id, editingMoment);
      if (res.success) {
        showToast(res.message);
        setEditingMoment(null);
      } else {
        showToast(res.message, 'error');
      }
    }
  };

  // Save Journey
  const handleSaveJourney = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingJourney) return;

    if (isNewJourney) {
      const res = await createJourneyStep(editingJourney);
      if (res.success) {
        showToast(res.message);
        setEditingJourney(null);
      } else {
        showToast(res.message, 'error');
      }
    } else if (editingJourney.id) {
      const res = await updateJourneyStep(editingJourney.id, editingJourney);
      if (res.success) {
        showToast(res.message);
        setEditingJourney(null);
      } else {
        showToast(res.message, 'error');
      }
    }
  };

  // Save Service
  const handleSaveServiceItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingServiceItem) return;

    if (isNewServiceItem) {
      const res = await createService(editingServiceItem);
      if (res.success) {
        showToast(res.message);
        setEditingServiceItem(null);
      } else {
        showToast(res.message, 'error');
      }
    } else if (editingServiceItem.id) {
      const res = await updateService(editingServiceItem.id, editingServiceItem);
      if (res.success) {
        showToast(res.message);
        setEditingServiceItem(null);
      } else {
        showToast(res.message, 'error');
      }
    }
  };

  const handleDeleteServiceItem = async (id: string, title: string) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa dịch vụ "${title}" không?`)) {
      const res = await deleteService(id);
      if (res.success) {
        showToast(res.message);
      } else {
        showToast(res.message, 'error');
      }
    }
  };

  // Save Profile (Personal Info)
  const handleSavePersonal = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await updatePersonalInfo(personalForm);
    if (res.success) {
      showToast(res.message);
    } else {
      showToast(res.message, 'error');
    }
  };

  // Save About
  const handleSaveAbout = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await updateAbout({ text: aboutFormText, fragments: aboutFragments });
    if (res.success) {
      showToast(res.message);
    } else {
      showToast(res.message, 'error');
    }
  };

  // Save Hometown
  const handleSaveHometown = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await updateHometown(hometownForm);
    if (res.success) {
      showToast(res.message);
    } else {
      showToast(res.message, 'error');
    }
  };

  // Save Services
  const handleSaveServices = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await updateWhatIDo(servicesForm);
    if (res.success) {
      showToast(res.message);
    } else {
      showToast(res.message, 'error');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xl p-3 sm:p-6 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-6xl max-h-[92vh] bg-[#121212] border border-white/15 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-[#D7E2EA]"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#161616]/90">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0066FF] to-[#00D2FF] flex items-center justify-center text-white shadow-md">
              <Database size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-kanit font-bold text-lg text-white uppercase tracking-wider">
                  Admin Dashboard CRUD
                </h3>
                <span
                  className={`inline-flex items-center gap-1 text-[11px] font-mono px-2.5 py-0.5 rounded-full border ${
                    isBackendConnected
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isBackendConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                  {isBackendConnected ? 'Express + SQLite Online' : 'Static Fallback'}
                </span>
              </div>
              <p className="text-xs text-[#D7E2EA]/50 font-mono">
                trungluanmmo Fullstack Management System
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAdmin && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono">
                <span className="text-white/40">User:</span>
                <span className="text-[#00D2FF] font-bold">{authUser?.username}</span>
                <button
                  onClick={logout}
                  title="Đăng xuất"
                  className="ml-2 text-white/50 hover:text-rose-400 transition-colors"
                >
                  <LogOut size={14} />
                </button>
              </div>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus:outline-none"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Toast Alert */}
        {actionMessage && (
          <div
            className={`px-6 py-2.5 text-xs font-mono font-medium flex items-center gap-2 ${
              actionMessage.type === 'success' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
            }`}
          >
            <CheckCircle2 size={14} />
            <span>{actionMessage.text}</span>
          </div>
        )}

        {/* Main Content Area */}
        {!isAdmin ? (
          /* Login Screen */
          <div className="flex-1 p-8 sm:p-16 flex items-center justify-center">
            <div className="max-w-md w-full bg-[#181818] border border-white/10 rounded-2xl p-8 shadow-xl">
              <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#0066FF]/20 border border-[#0066FF]/30 text-[#00D2FF] mx-auto flex items-center justify-center mb-3">
                  <Lock size={22} />
                </div>
                <h4 className="text-xl font-bold text-white uppercase font-kanit">
                  Đăng Nhập Quản Trị
                </h4>
                <p className="text-xs text-[#D7E2EA]/60 mt-1">
                  Đăng nhập để thêm, sửa, xóa dữ liệu trên hệ thống
                </p>
                <div className="mt-2.5 flex justify-center">
                  <span
                    className={`inline-flex items-center gap-1.5 text-[10px] font-mono px-3 py-1 rounded-full border ${
                      isBackendConnected
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-300 border-amber-500/20'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${isBackendConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                    {isBackendConnected
                      ? 'Backend Express (Port 5000) Online'
                      : 'Backend Offline (Khuyên dùng "npm run dev")'}
                  </span>
                </div>
              </div>

              {loginError && (
                <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-mono">
                  {loginError}
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#D7E2EA]/70 mb-1.5">
                    Tên đăng nhập
                  </label>
                  <input
                    type="text"
                    required
                    value={loginUser}
                    onChange={(e) => setLoginUser(e.target.value)}
                    placeholder="admin"
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#00D2FF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#D7E2EA]/70 mb-1.5">
                    Mật khẩu
                  </label>
                  <input
                    type="password"
                    required
                    value={loginPass}
                    onChange={(e) => setLoginPass(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#00D2FF]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full py-3 rounded-xl accent-btn-gradient text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-blue-900/40 transition-all disabled:opacity-50"
                >
                  {loginLoading ? 'Đang xác thực...' : 'Đăng Nhập'}
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-white/10 text-center">
                <p className="text-[11px] font-mono text-[#D7E2EA]/40">
                  Tài khoản mặc định: <span className="text-[#00D2FF]">admin</span> / <span className="text-[#00D2FF]">adminpassword123</span>
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Admin Dashboard Main Interface */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Sidebar Navigation */}
            <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-white/10 bg-[#151515] p-4 flex flex-row md:flex-col gap-2 overflow-x-auto">
              <button
                onClick={() => setActiveTab('projects')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-all w-full text-left whitespace-nowrap ${
                  activeTab === 'projects'
                    ? 'bg-[#0066FF] text-white shadow-lg shadow-blue-900/40'
                    : 'text-[#D7E2EA]/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                <FolderGit2 size={16} />
                <span className="flex-1">Dự án</span>
                <span className="px-2 py-0.5 rounded-md bg-white/15 text-[10px]">{projects.length}</span>
              </button>

              <button
                onClick={() => setActiveTab('services')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-all w-full text-left whitespace-nowrap ${
                  activeTab === 'services'
                    ? 'bg-[#0066FF] text-white shadow-lg shadow-blue-900/40'
                    : 'text-[#D7E2EA]/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Briefcase size={16} />
                <span className="flex-1">Dịch vụ MMO</span>
                <span className="px-2 py-0.5 rounded-md bg-white/15 text-[10px]">{services.length}</span>
              </button>

              <button
                onClick={() => setActiveTab('moments')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-all w-full text-left whitespace-nowrap ${
                  activeTab === 'moments'
                    ? 'bg-[#0066FF] text-white shadow-lg shadow-blue-900/40'
                    : 'text-[#D7E2EA]/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                <ImageIcon size={16} />
                <span className="flex-1">Khoảnh khắc</span>
                <span className="px-2 py-0.5 rounded-md bg-white/15 text-[10px]">{moments.length}</span>
              </button>

              <button
                onClick={() => setActiveTab('journey')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-all w-full text-left whitespace-nowrap ${
                  activeTab === 'journey'
                    ? 'bg-[#0066FF] text-white shadow-lg shadow-blue-900/40'
                    : 'text-[#D7E2EA]/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Milestone size={16} />
                <span className="flex-1">Lộ trình</span>
                <span className="px-2 py-0.5 rounded-md bg-white/15 text-[10px]">{journey.length}</span>
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-all w-full text-left whitespace-nowrap ${
                  activeTab === 'profile'
                    ? 'bg-[#0066FF] text-white shadow-lg shadow-blue-900/40'
                    : 'text-[#D7E2EA]/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Sliders size={16} />
                <span className="flex-1">Hồ sơ & Giới thiệu</span>
                <span className="px-2 py-0.5 rounded-md bg-[#00D2FF]/20 text-[#00D2FF] text-[10px] font-bold">100% DB</span>
              </button>

              <button
                onClick={() => setActiveTab('messages')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-all w-full text-left whitespace-nowrap ${
                  activeTab === 'messages'
                    ? 'bg-[#0066FF] text-white shadow-lg shadow-blue-900/40'
                    : 'text-[#D7E2EA]/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Inbox size={16} />
                <span className="flex-1">Hòm thư</span>
                {unreadMessagesCount > 0 ? (
                  <span className="px-2 py-0.5 rounded-md bg-rose-500 text-white text-[10px] font-bold animate-pulse">
                    {unreadMessagesCount} mới
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-md bg-white/15 text-[10px]">{messages.length}</span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('info')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-all w-full text-left whitespace-nowrap md:mt-auto ${
                  activeTab === 'info'
                    ? 'bg-[#0066FF] text-white shadow-lg shadow-blue-900/40'
                    : 'text-[#D7E2EA]/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Server size={16} />
                <span>Hệ thống / DB</span>
              </button>
            </div>

            {/* Tab Panels */}
            <div className="flex-1 p-6 overflow-y-auto bg-[#121212]">
              {/* TAB: PROJECTS */}
              {activeTab === 'projects' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xl font-bold text-white font-kanit uppercase">
                        Quản Lý Dự Án ({projects.length})
                      </h4>
                      <p className="text-xs text-[#D7E2EA]/60 font-mono">
                        Dữ liệu lưu trữ trong bảng `Project` trên SQLite / Database
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setIsNewProject(true);
                        setEditingProject({
                          number: `0${projects.length + 1}`,
                          type: 'WEB / DIGITAL',
                          name: '',
                          description: '',
                          longDescription: '',
                          technologies: ['React', 'TypeScript', 'Tailwind CSS'],
                          images: [],
                          metrics: [
                            { label: 'Tốc độ', value: '< 1s' },
                            { label: 'Lighthouse', value: '95+' },
                          ],
                          liveUrl: '#',
                          featured: true,
                        });
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl accent-btn-gradient text-white text-xs font-bold uppercase tracking-wider shadow-lg"
                    >
                      <Plus size={16} />
                      <span>Thêm Dự Án</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {projects.map((item) => (
                      <div
                        key={item.id || item.number}
                        className="bg-[#181818] border border-white/10 rounded-2xl p-5 flex flex-col justify-between hover:border-white/25 transition-all group"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-xs font-bold text-[#00D2FF]">
                              [{item.number}]
                            </span>
                            <span className="text-[10px] font-mono tracking-widest text-[#D7E2EA]/50 uppercase">
                              {item.type}
                            </span>
                          </div>

                          <h5 className="font-bold text-white text-lg tracking-tight uppercase">
                            {item.name}
                          </h5>

                          <p className="text-xs text-[#D7E2EA]/70 line-clamp-2">
                            {item.description}
                          </p>

                          <div className="flex flex-wrap gap-1.5 pt-2">
                            {item.technologies.slice(0, 3).map((t) => (
                              <span
                                key={t}
                                className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-[#D7E2EA]/80"
                              >
                                {t}
                              </span>
                            ))}
                            {item.technologies.length > 3 && (
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-[#D7E2EA]/50">
                                +{item.technologies.length - 3}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/10">
                          <span className="text-[11px] font-mono text-white/40">
                            {item.images.length} ảnh
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setIsNewProject(false);
                                setEditingProject(item);
                              }}
                              className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-white transition-colors"
                              title="Chỉnh sửa"
                            >
                              <Edit3 size={14} />
                            </button>
                            <button
                              onClick={() => {
                                if (item.id && confirm(`Bạn có chắc muốn xóa dự án "${item.name}"?`)) {
                                  deleteProject(item.id);
                                }
                              }}
                              className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                              title="Xóa dự án"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: SERVICES */}
              {activeTab === 'services' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xl font-bold text-white font-kanit uppercase">
                        Quản Lý Dịch Vụ MMO ({services.length})
                      </h4>
                      <p className="text-xs text-[#D7E2EA]/60 font-mono">
                        Dữ liệu lưu trữ trong bảng `Service` trên SQLite / Database
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setIsNewServiceItem(true);
                        setEditingServiceItem({
                          category: 'FACEBOOK SERVICES',
                          icon: 'Facebook',
                          accentColor: '#1877F2',
                          title: '',
                          tagline: '',
                          features: [
                            'Tăng tương tác người dùng thật',
                            'Bảo mật & Tối ưu hiệu quả',
                          ],
                          ctaUrl: 'https://zalo.me/0974496371',
                          ctaText: 'Chat Zalo Tư Vấn',
                          highlight: false,
                          sortOrder: services.length + 1,
                        });
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl accent-btn-gradient text-white text-xs font-bold uppercase tracking-wider shadow-lg"
                    >
                      <Plus size={16} />
                      <span>Thêm Dịch Vụ Mới</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {services.map((item) => (
                      <div
                        key={item.id}
                        className="bg-[#181818] border border-white/10 rounded-2xl p-5 flex flex-col justify-between hover:border-white/25 transition-all group"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span
                              className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-md border uppercase"
                              style={{
                                color: item.accentColor || '#00D2FF',
                                borderColor: `${item.accentColor || '#00D2FF'}40`,
                                backgroundColor: `${item.accentColor || '#00D2FF'}15`,
                              }}
                            >
                              {item.category}
                            </span>
                            {item.highlight && (
                              <span className="text-[9px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 uppercase">
                                Nổi bật
                              </span>
                            )}
                          </div>

                          <h5 className="font-bold text-white text-base tracking-tight uppercase">
                            {item.title}
                          </h5>

                          <p className="text-xs text-[#D7E2EA]/70 line-clamp-2">
                            {item.tagline}
                          </p>

                          <div className="space-y-1 pt-2 border-t border-white/8">
                            {item.features?.slice(0, 3).map((feat, idx) => (
                              <div key={idx} className="flex items-center gap-1.5 text-[11px] text-[#D7E2EA]/80 font-light truncate">
                                <CheckCircle2 size={12} className="text-[#00D2FF] shrink-0" />
                                <span className="truncate">{feat}</span>
                              </div>
                            ))}
                            {item.features && item.features.length > 3 && (
                              <span className="text-[10px] font-mono text-[#D7E2EA]/50">
                                +{item.features.length - 3} quyền lợi khác
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/10">
                          <span className="text-[11px] font-mono text-white/40">
                            CTA: {item.ctaText}
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setIsNewServiceItem(false);
                                setEditingServiceItem(item);
                              }}
                              className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-white transition-colors"
                              title="Chỉnh sửa dịch vụ"
                            >
                              <Edit3 size={14} />
                            </button>
                            <button
                              onClick={() => handleDeleteServiceItem(item.id, item.title)}
                              className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                              title="Xóa dịch vụ"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: MOMENTS */}
              {activeTab === 'moments' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xl font-bold text-white font-kanit uppercase">
                        Khoảnh Khắc & Bộ Sưu Tập ({moments.length})
                      </h4>
                      <p className="text-xs text-[#D7E2EA]/60 font-mono">
                        Dữ liệu lưu trữ trong bảng `Moment` trên SQLite / Database
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setIsNewMoment(true);
                        setEditingMoment({
                          title: '',
                          category: 'HOMETOWN',
                          aspectRatio: 'landscape',
                          image: '/images/moment-01.jpg',
                          caption: '',
                          location: 'Cát Tiến, Bình Định',
                        });
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl accent-btn-gradient text-white text-xs font-bold uppercase tracking-wider shadow-lg"
                    >
                      <Plus size={16} />
                      <span>Thêm Khoảnh Khắc</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {moments.map((item) => (
                      <div
                        key={item.id || item.title}
                        className="bg-[#181818] border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between group"
                      >
                        <div className="relative aspect-[4/3] bg-zinc-900 overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <span className="absolute top-2 left-2 text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[#00D2FF] font-bold">
                            {item.category}
                          </span>
                        </div>

                        <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                          <div>
                            <h5 className="font-bold text-white text-sm line-clamp-1">{item.title}</h5>
                            <p className="text-xs text-[#D7E2EA]/60 line-clamp-2 mt-1">{item.caption}</p>
                          </div>

                          <div className="flex items-center justify-between pt-3 border-t border-white/10">
                            <span className="text-[10px] font-mono text-white/40">{item.aspectRatio}</span>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => {
                                  setIsNewMoment(false);
                                  setEditingMoment(item);
                                }}
                                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white transition-colors"
                              >
                                <Edit3 size={13} />
                              </button>
                              <button
                                onClick={() => {
                                  if (item.id && confirm(`Bạn có chắc muốn xóa khoảnh khắc "${item.title}"?`)) {
                                    deleteMoment(item.id);
                                  }
                                }}
                                className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: JOURNEY */}
              {activeTab === 'journey' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xl font-bold text-white font-kanit uppercase">
                        Lộ Trình Sự Nghiệp ({journey.length})
                      </h4>
                      <p className="text-xs text-[#D7E2EA]/60 font-mono">
                        Dữ liệu lưu trữ trong bảng `JourneyStep` trên SQLite / Database
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setIsNewJourney(true);
                        setEditingJourney({
                          number: `0${journey.length + 1}`,
                          period: '2025 — Hiện tại',
                          stage: 'DEVELOPMENT',
                          title: '',
                          description: '',
                          tags: ['Next.js', 'Automation', 'Cloud'],
                        });
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl accent-btn-gradient text-white text-xs font-bold uppercase tracking-wider shadow-lg"
                    >
                      <Plus size={16} />
                      <span>Thêm Cột Mốc</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {journey.map((item) => (
                      <div
                        key={item.id || item.number}
                        className="bg-[#181818] border border-white/10 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
                      >
                        <div className="flex items-start gap-4">
                          <span className="font-mono text-2xl font-black text-[#00D2FF]">{item.number}</span>
                          <div className="space-y-1">
                            <div className="flex items-center gap-3">
                              <span className="text-xs font-mono text-white/50">{item.period}</span>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white font-bold uppercase">
                                {item.stage}
                              </span>
                            </div>
                            <h5 className="font-bold text-white text-base">{item.title}</h5>
                            <p className="text-xs text-[#D7E2EA]/70 max-w-3xl">{item.description}</p>
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {item.tags.map((t) => (
                                <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/60">
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end md:self-center">
                          <button
                            onClick={() => {
                              setIsNewJourney(false);
                              setEditingJourney(item);
                            }}
                            className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-white transition-colors"
                          >
                            <Edit3 size={14} />
                          </button>
                          <button
                            onClick={() => {
                              if (item.id && confirm(`Bạn có muốn xóa cột mốc "${item.title}"?`)) {
                                deleteJourneyStep(item.id);
                              }
                            }}
                            className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: PROFILE & SITE SETTINGS (NEW!) */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                    <div>
                      <h4 className="text-xl font-bold text-white font-kanit uppercase flex items-center gap-2">
                        <span>Hồ Sơ Cá Nhân & Nội Dung Trang Web</span>
                        <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#00D2FF]/20 text-[#00D2FF] font-bold">
                          SQLite Database
                        </span>
                      </h4>
                      <p className="text-xs text-[#D7E2EA]/60 font-mono">
                        Cập nhật trực tiếp thông tin cá nhân, tiểu sử, quê hương và các dịch vụ hiển thị trên web
                      </p>
                    </div>

                    {/* Sub-tabs */}
                    <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10 overflow-x-auto">
                      <button
                        onClick={() => setProfileSubTab('personal')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase transition-colors ${
                          profileSubTab === 'personal' ? 'bg-[#0066FF] text-white' : 'text-white/60 hover:text-white'
                        }`}
                      >
                        Thông tin
                      </button>
                      <button
                        onClick={() => setProfileSubTab('about')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase transition-colors ${
                          profileSubTab === 'about' ? 'bg-[#0066FF] text-white' : 'text-white/60 hover:text-white'
                        }`}
                      >
                        Giới thiệu
                      </button>
                      <button
                        onClick={() => setProfileSubTab('hometown')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase transition-colors ${
                          profileSubTab === 'hometown' ? 'bg-[#0066FF] text-white' : 'text-white/60 hover:text-white'
                        }`}
                      >
                        Quê hương
                      </button>
                      <button
                        onClick={() => setProfileSubTab('services')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase transition-colors ${
                          profileSubTab === 'services' ? 'bg-[#0066FF] text-white' : 'text-white/60 hover:text-white'
                        }`}
                      >
                        Dịch vụ
                      </button>
                    </div>
                  </div>

                  {/* Sub-tab 1: Personal Info */}
                  {profileSubTab === 'personal' && (
                    <form onSubmit={handleSavePersonal} className="space-y-4 max-w-4xl text-xs font-mono">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-white/70 uppercase mb-1">Tên hiển thị (Hero Name)</label>
                          <input
                            type="text"
                            required
                            value={personalForm.name}
                            onChange={(e) => setPersonalForm({ ...personalForm, name: e.target.value })}
                            className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2.5 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-white/70 uppercase mb-1">Họ tên đầy đủ</label>
                          <input
                            type="text"
                            required
                            value={personalForm.fullName}
                            onChange={(e) => setPersonalForm({ ...personalForm, fullName: e.target.value })}
                            className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2.5 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-white/70 uppercase mb-1">Tên viết tắt (Navbar Brand)</label>
                          <input
                            type="text"
                            required
                            value={personalForm.shortName}
                            onChange={(e) => setPersonalForm({ ...personalForm, shortName: e.target.value })}
                            className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2.5 text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-white/70 uppercase mb-1">Dòng khẩu hiệu nghề nghiệp (Taglines - phân cách dấu phẩy)</label>
                        <input
                          type="text"
                          required
                          value={personalForm.taglines.join(', ')}
                          onChange={(e) =>
                            setPersonalForm({
                              ...personalForm,
                              taglines: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                            })
                          }
                          className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2.5 text-white"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-white/70 uppercase mb-1">Địa chỉ / Vùng miền</label>
                          <input
                            type="text"
                            required
                            value={personalForm.location}
                            onChange={(e) => setPersonalForm({ ...personalForm, location: e.target.value })}
                            className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2.5 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-white/70 uppercase mb-1">Email liên hệ</label>
                          <input
                            type="email"
                            required
                            value={personalForm.email}
                            onChange={(e) => setPersonalForm({ ...personalForm, email: e.target.value })}
                            className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2.5 text-white"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-white/70 uppercase mb-1">Link Telegram</label>
                          <input
                            type="text"
                            value={personalForm.telegram}
                            onChange={(e) => setPersonalForm({ ...personalForm, telegram: e.target.value })}
                            className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2.5 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-white/70 uppercase mb-1">Link Facebook</label>
                          <input
                            type="text"
                            value={personalForm.facebook}
                            onChange={(e) => setPersonalForm({ ...personalForm, facebook: e.target.value })}
                            className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2.5 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-white/70 uppercase mb-1">Link Instagram</label>
                          <input
                            type="text"
                            value={personalForm.instagram}
                            onChange={(e) => setPersonalForm({ ...personalForm, instagram: e.target.value })}
                            className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2.5 text-white"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-white/70 uppercase mb-1">Google Maps Embed URL</label>
                          <input
                            type="text"
                            value={personalForm.mapsEmbedUrl}
                            onChange={(e) => setPersonalForm({ ...personalForm, mapsEmbedUrl: e.target.value })}
                            className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2.5 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-white/70 uppercase mb-1">Google Maps Public Link</label>
                          <input
                            type="text"
                            value={personalForm.mapsPublicUrl}
                            onChange={(e) => setPersonalForm({ ...personalForm, mapsPublicUrl: e.target.value })}
                            className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2.5 text-white"
                          />
                        </div>
                      </div>

                      <div className="pt-4 flex justify-end">
                        <button
                          type="submit"
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl accent-btn-gradient text-white font-bold uppercase tracking-wider"
                        >
                          <Save size={14} />
                          <span>Lưu Thông Tin Cá Nhân</span>
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Sub-tab 2: About Me */}
                  {profileSubTab === 'about' && (
                    <form onSubmit={handleSaveAbout} className="space-y-4 max-w-4xl text-xs font-mono">
                      <div>
                        <label className="block text-white/70 uppercase mb-1">
                          Nội dung đoạn văn Giới thiệu bản thân (About Me)
                        </label>
                        <textarea
                          rows={6}
                          required
                          value={aboutFormText}
                          onChange={(e) => setAboutFormText(e.target.value)}
                          className="w-full bg-white/5 border border-white/15 rounded-xl p-4 text-white text-sm font-sans leading-relaxed resize-none"
                        />
                      </div>

                      <div className="pt-4 flex justify-end">
                        <button
                          type="submit"
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl accent-btn-gradient text-white font-bold uppercase tracking-wider"
                        >
                          <Save size={14} />
                          <span>Lưu Giới Thiệu</span>
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Sub-tab 3: Hometown */}
                  {profileSubTab === 'hometown' && (
                    <form onSubmit={handleSaveHometown} className="space-y-4 max-w-4xl text-xs font-mono">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-white/70 uppercase mb-1">Tiêu đề phụ</label>
                          <input
                            type="text"
                            required
                            value={hometownForm.title}
                            onChange={(e) => setHometownForm({ ...hometownForm, title: e.target.value })}
                            className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2.5 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-white/70 uppercase mb-1">Tên địa danh lớn</label>
                          <input
                            type="text"
                            required
                            value={hometownForm.locationName}
                            onChange={(e) => setHometownForm({ ...hometownForm, locationName: e.target.value })}
                            className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2.5 text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-white/70 uppercase mb-1">Đoạn văn miêu tả quê hương (mỗi đoạn 1 dòng)</label>
                        <textarea
                          rows={4}
                          required
                          value={Array.isArray(hometownForm.paragraphs) ? hometownForm.paragraphs.join('\n') : hometownForm.paragraphs}
                          onChange={(e) =>
                            setHometownForm({
                              ...hometownForm,
                              paragraphs: e.target.value.split('\n').filter(Boolean),
                            })
                          }
                          className="w-full bg-white/5 border border-white/15 rounded-xl p-4 text-white text-sm font-sans leading-relaxed resize-none"
                        />
                      </div>

                      <div>
                        <label className="block text-white/70 uppercase mb-1">Câu trích dẫn (Quote)</label>
                        <input
                          type="text"
                          value={hometownForm.quote}
                          onChange={(e) => setHometownForm({ ...hometownForm, quote: e.target.value })}
                          className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2.5 text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-white/70 uppercase mb-1">Ảnh nền quê hương (Hero Image)</label>
                        <div className="flex items-center gap-3">
                          <input
                            type="text"
                            value={hometownForm.heroImage}
                            onChange={(e) => setHometownForm({ ...hometownForm, heroImage: e.target.value })}
                            className="flex-1 bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white"
                          />
                          <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white">
                            <Upload size={14} />
                            <span>{isUploading ? 'Đang tải...' : 'Upload ảnh mới'}</span>
                            <input type="file" accept="image/*" onChange={handleHometownImageUpload} className="hidden" />
                          </label>
                        </div>
                      </div>

                      <div className="pt-4 flex justify-end">
                        <button
                          type="submit"
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl accent-btn-gradient text-white font-bold uppercase tracking-wider"
                        >
                          <Save size={14} />
                          <span>Lưu Quê Hương</span>
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Sub-tab 4: Services (What I Do) */}
                  {profileSubTab === 'services' && (
                    <form onSubmit={handleSaveServices} className="space-y-4 max-w-4xl text-xs font-mono">
                      <div className="space-y-4">
                        {servicesForm.map((service, idx) => (
                          <div key={service.number || idx} className="p-4 rounded-2xl bg-[#181818] border border-white/10 space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-sm font-bold text-[#00D2FF]">Dịch vụ #{service.number}</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-white/70 uppercase mb-1">Tiêu đề</label>
                                <input
                                  type="text"
                                  required
                                  value={service.title}
                                  onChange={(e) => {
                                    const next = [...servicesForm];
                                    next[idx].title = e.target.value;
                                    setServicesForm(next);
                                  }}
                                  className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white"
                                />
                              </div>
                              <div>
                                <label className="block text-white/70 uppercase mb-1">Kỹ năng (phân cách dấu phẩy)</label>
                                <input
                                  type="text"
                                  required
                                  value={service.skills.join(', ')}
                                  onChange={(e) => {
                                    const next = [...servicesForm];
                                    next[idx].skills = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
                                    setServicesForm(next);
                                  }}
                                  className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-white/70 uppercase mb-1">Mô tả dịch vụ</label>
                              <textarea
                                rows={2}
                                required
                                value={service.description}
                                onChange={(e) => {
                                  const next = [...servicesForm];
                                  next[idx].description = e.target.value;
                                  setServicesForm(next);
                                }}
                                className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white resize-none"
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="pt-4 flex justify-end">
                        <button
                          type="submit"
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl accent-btn-gradient text-white font-bold uppercase tracking-wider"
                        >
                          <Save size={14} />
                          <span>Lưu Danh Sách Dịch Vụ</span>
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}

              {/* TAB: MESSAGES */}
              {activeTab === 'messages' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xl font-bold text-white font-kanit uppercase">
                        Hòm Thư Liên Hệ ({messages.length})
                      </h4>
                      <p className="text-xs text-[#D7E2EA]/60 font-mono">
                        Tin nhắn khách gửi từ form liên hệ trên website
                      </p>
                    </div>
                  </div>

                  {messages.length === 0 ? (
                    <div className="text-center py-16 text-white/40 font-mono text-xs">
                      Chưa có tin nhắn nào trong hòm thư.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {messages.map((m) => (
                        <div
                          key={m.id}
                          className={`p-5 rounded-2xl border transition-all ${
                            m.isRead
                              ? 'bg-[#181818] border-white/10 opacity-75'
                              : 'bg-[#1e1e1e] border-[#00D2FF]/40 shadow-lg'
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
                            <div className="flex items-center gap-3">
                              <span className="font-bold text-white text-sm">{m.name}</span>
                              <span className="text-xs font-mono text-[#00D2FF]">{m.contactInfo}</span>
                              {!m.isRead && (
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-500 text-white font-bold">
                                  Chưa đọc
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] font-mono text-white/40">
                              {new Date(m.createdAt).toLocaleString('vi-VN')}
                            </span>
                          </div>

                          <p className="py-3 text-xs text-[#D7E2EA]/90 whitespace-pre-wrap leading-relaxed">
                            {m.message}
                          </p>

                          <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/10">
                            <button
                              onClick={() => toggleMessageRead(m.id)}
                              className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/15 text-xs text-white"
                            >
                              {m.isRead ? 'Đánh dấu chưa đọc' : 'Đánh dấu đã đọc'}
                            </button>
                            <button
                              onClick={() => {
                                if (confirm('Bạn có chắc muốn xóa tin nhắn này?')) {
                                  deleteMessage(m.id);
                                }
                              }}
                              className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB: SYSTEM INFO */}
              {activeTab === 'info' && (
                <div className="space-y-6 max-w-3xl">
                  <div>
                    <h4 className="text-xl font-bold text-white font-kanit uppercase">
                      Thông Tin Hệ Thống & Cơ Sở Dữ Liệu
                    </h4>
                    <p className="text-xs text-[#D7E2EA]/60 font-mono">
                      Cấu trúc kiến trúc 3 lớp Fullstack
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl bg-[#181818] border border-white/10 space-y-2">
                      <div className="flex items-center gap-2 text-white font-bold text-sm font-kanit uppercase">
                        <Database size={16} className="text-[#00D2FF]" />
                        <span>Database (Prisma + SQLite)</span>
                      </div>
                      <p className="text-xs text-[#D7E2EA]/70">
                        Vị trí DB: <code className="text-[#00D2FF]">server/prisma/dev.db</code>
                      </p>
                      <p className="text-xs text-[#D7E2EA]/70">
                        ORM: Prisma Client 5.22.0
                      </p>
                      <p className="text-xs text-[#D7E2EA]/70">
                        Mô hình: AdminUser, Project, Moment, JourneyStep, SiteSetting, ContactMessage
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-[#181818] border border-white/10 space-y-2">
                      <div className="flex items-center gap-2 text-white font-bold text-sm font-kanit uppercase">
                        <Server size={16} className="text-[#00D2FF]" />
                        <span>Backend Server (Express)</span>
                      </div>
                      <p className="text-xs text-[#D7E2EA]/70">
                        REST API Base: <code className="text-[#00D2FF]">http://localhost:5000/api</code>
                      </p>
                      <p className="text-xs text-[#D7E2EA]/70">
                        Auth: JWT Token 7 ngày
                      </p>
                      <p className="text-xs text-[#D7E2EA]/70">
                        Static Uploads: <code className="text-[#00D2FF]">/uploads</code>
                      </p>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                    <h5 className="font-bold text-white text-sm uppercase flex items-center gap-2">
                      <Sparkles size={16} className="text-[#00D2FF]" />
                      Phím tắt nhanh mở Admin Portal
                    </h5>
                    <p className="text-xs text-[#D7E2EA]/80 leading-relaxed">
                      Bạn có thể bấm vào liên kết <strong>[QUẢN TRỊ ADMIN]</strong> ở góc dưới chân trang (Footer), hoặc nhấn tổ hợp phím <kbd className="px-2 py-0.5 bg-black rounded border border-white/20 font-mono text-white">Ctrl + Shift + A</kbd> bất cứ lúc nào để mở bảng điều khiển này!
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </motion.div>

      {/* MODAL: EDIT / CREATE PROJECT */}
      {editingProject && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/90 backdrop-blur-2xl p-4">
          <div className="max-w-2xl w-full bg-[#181818] border border-white/15 rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h4 className="text-lg font-bold uppercase text-white font-kanit">
                {isNewProject ? 'Thêm Dự Án Mới' : `Chỉnh Sửa Dự Án [${editingProject.number}]`}
              </h4>
              <button onClick={() => setEditingProject(null)} className="text-white/50 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-white/70 uppercase mb-1">Số thứ tự</label>
                  <input
                    type="text"
                    value={editingProject.number || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, number: e.target.value })}
                    placeholder="01"
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-white/70 uppercase mb-1">Loại dự án (Type)</label>
                  <input
                    type="text"
                    required
                    value={editingProject.type || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, type: e.target.value })}
                    placeholder="WEB / DIGITAL"
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/70 uppercase mb-1">Tên dự án</label>
                <input
                  type="text"
                  required
                  value={editingProject.name || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, name: e.target.value })}
                  placeholder="DLD MEDIA"
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-white/70 uppercase mb-1">Mô tả ngắn</label>
                <textarea
                  required
                  rows={2}
                  value={editingProject.description || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  placeholder="Mô tả tóm tắt..."
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white resize-none"
                />
              </div>

              <div>
                <label className="block text-white/70 uppercase mb-1">Mô tả chi tiết (Long Description)</label>
                <textarea
                  rows={3}
                  value={editingProject.longDescription || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, longDescription: e.target.value })}
                  placeholder="Mô tả kỹ thuật chuyên sâu..."
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white resize-none"
                />
              </div>

              <div>
                <label className="block text-white/70 uppercase mb-1">Công nghệ (phân cách bằng dấu phẩy)</label>
                <input
                  type="text"
                  value={Array.isArray(editingProject.technologies) ? editingProject.technologies.join(', ') : ''}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      technologies: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  placeholder="React, TypeScript, Tailwind CSS, Vite"
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-white/70 uppercase mb-1">Link xem trực tiếp (Live URL)</label>
                <input
                  type="text"
                  value={editingProject.liveUrl || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white"
                />
              </div>

              {/* Image Upload & Management */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-white/70 uppercase">Hình ảnh dự án</label>
                  <button
                    type="button"
                    disabled={isAiAnalyzing || !editingProject.images || editingProject.images.length === 0}
                    onClick={() => handleAiAutoFillProject()}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gradient-to-r from-[#00D2FF]/20 to-[#9945FF]/20 hover:from-[#00D2FF]/30 hover:to-[#9945FF]/30 border border-[#00D2FF]/40 text-[#00D2FF] hover:text-white text-[11px] font-bold transition-all disabled:opacity-30"
                  >
                    <Sparkles size={13} className={`text-[#FFB800] ${isAiAnalyzing ? 'animate-spin' : 'animate-pulse'}`} />
                    <span>{isAiAnalyzing ? 'AI đang phân tích...' : '✨ AI Gợi Ý Tên & Mô Tả'}</span>
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white">
                    <Upload size={14} />
                    <span>{isUploading ? 'Đang tải lên...' : 'Upload ảnh từ máy'}</span>
                    <input type="file" accept="image/*" onChange={handleProjectImageUpload} className="hidden" />
                  </label>
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                  {editingProject.images?.map((img, idx) => (
                    <div key={idx} className="relative w-16 h-16 rounded-lg overflow-hidden border border-white/20 group">
                      <img src={img} alt="project" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() =>
                          setEditingProject({
                            ...editingProject,
                            images: editingProject.images?.filter((_, i) => i !== idx),
                          })
                        }
                        className="absolute inset-0 bg-rose-600/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl accent-btn-gradient text-white font-bold"
                >
                  <Save size={14} />
                  <span>LƯU DỰ ÁN</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT / CREATE MOMENT */}
      {editingMoment && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/90 backdrop-blur-2xl p-4">
          <div className="max-w-xl w-full bg-[#181818] border border-white/15 rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h4 className="text-lg font-bold uppercase text-white font-kanit">
                {isNewMoment ? 'Thêm Khoảnh Khắc Mới' : 'Chỉnh Sửa Khoảnh Khắc'}
              </h4>
              <button onClick={() => setEditingMoment(null)} className="text-white/50 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveMoment} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-white/70 uppercase mb-1">Tiêu đề ảnh</label>
                <input
                  type="text"
                  required
                  value={editingMoment.title || ''}
                  onChange={(e) => setEditingMoment({ ...editingMoment, title: e.target.value })}
                  placeholder="Bình minh trên biển Cát Tiến"
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/70 uppercase mb-1">Phân loại (Category)</label>
                  <select
                    value={editingMoment.category || 'HOMETOWN'}
                    onChange={(e) => setEditingMoment({ ...editingMoment, category: e.target.value as any })}
                    className="w-full bg-[#141414] border border-white/15 rounded-xl px-3 py-2 text-white"
                  >
                    <option value="HOMETOWN">HOMETOWN</option>
                    <option value="WORK">WORK</option>
                    <option value="TRAVEL">TRAVEL</option>
                    <option value="LIFESTYLE">LIFESTYLE</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white/70 uppercase mb-1">Tỷ lệ khung hình</label>
                  <select
                    value={editingMoment.aspectRatio || 'landscape'}
                    onChange={(e) => setEditingMoment({ ...editingMoment, aspectRatio: e.target.value as any })}
                    className="w-full bg-[#141414] border border-white/15 rounded-xl px-3 py-2 text-white"
                  >
                    <option value="landscape">Landscape (Nằm ngang)</option>
                    <option value="portrait">Portrait (Đứng)</option>
                    <option value="square">Square (Vuông)</option>
                    <option value="wide">Wide (Siêu rộng)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white/70 uppercase mb-1">Địa điểm</label>
                <input
                  type="text"
                  value={editingMoment.location || ''}
                  onChange={(e) => setEditingMoment({ ...editingMoment, location: e.target.value })}
                  placeholder="Cát Tiến, Bình Định"
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-white/70 uppercase">Hình ảnh khoảnh khắc</label>
                  <button
                    type="button"
                    disabled={isAiAnalyzing || !editingMoment.image}
                    onClick={() => handleAiAutoFillMoment()}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gradient-to-r from-[#00D2FF]/20 to-[#9945FF]/20 hover:from-[#00D2FF]/30 hover:to-[#9945FF]/30 border border-[#00D2FF]/40 text-[#00D2FF] hover:text-white text-[11px] font-bold transition-all disabled:opacity-30"
                  >
                    <Sparkles size={13} className={`text-[#FFB800] ${isAiAnalyzing ? 'animate-spin' : 'animate-pulse'}`} />
                    <span>{isAiAnalyzing ? 'AI đang phân tích...' : '✨ AI Tự Nhìn Ảnh & Điền Form'}</span>
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    required
                    value={editingMoment.image || ''}
                    onChange={(e) => setEditingMoment({ ...editingMoment, image: e.target.value })}
                    placeholder="/images/moment-01.jpg"
                    className="flex-1 bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white"
                  />
                  <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white">
                    <Upload size={14} />
                    <span>Upload ảnh</span>
                    <input type="file" accept="image/*" onChange={handleMomentImageUpload} className="hidden" />
                  </label>
                </div>
                {editingMoment.image && (
                  <div className="mt-2 flex items-center gap-3">
                    <div className="w-24 h-16 rounded-lg overflow-hidden border border-white/20">
                      <img src={editingMoment.image} alt="preview" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[11px] text-[#D7E2EA]/50">
                      💡 Mẹo: Upload ảnh xong AI sẽ tự động đoán tiêu đề & viết caption giúp bạn!
                    </span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-white/70 uppercase mb-1">Lời tựa / Caption</label>
                <textarea
                  rows={2}
                  required
                  value={editingMoment.caption || ''}
                  onChange={(e) => setEditingMoment({ ...editingMoment, caption: e.target.value })}
                  placeholder="Cảm xúc hoặc câu chuyện ngắn..."
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingMoment(null)}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl accent-btn-gradient text-white font-bold"
                >
                  <Save size={14} />
                  <span>LƯU KHOẢNH KHẮC</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT / CREATE JOURNEY STEP */}
      {editingJourney && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/90 backdrop-blur-2xl p-4">
          <div className="max-w-xl w-full bg-[#181818] border border-white/15 rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h4 className="text-lg font-bold uppercase text-white font-kanit">
                {isNewJourney ? 'Thêm Cột Mốc Mới' : `Chỉnh Sửa Cột Mốc [${editingJourney.number}]`}
              </h4>
              <button onClick={() => setEditingJourney(null)} className="text-white/50 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveJourney} className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-white/70 uppercase mb-1">Số thứ tự</label>
                  <input
                    type="text"
                    value={editingJourney.number || ''}
                    onChange={(e) => setEditingJourney({ ...editingJourney, number: e.target.value })}
                    placeholder="01"
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-white/70 uppercase mb-1">Khoảng thời gian (Period)</label>
                  <input
                    type="text"
                    required
                    value={editingJourney.period || ''}
                    onChange={(e) => setEditingJourney({ ...editingJourney, period: e.target.value })}
                    placeholder="2024 — 2025"
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/70 uppercase mb-1">Tên giai đoạn (Stage)</label>
                <input
                  type="text"
                  required
                  value={editingJourney.stage || ''}
                  onChange={(e) => setEditingJourney({ ...editingJourney, stage: e.target.value })}
                  placeholder="WEB DEVELOPMENT"
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-white/70 uppercase mb-1">Tiêu đề</label>
                <input
                  type="text"
                  required
                  value={editingJourney.title || ''}
                  onChange={(e) => setEditingJourney({ ...editingJourney, title: e.target.value })}
                  placeholder="Tự động hóa, Bots & Sản phẩm thực tế"
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-white/70 uppercase mb-1">Mô tả nội dung</label>
                <textarea
                  required
                  rows={3}
                  value={editingJourney.description || ''}
                  onChange={(e) => setEditingJourney({ ...editingJourney, description: e.target.value })}
                  placeholder="Chi tiết kinh nghiệm và kỹ năng đạt được..."
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white resize-none"
                />
              </div>

              <div>
                <label className="block text-white/70 uppercase mb-1">Tags (phân cách bằng dấu phẩy)</label>
                <input
                  type="text"
                  value={Array.isArray(editingJourney.tags) ? editingJourney.tags.join(', ') : ''}
                  onChange={(e) =>
                    setEditingJourney({
                      ...editingJourney,
                      tags: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  placeholder="Automation, Bot System, Digital Services"
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingJourney(null)}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl accent-btn-gradient text-white font-bold"
                >
                  <Save size={14} />
                  <span>LƯU CỘT MỐC</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT / CREATE SERVICE ITEM */}
      {editingServiceItem && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/90 backdrop-blur-2xl p-4">
          <div className="max-w-2xl w-full bg-[#181818] border border-white/15 rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h4 className="text-lg font-bold uppercase text-white font-kanit">
                {isNewServiceItem ? 'Thêm Dịch Vụ MMO Mới' : `Chỉnh Sửa Dịch Vụ: ${editingServiceItem.title || ''}`}
              </h4>
              <button onClick={() => setEditingServiceItem(null)} className="text-white/50 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveServiceItem} className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/70 uppercase mb-1">Tên Dịch Vụ</label>
                  <input
                    type="text"
                    required
                    value={editingServiceItem.title || ''}
                    onChange={(e) => setEditingServiceItem({ ...editingServiceItem, title: e.target.value })}
                    placeholder="Dịch Vụ Facebook & Tool Automation"
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-white/70 uppercase mb-1">Danh Mục (Category)</label>
                  <input
                    type="text"
                    required
                    value={editingServiceItem.category || ''}
                    onChange={(e) => setEditingServiceItem({ ...editingServiceItem, category: e.target.value })}
                    placeholder="FACEBOOK SERVICES"
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/70 uppercase mb-1">Mô tả ngắn (Tagline)</label>
                <input
                  type="text"
                  required
                  value={editingServiceItem.tagline || ''}
                  onChange={(e) => setEditingServiceItem({ ...editingServiceItem, tagline: e.target.value })}
                  placeholder="Tăng trưởng tương tác, bảo mật tài khoản & giải pháp tự động hóa Facebook."
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white"
                />
              </div>

              {/* Features List */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-white/70 uppercase">
                    Quyền Lợi & Tính Năng ({editingServiceItem.features?.length || 0})
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      const current = editingServiceItem.features || [];
                      setEditingServiceItem({ ...editingServiceItem, features: [...current, ''] });
                    }}
                    className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[10px] uppercase font-bold"
                  >
                    + Thêm dòng
                  </button>
                </div>
                <div className="space-y-2">
                  {(editingServiceItem.features || []).map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={feat}
                        onChange={(e) => {
                          const updated = [...(editingServiceItem.features || [])];
                          updated[idx] = e.target.value;
                          setEditingServiceItem({ ...editingServiceItem, features: updated });
                        }}
                        placeholder={`Tính năng / quyền lợi #${idx + 1}`}
                        className="flex-1 bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = (editingServiceItem.features || []).filter((_, i) => i !== idx);
                          setEditingServiceItem({ ...editingServiceItem, features: updated });
                        }}
                        className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                        title="Xóa dòng"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Colors, Icons, CTA & Highlight */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-white/70 uppercase mb-1">Màu chủ đạo (Hex)</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={editingServiceItem.accentColor || '#00D2FF'}
                      onChange={(e) => setEditingServiceItem({ ...editingServiceItem, accentColor: e.target.value })}
                      className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                    />
                    <input
                      type="text"
                      value={editingServiceItem.accentColor || '#00D2FF'}
                      onChange={(e) => setEditingServiceItem({ ...editingServiceItem, accentColor: e.target.value })}
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/70 uppercase mb-1">Biểu tượng (Icon)</label>
                  <select
                    value={editingServiceItem.icon || 'Code'}
                    onChange={(e) => setEditingServiceItem({ ...editingServiceItem, icon: e.target.value })}
                    className="w-full bg-[#1e1e1e] border border-white/15 rounded-xl px-3 py-2 text-white"
                  >
                    <option value="Facebook">Facebook</option>
                    <option value="MapPin">Google Maps</option>
                    <option value="Video">TikTok</option>
                    <option value="Youtube">YouTube</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Code">Code / Bot / Web</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/70 uppercase mb-1">Nổi bật (Highlight)</label>
                  <label className="flex items-center gap-2 mt-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!editingServiceItem.highlight}
                      onChange={(e) => setEditingServiceItem({ ...editingServiceItem, highlight: e.target.checked })}
                      className="w-4 h-4 rounded text-[#00D2FF]"
                    />
                    <span className="text-white/80">Gắn nhãn Nổi bật</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/70 uppercase mb-1">Chữ nút CTA</label>
                  <input
                    type="text"
                    value={editingServiceItem.ctaText || 'Tư vấn ngay'}
                    onChange={(e) => setEditingServiceItem({ ...editingServiceItem, ctaText: e.target.value })}
                    placeholder="Tư vấn Facebook ngay"
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-white/70 uppercase mb-1">Link nút CTA</label>
                  <input
                    type="text"
                    value={editingServiceItem.ctaUrl || 'https://zalo.me/0974496371'}
                    onChange={(e) => setEditingServiceItem({ ...editingServiceItem, ctaUrl: e.target.value })}
                    placeholder="https://zalo.me/0974496371"
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingServiceItem(null)}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl accent-btn-gradient text-white font-bold"
                >
                  <Save size={14} />
                  <span>LƯU DỊCH VỤ</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
