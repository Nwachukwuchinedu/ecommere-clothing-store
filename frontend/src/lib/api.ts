const API_URL = import.meta.env.VITE_API_URL as string

export async function apiFetch(path: string, options: RequestInit = {}, token?: string | null) {
    const res = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(options.headers || {}),
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
    })
    if (!res.ok) throw new Error(await res.text())
    return res.json()
}


