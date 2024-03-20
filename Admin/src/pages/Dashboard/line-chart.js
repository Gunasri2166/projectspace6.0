import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactApexChart from "react-apexcharts";
const axiosAPI = new axios.create();
const PieChart = () => {
  const [workData, setWorkData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [typeOfWorkCounts, setTypeOfWorkCounts] = useState([]);

  useEffect(() => {
    axiosAPI.get("http://localhost:5001/getDescriptions")
      .then((response) => {
        setWorkData(response.data.descriptions);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (workData && workData.length > 0) {
      const countsObject = workData.reduce((acc, item) => {
        const typeOfWork = item.type_of_work;
        acc[typeOfWork] = (acc[typeOfWork] || 0) + 1;
        return acc;
      }, {});

      const countsArray = Object.entries(countsObject).map(([typeOfWork, count]) => ({
        type_of_work: typeOfWork,
        count: count
      }));
      
      setTypeOfWorkCounts(countsArray);
    }
  }, [workData]);
  console.log(typeOfWorkCounts);
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!workData || workData.length === 0) {
    return <p>No data available</p>;
  }

  const series = typeOfWorkCounts.map((item) => item.count);
  const options = {
    chart: {
      type: 'pie',
    },
    labels: typeOfWorkCounts.map((item) => item.type_of_work),
  };

  return (
    <div>
      <h4>Type of Work Pie Chart</h4>
      <ReactApexChart
        options={options}
        series={series}
        type="pie"
        height={350}
      />
    </div>
  );
};

export default PieChart;
