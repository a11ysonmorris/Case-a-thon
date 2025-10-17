import React, { useState, useMemo } from 'react';
import { Brain, TrendingUp, TrendingDown, AlertCircle,Users, Sparkles, Target, User, GraduationCap, Link as LinkIcon, Copy, UserPlus, BookOpen, MessageCircle, Send, X, GitFork, ChevronRight, Check, Zap, Flame, Trophy, MessageSquareText, Globe } from 'lucide-react';

// W&M Brand Colors
const WM_GREEN = '#115740';
const WM_GOLD = '#B9975B';
const WM_LIGHT_GREEN = '#f0fff4';

const classesData = [
  {
    id: 1,
    code: 'CSCI 303',
    name: 'Algorithms & Data Structures',
    semester: 'Fall 2024',
    enrollmentCode: 'CSCI303-FALL24-XYZ',
    professorName: 'Dr. Johnson',
    students: [
      {
        id: 1,
        name: 'Alex Rivera',
        avatar: 'AR',
        email: 'alex.rivera@wm.edu',
        studentId: 'STU001',
        overallGrade: 88,
        engagement: 95,
        studyGroupPreference: 'Late Evening (7 PM+)',
        studyStyle: 'Visual',
        strengths: ['Sorting Algorithms', 'Dynamic Programming'],
        weaknesses: ['Trees & Graphs', 'Complexity Analysis'],
        badges: ['Quick Learner', 'Consistent Student'],
        streak: 12,
        points: 2450,
        level: 8,
        achievements: [
          { name: 'Data Structure Master', icon: '💎', date: 'Oct 5', description: 'Completed all Unit 1 assignments with 90%+' },
          { name: '10-Day Streak', icon: '🔥', date: 'Oct 10', description: 'Logged in for 10 consecutive days' }
        ],
        units: {
          'Unit 1: Data Structures': { score: 92, trend: 'up', completionRate: 100, lastActivity: '2 days ago', status: 'excellent', assignments: { completed: 5, total: 5 } },
          'Unit 2: Complexity Analysis': { score: 75, trend: 'down', completionRate: 75, lastActivity: '1 day ago', status: 'needs-attention', assignments: { completed: 3, total: 4 } },
          'Unit 3: Trees & Graphs': { score: 65, trend: 'down', completionRate: 67, lastActivity: '4 days ago', status: 'at-risk', assignments: { completed: 2, total: 3 } },
          'Unit 4: Dynamic Programming': { score: 90, trend: 'up', completionRate: 100, lastActivity: '6 days ago', status: 'good', assignments: { completed: 1, total: 1 } }
        }
      },
      {
        id: 2,
        name: 'Marcus Thompson',
        avatar: 'MT',
        email: 'marcus.t@wm.edu',
        studentId: 'STU002',
        overallGrade: 72,
        engagement: 60,
        studyGroupPreference: 'Morning (9 AM - 12 PM)',
        studyStyle: 'Auditory',
        strengths: ['Complexity Analysis', 'Dynamic Programming'],
        weaknesses: ['Sorting Algorithms', 'Data Structures'],
        badges: ['Comeback Kid'],
        streak: 3,
        points: 1200,
        level: 5,
        achievements: [],
        units: {
          'Unit 1: Data Structures': { score: 60, trend: 'down', completionRate: 60, lastActivity: '6 days ago', status: 'at-risk', assignments: { completed: 3, total: 5 } },
          'Unit 2: Complexity Analysis': { score: 85, trend: 'up', completionRate: 100, lastActivity: '3 days ago', status: 'good', assignments: { completed: 4, total: 4 } },
          'Unit 3: Trees & Graphs': { score: 78, trend: 'up', completionRate: 33, lastActivity: '2 days ago', status: 'needs-attention', assignments: { completed: 1, total: 3 } },
          'Unit 4: Dynamic Programming': { score: 70, trend: 'stable', completionRate: 100, lastActivity: '5 days ago', status: 'needs-attention', assignments: { completed: 1, total: 1 } }
        }
      },
      {
        id: 3,
        name: 'Emily Rodriguez',
        avatar: 'ER',
        email: 'emily.r@wm.edu',
        studentId: 'STU003',
        overallGrade: 95,
        engagement: 99,
        studyGroupPreference: 'Afternoon (1 PM - 4 PM)',
        studyStyle: 'Kinesthetic',
        strengths: ['Trees & Graphs', 'Data Structures', 'Algorithms'],
        weaknesses: [],
        badges: ['Top Performer', 'Perfect Attendance', 'Master Coder'],
        streak: 20,
        points: 4850,
        level: 9,
        achievements: [
          { name: 'Perfect Score', icon: '💯', date: 'Sep 10', description: 'Scored 100% on exam' },
          { name: 'Unit 4 Complete', icon: '🏆', date: 'Oct 12', description: 'Aced all Dynamic Programming assignments' }
        ],
        units: {
          'Unit 1: Data Structures': { score: 98, trend: 'stable', completionRate: 100, lastActivity: '1 day ago', status: 'excellent', assignments: { completed: 5, total: 5 } },
          'Unit 2: Complexity Analysis': { score: 95, trend: 'up', completionRate: 100, lastActivity: '1 day ago', status: 'excellent', assignments: { completed: 4, total: 4 } },
          'Unit 3: Trees & Graphs': { score: 92, trend: 'up', completionRate: 100, lastActivity: '1 day ago', status: 'excellent', assignments: { completed: 3, total: 3 } },
          'Unit 4: Dynamic Programming': { score: 99, trend: 'up', completionRate: 100, lastActivity: '1 day ago', status: 'excellent', assignments: { completed: 1, total: 1 } }
        }
      }
    ]
  }
];

