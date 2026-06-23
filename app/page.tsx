import { NextRequest, NextResponse } from "next/server";


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const file = form.get("file") as File;
    const jobDesc = form.get("jobDesc") as string;

    if (!file || !jobDesc) {
      return NextResponse.json({ error: "Missing file or job description" }, { status: 400 });
    }

    const resumeText = await file.text(); 

    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });

    const prompt = `You are an expert career coach and ATS optimization specialist.
Analyze the following resume against the job description.

Provide a tailored summary/adjustments for the resume, a custom cover letter, and bullet points of suggestions explaining what was improved for ATS compliance.

You MUST respond strictly in the following JSON format structure:
{
  "resume": "Your fully rewritten resume content or comprehensive tailoring adjustments here...",
  "coverLetter": "Your custom generated professional cover letter here...",
  "suggestions": ["Suggestion 1", "Suggestion 2", "Suggestion 3"]
}

Resume Content:
${resumeText}

Job Description:
${jobDesc}`;

    const result = await model.generateContent(prompt);
    const outputText = result.response.text() || "{}";
    const resultData = JSON.parse(outputText);

    return NextResponse.json(resultData);
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}