import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css"; // Assuming you will create this CSS file

const Dashboard = () => {
    const [pumps, setPumps] = useState([]);
    const [amounts, setAmounts] = useState([]);
    const [udhars, setUdhars] = useState([]);
    const [credits, setCredits] = useState([]);
    const [debits, setDebits] = useState([]);
  
    // Fetch all data
    useEffect(() => {
      const fetchData = async () => {
        try {
          const [pumpRes, amountRes, udharRes, creditRes, debitRes] = await Promise.all([
            axios.get("https://backend-deploy-nu.vercel.app/pump/get"),
            axios.get("https://backend-deploy-nu.vercel.app/pump/getamount"),
            axios.get("https://backend-deploy-nu.vercel.app/pump/getudhar"),
            axios.get("https://backend-deploy-nu.vercel.app/pump/getcredit"),
            axios.get("https://backend-deploy-nu.vercel.app/pump/getdebit"),
          ]);
          setPumps(pumpRes.data);
          setAmounts(amountRes.data);
          setUdhars(udharRes.data);
          setCredits(creditRes.data);
          setDebits(debitRes.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }, []);
  
  // Helper to group pumps by name and remove null or 0 values
  const groupPumpsByName = (pumps) => {
    const grouped = {};
    pumps.forEach((pump) => {
      if (!grouped[pump.name]) grouped[pump.name] = [];
      // Filter out null or 0 values before adding to the grouped pump
      const filteredPump = {
        ...pump,
        petrolDelivery: pump.petrolDelivery !== 0 && pump.petrolDelivery !== null ? pump.petrolDelivery : undefined,
        petrolSale: pump.petrolSale !== 0 && pump.petrolSale !== null ? pump.petrolSale : undefined,
        dieselDelivery: pump.dieselDelivery !== 0 && pump.dieselDelivery !== null ? pump.dieselDelivery : undefined,
        dieselSale: pump.dieselSale !== 0 && pump.dieselSale !== null ? pump.dieselSale : undefined,
        mobileOilDelivery: pump.mobileOilDelivery !== 0 && pump.mobileOilDelivery !== null ? pump.mobileOilDelivery : undefined,
        mobileOilSale: pump.mobileOilSale !== 0 && pump.mobileOilSale !== null ? pump.mobileOilSale : undefined,
      };
      grouped[pump.name].push(filteredPump);
    });
    return grouped;
  };

  const groupedPumps = groupPumpsByName(pumps);

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>

      {/* Pump Data */}
      <section>
        <h2>Pump Data</h2>
        {pumps.map((pump) => (
          <div key={pump.name} className="pump-container">
            <h3>{pump.name}</h3>
            {/* Display rows for the pump data */}
            <table className="table">
              <thead>
                <tr>
                  <th>Petrol Date</th>
                  <th>Petrol Delivery</th>
                  <th>Petrol Sale</th>
                  <th>Diesel Date</th>
                  <th>Diesel Delivery</th>
                  <th>Diesel Sale</th>
                  <th>Mobile Oil Date</th>
                  <th>Mobile Oil Delivery</th>
                  <th>Mobile Oil Sale</th>
                </tr>
              </thead>
              <tbody>
                {pump.data.length > 0 ? (
                  pump.data.map((entry, index) => (
                    <tr key={index}>
                      <td>{entry.petrolDate || "N/A"}</td>
                      <td>{entry.petrolDelivery || "N/A"}</td>
                      <td>{entry.petrolSale || "N/A"}</td>
                      <td>{entry.dieselDate || "N/A"}</td>
                      <td>{entry.dieselDelivery || "N/A"}</td>
                      <td>{entry.dieselSale || "N/A"}</td>
                      <td>{entry.mobileOilDate || "N/A"}</td>
                      <td>{entry.mobileOilDelivery || "N/A"}</td>
                      <td>{entry.mobileOilSale || "N/A"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9">No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ))}
      </section>

      {/* Amount Data */}
      <section>
        <h2>Amount Data</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Total Sale</th>
              <th>Expenditure</th>
            </tr>
          </thead>
          <tbody>
            {amounts.map((amount) => (
              <tr key={amount.id}>
                <td>{amount.name || "N/A"}</td>
                <td>{amount.Date || "N/A"}</td>
                <td>{amount.totalsale}</td>
                <td>{amount.expenditure}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Udhar Data */}
      <section>
        <h2>Udhar Data</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Pump Name</th>
              <th>Date</th>
              <th>Name</th>
              <th>Amount</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {udhars.map((udhar) => (
              <tr key={udhar.id}>
                <td>{udhar.pumpName || "N/A"}</td>
                <td>{udhar.Date || "N/A"}</td>
                <td>{udhar.Name}</td>
                <td>{udhar.Amount}</td>
                <td>{udhar.Description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>


      {/* Credit Data */}
      <section>
        <h2>Credit Data</h2>
        <table  className="table">
          <thead>
            <tr>
              <th>Deposit Date</th>
              <th>Sale Date</th>
              <th>Name</th>
              <th>Amount</th>
              <th>Site</th>
            </tr>
          </thead>
          <tbody>
            {credits.length > 0 ? (
              credits.map((credit) => (
                <tr key={credit.id}>
                  <td>{credit.DepositDate ? new Date(credit.DepositDate).toLocaleDateString() : "N/A"}</td>
                  <td>{credit.SaleDate ? new Date(credit.SaleDate).toLocaleDateString() : "N/A"}</td>
                  <td>{credit.Name}</td>
                  <td>{credit.Amount}</td>
                  <td>{credit.site}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td >No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      {/* Debit Data */}
      <section>
        <h2>Debit Data</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Company Name</th>
              <th>Site</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {debits.length > 0 ? (
              debits.map((debit) => (
                <tr key={debit.id}>
                  <td>{debit.Date ? new Date(debit.Date).toLocaleDateString() : "N/A"}</td>
                  <td>{debit.CompanyName}</td>
                  <td>{debit.Site}</td>
                  <td>{debit.Amount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td >No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Dashboard;
