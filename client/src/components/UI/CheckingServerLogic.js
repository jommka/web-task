import React from 'react';
import axios from "axios";

const CheckingServerLogic = () => {
    const handleListHomeDirectory = () => {
        axios.get('http://localhost:5000/list-home-directory')
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('Произошла ошибка при указании домашнего каталога!', error);
            });
    };

    const handleListAndDownloadRemoteFiles = () => {
        axios.get('http://localhost:5000/list-and-download-remote-files')
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('Произошла ошибка при выводе списка и загрузке удаленных файлов!', error);
            });
    };

    const handleOpenTerminal = () => {
        axios.get('http://localhost:5000/open-terminal')
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('Произошла ошибка при открытии терминала!', error);
            });
    };

    return (
        <div style={{ margin: '80px', display:'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: "40px" }}>
            <h1 style={{ color: 'white' }}>NodeJS</h1>
            <div style={{ display:'flex', alignItems: 'center', justifyContent: 'center' }}>
                <button className="button" onClick={handleListHomeDirectory}>
                    Список файлов домашнего каталога
                </button>
                <button className="button" onClick={handleListAndDownloadRemoteFiles}>
                    Просмотр и загрузка удаленных файлов
                </button>
                <button className="button" onClick={handleOpenTerminal}>
                    "Hello, World!"
                </button>
            </div>
        </div>
    );
};

export default CheckingServerLogic;