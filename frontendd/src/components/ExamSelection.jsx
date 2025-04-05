//  import React from "react";
//  import { Calculator, Code, Beaker } from "lucide-react";


// function ExamSelection({ onSelectSubject }) {
//     const subjects = [
//       {
//         id: 'mathematics',
//         name: 'Mathematics',
//         icon: Calculator,
//         description: 'Advanced calculus and algebra problems',
//       },
//       {
//         id: 'programming',
//         name: 'Programming',
//         icon: Code,
//         description: 'Data structures and algorithms',
//       },
//       {
//         id: 'science',
//         name: 'Science',
//         icon: Beaker,
//         description: 'Physics and chemistry concepts',
//       },
//     ];
  
//     return (
//       <div className="space-y-8">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-gray-800">Select Your Exam</h2>
//           <p className="mt-2 text-gray-600">Choose a subject to begin your examination</p>
//         </div>
  
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {subjects.map((subject) => {
//             const Icon = subject.icon;
//             return (
//               <button
//                 key={subject.id}
//                 onClick={() => onSelectSubject(subject.id)}
//                 className="bg-white rounded-xl shadow-md p-6 transition-transform hover:scale-105 hover:shadow-lg"
//               >
//                 <div className="flex flex-col items-center text-center">
//                   <div className="p-3 bg-indigo-100 rounded-full">
//                     <Icon className="h-8 w-8 text-indigo-600" />
//                   </div>
//                   <h3 className="mt-4 text-lg font-semibold text-gray-800">{subject.name}</h3>
//                   <p className="mt-2 text-sm text-gray-600">{subject.description}</p>
//                 </div>
//               </button>
//             );
//           })}
//         </div>
//       </div>
//     );
//   }
  
//   export default ExamSelection;






import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calculator, Code, Beaker, CloudCog } from "lucide-react";
import { ethers } from "ethers";



 var ExamManagerABI =[
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "newAdmin",
        "type": "address"
      }
    ],
    "name": "AdminAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "oldAdmin",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newAdmin",
        "type": "address"
      }
    ],
    "name": "AdminTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "examId",
        "type": "uint256"
      }
    ],
    "name": "ExamActivated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "examId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "date",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "duration",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "admin",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "ipfsHash",
        "type": "string"
      }
    ],
    "name": "ExamCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "examId",
        "type": "uint256"
      }
    ],
    "name": "ExamDeactivated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "examId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "date",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "duration",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "ipfsHash",
        "type": "string"
      }
    ],
    "name": "ExamUpdated",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_examId",
        "type": "uint256"
      }
    ],
    "name": "activateExam",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_admin",
        "type": "address"
      }
    ],
    "name": "addAdmin",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "admin",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_date",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_duration",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_ipfsHash",
        "type": "string"
      }
    ],
    "name": "createExam",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_examId",
        "type": "uint256"
      }
    ],
    "name": "deactivateExam",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "exams",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "date",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "duration",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "admin",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "isActivated",
        "type": "bool"
      },
      {
        "internalType": "string",
        "name": "ipfsHash",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getCurrentTimestamp",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_examId",
        "type": "uint256"
      }
    ],
    "name": "getExam",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "isAdmin",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "nextExamId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newAdmin",
        "type": "address"
      }
    ],
    "name": "transferAdmin",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_examId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_date",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_duration",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_ipfsHash",
        "type": "string"
      }
    ],
    "name": "updateExam",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const contractAddress = "0x28EA4cAcdA035f295272474F18838c95bCB1A6fB";

const iconMap = {
  mathematics: Calculator,
  programming: Code,
  science: Beaker,
};

const ExamSelection = () => {
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, ExamManagerABI, provider);

      const totalExams = await contract.nextExamId();
      const examList = [];
      console.log(examList)

      for (let i = 0; i < totalExams; i++) {
        const exam = await contract.getExam(i);
        console.log(exam)
        const [name, date, duration, admin, isActivated, ipfsHash] = exam;

        if (isActivated) {
          examList.push({
            id: i,
            name,
            date: Number(date),
            duration: Number(duration),
            admin,
            ipfsHash,
            subjectId: name.toLowerCase().includes("math")
              ? "mathematics"
              : name.toLowerCase().includes("program")
              ? "programming"
              : "science",
          });
        }
      }

      setExams(examList);
    } catch (error) {
      console.error("Failed to fetch exams:", error);
    }
  };
  console.log("examaslist", exams)

  const handleExamClick = (examId) => {
    navigate(`/exam/${examId}`); // Adjust route as per your router setup
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">Available Exams</h2>
        <p className="mt-2 text-gray-600">Click on a subject to begin the test</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {exams.map((exam) => {
          const Icon = iconMap[exam.subjectId] || Beaker;
          return (
            <button
              key={exam.id}
              onClick={() => handleExamClick(exam.id)}
              className="bg-white rounded-xl shadow-md p-6 transition-transform hover:scale-105 hover:shadow-lg"
            >
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-indigo-100 rounded-full">
                  <Icon className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-800">{exam.name}</h3>
                <p className="mt-2 text-sm text-gray-600">
                  {new Date(exam.date * 1000).toLocaleString()} • {exam.duration} mins
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ExamSelection;