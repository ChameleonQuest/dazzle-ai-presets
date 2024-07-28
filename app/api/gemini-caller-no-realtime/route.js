import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request) {
    const params = await request.json();
    console.log("PAAAAAAYLOAD", params);

    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
    const result = await model.generateContent(params.prompt);
    const response = await result.response;
    const theoutput = response.text();
  
    return new Response(JSON.stringify(theoutput), {
        headers: { 'Content-Type': 'application/json', },
    });
}