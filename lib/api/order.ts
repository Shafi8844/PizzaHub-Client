const BaseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function createOrder(orderData: any) {
  try {
    const response = await fetch(`${BaseUrl}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error("Failed to create order");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
}