import express, { json } from "express";
import mysql from "mysql";
import cors from "cors";
import { config } from 'dotenv';

config();

const app = express();
app.use(express.json());
app.use(cors());

const GET_SUPERHEROES_WITH_PFP_QUERY = "SELECT h.id, h.nickname, h.real_name, h.origin_description, h.catch_phrase, (SELECT p.url FROM heropic p  JOIN hero_heropic hh ON p.id = hh.picId WHERE hh.heroId = h.id LIMIT 1) AS pfp FROM hero h";
const POST_SUPERHERO_QUERY = "INSERT INTO hero (`nickname`,`real_name`,`origin_description`,`catch_phrase`) VALUES (?)";
const DELETE_SUPERHERO_QUERY = "DELETE FROM hero WHERE id = ?";
const PUT_SUPERHERO_QUERY = "UPDATE hero SET nickname = ?, real_name = ?, origin_description = ?, catch_phrase = ? WHERE id = ?";
const GET_SUPERPOWERS_OF_SUPERHERO_QUERY = "SELECT p.id, p.name FROM superpower p JOIN hero_superpowers hs ON p.id = hs.powerId JOIN hero h ON h.id = hs.heroId WHERE h.id = ?;";
const GET_PICTURES_OF_SUPERHERO_QUERY = "SELECT p.id, p.url FROM heropic p JOIN hero_heropic hh ON p.id = hh.picId JOIN hero h ON h.id = hh.heroId WHERE h.id = ?;";
const GET_SUPERHERO_PFP_QUERY = "SELECT p.url FROM heropic p JOIN hero_heropic hh ON p.id = hh.picId JOIN hero h ON h.id = hh.heroId WHERE h.id = ? limit 1;";
const POST_PICTURE = "INSERT INTO heropic (url) VALUES (?)";
const POST_SUPERHERO_PICTURE_RELATION_QUERY = "INSERT INTO hero_heropic (heroId, picId) VALUES (?, ?)";
const DELETE_PICTURE_QUERY = "DELETE FROM heropic WHERE id = ?";
const DELETE_SUPERHERO_ALL_SUPERPOWERS_QUERY = "DELETE FROM hero_superpowers WHERE heroId = ?";
const GET_SUPERPOWERS_QUERY = "SELECT * FROM superpower";
const POST_SUPERHERO_SUPERPOWERS_RELATION_QUERY = "INSERT INTO hero_superpowers (heroId, powerId) VALUES ?";
const POST_SUPERPOWER_QUERY = "INSERT INTO superpower (name) VALUES (?)";

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

app.get("/", (req, res) => {
    res.json("hello, that's backend");
});

app.get("/superheroes", (req, res) => {
    db.query(GET_SUPERHEROES_WITH_PFP_QUERY, (error, data) => {
        if (error) return res.json(error);
        return res.json(data);
    })
});


app.post("/superheroes", (req, res) => {
    const values = [
        req.body.nickname,
        req.body.real_name,
        req.body.origin_description,
        req.body.catch_phrase
    ];

    db.query(POST_SUPERHERO_QUERY, [values], (error, data) => {
        if (error) return res.json(error);
        return res.json("superhero added.");
    })
});

app.delete("/superheroes/:id", (req, res) => {
    const heroId = req.params.id;

    db.query(DELETE_SUPERHERO_QUERY, [heroId], (error, data) => {
        if (error) return res.json(error);
        return res.json("hero with id(" + heroId + ") was deleted succesfully.");
    })
});

app.put("/superheroes/:id", (req, res) => {
    const heroId = req.params.id;
    const { nickname, real_name, origin_description, catch_phrase } = req.body;

    db.query(PUT_SUPERHERO_QUERY, [nickname, real_name, origin_description, catch_phrase, heroId], (err, result) => {
        if (err) return res.json(err);
        return res.json({ message: "Hero updated successfully" });
    });
})

app.get("/superheroes/:id", (req, res) => {
    const heroId = req.params.id;
    const query = "SELECT * FROM hero WHERE id = ?";

    db.query(query, [heroId], (error, data) => {
        if (error) return res.json(error);
        return res.json(data);
    })
});

app.get("/superheroes/:id/superpowers", (req, res) => {
    const heroId = req.params.id;
    

    db.query(GET_SUPERPOWERS_OF_SUPERHERO_QUERY, [heroId], (error, data) => {
        if (error) return res.json(error);
        return res.json(data);
    })
});

app.get("/superheroes/:id/pictures", (req, res) => {
    const heroId = req.params.id;
    
    db.query(GET_PICTURES_OF_SUPERHERO_QUERY, [heroId], (error, data) => {
        if (error) return res.json(error);
        return res.json(data);
    })
});

app.get("/superheroes/:id/pfp", (req, res) => {
    const heroId = req.params.id;
    
    db.query(GET_SUPERHERO_PFP_QUERY, [heroId], (error, data) => {
        if (error) return res.json(error);
        return res.json(data);
    })
});

app.post("/superheroes/:id/pictures", (req, res) => {

    const heroId = req.params.id;
    const { url } = req.body;

    db.query(POST_PICTURE, [url], (err, result) => {
        if (err) return res.json(err);

        const picId = result.insertId;

        db.query(POST_SUPERHERO_PICTURE_RELATION_QUERY, [heroId, picId], (err2, result2) => {
            if (err2) return res.json(err2);
            return res.json({ message: "Picture added.", picId });
        });
    });
});

app.delete("/superheroes/:id/pictures/:picId", (req, res) => {
    const heroId = req.params.id;
    const picId = req.params.picId;

    db.query(DELETE_PICTURE_QUERY , [picId], (error, data) => {
        if (error) return res.json(error);
        return res.json("picture with id(" + picId + ") was deleted succesfully.");
    })
});

app.get("/superpowers", (req, res) => {
    
    db.query(GET_SUPERPOWERS_QUERY, (error, data) => {
        if (error) return res.json(error);
        return res.json(data);
    })
});


app.put("/superheroes/:id/superpowers", (req, res) => {
    const heroId = req.params.id;
    const abilities = req.body.abilities;

    
    db.query(DELETE_SUPERHERO_ALL_SUPERPOWERS_QUERY, [heroId], (err, result) => {
        if (err) return res.json(err);

        const values = abilities.map(a=> [heroId, a.id]);
        
        db.query(POST_SUPERHERO_SUPERPOWERS_RELATION_QUERY, [values], (err2, result2) => {
            if (err2) return res.json(err2);
            return res.json("Abilities updated.");
        });
    });
});

app.post("/superpowers", (req, res) => {
    const { name } = req.body;

    db.query(POST_SUPERPOWER_QUERY, name, (err, result) => {
        if (err) return res.json(err);
        return res.json("Ability added");
    });
});

app.listen(process.env.PORT, () => {
    console.log("backend server is up and running!")
});

