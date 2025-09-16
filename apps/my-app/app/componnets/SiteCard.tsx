interface SiteCardProps {
    siteId: string;
    siteName: string;
    siteUrl: string;
    status: boolean;
    onDelete?: () => void;
  }
  
  export function SiteCard({ siteId, siteName, siteUrl, status, onDelete }: SiteCardProps) {
    return (
      <div className="bg-gray-800 rounded-xl p-4 shadow-md flex flex-col justify-between">
        <div>
          <h4 className="text-lg font-bold">{siteName}</h4>
          <p className="text-sm text-gray-400">{siteUrl}</p>
          <span className={`text-xs ${status ? 'text-green-400' : 'text-red-400'}`}>
            {status ? 'Online' : 'Offline'}
          </span>
        </div>
        {onDelete && (
          <button
            onClick={onDelete}
            className="mt-4 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-400"
          >
            Delete
          </button>
        )}
      </div>
    );
  }
  