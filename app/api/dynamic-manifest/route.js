// export async function GET(request) {
//     const { searchParams } = new URL(request.url);
//     const name = searchParams.get('name') || 'Default App Name';
  
//     const manifest = {
//       name,
//       short_name: name,
//       start_url: `/gem-runner?name=${encodeURIComponent(name)}`,
//       display: "standalone",
//       background_color: "#ffffff",
//       description: "A dynamically named PWA",
//       icons: [
//         {
//           src: "/images/dazzle-icon-192x192.png",
//           sizes: "192x192",
//           type: "image/png"
//         },
//         {
//           src: "/images/dazzle-icon-512x512.png",
//           sizes: "512x512",
//           type: "image/png"
//         }
//       ]
//     };
  
//     return new Response(JSON.stringify(manifest), {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//   }
export async function GET(request) {
  // const { searchParams } = new URL(request.url);
  console.log("process.env.API_KEY", process.env.API_KEY);

  // const genAI = new GoogleGenerativeAI(process.env.API_KEY);
  // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
  // const prompt = "Write a story about a magic backpack."  
  // const result = await model.generateContent(prompt);
  // const response = await result.response;
  // const text = response.text();
  
  const theoutput = {
      text: process.env.API_KEY
  };

  return new Response(JSON.stringify(theoutput), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}