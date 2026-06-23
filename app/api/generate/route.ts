import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // A 1.5-second delay to simulate the AI "thinking"
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const mockData = {
      resume: "### Tailored Resume Adjustments\n\n- **Professional Summary**: Updated to highlight React, Next.js, and TypeScript skills tailored perfectly for the Junior Frontend Developer role.\n- **Technical Skills**: Moved Tailwind CSS and Git to the top of the skills matrix for maximum ATS visibility.\n- **Experience Layout**: Reworded bullet points to emphasize responsive design implementation and API integrations.",
      coverLetter: "Dear Hiring Team,\n\nI am thrilled to express my interest in the Junior Frontend Developer position. With my hands-on experience building web applications using React, Next.js, and Tailwind CSS, I am confident in my ability to contribute cleanly written code to your engineering team...\n\nSincerely,\nApplicant",
      suggestions: [
        "Added highly relevant keywords: 'Next.js application performance' and 'ATS compliance'.",
        "Formatted all technical skill matrices to match modern frontend stacks.",
        "Optimized text formatting to ensure seamless parsing by automated tracking systems."
      ]
    };

    return NextResponse.json(mockData);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}