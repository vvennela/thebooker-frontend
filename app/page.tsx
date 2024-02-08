'use client';
import React from "react";
import {useState} from "react";
import Dropdown from "./lib/dropdown";

type TeamType = { value: string, label: string };

const teamNames = {
    "ATL": "Atlanta Hawks",
    "BOS": "Boston Celtics",
    "BKN": "Brooklyn Nets",
    "CHA": "Charlotte Hornets",
    "CHI": "Chicago Bulls",
    "CLE": "Cleveland Cavaliers",
    "DAL": "Dallas Mavericks",
    "DEN": "Denver Nuggets",
    "DET": "Detroit Pistons",
    "GSW": "Golden State Warriors",
    "HOU": "Houston Rockets",
    "IND": "Indiana Pacers",
    "LAC": "Los Angeles Clippers",
    "LAL": "Los Angeles Lakers",
    "MEM": "Memphis Grizzlies",
    "MIA": "Miami Heat",
    "MIL": "Milwaukee Bucks",
    "MIN": "Minnesota Timberwolves",
    "NOP": "New Orleans Pelicans",
    "NYK": "New York Knicks",
    "OKC": "Oklahoma City Thunder",
    "ORL": "Orlando Magic",
    "PHI": "Philadelphia 76ers",
    "PHX": "Phoenix Suns",
    "POR": "Portland Trail Blazers",
    "SAC": "Sacramento Kings",
    "SAS": "San Antonio Spurs",
    "TOR": "Toronto Raptors",
    "UTA": "Utah Jazz",
    "WAS": "Washington Wizards"
};



export default function Page() {
    const [selectedTeam, setSelectedTeam] = useState<TeamType | null>(null);
    const [opponentTeam, setOpponentTeam] = useState<TeamType | null>(null);
    const [prediction, setPrediction] = useState<string | null>(null);

    const handleClick = async () => {
        const response = await fetch("http://localhost:5000/predict", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                team: selectedTeam?.value,
                opponent: opponentTeam?.value
            })
        });

        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status}`);
        } else {
            const data = await response.json();
            const winnerKey = data.winner as keyof typeof teamNames;
            const winner = teamNames[winnerKey] || data.winner;
            setPrediction(winner);
        }
    };
    return (
        <main className="flex flex-col justify-center items-center h-screen mb-5">
            <h1 className="mb-3 text-[3.5em] text-white">Welcome to theBooker! </h1>
            <h2 className="mb-10 text-base text-white text-[1.5em]">Select Two Teams and see what our model returns!</h2>
            <div className="flex space-x-4">
            <div className="max-w-80 w-full">
                <Dropdown setTeam={setSelectedTeam}/>
            </div>
            <div className="max-w-80 w-full">
                <Dropdown setTeam={setOpponentTeam} />
            </div>
                <button className="bg-white text-black px-4 py-2 rounded" onClick = {handleClick}>Predict!</button>
            </div>
            <div className = "text-[2.5em] text-white mt-6">
                {prediction && <p>The {prediction} win!</p>}
            </div>
            
        </main>
    );
}
