import React, {useEffect, useState} from 'react';
import axios from "axios";
import useFileDownloader from "../../hooks/useFileDownloader";
import FileDownloaderContext from "../context/FileDownloaderContext";


const FileDownloader = () => {
    const [isDownloading, setIsDownloading] = useState(false);

    const startDownload = () => {
        setIsDownloading(true)
    };

    return (
        <div style={{margin: '80px', display:'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: "40px"}}>
            <h1 style={{color: 'white'}}>Загрузчик файлов</h1>
            <button className="button" id="upload" onClick={startDownload} disabled={isDownloading}>
                {isDownloading ? 'Скачивание...' : 'Начать загрузку'}
            </button>
            {isDownloading &&
                <FileDownloaderContext/>
            }
        </div>
    );
};

export default FileDownloader;