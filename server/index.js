require('dotenv').config()


const express = require('express');
const fs = require('fs');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
const { spawn } = require('child_process');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Для разрешения CORS-запросов с React

app.get('/list-home-directory', (req, res) => {
    const homeDir = require('os').homedir();
    fs.readdir(homeDir, (err, files) => {
        if (err) {
            return res.status(500).send('Ошибка чтения директории');
        }
        console.log('Список файлов в домашней директории:', files);
        res.json(files);
    });
});


app.get('/list-and-download-remote-files', async (req, res) => {
    try {
        const response = await axios.get('https://store.neuro-city.ru/downloads/for-test-tasks/files-list/');
        const directoryContent = response.data;
        const files = [];

        const downloadFile = async (url, outputPath) => {
            const writer = fs.createWriteStream(outputPath);

            try {
                const response = await axios({
                    url,
                    method: 'GET',
                    responseType: 'stream',
                });

                response.data.pipe(writer);

                return new Promise((resolve, reject) => {
                    writer.on('finish', resolve);
                    writer.on('error', reject);
                });
            } catch (error) {
                console.error('Ошибка при загрузке файла:', error.message);
            }
        };

        for (const item of directoryContent) {
            if (item.type === "file") {
                files.push(item);
                files.map(async (file, index) => {
                    const response = await axios.head(`https://store.neuro-city.ru/downloads/for-test-tasks/files-list/${file.name}`)
                    const fileSize = response.headers['content-length'];
                    if ((fileSize / 1024) > 0) {
                        const outputPath = path.join(__dirname, `file-${index}.txt`);
                        await downloadFile(`https://store.neuro-city.ru/downloads/for-test-tasks/files-list/${file.name}`, outputPath)
                    }
                })
            }
        }

        console.log(files);
        res.json(files);

    } catch (error) {
        console.error('Ошибка при извлечении или загрузке файлов:', error);
        res.status(500).send('Ошибка при извлечении или загрузке файлов.');
    }
});

app.get('/open-terminal', (req, res) => {
    const child = spawn('echo', ['Hello, World!'], { shell: true });

    child.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    child.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    child.on('close', (code) => {
        console.log(`Дочерний процесс завершился с кодом ${code}`);
    });

    res.send('Команда выполнена, проверьте консоль.');
});


app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});