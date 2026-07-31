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

export const studentProfile = { name: "Demo Student", sectionId: 1 };

export const topics = [
  {
    id: 1,
    subjectId: 1,
    title: "Fractions",
    content:
      "A fraction represents a part of a whole. For example, 1/2 means one part out of two equal parts. Fractions are made up of a numerator (top number) and a denominator (bottom number).",
    lessonPlan:
      "Objective: Students will identify numerators and denominators. Materials: Fraction strips, whiteboard. Activity: Students group into pairs and use fraction strips to represent given fractions. Assessment: 5-item board work.",
  },
  {
    id: 2,
    subjectId: 1,
    title: "Basic Algebra",
    content: "Lesson content coming soon.",
    lessonPlan: "Lesson content coming soon.",
  },
  {
    id: 3,
    subjectId: 1,
    title: "Geometry Basics",
    content: "Lesson content coming soon.",
    lessonPlan: "Lesson content coming soon.",
  },
  {
    id: 4,
    subjectId: 2,
    title: "Grammar Essentials",
    content: "Lesson content coming soon.",
    lessonPlan: "Lesson content coming soon.",   
  },
  {
    id: 5,
    subjectId: 2,
    title: "Reading Comprehension",
    content: "Lesson content coming soon.",
    lessonPlan: "Lesson content coming soon.",
  },
  {
    id: 6,
    subjectId: 3,
    title: "Scientific Method",
    content: "Lesson content coming soon.",
    lessonPlan: "Lesson content coming soon.",
  },
  {
    id: 7,
    subjectId: 3,
    title: "Basic Chemistry",
    content: "Lesson content coming soon.",
    lessonPlan: "Lesson content coming soon.",
  },
  {
    id: 8,
    subjectId: 4,
    title: "Philippine History",
    content: "Lesson content coming soon.",
    lessonPlan: "Lesson content coming soon.",
  },
  {
    id: 9,
    subjectId: 5,
    title: "Physical Fitness",
    content: "Lesson content coming soon.",
  },
  {
    id: 10,
    subjectId: 6,
    title: "Basic Computer Skills",
    content: "Lesson content coming soon.",
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