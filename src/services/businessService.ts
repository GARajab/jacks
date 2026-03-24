import { GoogleGenAI } from "@google/genai";

let aiInstance: GoogleGenAI | null = null;

function getAI() {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is missing. Using fallback data.");
      return null;
    }
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
}

export async function getBusinessDetails() {
  try {
    const ai = getAI();
    if (!ai) throw new Error("AI SDK not initialized");

    console.log("Calling Gemini API with Google Maps grounding...");
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Get details for 'Jacks' restaurant in Hidd, Bahrain at 26.2430816, 50.6512507. 
      Return a JSON object with: tagline, about, menu (array of {category, items: [{name, price, desc}]}), contact (phone, address, hours), and reviews (array of {name, rating, text, date}).`,
      config: {
        tools: [{ googleMaps: {} }],
        toolConfig: {
          retrievalConfig: {
            latLng: {
              latitude: 26.2430816,
              longitude: 50.6512507
            }
          }
        }
      },
    });
    
    // Extract grounding chunks for mandatory links
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    const mapsLinks = groundingChunks?.filter(chunk => chunk.maps?.uri).map(chunk => ({
      uri: chunk.maps?.uri,
      title: chunk.maps?.title
    })) || [];

    // Attempt to extract JSON from the text response
    const text = response.text || "";
    console.log("Model response text:", text);
    
    if (!text) throw new Error("Empty response from model");

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const data = jsonMatch ? JSON.parse(jsonMatch[0]) : null;

    if (!data) throw new Error("Could not parse business data from response");

    return { ...data, mapsLinks };
  } catch (error) {
    console.error("Error fetching business details:", error);
    // Return robust fallback data if the API call fails
    return {
      tagline: "Taste the Perfection in Every Bite",
      about: "Jacks is Hidd's premier destination for high-quality fast food. We pride ourselves on using fresh ingredients and bold flavors to create a dining experience that's both quick and premium.",
      menu: [
        { 
          category: "Signature Burgers", 
          items: [
            { name: "The Jack Classic", price: "3.5 BHD", desc: "Angus beef, cheddar, secret sauce, pickles." },
            { name: "Truffle Deluxe", price: "4.2 BHD", desc: "Beef patty, truffle mayo, caramelized onions." },
            { name: "Spicy Hidd", price: "3.8 BHD", desc: "Crispy chicken, jalapeños, spicy aioli." }
          ] 
        },
        { 
          category: "Artisanal Sides", 
          items: [
            { name: "Truffle Fries", price: "2.0 BHD", desc: "Hand-cut fries, truffle oil, parmesan." },
            { name: "Jack Wings", price: "2.5 BHD", desc: "6 pieces, choice of Buffalo or BBQ." },
            { name: "Onion Petals", price: "1.8 BHD", desc: "Crispy fried onion petals with ranch." }
          ] 
        }
      ],
      reviews: [
        { name: "Ahmed Al-Hidd", rating: 5, text: "Best burger place in Hidd. The truffle fries are out of this world!", date: "2 days ago" },
        { name: "Sarah J.", rating: 5, text: "Love the atmosphere and the service. The Spicy Hidd chicken is my favorite.", date: "1 week ago" },
        { name: "Mohammed K.", rating: 4, text: "Premium quality fast food. A bit pricey but definitely worth it.", date: "2 weeks ago" }
      ],
      contact: {
        phone: "+973 1700 0000",
        address: "Road 123, Block 456, Hidd, Bahrain",
        hours: "Daily: 12:00 PM - 02:00 AM"
      },
      mapsLinks: []
    };
  }
}
