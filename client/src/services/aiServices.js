import api from "../services/api";

export const generateCourseDescription = async (title) => {
  const response = await api.post("/ai/suggest", {
    prompt: `
Create a professional LMS course description for "${title}".

Requirements:
- 2 sentences only.
- Maximum 40 words.
- Explain what students will learn.
- Professional and beginner-friendly tone.
- Return only the description text.
`,
  });

  return response.data;
};
