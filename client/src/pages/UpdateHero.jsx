import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

const UpdateHero = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [hero, setHero] = useState({});
    const [prevAbilities, setPrevAbilities] = useState([]);
    const [allAbilities, setAllAbilities] = useState([]);

    const serverUrl = process.env.REACT_APP_SERVER_URL;

    const heroId = location.pathname.split("/")[3];

    useEffect(() => {
        const fetchHeroById = async () => {
            try {
                const res = await axios.get(serverUrl + "/superheroes/" + heroId);
                setHero(res.data[0]);
                console.log(res.data[0]);
            } catch (error) {
                console.log(error);
            }
        }
        fetchHeroById();

        const fetchAbilitiesByHeroId = async () => {
            try {
                const res = await axios.get(serverUrl + "/superheroes/" + heroId + "/superpowers");
                setPrevAbilities(res.data);
                console.log(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchAbilitiesByHeroId();

        const fetchAllAbilities = async () => {
            try {
                const res = await axios.get(serverUrl + "/superpowers");
                setAllAbilities(res.data);
                console.log(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllAbilities();
    }, [heroId,serverUrl])

    const handleUpdateHero = async (e) => {
        try {
            await axios.put(serverUrl + "/superheroes/" + heroId, hero);
        } catch (error) {
            console.log(error);
        }
        try {
            await axios.put(serverUrl + "/superheroes/" + heroId + "/superpowers", {
                abilities: prevAbilities
            });
            console.log(prevAbilities);
            navigate("/hero/" + heroId);
        } catch (error) {
            console.log(error);
        }

    };

    const handleAddAbility = async () => {
        const name = prompt("Enter superpower name:");
        if (name) {
            try {
                await axios.post(serverUrl + "/superpowers", { name });
                window.location.reload();
            } catch (error) {
                console.log(error);
            }
        }
    }



    const handleOnChange = (e) => {
        setHero(prev => ({ ...prev, [e.target.name]: e.target.value }));
        console.log(hero);
    };


    return (
        <>
            <h1>Edit hero page</h1>
            <div className="editHeroBlock">
                <div className="heroInfoBlock">
                    <div className="form">
                        <p>Nickname:</p>
                        <input type="text" onChange={handleOnChange} value={hero.nickname} name="nickname" />
                        <p>Real name:</p>
                        <input type="text" onChange={handleOnChange} value={hero.real_name} name="real_name" />
                        <p>Origin description:</p>
                        <input type="text" onChange={handleOnChange} value={hero.origin_description} name="origin_description" />
                        <p>Catch phrase:</p>
                        <input type="text" onChange={handleOnChange} value={hero.catch_phrase} name="catch_phrase" />
                    </div>
                    <div>
                        <h2>Abilities:</h2>
                        <div className="abilitySelectionBlock">

                            <div className="abilitySelectionBlockLeft">
                                <h3>Available Abilities</h3>
                                <ul>
                                    {allAbilities
                                        .filter(a => !prevAbilities.some(pa => pa.id === a.id))
                                        .map(a => (
                                            <li key={a.id}>
                                                {a.name} <button onClick={() => setPrevAbilities([...prevAbilities, a])}>→</button>
                                            </li>
                                        ))}
                                    <button onClick={handleAddAbility} className="customAbilityBtn">Add custom ability</button>
                                </ul>
                            </div>


                            <div className="abilitySelectionBlockRight">
                                <h3>Selected Abilities</h3>
                                <ul>
                                    {prevAbilities.map(a => (
                                        <li key={a.id}>
                                            <button onClick={() => setPrevAbilities(prevAbilities.filter(pa => pa.name !== a.name))}>←</button> {a.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="acceptBtnBlock">
                    <button onClick={handleUpdateHero} className="saveChangesBtn"> Save </button>
                    <button onClick={() => navigate("/hero/" + heroId)} className="discChangesBtn"> Discard changes</button>
                </div >
            </div>

        </>

    );
}

export default UpdateHero;