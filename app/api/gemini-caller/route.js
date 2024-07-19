import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request) {
    // const { searchParams } = new URL(request.url);
    console.log("process.env.API_KEY", process.env.API_KEY);
    const params = await request.json();
    console.log("PAAAAAAYLOAD", params);


    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
    // const prompt = "What's a good javascript framwork for making website? Give me a brief single suggestion with no disclaimers.";
    // let prompt = {
    //   "messages":[
    //   {"role": "system", "content": "You provide concise answers, with no disclaimers. They are in the form of a rhyme."},
    //   {"role": "user", "content": "What is a good javascript framwork for making website?"},
    // ]}
    // {"role": "assistant", "content": "React"},
    // {"role": "user", "content": "Recommend an IDE for this."}

    // let singleStringPrompt = prompt.messages.map(msg => `${msg.role}: ${msg.content}`).join('\n');
    // console.log("singleStringPrompt",singleStringPrompt);

    const result = await model.generateContent(params.prompt);
    const response = await result.response;
    const theoutput = response.text();
  
    return new Response(JSON.stringify(theoutput), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }