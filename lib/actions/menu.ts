const BaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5050';

export const createmenu= async (menuData: FormData) => {
    const res = await fetch(`${BaseUrl}/menu`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(menuData),
    })
    return res.json()
}