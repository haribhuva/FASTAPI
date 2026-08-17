const API_URL = `http://${import.meta.env.VITE_URL}`;

export async function greetUser(who: string) {
    const response = await fetch(`${API_URL}/hi`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            who: who,
        }),
    });

    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    } 

    return await response.json();
}