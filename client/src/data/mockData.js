export const subjects = [
  { id: 1, name: "Math" },
  { id: 2, name: "English" },
  { id: 3, name: "Science" },
  { id: 4, name: "Araling Panlipunan" },
  { id: 5, name: "MAPEH" },
  { id: 6, name: "TLE" },
];
export const sections = [{ id: 1, name: "Grade 7 - St. Peter" }];
export const teacherProfile = {
  name: "Demo Teacher",
  sectionId: 1,
  subjectIds: [1, 2],
};

export const teachers = [
  { id: 1, name: "Maria Santos", avatar: "https://i.pravatar.cc/80?img=32", subjectIds: [1] },
  { id: 2, name: "Juan Dela Cruz", avatar: "https://i.pravatar.cc/80?img=53", subjectIds: [2] },
  { id: 3, name: "Ana Reyes", avatar: "https://i.pravatar.cc/80?img=47", subjectIds: [3] },
  { id: 4, name: "Carlo Mendoza", avatar: "https://i.pravatar.cc/80?img=12", subjectIds: [4] },
  { id: 5, name: "Bella Flores", avatar: "https://i.pravatar.cc/80?img=5", subjectIds: [5] },
  { id: 6, name: "Ken Garcia", avatar: "https://i.pravatar.cc/80?img=61", subjectIds: [6] },
];

export const invitations = [
  { id: 1, teacherId: 1, course: "Computer Literacy", status: "pending", sentAt: "Just now" },
  { id: 2, teacherId: 3, course: "Science 5", status: "pending", sentAt: "5 minutes ago" },
  { id: 3, teacherId: 6, course: "Technology and Livelihood Education", status: "pending", sentAt: "1 hour ago" },
];

export const studentProfile = { name: "Demo Student", sectionId: 1 };

