import { useState } from "react";

interface DeleteWebsiteProps {
    siteId: string;
    onDeleted: () => void; // callback to refresh parent state
}

export function DeleteWebsiteButton({ siteId, onDeleted }: DeleteWebsiteProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDelete = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch("/api/deleteWebsite", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ siteId }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Failed to delete");
            } else {
                onDeleted(); // refresh parent state
            }
        } catch (err) {
            setError("Something went wrong");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <button
                onClick={handleDelete}
                className="px-3 py-1 bg-red-500 hover:bg-red-400 text-white rounded-md disabled:opacity-50"
                disabled={loading}
            >
                {loading ? "Deleting..." : "Delete"}
            </button>
            {error && <span className="text-red-400 text-sm mt-1">{error}</span>}
        </div>
    );
}