const wmCoursesData = {
  'CSCI': [
    { code: 'CSCI 141', name: 'Computational Problem Solving', credits: 4, description: 'Introduction to computer science and programming' },
    { code: 'CSCI 241', name: 'Data Structures', credits: 4, description: 'Study of abstract data types' },
    { code: 'CSCI 303', name: 'Algorithms & Data Structures', credits: 3, description: 'Design and analysis of algorithms' }
  ],
  'MATH': [
    { code: 'MATH 111', name: 'Calculus I', credits: 4, description: 'Differential calculus' },
    { code: 'MATH 112', name: 'Calculus II', credits: 4, description: 'Integral calculus' }
  ]
};

const wmProfessorsData = [
  { name: 'Dr. Sarah Johnson', department: 'Computer Science', rating: 4.8, difficulty: 3.2, expertise: ['Algorithms', 'Data Structures'] },
  { name: 'Dr. Michael Chen', department: 'Computer Science', rating: 4.5, difficulty: 3.8, expertise: ['Machine Learning', 'AI'] }
];

const studentSkillsDatabase = [
  { name: "Allyson Morris", strengths: ["computer science", "history"], weaknesses: ["math"] },
  { name: "Olabisi Bashorun", strengths: ["computer science", "bio"], weaknesses: ["math"] },
  { name: "Claire Johnson", strengths: ["physics", "math"], weaknesses: ["foreign language"] },
  { name: "Krishna Swaminathan", strengths: ["data science", "computer science"], weaknesses: ["history"] }
];

// Modal Component
const Modal = ({ isOpen, onClose, title, children, size = 'max-w-2xl' }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4" onClick={onClose}>
      <div
        className={`bg-white rounded-xl shadow-2xl p-6 relative w-full ${size} max-h-[90vh] overflow-y-auto`}
        onClick={(e) => e.stopPropagation()}
        style={{ borderTop: `6px solid ${WM_GREEN}` }}
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100">
          <X className="w-5 h-5" />
        </button>
        <h3 className="text-xl font-bold mb-4 pb-2 border-b" style={{ color: WM_GREEN }}>
          {title}
        </h3>
        {children}
      </div>
    </div>
  );
};

// Metric Card Component
const MetricCard = ({ title, value, icon, color, trend }) => (
  <div className="bg-white p-5 rounded-xl shadow-lg border-l-4" style={{ borderColor: color }}>
    <div className="flex items-center justify-between mb-2">
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <div className="p-2 rounded-full opacity-80" style={{ backgroundColor: color, color: 'white' }}>
        {icon}
      </div>
    </div>
    <p className="text-4xl font-bold" style={{ color: WM_GREEN }}>{value}</p>
    {trend && <p className="text-xs mt-1 font-semibold" style={{ color: color }}>{trend}</p>}
  </div>
);

