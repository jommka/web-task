import React, {useEffect, useRef, useState} from 'react';

const ImageRotation = () => {
    const [image, setImage] = useState(null);
    const [rotation, setRotation] = useState(0);
    const canvasRef = useRef(null);
    const hiddenFileInput = useRef(null);

    const handleClick = event => {
        hiddenFileInput.current.click();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
                setRotation(0);
            };
            reader.readAsDataURL(file);
        }
    };

    const rotateImage = (direction) => {
        setRotation((prevRotation) => (prevRotation + (direction === 'left' ? -90 : 90)) % 360);
    };

    const saveImage = () => {
        const canvas = canvasRef.current;
        const link = document.createElement('a');

        link.download = 'rotated-image.png';
        link.href = canvas.toDataURL();
        link.click();
    };

    const drawImage = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const img = new Image();
        img.src = image;
        img.onload = () => {
            const { width, height } = img;
            canvas.width = rotation % 180 === 0 ? width : height;
            canvas.height = rotation % 180 === 0 ? height : width;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate((rotation * Math.PI) / 180);
            ctx.drawImage(img, -width / 2, -height / 2);
            ctx.restore();
        };
    };

    useEffect(() => {
        if (image) {
            drawImage();
        }
    }, [image, rotation]);

    return (
        <div style={{textAlign: 'center', margin: '80px auto', padding: '0 100px'}}>
            <h1 style={{color: 'white', marginBottom: '40px'}}>Поворот изображения</h1>
            <button className="button" id="upload" onClick={handleClick}>Выбрать файл</button>
            <input className="input-uploader" type="file" accept="image/png, image/jpeg" ref={hiddenFileInput}
                   onChange={handleImageChange} style={{display: 'none'}}/>
            {image && (
                <div className="img-container">
                    <div>
                        <canvas ref={canvasRef} style={{display: 'none'}}/>
                        <img src={image} alt="Uploaded"
                             style={{transform: `rotate(${rotation}deg)`, width: '400px', height: 'auto'}}/>
                    </div>
                    <div>
                        <button className="button" onClick={() => rotateImage('left')}>Повернуть налево</button>
                        <button className="button" onClick={() => rotateImage('right')}>Повернуть направо</button>
                        <button className="button" onClick={saveImage}>Сохранить изображение</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageRotation;