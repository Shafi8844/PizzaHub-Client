const BaseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050";

export const getMenuItems = async () => {
  const response = await fetch(`${BaseURL}/menu`);
  if (!response.ok) {
    throw new Error("Failed to fetch menu items");
  }
  return response.json();
};