function App() {
  const [userRole, setUserRole] = useState('professor');
  const [classes, setClasses] = useState(classesData);
  const [selectedClass, setSelectedClass] = useState(classes[0]);
  const currentStudentId = 1;
  const [selectedStudent, setSelectedStudent] = useState(null);
  
  const [showEnrollmentLink, setShowEnrollmentLink] = useState(false);
  const [showStudyGroupMatches, setShowStudyGroupMatches] = useState(false);
  const [showCreateClass, setShowCreateClass] = useState(false);
  const [showWMData, setShowWMData] = useState(false);
  const [showLearningPaths, setShowLearningPaths] = useState(false);
  const [showDiscussionForum, setShowDiscussionForum] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: userRole === 'professor' 
      ? 'Hello! I can help you find peer tutors (e.g., "Who is strong in physics?") and provide course information.'
      : 'Hello! I can help with course information, professor recommendations, and study resources.' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [newClass, setNewClass] = useState({ code: '', name: '', semester: 'Fall 2024' });
  const [forumMessages, setForumMessages] = useState([
    { id: 1, user: 'Dr. Johnson', role: 'Professor', time: '2h ago', content: 'Reminder: Midterm Study Guide posted in Unit 3!', color: WM_GREEN },
    { id: 2, user: 'Emily Rodriguez', role: 'Student', time: '1h ago', content: 'Check out HackerRank for DP practice!', color: WM_GOLD }
  ]);
  const [newPost, setNewPost] = useState('');

  const currentStudent = useMemo(() => {
    return selectedClass?.students.find(s => s.id === currentStudentId) || selectedClass?.students[0];
  }, [selectedClass, currentStudentId]);

  const students = selectedClass?.students || [];

  const generateEnrollmentCode = (classCode, semester) => {
    const random = Math.random().toString(36).substring(2, 5).toUpperCase();
    return `${classCode}-${semester.replace(' ', '').toUpperCase()}-${random}`;
  };

  const handleCreateClass = () => {
    if (!newClass.code.trim() || !newClass.name.trim()) return;
    const classData = {
      id: classes.length + 1,
      code: newClass.code.toUpperCase(),
      name: newClass.name,
      semester: newClass.semester,
      enrollmentCode: generateEnrollmentCode(newClass.code.toUpperCase(), newClass.semester),
      professorName: 'Dr. Johnson',
      students: []
    };
    setClasses([...classes, classData]);
    setSelectedClass(classData);
    setNewClass({ code: '', name: '', semester: 'Fall 2024' });
    setShowCreateClass(false);
  };

  const copyEnrollmentLink = () => {
    const link = `https://aiclassroom.wm.edu/enroll/${selectedClass.enrollmentCode}`;
    navigator.clipboard.writeText(link).then(() => {
      alert('Enrollment link copied!');
    });
  };

  const handleChatSubmit = () => {
    if (!chatInput.trim()) return;
    const userMessage = chatInput.trim();
    setChatMessages([...chatMessages, { role: 'user', content: userMessage }]);
    setChatInput('');
    setTimeout(() => {
      const response = generateChatbotResponse(userMessage.toLowerCase());
      setChatMessages(prev => [...prev, { role: 'assistant', content: response }]);
    }, 500);
  };

  const generateChatbotResponse = (message) => {
    if (userRole === 'professor') {
      const skillResponse = getLocalSkillResponse(message);
      if (skillResponse) return skillResponse;
    } else {
      const blockedQueries = ['who is strong', 'who is good at', 'who needs help'];
      if (blockedQueries.some(query => message.includes(query))) {
        return `This peer matching feature is only available to professors.\n\nI can help you with:\n• Course information\n• Professor recommendations\n• Study resources`;
      }
    }
    
    if (message.includes('csci')) {
      return `W&M Computer Science courses:\n\n${wmCoursesData['CSCI'].map(c => `• ${c.code}: ${c.name}`).join('\n')}`;
    }
    if (message.includes('professor')) {
      return `Top W&M professors:\n\n${wmProfessorsData.map(p => `• ${p.name} - Rating: ${p.rating}/5.0`).join('\n')}`;
    }
    
    return userRole === 'professor' 
      ? `I can help with:\n• Finding peer tutors (try "Who is strong in physics?")\n• Course information\n• Professor ratings`
      : `I can help with:\n• Course information\n• Professor recommendations\n• Study resources`;
  };

  const getLocalSkillResponse = (query) => {
    const normalizedQuery = query.toLowerCase().trim();
    
    for (const student of studentSkillsDatabase) {
      if (normalizedQuery.includes(student.name.toLowerCase())) {
        return `I cannot release information about specific individuals due to privacy protocols. Try asking about a subject instead.`;
      }
    }

    const subjectMatch = normalizedQuery.match(/(?:good at|strong in|weak in|needs help with)\s+([a-zA-Z\s]+)/);
    if (subjectMatch) {
      let subject = subjectMatch[1].trim().replace(/\?$/, '');
      const isStrengthQuery = normalizedQuery.includes('good at') || normalizedQuery.includes('strong in');
      
      const matches = studentSkillsDatabase.filter(student => {
        const normalizedSubject = subject.toLowerCase();
        if (isStrengthQuery) {
          return student.strengths.map(s => s.toLowerCase()).includes(normalizedSubject);
        } else {
          return student.weaknesses.map(w => w.toLowerCase()).includes(normalizedSubject);
        }
      });

      if (matches.length > 0) {
        return isStrengthQuery
          ? `Found **${matches.length}** students strong in **${subject}**. Contact your ResLife supervisor to connect with peer tutors.`
          : `Found **${matches.length}** students seeking help in **${subject}**. Consider organizing a study group.`;
      }
      return `No students found explicitly listed in **${subject}**.`;
    }
    
    if (normalizedQuery.includes('list all students')) {
      return `Due to privacy regulations, I cannot release names. I can only provide subject-based counts.`;
    }

    return null;
  };

  const getStudyGroupMatches = (student) => {
    if (!selectedClass) return [];
    const otherStudents = selectedClass.students.filter(s => s.id !== student.id);
    
    return otherStudents.map(other => {
      let score = 0;
      let reasons = [];
      
      const canHelp = student.strengths.filter(s => other.weaknesses.includes(s));
      const canBeHelped = student.weaknesses.filter(w => other.strengths.includes(w));
      
      if (canHelp.length > 0) {
        score += canHelp.length * 30;
        reasons.push(`You can help with: ${canHelp.join(', ')}`);
      }
      if (canBeHelped.length > 0) {
        score += canBeHelped.length * 30;
        reasons.push(`They can help you with: ${canBeHelped.join(', ')}`);
      }
      if (student.studyGroupPreference === other.studyGroupPreference) {
        score += 25;
        reasons.push(`Similar study time: ${student.studyGroupPreference}`);
      }
      
      return {
        student: other,
        matchScore: Math.min(100, Math.round(score * 0.7)),
        reasons: reasons.length > 0 ? reasons : ['Good potential study partner']
      };
    }).sort((a, b) => b.matchScore - a.matchScore);
  };

  const handleForumPost = () => {
    if (!newPost.trim()) return;
    setForumMessages([
      ...forumMessages,
      {
        id: Date.now(),
        user: userRole === 'professor' ? 'Dr. Johnson' : currentStudent?.name || 'Student',
        role: userRole === 'professor' ? 'Professor' : 'Student',
        time: 'Just now',
        content: newPost,
        color: WM_GREEN
      }
    ]);
    setNewPost('');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800 border-green-200';
      case 'good': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'needs-attention': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'at-risk': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTrendIcon = (trend) => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (trend === 'down') return <TrendingDown className="w-4 h-4 text-red-600" />;
    return <div className="w-4 h-4 rounded-full bg-gray-400" />;
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: WM_LIGHT_GREEN }}>
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4" style={{ borderBottomColor: WM_GOLD }}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center">
              <div className="w-10 h-10 mr-3 rounded-full flex items-center justify-center" style={{ backgroundColor: WM_GOLD, border: `2px solid ${WM_GREEN}` }}>
                <span className="font-bold text-lg" style={{ color: WM_GREEN }}>W&M</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold" style={{ color: WM_GREEN }}>
                  {userRole === 'professor' ? 'AI Professor Dashboard' : 'My Learning Dashboard'}
                </h1>
                <p className="text-sm text-gray-600">{selectedClass?.code}: {selectedClass?.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 flex-wrap">
              <div className="flex items-center px-4 py-2 rounded-full border" style={{ backgroundColor: '#e6ffe6', borderColor: WM_GREEN }}>
                <Brain className="w-5 h-5 mr-2" style={{ color: WM_GREEN }} />
                <span className="text-sm font-medium" style={{ color: WM_GREEN }}>AI Active</span>
              </div>
              
              <button
                onClick={() => setShowWMData(true)}
                className="flex items-center px-4 py-2 rounded-full transition hover:opacity-90"
                style={{ backgroundColor: WM_GOLD, color: WM_GREEN }}
              >
                <Globe className="w-5 h-5 mr-2" />
                <span className="text-sm font-semibold">W&M Resources</span>
              </button>

              <button
                onClick={() => setShowChatbot(true)}
                className="flex items-center bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full border border-gray-300"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                <span className="text-sm font-semibold">AI Advisor</span>
              </button>

              {userRole === 'student' && currentStudent && (
                <button
                  onClick={() => setShowAchievements(true)}
                  className="flex items-center px-4 py-2 rounded-full"
                  style={{ backgroundColor: '#a855f7', color: 'white' }}
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  <span className="text-sm font-semibold">Level {currentStudent.level}</span>
                  {currentStudent.streak > 0 && (
                    <span className="ml-2 bg-orange-500 px-2 py-0.5 rounded-full text-xs flex items-center">
                      🔥 {currentStudent.streak}
                    </span>
                  )}
                </button>
              )}
              
              <div className="flex space-x-2 bg-white rounded-full p-1 shadow-inner border" style={{ borderColor: WM_GREEN }}>
                <button
                  onClick={() => {setUserRole('professor'); setSelectedStudent(null);}}
                  className={`px-4 py-2 rounded-full text-sm font-medium flex items-center ${userRole === 'professor' ? 'text-white' : 'text-gray-600'}`}
                  style={userRole === 'professor' ? { backgroundColor: WM_GREEN } : {}}
                >
                  <GraduationCap className="w-4 h-4 mr-1" />
                  Professor
                </button>
                <button
                  onClick={() => {setUserRole('student'); setSelectedStudent(currentStudent);}}
                  className={`px-4 py-2 rounded-full text-sm font-medium flex items-center ${userRole === 'student' ? 'text-white' : 'text-gray-600'}`}
                  style={userRole === 'student' ? { backgroundColor: WM_GREEN } : {}}
                >
                  <User className="w-4 h-4 mr-1" />
                  Student
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Class Selector */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="bg-white shadow-xl rounded-xl p-4 border-l-8" style={{ borderColor: WM_GREEN }}>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4 flex-1">
              <BookOpen className="w-6 h-6" style={{ color: WM_GREEN }} />
              <select
                value={selectedClass?.id || ''}
                onChange={(e) => {
                  const classId = parseInt(e.target.value);
                  setSelectedClass(classes.find(c => c.id === classId));
                  setSelectedStudent(null);
                }}
                className="flex-1 px-3 py-2 border rounded-lg text-sm font-medium"
                style={{ borderColor: WM_GREEN }}
              >
                {classes.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.code}: {c.name} ({c.semester}) - {c.students.length} students
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center space-x-3 flex-wrap">
              {userRole === 'professor' ? (
                <>
                  <button
                    onClick={() => setShowCreateClass(true)}
                    className="text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center"
                    style={{ backgroundColor: WM_GREEN }}
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    New Class
                  </button>
                  <button
                    onClick={() => setShowEnrollmentLink(true)}
                    className="bg-gray-200 text-gray-800 hover:bg-gray-300 px-4 py-2 rounded-lg text-sm font-semibold flex items-center"
                  >
                    <LinkIcon className="w-4 h-4 mr-2" />
                    Get Link
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setShowDiscussionForum(true)}
                    className="text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center"
                    style={{ backgroundColor: WM_GREEN }}
                  >
                    <MessageSquareText className="w-4 h-4 mr-2" />
                    Forum
                  </button>
                  <button
                    onClick={() => setShowLearningPaths(true)}
                    className="text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center"
                    style={{ backgroundColor: '#a855f7' }}
                  >
                    <GitFork className="w-4 h-4 mr-2" />
                    Learning Path
                  </button>
                  <button
                    onClick={() => setShowStudyGroupMatches(true)}
                    className="px-4 py-2 rounded-lg text-sm font-semibold flex items-center"
                    style={{ backgroundColor: WM_GOLD, color: WM_GREEN }}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Study Buddy
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-4">
        {userRole === 'professor' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold" style={{ color: WM_GREEN }}>
              {selectedStudent ? `Student Performance: ${selectedStudent.name}` : 'Class Performance Overview'}
            </h2>
            
            {selectedStudent ? (
              <div className="bg-white p-6 rounded-xl shadow-lg border-l-4" style={{ borderColor: WM_GOLD }}>
                <h3 className="text-xl font-bold mb-4 flex items-center justify-between" style={{ color: WM_GREEN }}>
                  <span><User className="w-5 h-5 inline mr-2" />{selectedStudent.name}</span>
                  <button onClick={() => setSelectedStudent(null)} className="text-sm text-gray-500 hover:text-red-500">
                    <X className="w-4 h-4 inline mr-1" />Close
                  </button>
                </h3>
                
                {selectedStudent.weaknesses.length > 0 && (
                  <div className="mb-6 p-4 rounded-lg bg-red-50 border-2 border-red-200">
                    <p className="font-semibold flex items-center text-red-700">
                      <AlertCircle className="w-5 h-5 mr-2" />AI Recommendation:
                    </p>
                    <p className="text-sm mt-1 text-gray-800">
                      {selectedStudent.name} needs focus on <strong>{selectedStudent.weaknesses[0]}</strong>. Consider scheduling a 1:1 meeting.
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-500">AI-Identified Focus Areas</p>
                    <div className="flex space-x-4 mt-2">
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-green-700 mb-1 flex items-center">
                          <Check className="w-3 h-3 mr-1" />Strengths
                        </p>
                        <ul className="text-xs space-y-0.5">
                          {selectedStudent.strengths.slice(0, 2).map((s, i) => <li key={i} className="text-gray-700">{s}</li>)}
                        </ul>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-red-700 mb-1 flex items-center">
                          <Zap className="w-3 h-3 mr-1" />Weaknesses
                        </p>
                        <ul className="text-xs space-y-0.5">
                          {selectedStudent.weaknesses.slice(0, 2).map((w, i) => <li key={i} className="text-gray-700">{w}</li>)}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <h4 className="text-lg font-bold mt-6 mb-3" style={{ color: WM_GREEN }}>Unit Progress Breakdown</h4>
                <div className="space-y-3">
                  {Object.entries(selectedStudent.units).map(([unitName, data]) => (
                    <div key={unitName} className={`flex items-center p-3 rounded-lg border shadow-sm ${getStatusColor(data.status)}`}>
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{unitName}</p>
                        <p className="text-xs text-gray-600">Assignments: {data.assignments.completed}/{data.assignments.total} | Last: {data.lastActivity}</p>
                      </div>
                      <div className="w-24 text-right">
                        <div className="flex items-center justify-end space-x-1">
                          {getTrendIcon(data.trend)}
                          <p className="text-lg font-bold">{data.score}%</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {students.map(student => (
                  <div 
                    key={student.id} 
                    className="bg-white p-5 rounded-xl shadow-lg border-t-4 hover:shadow-xl transition cursor-pointer"
                    style={{ borderColor: student.overallGrade > 90 ? WM_GREEN : student.overallGrade > 75 ? WM_GOLD : '#ef4444' }}
                    onClick={() => setSelectedStudent(student)}
                  >
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white" style={{ backgroundColor: WM_GREEN }}>
                        {student.avatar}
                      </div>
                      <div>
                        <p className="text-lg font-bold" style={{ color: WM_GREEN }}>{student.name}</p>
                        <p className="text-sm text-gray-500">{student.studentId}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center text-sm border-t pt-3 mt-3">
                      <div>
                        <p className="text-2xl font-bold" style={{ color: WM_GREEN }}>{student.overallGrade}%</p>
                        <p className="text-xs text-gray-500">Grade</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-purple-600">{student.level}</p>
                        <p className="text-xs text-gray-500">Level</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-red-500">{student.streak}</p>
                        <p className="text-xs text-gray-500">Streak 🔥</p>
                      </div>
                    </div>
                    {student.weaknesses.length > 0 && (
                      <div className="mt-3 text-xs p-2 rounded-lg bg-yellow-50 border border-yellow-200 text-yellow-800 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                        <span className="truncate">AI: Focus on {student.weaknesses[0]}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {userRole === 'student' && currentStudent && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold" style={{ color: WM_GREEN }}>
              Welcome back, {currentStudent.name}! You're making great progress.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <MetricCard 
                title="Overall Grade" 
                value={`${currentStudent.overallGrade}%`} 
                icon={<BookOpen className="w-6 h-6" />} 
                color={WM_GREEN} 
                trend="↑ 1.2% since last week"
              />
              <MetricCard 
                title="Current Level" 
                value={`Level ${currentStudent.level}`} 
                icon={<Target className="w-6 h-6" />} 
                color="#a855f7" 
                trend={`${(currentStudent.level + 1) * 1000 - currentStudent.points} XP to next`}
              />
              <MetricCard 
                title="Activity Streak" 
                value={`${currentStudent.streak} Days`} 
                icon={<Flame className="w-6 h-6" />} 
                color="#f97316" 
                trend="Next milestone: 15 days!"
              />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg border-l-4" style={{ borderColor: WM_GOLD }}>
                <h3 className="text-xl font-bold mb-3 flex items-center" style={{ color: WM_GREEN }}>
                  <GitFork className="w-5 h-5 mr-2" />Personalized Focus
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Based on your performance, the AI suggests focusing on: 
                  <span className="font-bold text-red-600"> {currentStudent.weaknesses[0] || 'Continue your excellent work!'}</span>
                </p>
                <button
                  onClick={() => setShowLearningPaths(true)}
                  className="text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center"
                  style={{ backgroundColor: '#a855f7' }}
                >
                  View Learning Path <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border-l-4" style={{ borderColor: WM_GREEN }}>
                <h3 className="text-xl font-bold mb-3 flex items-center" style={{ color: WM_GREEN }}>
                  <Trophy className="w-5 h-5 mr-2" />Community & Goals
                </h3>
                <div className="space-y-3">
                  <button
                    onClick={() => setShowAchievements(true)}
                    className="w-full text-left flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50"
                    style={{ borderColor: WM_GREEN, color: WM_GREEN }}
                  >
                    <span>View {currentStudent.achievements.length} Achievements</span>
                    <Trophy className="w-5 h-5" style={{ color: WM_GOLD }} />
                  </button>
                  <button
                    onClick={() => setShowStudyGroupMatches(true)}
                    className="w-full text-left flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50"
                    style={{ borderColor: WM_GREEN, color: WM_GREEN }}
                  >
                    <span>Find Study Buddy Matches</span>
                    <Users className="w-5 h-5" style={{ color: WM_GOLD }} />
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border-l-4" style={{ borderColor: WM_GREEN }}>
              <h4 className="text-xl font-bold mb-4" style={{ color: WM_GREEN }}>Your Unit Progress</h4>
              <div className="space-y-3">
                {Object.entries(currentStudent.units).map(([unitName, data]) => (
                  <div key={unitName} className={`flex items-center p-3 rounded-lg border shadow-sm ${getStatusColor(data.status)}`}>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{unitName}</p>
                      <p className="text-xs text-gray-600">Assignments: {data.assignments.completed}/{data.assignments.total} completed</p>
                    </div>
                    <div className="w-24 text-right">
                      <div className="flex items-center justify-end space-x-1">
                        {getTrendIcon(data.trend)}
                        <p className="text-lg font-bold">{data.score}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Modals */}
      
      {/* Enrollment Link Modal */}
      <Modal isOpen={showEnrollmentLink} onClose={() => setShowEnrollmentLink(false)} title="Share Enrollment Link">
        <p className="mb-4 text-sm text-gray-600">
          Share this code with students to enroll in <strong>{selectedClass?.code}: {selectedClass?.name}</strong>
        </p>
        <div className="p-4 bg-gray-100 rounded-lg border">
          <p className="text-xs font-medium text-gray-500 mb-1">Enrollment Code:</p>
          <p className="text-2xl font-bold break-all" style={{ color: WM_GREEN }}>
            {selectedClass?.enrollmentCode}
          </p>
        </div>
        <div className="mt-4 p-4 bg-gray-100 rounded-lg border">
          <p className="text-xs font-medium text-gray-500 mb-1">Link:</p>
          <p className="text-sm font-medium break-all text-blue-600">
            https://aiclassroom.wm.edu/enroll/{selectedClass?.enrollmentCode}
          </p>
        </div>
        <button
          onClick={copyEnrollmentLink}
          className="mt-4 w-full text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center justify-center"
          style={{ backgroundColor: WM_GREEN }}
        >
          <Copy className="w-4 h-4 mr-2" />
          Copy Link
        </button>
      </Modal>

      {/* Create Class Modal */}
      <Modal isOpen={showCreateClass} onClose={() => setShowCreateClass(false)} title="Create New Class">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Course Code</label>
            <input
              type="text"
              value={newClass.code}
              onChange={(e) => setNewClass({ ...newClass, code: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              style={{ borderColor: WM_GREEN }}
              placeholder="CSCI 303"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Course Name</label>
            <input
              type="text"
              value={newClass.name}
              onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              style={{ borderColor: WM_GREEN }}
              placeholder="Algorithms & Data Structures"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Semester</label>
            <select
              value={newClass.semester}
              onChange={(e) => setNewClass({ ...newClass, semester: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              style={{ borderColor: WM_GREEN }}
            >
              <option>Fall 2024</option>
              <option>Spring 2025</option>
            </select>
          </div>
        </div>
        <button
          onClick={handleCreateClass}
          className="mt-6 w-full text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center justify-center"
          style={{ backgroundColor: WM_GREEN }}
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Create Class
        </button>
      </Modal>

      {/* W&M Resources Modal */}
      <Modal isOpen={showWMData} onClose={() => setShowWMData(false)} title="William & Mary AI Resources" size="max-w-3xl">
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-bold mb-2" style={{ color: WM_GREEN }}>Course Catalog (CSCI)</h4>
            <ul className="list-disc list-inside text-sm text-gray-700 ml-4 space-y-1">
              {wmCoursesData['CSCI'].map(c => (
                <li key={c.code}><span className="font-semibold">{c.code}</span>: {c.name}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-2" style={{ color: WM_GREEN }}>Faculty Highlights</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {wmProfessorsData.map(p => (
                <div key={p.name} className="p-3 bg-gray-50 rounded-lg border">
                  <p className="font-semibold">{p.name}</p>
                  <p className="text-xs text-gray-500">{p.department}</p>
                  <p className="text-xs text-gray-600 mt-1">Rating: {p.rating}/5.0</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal>

      {/* Chatbot Modal */}
      <Modal isOpen={showChatbot} onClose={() => setShowChatbot(false)} title="AI Course Advisor" size="max-w-3xl">
        <div className="flex flex-col h-[70vh]">
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-md p-3 rounded-xl shadow ${msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'}`}
                  style={msg.role === 'assistant' ? { border: `1px solid ${WM_GOLD}` } : {}}
                >
                  <p className="text-sm whitespace-pre-line">{msg.content}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex space-x-3 pt-4 border-t">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit()}
              className="flex-1 p-3 border rounded-lg"
              style={{ borderColor: WM_GREEN }}
              placeholder="Ask about courses, professors..."
            />
            <button
              onClick={handleChatSubmit}
              className="text-white px-6 py-2 rounded-lg"
              style={{ backgroundColor: WM_GREEN }}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </Modal>

      {/* Learning Path Modal */}
      <Modal isOpen={showLearningPaths} onClose={() => setShowLearningPaths(false)} title={`Learning Path for ${currentStudent?.name}`} size="max-w-3xl">
        <p className="mb-6 text-sm text-gray-700">
          AI-analyzed recommendations based on your grade of <strong>{currentStudent?.overallGrade}%</strong>
        </p>
        {currentStudent?.weaknesses.map((weakness, idx) => (
          <div key={idx} className="mb-4 p-4 rounded-lg bg-red-50 border-l-4 border-red-500">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-lg" style={{ color: WM_GREEN }}>{weakness}</h4>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-red-100 text-red-800">Focus Module</span>
            </div>
            <p className="text-sm text-gray-600">Review key concepts and complete additional practice problems this week.</p>
            <button className="text-sm mt-2 font-medium flex items-center" style={{ color: WM_GREEN }}>
              Go to Module <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        ))}
      </Modal>

      {/* Discussion Forum Modal */}
      <Modal isOpen={showDiscussionForum} onClose={() => setShowDiscussionForum(false)} title={`Discussion Forum: ${selectedClass?.code}`} size="max-w-3xl">
        <div className="flex flex-col h-[70vh]">
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {forumMessages.map(msg => (
              <div key={msg.id} className="bg-gray-50 p-3 rounded-lg border-l-4" style={{ borderColor: msg.color }}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <p className="font-bold" style={{ color: msg.color }}>{msg.user} ({msg.role})</p>
                  <p className="text-gray-400">{msg.time}</p>
                </div>
                <p className="text-sm text-gray-800">{msg.content}</p>
              </div>
            ))}
          </div>
          <div className="flex space-x-3 pt-4 border-t">
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="flex-1 p-3 border rounded-lg resize-none"
              style={{ borderColor: WM_GREEN }}
              rows="2"
              placeholder="Post a question or resource..."
            />
            <button
              onClick={handleForumPost}
              className="text-white px-6 py-2 rounded-lg"
              style={{ backgroundColor: WM_GREEN }}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </Modal>

      {/* Study Buddy Modal */}
      <Modal isOpen={showStudyGroupMatches} onClose={() => setShowStudyGroupMatches(false)} title="AI Study Buddy Matcher" size="max-w-3xl">
        <p className="text-md font-semibold mb-4" style={{ color: WM_GREEN }}>
          Top Study Partner Matches for {currentStudent?.name}:
        </p>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {getStudyGroupMatches(currentStudent || {}).map(match => (
            <div key={match.student.id} className="bg-white p-4 rounded-lg shadow-md border-l-4" style={{ borderColor: WM_GOLD }}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white mr-3" style={{ backgroundColor: WM_GREEN }}>
                    {match.student.avatar}
                  </div>
                  <p className="font-bold" style={{ color: WM_GREEN }}>{match.student.name}</p>
                </div>
                <span className="text-sm font-bold text-white px-3 py-1 rounded-full" style={{ backgroundColor: WM_GREEN }}>
                  {match.matchScore}% Match
                </span>
              </div>
              <ul className="text-sm text-gray-600 space-y-1 pl-4 list-disc">
                <li>Preference: {match.student.studyGroupPreference}</li>
                <li>Style: {match.student.studyStyle}</li>
                {match.reasons.map((reason, i) => (
                  <li key={i}>{reason}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Modal>

      {/* Achievements Modal */}
      <Modal isOpen={showAchievements} onClose={() => setShowAchievements(false)} title={`Achievements for ${currentStudent?.name}`} size="max-w-2xl">
        <p className="mb-4 text-sm text-gray-700">
          You are Level <span className="font-bold text-lg text-purple-600">{currentStudent?.level}</span>. Keep earning achievements!
        </p>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {currentStudent?.achievements.length > 0 ? currentStudent.achievements.map((achievement, idx) => (
            <div key={idx} className="flex items-start bg-white p-4 rounded-lg shadow-md border-l-4" style={{ borderColor: WM_GOLD }}>
              <div className="text-3xl mr-4">{achievement.icon}</div>
              <div className="flex-1">
                <h4 className="font-bold text-lg" style={{ color: WM_GREEN }}>{achievement.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{achievement.description}</p>
                <span className="text-xs text-gray-400 mt-1 block">Earned: {achievement.date}</span>
              </div>
            </div>
          )) : (
            <div className="text-center p-8 text-gray-500 bg-gray-50 rounded-lg">
              <Trophy className="w-10 h-10 mx-auto mb-3" />
              <p className="font-semibold">No achievements yet. Complete assignments to earn your first badge!</p>
            </div>
          )}
        </div>
      </Modal>

    </div>
  );
}

export default App