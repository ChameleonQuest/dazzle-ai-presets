import { GoogleGenerativeAI } from "@google/generative-ai";
// import fs from "fs/promises"; // For file system operations

export async function POST(request) {
    let params = await request.json();
    let genAI = new GoogleGenerativeAI(process.env.API_KEY);

    // Convert base64 image data to a file for Gemini
    // console.log("params.prompt",params.prompt);
    // let base64Data = params.prompt.replace(/^data:image\/png;base64,/, ""); // Remove data URL prefix
    let base64Data = params.prompt.split(';base64,')[1];
    // console.log("base64Data",base64Data);
    // let imageBuffer = Buffer.from(base64Data, 'base64');
    // const tempFilePath = './temp_image.png'; // Temporary file
    // await fs.writeFile(tempFilePath, imageBuffer);
    // let prompt = "Tell me a random quote.";
    let prompt = 'system: When prompted, provide an inspirational quote about achieving your goals.\n' +
    'user: Go!\n' +
    `assistant: "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle." - Steve Jobs \n` +
    '\n' +
    'user: Can you give me one that mentions cats';
    let image = [{
        inlineData: {
            data: base64Data,
            mimeType: "image/png"
        },
    }]

    try {
        let model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        let result = await model.generateContent([prompt]);
        let response = await result.response;
        let theoutput = response?.text();

        // Cleanup temporary file (optional)
        // await fs.unlink(tempFilePath);

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
