import React from 'react';
import { useCourses } from '../context/CourseContext';
import { Clock, BookOpen, Award, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { courses } = useCourses();
  
  // Get the first 3 courses for the dashboard
  const recentCourses = courses.slice(0, 3);
  
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 flex items-center">
          <div className="rounded-full bg-blue-100 p-3 mr-4">
            <BookOpen className="text-blue-600" size={24} />
          </div>
          <div>
            <p className="text-gray-500">Enrolled Courses</p>
            <p className="text-2xl font-bold">{courses.length}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 flex items-center">
          <div className="rounded-full bg-green-100 p-3 mr-4">
            <Clock className="text-green-600" size={24} />
          </div>
          <div>
            <p className="text-gray-500">Hours Spent</p>
            <p className="text-2xl font-bold">24</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 flex items-center">
          <div className="rounded-full bg-purple-100 p-3 mr-4">
            <Award className="text-purple-600" size={24} />
          </div>
          <div>
            <p className="text-gray-500">Certificates</p>
            <p className="text-2xl font-bold">2</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">My Courses</h2>
            </div>
            <div className="divide-y">
              {recentCourses.map(course => (
                <Link 
                  to={`/courses/${course.id}`} 
                  key={course.id}
                  className="p-4 flex items-center hover:bg-gray-50 transition-colors"
                >
                  <img 
                    src={course.thumbnail} 
                    alt={course.title} 
                    className="w-16 h-16 object-cover rounded mr-4"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{course.title}</h3>
                    <p className="text-sm text-gray-500">Instructor: {course.instructor}</p>
                  </div>
                  <div className="text-sm text-blue-600">
                    Continue
                  </div>
                </Link>
              ))}
            </div>
            <div className="p-4 border-t">
              <Link 
                to="/courses" 
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                View all courses
              </Link>
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-xl font-semibold">Upcoming Events</h2>
              <Calendar size={20} className="text-gray-400" />
            </div>
            <div className="p-6 space-y-4">
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <p className="font-medium">Assignment Due</p>
                <p className="text-sm text-gray-500">React Components - Today</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4 py-2">
                <p className="font-medium">Live Session</p>
                <p className="text-sm text-gray-500">Advanced JavaScript - Tomorrow, 3:00 PM</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4 py-2">
                <p className="font-medium">Quiz</p>
                <p className="text-sm text-gray-500">Web Design Fundamentals - Friday, 2:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;