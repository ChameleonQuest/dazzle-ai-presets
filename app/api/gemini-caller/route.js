import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request) {
    let params = await request.json();
    let genAI = new GoogleGenerativeAI(process.env.API_KEY);

    // Convert base64 image data to a file for Gemini
    let prompt = params.prompt;
    let base64Data = params.image.split(';base64,')[1];
    // console.log("prompt",prompt);

    let image = [{
        inlineData: {
            data: base64Data,
            mimeType: "image/png"
        },
    }]

    try {
        let model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        let result = await model.generateContent([prompt, ...image]);
        let response = await result.response;
        let theoutput = response?.text();

        return new Response(JSON.stringify(theoutput), {
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error('Error with Gemini:', error);
        return new Response(JSON.stringify({ error: 'Gemini processing failed' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
