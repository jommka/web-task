import React from 'react';
import useFileDownloader from "../../hooks/useFileDownloader";

const FileDownloaderContext = () => {
    const [progress, completed] = useFileDownloader("https://store.neuro-city.ru/downloads/for-test-tasks/");
    return (
        <div>
            {Object.keys(progress).map((fileUrl) => (
                <div key={fileUrl}>
                    <p>{fileUrl}</p>
                    <div style={{width: "100%", backgroundColor: "#e0e0e0"}}>
                        <div
                            style={{
                                width: `${progress[fileUrl] || 0}%`,
                                backgroundColor: "#76c7c0",
                                height: "10px",
                            }}
                        />
                    </div>
                    {completed[fileUrl] && <span>✅</span>}
                </div>
            ))
            }
        </div>
    );
};

export default FileDownloaderContext;