import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCourses } from '../context/CourseContext';
import { ArrowLeft, Video, FileText, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

const CourseDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getCourse } = useCourses();
  const course = getCourse(id || '');
  
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});
  const [activeContent, setActiveContent] = useState<string | null>(
    course?.modules[0]?.content[0]?.id || null
  );
  
  if (!course) {
    return (
      <div className="max-w-7xl mx-auto py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Course not found</h2>
        <button 
          onClick={() => navigate('/courses')}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Back to Courses
        </button>
      </div>
    );
  }
  
  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };
  
  const getActiveContent = () => {
    if (!activeContent) return null;
    
    for (const module of course.modules) {
      const content = module.content.find(c => c.id === activeContent);
      if (content) return content;
    }
    
    return null;
  };
  
  const content = getActiveContent();
  
  const getContentIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video size={16} />;
      case 'document':
        return <FileText size={16} />;
      case 'quiz':
        return <HelpCircle size={16} />;
      default:
        return null;
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto">
      <button 
        onClick={() => navigate('/courses')}
        className="flex items-center text-blue-600 mb-6"
      >
        <ArrowLeft size={18} className="mr-2" />
        Back to Courses
      </button>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <img 
          src={course.thumbnail} 
          alt={course.title} 
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
          <p className="text-gray-600 mb-4">{course.description}</p>
          <div className="flex items-center text-gray-500">
            <span>Instructor: {course.instructor}</span>
            <span className="mx-2">•</span>
            <span>{course.modules.length} {course.modules.length === 1 ? 'Module' : 'Modules'}</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">
                {content ? content.title : 'Course Content'}
              </h2>
            </div>
            <div className="p-6">
              {content ? (
                <div>
                  <p className="mb-4">{content.description}</p>
                  
                  {content.type === 'video' && (
                    <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded flex items-center justify-center">
                      <div className="text-center p-12">
                        <Video size={48} className="mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-600">Video content would be displayed here</p>
                        {content.url && (
                          <a 
                            href={content.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="mt-4 inline-block text-blue-600 hover:underline"
                          >
                            Open video link
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {content.type === 'document' && (
                    <div className="border rounded p-6 bg-gray-50">
                      <div className="text-center">
                        <FileText size={48} className="mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-600">Document content would be displayed here</p>
                        {content.url && (
                          <a 
                            href={content.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="mt-4 inline-block text-blue-600 hover:underline"
                          >
                            Open document
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {content.type === 'quiz' && (
                    <div className="border rounded p-6 bg-gray-50">
                      <div className="text-center">
                        <HelpCircle size={48} className="mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-600">Quiz would be displayed here</p>
                        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                          Start Quiz
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">Select a content item from the course outline</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Course Outline</h2>
            </div>
            <div className="divide-y">
              {course.modules.map(module => (
                <div key={module.id}>
                  <button
                    className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                    onClick={() => toggleModule(module.id)}
                  >
                    <span className="font-medium">{module.title}</span>
                    {expandedModules[module.id] ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </button>
                  
                  {expandedModules[module.id] && (
                    <div className="bg-gray-50 px-4 py-2">
                      {module.content.map(item => (
                        <button
                          key={item.id}
                          className={`w-full text-left p-2 rounded flex items-center ${
                            activeContent === item.id ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                          }`}
                          onClick={() => setActiveContent(item.id)}
                        >
                          <span className="mr-2">{getContentIcon(item.type)}</span>
                          <span>{item.title}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;