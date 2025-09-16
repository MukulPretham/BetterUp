import { useState } from "react";

export function SiteAddModal({
    isOpen,
    onClose,
    onSubmit,
}: {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: { siteName: string; siteUrl: string }) => void;
}) {
    const [siteName, setSiteName] = useState("");
    const [siteUrl, setSiteUrl] = useState("");

    if (!isOpen) return null;

    const handleSubmit = (e: any) => {
        e.preventDefault();
        onSubmit({ siteName, siteUrl });
        setSiteName("");
        setSiteUrl("");
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md shadow-lg">
                <h3 className="text-2xl font-semibold text-white mb-4">Add New Website</h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-300 mb-1">Site Name</label>
                        <input
                            type="text"
                            value={siteName}
                            onChange={(e) => setSiteName(e.target.value)}
                            className="w-full px-3 py-2 rounded-md bg-gray-700 text-white border border-gray-600"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300 mb-1">Site URL</label>
                        <input
                            type="text"
                            value={siteUrl}
                            onChange={(e) => setSiteUrl(e.target.value)}
                            className="w-full px-3 py-2 rounded-md bg-gray-700 text-white border border-gray-600"
                            required
                        />
                    </div>

                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-400"
                        >
                            Add Website
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
