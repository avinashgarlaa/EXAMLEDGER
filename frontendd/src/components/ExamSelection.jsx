 import React from "react";
 import { Calculator, Code, Beaker } from "lucide-react";


function ExamSelection({ onSelectSubject }) {
    const subjects = [
      {
        id: 'mathematics',
        name: 'Mathematics',
        icon: Calculator,
        description: 'Advanced calculus and algebra problems',
      },
      {
        id: 'programming',
        name: 'Programming',
        icon: Code,
        description: 'Data structures and algorithms',
      },
      {
        id: 'science',
        name: 'Science',
        icon: Beaker,
        description: 'Physics and chemistry concepts',
      },
    ];
  
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Select Your Exam</h2>
          <p className="mt-2 text-gray-600">Choose a subject to begin your examination</p>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {subjects.map((subject) => {
            const Icon = subject.icon;
            return (
              <button
                key={subject.id}
                onClick={() => onSelectSubject(subject.id)}
                className="bg-white rounded-xl shadow-md p-6 transition-transform hover:scale-105 hover:shadow-lg"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-indigo-100 rounded-full">
                    <Icon className="h-8 w-8 text-indigo-600" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-gray-800">{subject.name}</h3>
                  <p className="mt-2 text-sm text-gray-600">{subject.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }
  
  export default ExamSelection;