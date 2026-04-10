const BASE_URL = "http://localhost:3000";

export const saveHistory = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/history`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    });

    const result = await response.json();

    return result;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
