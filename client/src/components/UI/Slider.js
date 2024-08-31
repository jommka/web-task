import React, {useEffect, useState} from 'react';
import axios from "axios";
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Select from "react-select";
import left from "../img/left.svg"
import right from "../img/right.svg"


const Slider = () => {
    const [users, setUsers] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayCount, setDisplayCount] = useState(3);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://reqres.in/api/users');
                setUsers(response.data.data);
            } catch (error) {
                console.error("Ошибка при загрузке пользователей", error);
            }
        };
        fetchUsers();
    }, []);

    const options = [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' }]

    const selectCount = (selectedOption) => {
        setDisplayCount(Number(selectedOption.value))
    }

    const handleNext = () => {
        setCurrentIndex((prevIndex) => prevIndex + displayCount < users.length ? prevIndex + displayCount : 0
        );
    };
    const handlePrev = () => {
        setCurrentIndex((prevIndex) => prevIndex - displayCount >= 0 ? prevIndex - displayCount : users.length - displayCount
        );
    };

    const removeCard = (index) => {
        const newUsers = users.filter((_, i) => i !== index);
        setUsers(newUsers);
    };

    return (
        <div className="slider">
            <h1 style={{color: 'white'}}>Слайдер</h1>
            <div style={{display: "flex", position: 'relative'}}>
                <button className="slider-button" style={{left: 0}} onClick={handlePrev}><img src={left} alt="left"/>
                </button>
                <div style={{display: "flex", overflow: "hidden"}} className="slider-container">
                    {users.slice(currentIndex, currentIndex + displayCount).map((user, index) => (
                        <div className="card" key={user.id}>
                            <img src={user.avatar} alt={user.first_name}/>
                            <h3>{user.first_name} {user.last_name}</h3>
                            <p>{user.email}</p>
                            <button className="button" onClick={() => removeCard(currentIndex + index)}>Удалить</button>
                        </div>
                    ))}
                </div>
                <button className="slider-button" style={{right: 0}} onClick={handleNext}><img src={right} alt="right"/>
                </button>
            </div>
            <div className="count-card">
                <p style={{fontSize: '22px'}}>Количество карточек:</p>
                <Select options={options} onChange={selectCount} classNamePrefix='custom-select'
                        placeholder={'по умолчанию'}/>
            </div>
        </div>
    );
};

export default Slider;