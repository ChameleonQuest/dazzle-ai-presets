// import { GoogleGenerativeAI } from "@google/generative-ai";

export async function GET(request) {
    // const { searchParams } = new URL(request.url);
    console.log("process.env.API_KEY", process.env.API_KEY);

    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
    const prompt = "Write a story about a magic backpack."  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const theoutput = response.text();
  
    return new Response(JSON.stringify(theoutput), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }