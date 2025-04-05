import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { ethers } from 'ethers';

// Update with your deployed contract address
const EXAM_RESULTS_ADDRESS = "0x984fd5Df38749D5538Fa32cCEd5aF6e1C47c23B8";

const ExamResultsABI = [
  {
    "inputs": [
      { "internalType": "address", "name": "_examManager", "type": "address" },
      { "internalType": "address", "name": "_examSubmission", "type": "address" }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "admin",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "_student", "type": "address" }],
    "name": "getAllResults",
    "outputs": [{
      "components": [
        { "internalType": "uint256", "name": "examId", "type": "uint256" },
        { "internalType": "uint256", "name": "score", "type": "uint256" },
        { "internalType": "uint256", "name": "totalMarks", "type": "uint256" },
        { "internalType": "uint256", "name": "timestamp", "type": "uint256" },
        { "internalType": "string", "name": "ipfsHash", "type": "string" }
      ],
      "internalType": "struct ExamResults.Result[]",
      "name": "",
      "type": "tuple[]"
    }],
    "stateMutability": "view",
    "type": "function"
  }
];

function ResultInterface({ exam, onBack }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showResult, setShowResult] = useState(false);

  const fetchResults = async () => {
    setLoading(true);
    setError('');
    try {
      if (!window.ethereum) {
        throw new Error('MetaMask is not installed');
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(EXAM_RESULTS_ADDRESS, ExamResultsABI, signer);

      const studentAddress = await signer.getAddress();
      const examResults = await contract.getAllResults(studentAddress);
      const examResult = examResults.find(result => result.examId.toString() === exam.id.toString());

      if (examResult) {
        setResults([{
          examId: examResult.examId.toString(),
          score: examResult.score.toString(),
          totalMarks: examResult.totalMarks.toString(),
          timestamp: new Date(examResult.timestamp * 1000).toLocaleString(),
          ipfsHash: examResult.ipfsHash
        }]);
      } else {
        setError('Result has not been declared yet.');
      }
    } catch (err) {
      console.error('Error fetching results:', err.message);
      setError('Result has not been declared yet.');
    } finally {
      setLoading(false);
      setShowResult(true);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <h2 className="text-xl font-bold text-gray-800">Exam Results</h2>
          </div>
        </div>

        {!showResult ? (
          <div className="text-center">
            <button
              onClick={fetchResults}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              View Result
            </button>
          </div>
        ) : loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : error ? (
          <div className="text-center space-y-4">
            <div className="p-4 bg-yellow-100 text-yellow-700 rounded-lg">
              {error}
            </div>
            <button
              onClick={() => {
                setShowResult(false);
                setError('');
              }}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {results.map((result) => (
              <div key={result.examId} className="border-b pb-6 last:border-b-0">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {exam.name}
                  </h3>
                  <span className="text-sm text-gray-500">
                    Submitted on: {result.timestamp}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Score</p>
                    <p className="text-2xl font-bold text-indigo-600">
                      {result.score}/{result.totalMarks}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Percentage</p>
                    <p className="text-2xl font-bold text-indigo-600">
                      {((parseInt(result.score) / parseInt(result.totalMarks)) * 100).toFixed(2)}%
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Detailed Feedback</p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-800 break-words">
                      Detailed feedback is available on IPFS: {result.ipfsHash}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ResultInterface;
