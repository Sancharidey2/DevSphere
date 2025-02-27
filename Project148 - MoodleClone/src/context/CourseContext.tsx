import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  thumbnail: string;
  modules: Module[];
}

export interface Module {
  id: string;
  title: string;
  content: Content[];
}

export interface Content {
  id: string;
  type: 'video' | 'document' | 'quiz';
  title: string;
  description: string;
  url?: string;
}

interface CourseContextType {
  courses: Course[];
  addCourse: (course: Course) => void;
  getCourse: (id: string) => Course | undefined;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

// Sample data
const initialCourses: Course[] = [
  {
    id: '1',
    title: 'Introduction to React',
    description: 'Learn the fundamentals of React including components, state, and props.',
    instructor: 'Jane Smith',
    thumbnail: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    modules: [
      {
        id: 'm1',
        title: 'Getting Started with React',
        content: [
          {
            id: 'c1',
            type: 'video',
            title: 'Introduction to React',
            description: 'Overview of React and its core concepts',
            url: 'https://example.com/video1'
          },
          {
            id: 'c2',
            type: 'document',
            title: 'React Setup Guide',
            description: 'Step-by-step guide to set up your React environment',
            url: 'https://example.com/doc1'
          }
        ]
      },
      {
        id: 'm2',
        title: 'React Components',
        content: [
          {
            id: 'c3',
            type: 'video',
            title: 'Component Basics',
            description: 'Learn about React components and their lifecycle',
            url: 'https://example.com/video2'
          },
          {
            id: 'c4',
            type: 'quiz',
            title: 'Component Quiz',
            description: 'Test your knowledge of React components'
          }
        ]
      }
    ]
  },
  {
    id: '2',
    title: 'Advanced JavaScript Concepts',
    description: 'Deep dive into advanced JavaScript features and patterns.',
    instructor: 'John Doe',
    thumbnail: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    modules: [
      {
        id: 'm3',
        title: 'ES6 Features',
        content: [
          {
            id: 'c5',
            type: 'video',
            title: 'Arrow Functions and Template Literals',
            description: 'Modern JavaScript syntax explained',
            url: 'https://example.com/video3'
          }
        ]
      }
    ]
  },
  {
    id: '3',
    title: 'Web Design Fundamentals',
    description: 'Learn the principles of effective web design and UX.',
    instructor: 'Sarah Johnson',
    thumbnail: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    modules: [
      {
        id: 'm4',
        title: 'Design Principles',
        content: [
          {
            id: 'c6',
            type: 'document',
            title: 'Color Theory',
            description: 'Understanding color in web design',
            url: 'https://example.com/doc2'
          }
        ]
      }
    ]
  }
];

export const CourseProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>(initialCourses);

  const addCourse = (course: Course) => {
    setCourses([...courses, course]);
  };

  const getCourse = (id: string) => {
    return courses.find(course => course.id === id);
  };

  return (
    <CourseContext.Provider value={{ courses, addCourse, getCourse }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourses = () => {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error('useCourses must be used within a CourseProvider');
  }
  return context;
};