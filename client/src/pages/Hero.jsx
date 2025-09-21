import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
const Hero = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const heroId = location.pathname.split("/")[2];
    const serverUrl = process.env.REACT_APP_SERVER_URL;

    const [hero, setHero] = useState({});
    const [abilities, setAbilities] = useState([]);
    const [pictures, setPictures] = useState([]);

    useEffect(() => {
        const fetchHeroById = async () => {
            try {
                const res = await axios.get(serverUrl+"/superheroes/" + heroId);
                setHero(res.data[0]);
                console.log(res.data[0]);
            } catch (error) {
                console.log(error);
            }
        }
        fetchHeroById();

        const fetchPicturesByHeroId = async () => {
            try {
                const res = await axios.get(serverUrl+"/superheroes/" + heroId + "/pictures");
                setPictures(res.data);
                console.log(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchPicturesByHeroId();

        const fetchAbilitiesByHeroId = async () => {
            try {
                const res = await axios.get(serverUrl+"/superheroes/" + heroId + "/superpowers");
                setAbilities(res.data);
                console.log(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchAbilitiesByHeroId();

    }, [heroId,serverUrl])

    const handleAddPicture = async () => {
        const url = prompt("Enter picture URL:");
        if (url) {
            try {
                await axios.post(serverUrl+"/superheroes/" + heroId + "/pictures", { url });
                window.location.reload();
            } catch (error) {
                console.log(error);
            }
        }
    }

    const handleDeleteHero = async () => {
        if (window.confirm("Do you really want to delete this hero?")) {
            try {
                await axios.delete(serverUrl+"/superheroes/" + hero.id);
                navigate("/");
            } catch (err) {
                console.log(err);
            }
        }
    }

    const handleDeletePicture = async (picId) => {
        if (window.confirm("Do you really want to delete this picture?")) {
            try {
                await axios.delete(serverUrl+"/superheroes/" + hero.id + "/pictures/" + picId);
                setPictures(pictures.filter(p => p.id !== picId));
            } catch (err) {
                console.log(err);
            }
        }
    }

    return (
        <>
            <h1>Hero page</h1>
            <div className="heroCardBlock">
                <div className="heroInfoBlock">
                    <div>
                        <h2>{hero.nickname}</h2>
                        <p>{hero.real_name}</p>
                        <p>{hero.origin_description}</p>
                        <p>- {hero.catch_phrase}</p>
                    </div>
                    <div>
                        <p>Abilities:</p>
                        <ul>
                            {abilities.map((ability, index) => (
                                <li key={index}>{ability.name}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className='editDeleteheroButtonsBlock'>
                    <Link to={"/edit/hero/" + heroId}>
                        <button className='editHeroBtn'>
                            Edit hero
                        </button>
                    </Link>
                    <button className='deleteHeroBtn' onClick={handleDeleteHero}>Delete hero</button>
                    <Link to={"/"}>
                        <button className='returnBtn'>
                            Return to list
                        </button>
                    </Link>
                </div>
                <h1>Pictures:</h1>
                <div className="heroPicturesBlock">
                    {pictures.map((pic, index) => (
                        <img
                            src={pic.url}
                            alt={hero.nickname + " picture " + (index + 1)}
                            onClick={() => handleDeletePicture(pic.id)}
                        />
                    ))}
                </div>
                <div className='addPictureBlock'>
                    <button className='addPictureBtn' onClick={handleAddPicture}>Add new picture</button>
                </div>
            </div>
        </>

    );
}

export default Hero;