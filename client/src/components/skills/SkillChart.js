import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
import { Chart, ArcElement, Tooltip, Legend, Title } from "chart.js";
import "chart.js/auto";
import "./Style.css";

Chart.register(ArcElement, Tooltip, Legend, Title);

const DonutChart = ({ skills }) => {
  const [skillsData, setSkillsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSkillsData = async () => {
      try {
        const response = await axios.get("/api/skills/");
        const skills = response.data;

        setSkillsData(skills);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching skills data:", error);
        setError("Error fetching skills data");
        setLoading(false);
      }
    };

    fetchSkillsData();
  }, [skills]); 

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const proficiencyCounts = skillsData.reduce((counts, skill) => {
    const proficiency = skill.proficiency;
    counts[proficiency] = (counts[proficiency] || 0) + 1;
    return counts;
  }, {});

  const proficiencyLabels = Object.keys(proficiencyCounts);
  const proficiencyData = Object.values(proficiencyCounts);

  const data = {
    labels: proficiencyLabels,
    datasets: [
      {
        data: proficiencyData,
        backgroundColor: [
          "rgb(138, 203, 206)",
          "rgb(255, 190, 47)",
          "rgb(227, 104, 73)",
          "rgb(19, 124, 120)",
        ],
        borderWidth: 2,
        radius: "40%",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "chartArea",
        align: "center",
        reverse: false,
        layout: {
          padding: {
            bottom: 10,
          },
        },
      },
    },
  };

  return (
    <div>
      <div style={{ width: "600px", height: "350px" }}>
        <Doughnut data={data} options={chartOptions} />
      </div>
    </div>
  );
};

export default DonutChart;
