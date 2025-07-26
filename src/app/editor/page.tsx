'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
// Simple code editor component for demo
const CodeEditor = ({ value, onChange, language }: { value: string, onChange: (value: string) => void, language: string }) => (
  <textarea
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="w-full h-full p-4 font-mono text-sm border-none outline-none resize-none bg-gray-50"
    placeholder={`Enter your ${language.toUpperCase()} code here...`}
    spellCheck={false}
  />
);
import { Save, Download, Upload, ArrowLeft, Play } from 'lucide-react';
import { mockStorageService, mockDeploymentService, mockAuthService } from '@/lib/mock-services';

export default function EditorPage() {
  const [code, setCode] = useState({
    html: '',
    css: '',
    js: ''
  });
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [prompt, setPrompt] = useState('');
  const [isDeploying, setIsDeploying] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [deployedUrl, setDeployedUrl] = useState('');
  const [projectId, setProjectId] = useState<string | null>(null);
  const [previewKey, setPreviewKey] = useState(0);
  
  const router = useRouter();
  const previewRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const generatedApp = sessionStorage.getItem('generated_app');
    console.log('Editor: checking sessionStorage', generatedApp);
    
    if (generatedApp) {
      try {
        const data = JSON.parse(generatedApp);
        setCode(data.code);
        setTitle(data.title);
        setDescription(data.description);
        setPrompt(data.prompt);
        console.log('Editor: loaded data', data);
        // Don't remove immediately - keep for debugging
        // sessionStorage.removeItem('generated_app');
      } catch (error) {
        console.error('Editor: failed to parse data', error);
        router.push('/');
      }
    } else {
      console.log('Editor: no data found, redirecting to home');
      // Add a small delay to prevent immediate redirect
      setTimeout(() => router.push('/'), 1000);
    }
  }, [router]);

  const updatePreview = () => {
    if (previewRef.current) {
      const doc = previewRef.current.contentDocument;
      if (doc) {
        doc.open();
        doc.write(`
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>${code.css}</style>
          </head>
          <body>
            ${code.html}
            <script>${code.js}</script>
          </body>
          </html>
        `);
        doc.close();
      }
    }
  };

  const handleCodeChange = (value: string, language: 'html' | 'css' | 'js') => {
    setCode(prev => ({ ...prev, [language]: value }));
  };

  const handleSave = async () => {
    const user = mockAuthService.getCurrentUser();
    if (!user) {
      router.push('/auth');
      return;
    }

    setIsSaving(true);
    try {
      if (projectId) {
        await mockStorageService.updateProject(projectId, {
          title,
          description,
          code,
          prompt
        });
      } else {
        const project = await mockStorageService.saveProject({
          userId: user.id,
          title,
          description,
          prompt,
          code,
          isDeployed: false
        });
        setProjectId(project.id);
      }
      alert('Project saved successfully!');
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Failed to save project');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeploy = async () => {
    const user = mockAuthService.getCurrentUser();
    if (!user) {
      router.push('/auth');
      return;
    }

    if (user.plan === 'free') {
      const userProjects = await mockStorageService.getUserProjects(user.id);
      const deployedProjects = userProjects.filter(p => p.isDeployed);
      
      if (deployedProjects.length >= 1 && !projectId) {
        alert('Free users can only deploy 1 project. Upgrade to Pro for unlimited deployments!');
        router.push('/pricing');
        return;
      }
    }

    setIsDeploying(true);
    try {
      let currentProjectId = projectId;
      
      if (!currentProjectId) {
        const project = await mockStorageService.saveProject({
          userId: user.id,
          title,
          description,
          prompt,
          code,
          isDeployed: false
        });
        currentProjectId = project.id;
        setProjectId(currentProjectId);
      }

      const url = await mockDeploymentService.deployProject(currentProjectId);
      setDeployedUrl(url);
      alert(`Deployed successfully! Your app is live at: ${url}`);
    } catch (error) {
      console.error('Error deploying project:', error);
      alert('Failed to deploy project');
    } finally {
      setIsDeploying(false);
    }
  };

  const handleDownload = () => {
    const zipContent = `
Project: ${title}
Description: ${description}

=== HTML ===
${code.html}

=== CSS ===
${code.css}

=== JavaScript ===
${code.js}
    `.trim();

    const blob = new Blob([zipContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const tabs = [
    { id: 'html', label: 'HTML', icon: '🏗️' },
    { id: 'css', label: 'CSS', icon: '🎨' },
    { id: 'js', label: 'JavaScript', icon: '⚡' }
  ] as const;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.push('/')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft size={20} />
              <span>Back to Home</span>
            </button>
            <div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-xl font-semibold bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-purple-500 rounded px-2 py-1"
                placeholder="Project title..."
              />
              <p className="text-sm text-gray-600 mt-1">
                Original prompt: "{prompt}"
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
              <Save size={16} />
              <span>{isSaving ? 'Saving...' : 'Save'}</span>
            </button>
            
            <button
              onClick={handleDownload}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              <Download size={16} />
              <span>Download</span>
            </button>
            
            <button
              onClick={handleDeploy}
              disabled={isDeploying}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
            >
              <Upload size={16} />
              <span>{isDeploying ? 'Deploying...' : 'Deploy'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Editor */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Code Editor */}
        <div className="w-1/2 flex flex-col bg-white">
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600 bg-purple-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Editor */}
          <div className="flex-1">
            <CodeEditor
              value={code[activeTab]}
              onChange={(value) => handleCodeChange(value, activeTab)}
              language={activeTab === 'js' ? 'javascript' : activeTab}
            />
          </div>
        </div>

        {/* Preview */}
        <div className="w-1/2 flex flex-col bg-gray-50">
          <div className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-800">Live Preview</h3>
            <button
              onClick={updatePreview}
              className="flex items-center space-x-2 px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
            >
              <Play size={14} />
              <span>Refresh</span>
            </button>
          </div>
          
          <div className="flex-1 p-4">
            <div className="w-full h-full bg-white rounded-lg shadow-sm overflow-hidden">
              <iframe
                ref={previewRef}
                className="w-full h-full border-0"
                sandbox="allow-scripts allow-modals"
                onLoad={updatePreview}
                key={previewKey}
              />
            </div>
          </div>

          {deployedUrl && (
            <div className="p-4 bg-green-50 border-t border-green-200">
              <p className="text-sm text-green-800">
                🎉 Deployed at: 
                <a 
                  href={deployedUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="ml-2 text-green-600 hover:text-green-800 underline"
                >
                  {deployedUrl}
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}