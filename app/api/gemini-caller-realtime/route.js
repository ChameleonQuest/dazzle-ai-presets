import { GoogleGenerativeAI } from "@google/generative-ai";
// import SerpApi from 'serpapi';
import { SerpApiSearch } from "google-search-results-nodejs";

export async function POST(request) {
    // const { searchParams } = new URL(request.url);
    // console.log("process.env.API_KEY", process.env.API_KEY);
    // console.log("process.env.API_KEY", process.env.SERP_API_KEY);
    const params = await request.json();
    // console.log("PAAAAAAYLOAD", params);

    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel(
        {model: "gemini-1.5-pro-latest"},
        {apiVersion: "v1beta"}, // Required for function calling
    );
    const search = new SerpApiSearch(process.env.SERPAPI_API_KEY);

    // const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro"});

    // Define the functions to call SerpApi
//     const functions = {
//         getSearchResults: async (query) => {
//             return new Promise((resolve, reject) => {
//                 console.log("Is this woooooorking??????");
//                 const search = new SerpApi.GoogleSearch(process.env.SERP_API_KEY);
// //                 SerpApi.json({ q: query, api_key: process.env.SERP_API_KEY}, (data) => {

//                 search.json({ q: query}, (data) => {
//                     if (data) {
//                         console.log("SerpApi data:", data);
//                         resolve(data);
//                     } else {
//                         console.error("Failed to get search results");
//                         reject(new Error("Failed to get search results"));
//                     }
//                 });
//             });
//         }
//     };
    const searchFunction = async ({ query }) => {
        const searchParams = {
            q: query,
            engine: "google",
            // ... other SerpAPI parameters as needed
        };
        console.log("In the searchFunction function!!!!");
        const results = await search.json(searchParams);
        return JSON.stringify(results); // Return search results as JSON
    };
    const functionCallConfig = {
        functions: [
        {
            name: "search",
            description: "Search the web for information using SerpAPI.",
            parameters: {
            type: "object",
            properties: {
                query: {
                    type: "string",
                    description: "The search query to use.",
                },
            },
            required: ["query"],
            },
        },
        ],
    };

    const result = await model.generateContent(params.prompt, functionCallConfig);
    console.log("result.response.candidates", JSON.stringify(result.response.candidates));
    // Handle function calls
    if (result.response.candidates[0].functionCall) {
        const functionCall = result.candidates[0].functionCall;
        if (functionCall.name === "search") {
            const searchResults = await searchFunction(functionCall.arguments);
            const finalResult = await model.generateContent(searchResults);
            return new Response(JSON.stringify(finalResult.response.text()), {
                headers: { "Content-Type": "application/json" },
            });
        }
    } 
        
    const response = await result.response;
    const theoutput = response.text();
  
    return new Response(JSON.stringify(theoutput), {
        headers: {
        'Content-Type': 'application/json',
        },
    });
  }