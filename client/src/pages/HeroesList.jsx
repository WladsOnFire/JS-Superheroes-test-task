import { React, useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
const HeroesList = () => {

    const [heroes, setHeroes] = useState([]);
    const navigate = useNavigate();
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const [currentPage, setCurrentPage] = useState(1);
    const heroesPerPage = 5;

    const indexOfLastHero = currentPage * heroesPerPage;
    const indexOfFirstHero = indexOfLastHero - heroesPerPage;
    const currentHeroes = heroes.slice(indexOfFirstHero, indexOfLastHero);
    const pfpPlaceholderUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtZQ5gzXlkWIcWcfTHNAxh-sbzsQmkxT457Q&s";
    const totalPages = Math.ceil(heroes.length / heroesPerPage);


    const handleHeroOnClick = (id) => {
        navigate(`/hero/${id}`);
    };

    useEffect(() => {
        const fetchAllHeroes = async () => {
            try {
                const res = await axios.get(serverUrl + "/superheroes");
                setHeroes(res.data);
                console.log(res);
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllHeroes();
    }, [serverUrl])



    return (
        <div className="heroesPage">
            <h1>Heroes list</h1>
            <div className="heroesListBlock">
                <div className="heroes">

                    {currentHeroes.map(hero => (
                        <div className="hero" key={hero.id} onClick={() => handleHeroOnClick(hero.id)}>

                            <img
                                src={hero.pfp || pfpPlaceholderUrl}
                                alt={hero.nickname + " hero pfp"}
                            />
                            <div className='heroInfo'>
                                <h2>{hero.nickname}</h2>
                            </div>
                        </div>
                    ))}
                </div>
                <p> Page {currentPage} of {totalPages} </p>
                
                <div className="pagination">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="paginationBtn"
                    >
                        Prev
                    </button>
                    <Link to="/add">
                        <button className="addHeroBtn">
                            Add new hero
                        </button>
                    </Link>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="paginationBtn"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default HeroesList;