export const topics = [
  {
    id: 1,
    subjectId: 1,
    title: "Fractions",
    coverImage: "https://picsum.photos/seed/fractions/400/300",
    teacherName: "Maria Santos",
    teacherAvatar: "https://i.pravatar.cc/80?img=32",
    content:
      "A fraction represents a part of a whole. For example, 1/2 means one part out of two equal parts. Fractions are made up of a numerator (top number) and a denominator (bottom number).\n\n\nWhat is a fraction?\nA fraction is a way of showing how many equal parts of a whole we are talking about. Imagine a pizza cut into 4 equal slices. If you eat 1 slice, you have eaten 1 out of 4 slices — that is the fraction 1/4.\n\nThe number on top is called the numerator. It tells us how many parts we have.\nThe number on the bottom is called the denominator. It tells us how many equal parts the whole is divided into.\n\nExamples:\n1/2 — one half (1 part out of 2)\n1/3 — one third (1 part out of 3)\n3/4 — three quarters (3 parts out of 4)\n2/5 — two fifths (2 parts out of 5)\n7/8 — seven eighths (7 parts out of 8)\n\nHow to read fractions\n1/2 is read as one-half.\n1/3 is read as one-third.\n2/3 is read as two-thirds.\n1/4 is read as one-fourth (or one quarter).\n3/4 is read as three-fourths (or three quarters).\n1/5 is read as one-fifth.\n\nVisualizing fractions\nDraw a rectangle and divide it into 3 equal columns. Color 1 column. The colored part is 1 out of 3, or 1/3 of the whole rectangle. The bigger the denominator, the more parts the whole is split into, which means each part gets smaller. For example, 1/4 is smaller than 1/2 because dividing something into 4 parts makes each part tinier than dividing it into 2 parts.\n\nPractice question\nIf a chocolate bar is divided into 6 equal pieces and you eat 4 pieces, what fraction of the bar did you eat? The answer is 4/6 — you ate 4 out of the 6 pieces. The numerator is 4 and the denominator is 6.",
    status: "approved",
    lessonPlan:
      "Objective: Students will identify numerators and denominators. Materials: Fraction strips, whiteboard. Activity: Students group into pairs and use fraction strips to represent given fractions. Assessment: 5-item board work.",
  },
  {
    id: 2,
    subjectId: 1,
    title: "Basic Algebra",
    coverImage: "https://picsum.photos/seed/algebra/400/300",
    teacherName: "Maria Santos",
    teacherAvatar: "https://i.pravatar.cc/80?img=32",
    content: "Lesson content coming soon.",
    status: "approved",
    lessonPlan: "Lesson content coming soon.",
  },
  {
    id: 3,
    subjectId: 1,
    title: "Geometry Basics",
    coverImage: "https://picsum.photos/seed/geometry/400/300",
    teacherName: "Maria Santos",
    teacherAvatar: "https://i.pravatar.cc/80?img=32",
    content: "Lesson content coming soon.",
    status: "pending",
    lessonPlan: "Lesson content coming soon.",
  },
  {
    id: 4,
    subjectId: 2,
    title: "Grammar Essentials",
    coverImage: "https://picsum.photos/seed/grammar/400/300",
    teacherName: "Juan Dela Cruz",
    teacherAvatar: "https://i.pravatar.cc/80?img=53",
    content: "Lesson content coming soon.",
    status: "approved",
    lessonPlan: "Lesson content coming soon.",   
  },
  {
    id: 5,
    subjectId: 2,
    title: "Reading Comprehension",
    coverImage: "https://picsum.photos/seed/reading/400/300",
    teacherName: "Juan Dela Cruz",
    teacherAvatar: "https://i.pravatar.cc/80?img=53",
    content: "Lesson content coming soon.",
    status: "pending",
    lessonPlan: "Lesson content coming soon.",
  },
  {
    id: 6,
    subjectId: 3,
    title: "Scientific Method",
    coverImage: "https://picsum.photos/seed/science/400/300",
    teacherName: "Ana Reyes",
    teacherAvatar: "https://i.pravatar.cc/80?img=47",
    content: "Lesson content coming soon.",
    status: "approved",
    lessonPlan: "Lesson content coming soon.",
  },
  {
    id: 7,
    subjectId: 3,
    title: "Basic Chemistry",
    coverImage: "https://picsum.photos/seed/chemistry/400/300",
    teacherName: "Ana Reyes",
    teacherAvatar: "https://i.pravatar.cc/80?img=47",
    content: "Lesson content coming soon.",
    status: "denied",
    lessonPlan: "Lesson content coming soon.",
  },
  {
    id: 8,
    subjectId: 4,
    title: "Philippine History",
    coverImage: "https://picsum.photos/seed/history/400/300",
    teacherName: "Carlo Mendoza",
    teacherAvatar: "https://i.pravatar.cc/80?img=12",
    content: "Lesson content coming soon.",
    status: "pending",
    lessonPlan: "Lesson content coming soon.",
  },
  {
    id: 9,
    subjectId: 5,
    title: "Physical Fitness",
    coverImage: "https://picsum.photos/seed/fitness/400/300",
    teacherName: "Bella Flores",
    teacherAvatar: "https://i.pravatar.cc/80?img=5",
    content: "Lesson content coming soon.",
    status: "approved"
  },
  {
    id: 10,
    subjectId: 6,
    title: "Basic Computer Skills",
    coverImage: "https://picsum.photos/seed/computer/400/300",
    teacherName: "Ken Garcia",
    teacherAvatar: "https://i.pravatar.cc/80?img=61",
    content: "Lesson content coming soon.",
    status: "denied",
    lessonPlan: "Lesson content coming soon.",
  },
];
export const quizzes = [
  {
    id: 1,
    topicId: 1,
    question: "What is 1/2 + 1/4?",
    choices: ["3/4", "1/2", "2/6", "1/4"],
    correctAnswer: "3/4",
  },
  {
    id: 2,
    topicId: 1,
    question: "Which number is the numerator in 3/5?",
    choices: ["3", "5", "8", "2"],
    correctAnswer: "3",
  },
];
export const pendingItems = [
  { id: 1, type: "Subject", name: "Computer Literacy", status: "pending" },
  { id: 2, type: "Teacher", name: "Maria Santos", status: "pending" },
  { id: 3, type: "Subject", name: "Values Education", status: "pending" },
  { id: 4, type: "Teacher", name: "Juan Dela Cruz", status: "pending" },
];
export const incidents = [
  {
    id: 1,
    reportedBy: "Demo Student",
    type: "Bug",
    description: "Quiz page does not load on mobile.",
    status: "open",
  },
  {
    id: 2,
    reportedBy: "Demo Teacher",
    type: "Content issue",
    description: "Typo in the Fractions lesson.",
    status: "open",
  },
];
