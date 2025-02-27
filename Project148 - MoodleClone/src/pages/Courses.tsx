import React, { useState } from 'react';
import { useCourses } from '../context/CourseContext';
import { Link } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';

const Courses: React.FC = () => {
  const { courses } = useCourses();
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold">All Courses</h1>
        
        <div className="mt-4 md:mt-0 flex">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search courses..."
              className="pl-10 pr-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <button className="ml-2 px-4 py-2 border rounded-md flex items-center">
            <Filter size={18} className="mr-2" />
            <span>Filter</span>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map(course => (
          <Link 
            to={`/courses/${course.id}`} 
            key={course.id}
            className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img 
              src={course.thumbnail} 
              alt={course.title} 
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="font-bold text-lg mb-2">{course.title}</h3>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Instructor: {course.instructor}</span>
                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {course.modules.length} {course.modules.length === 1 ? 'Module' : 'Modules'}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No courses found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default Courses;