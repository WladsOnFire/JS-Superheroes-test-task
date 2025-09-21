import React from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const AddHero = () => {

    const serverUrl = process.env.REACT_APP_SERVER_URL;

    const [input, setInput] = useState({
        nickname: "",
        real_name: "",
        origin_description: "",
        catch_phrase: ""
    });

    const navigate = useNavigate();

    const handleOnChange = (e) => {
        setInput(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleOnClick = async e => {
        e.preventDefault();
        try {
            await axios.post(serverUrl + "/superheroes", input);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <h1>Add hero page</h1>
            <div className="addHeroBlock">
                <div className="addHeroForm">
                    <input type="text" placeholder='hero nickname' onChange={handleOnChange} name="nickname" />
                    <input type="text" placeholder='hero real name' onChange={handleOnChange} name="real_name" />
                    <input type="text" placeholder='hero origin description' onChange={handleOnChange} name="origin_description" />
                    <input type="text" placeholder='hero catch phrase' onChange={handleOnChange} name="catch_phrase" />
                    <div className="addHeroButtonsBlock">
                        <button onClick={handleOnClick} className="addHeroBtn">Add</button>
                        <Link to={"/"}><button className="addHeroReturnBtn">Return</button></Link>
                    </div>

                </div>
            </div>
        </>

    );
}

export default AddHero;