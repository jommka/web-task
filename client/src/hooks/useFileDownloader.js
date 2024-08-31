import {useEffect, useState} from 'react';
import axios from "axios";

const useFileDownloader = (props) => {
    const [progress, setProgress] = useState({});
    const [completed, setCompleted] = useState({});

    useEffect(() => {
        fetchFiles(props);
    }, []);

    const fetchFiles = async (url) => {
        try {
            const response = await axios.get(url);
            const directoryContent = response.data;

            for (const item of directoryContent) {
                if (item.type === "file") {
                    downloadFile(url, item.name);
                } else if (item.type === "directory") {
                    fetchFiles(`${url}${item.name}/`);
                }
            }
        } catch (error) {
            console.error(`Ошибка получения списка файлов по адресу ${url}:`, error);
        }
    };

    const downloadFile = (baseUrl, filename) => {
        const fileUrl = `${baseUrl}${filename}`;

        axios({
            url: fileUrl,
            method: "GET",
            responseType: "blob",
            onDownloadProgress: (progressEvent) => {
                const percentCompleted = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                );
                setProgress((prevProgress) => ({
                    ...prevProgress,
                    [fileUrl]: percentCompleted,
                }));
            },
        })
            .then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", filename);
                document.body.appendChild(link);
                link.click();
                setCompleted((prevCompleted) => ({
                    ...prevCompleted,
                    [fileUrl]: true,
                }));
            })
            .catch((error) => {
                console.error(`Ошибка загрузки файла ${filename}:`, error);
            });
    };

    return [progress, completed];
};

export default useFileDownloader;