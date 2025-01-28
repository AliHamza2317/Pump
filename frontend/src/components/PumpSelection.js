import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
const Balance = ({ goBack }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  // Credit State
  const [depositDate, setDepositDate] = useState('');
  const [saleDate, setSaleDate] = useState('');
  const [name, setName] = useState('');
  const [site, setSite] = useState('');
  const [amount, setAmount] = useState('');

  // Debit State
  const [debitDate, setDebitDate] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [debitSite, setDebitSite] = useState('');
  const [debitAmount, setDebitAmount] = useState('');

  // Handle Credit Entry
  const handleAddSale = async () => {
    if (depositDate && saleDate && name && site && amount) {
      const creditData = {
        DepositDate: new Date(depositDate),
        SaleDate: new Date(saleDate),
        Name: name,
        Amount: parseInt(amount),
        site: (site),
      };

      try {
        const response = await fetch('https://backend-deploy-nu.vercel.app/pump/credit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(creditData),
        });

        if (response.ok) {
          alert('Credit entry added successfully!');
          setDepositDate('');
          setSaleDate('');
          setName('');
          setSite('');
          setAmount('');
        } else {
          alert('Failed to add Credit entry.');
        }
      } catch (error) {
        console.error('Error adding Credit:', error);
      }
    }
  };

  // Handle Debit Entry
  const handleAddDebit = async () => {
    if (debitDate && companyName && debitSite && debitAmount) {
      const debitData = {
        Date: new Date(debitDate),
        CompanyName: companyName,
        Site: (debitSite),
        Amount: parseInt(debitAmount),
      };

      try {
        const response = await fetch('https://backend-deploy-nu.vercel.app/pump/debit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(debitData),
        });

        if (response.ok) {
          alert('Debit entry added successfully!');
          setDebitDate('');
          setCompanyName('');
          setDebitSite('');
          setDebitAmount('');
        } else {
          alert('Failed to add Debit entry.');
        }
      } catch (error) {
        console.error('Error adding Debit:', error);
      }
    }
  };

  return (
    <div style={containerStyle}>
      <h2>Balance Overview</h2>

      {selectedOption === null ? (
        <>
          <button onClick={() => setSelectedOption('Credit')} style={buttonStyle}>Credit</button>
          <button onClick={() => setSelectedOption('Debit')} style={buttonStyle}>Debit</button>
          <button onClick={goBack} style={backButtonStyle}>Come Back</button>
        </>
      ) : selectedOption === 'Credit' ? (
        <div>
          <h3>Credit Option</h3>

          <div>
            <h4>Deposit Date</h4>
            <input
              type="date"
              value={depositDate}
              onChange={(e) => setDepositDate(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div>
            <h4>Sale Date</h4>
            <input
              type="date"
              value={saleDate}
              onChange={(e) => setSaleDate(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div>
            <h4>Name</h4>
            <input
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div>
            <h4>Site</h4>
            <input
              type="text"
              placeholder="Enter Site"
              value={site}
              onChange={(e) => setSite(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div>
            <h4>Amount</h4>
            <input
              type="number"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={inputStyle}
            />
          </div>

          <button onClick={handleAddSale} style={buttonStyle}>Add Sale</button>
          <button onClick={() => setSelectedOption(null)} style={backButtonStyle}>Back</button>
        </div>
      ) : (
        <div>
          <h3>Debit Option</h3>

          <div>
            <h4>Debit Date</h4>
            <input
              type="date"
              value={debitDate}
              onChange={(e) => setDebitDate(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div>
            <h4>Company Name</h4>
            <input
              type="text"
              placeholder="Enter Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div>
            <h4>Site</h4>
            <input
              type="text"
              placeholder="Enter Site"
              value={debitSite}
              onChange={(e) => setDebitSite(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div>
            <h4>Amount</h4>
            <input
              type="number"
              placeholder="Enter Amount"
              value={debitAmount}
              onChange={(e) => setDebitAmount(e.target.value)}
              style={inputStyle}
            />
          </div>

          <button onClick={handleAddDebit} style={buttonStyle}>Add Debit</button>
          <button onClick={() => setSelectedOption(null)} style={backButtonStyle}>Back</button>
        </div>
      )}
    </div>
  );
};




// Amount Section (Already Correct)
const AmountSection = ({ pumpName, goBack }) => {
  const [totalSale, setTotalSale] = useState('');
  const [expenditure, setExpenditure] = useState('');
  const [date, setDate] = useState('');  // New state for date
  const [netAmount, setNetAmount] = useState(null);

  const calculateNetAmount = () => {
    const sale = parseFloat(totalSale) || 0;
    const expense = parseFloat(expenditure) || 0;
    setNetAmount(sale - expense);
  };

  const saveAmount = async () => {
    const data = {
      name: pumpName,
      Date: new Date(date),  // Send date to the backend
      totalsale: parseInt(totalSale, 10),
      expenditure: parseInt(expenditure, 10),
    };

    try {
      const response = await fetch('https://backend-deploy-nu.vercel.app/pump/addamount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        alert('Amount saved successfully!');
        setTotalSale('');
        setExpenditure('');
        setDate('');  // Clear the date field
        setNetAmount(null);
      } else {
        alert('Failed to save amount');
      }
    } catch (error) {
      console.error('Error saving amount:', error);
      alert('Error saving amount');
    }
  };

  return (
    <div style={containerStyle}>
      <h2>{pumpName} Amount Section</h2>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}  // Handle date input
        style={inputStyle}
      />
      <input
        type="number"
        placeholder="Enter Total Sale"
        value={totalSale}
        onChange={(e) => setTotalSale(e.target.value)}
        style={inputStyle}
      />
      <input
        type="number"
        placeholder="Enter Expenditure"
        value={expenditure}
        onChange={(e) => setExpenditure(e.target.value)}
        style={inputStyle}
      />
      <button onClick={calculateNetAmount} style={buttonStyle}>Calculate Net Amount</button>
      {netAmount !== null && <div style={{ marginTop: '20px', fontWeight: 'bold' }}>Net Amount: {netAmount}</div>}
      <button onClick={saveAmount} style={buttonStyle}>Save Amount</button>
      <button style={backButtonStyle} onClick={goBack}>Back</button>
    </div>
  );
};



// Stock Section
const StockOptions = ({ pumpName, goBack }) => {
  const [petrolData, setPetrolData] = useState([]);
  const [dieselData, setDieselData] = useState([]);
  const [mobileOilData, setMobileOilData] = useState([]);
  
//   const handleStockUpdate = (type, date, delivery, sale) => {
//     const newEntry = {
//       date,
//       delivery: parseFloat(delivery) || 0,
//       sale: parseFloat(sale) || 0,
//       balance: 0, // This will be calculated dynamically
//       stockOriginal: 0, // Will be updated based on the previous balance
//     };

//     // Update the balance based on previous stock data
//     let updatedData = [];
//     if (type === 'Petrol') {
//       updatedData = [...petrolData];
//     } else if (type === 'Diesel') {
//       updatedData = [...dieselData];
//     } else if (type === 'Mobile Oil') {
//       updatedData = [...mobileOilData];
//     }

//     if (updatedData.length > 0) {
//       const lastEntry = updatedData[updatedData.length - 1];
//       newEntry.stockOriginal = lastEntry.balance; // Use previous balance as stockOriginal
//     } else {
//       newEntry.stockOriginal = 0; // First entry, stock original is 0
//     }

//     newEntry.balance = newEntry.stockOriginal + newEntry.delivery - newEntry.sale;

//     // Add new entry to the data array
//     if (type === 'Petrol') {
//       setPetrolData([...updatedData, newEntry]);
//     } else if (type === 'Diesel') {
//       setDieselData([...updatedData, newEntry]);
//     } else if (type === 'Mobile Oil') {
//       setMobileOilData([...updatedData, newEntry]);
//     }
//   };

const clearInputFields = (type) => {
  const fields = {
      'petrol': ['petrolDate', 'petrolDelivery', 'petrolSale'],
      'diesel': ['dieselDate', 'dieselDelivery', 'dieselSale'],
      'mobileOil': ['mobileOilDate', 'mobileOilDelivery', 'mobileOilSale']
  };

  fields[type].forEach((field) => {
      const inputElement = document.getElementById(field);
      if (inputElement) {
          inputElement.value = "";
      } else {
          console.error(`Field with id ${field} not found`);
      }
  });
};
const handleStockUpdate = async (type, date, delivery, sale) => {
  console.log('Date:', date);
  console.log('Delivery:', delivery);
  console.log('Sale:', sale);

  const pumpData = {
      name: pumpName,
      [`${type}Date`]: new Date(date),
      [`${type}Delivery`]: parseInt(delivery),
      [`${type}Sale`]: parseInt(sale)
  };

  console.log('Data sent to backend:', pumpData);  // Log the data

  try {
      const response = await fetch('https://backend-deploy-nu.vercel.app/pump/add', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(pumpData)
      });

      if (!response.ok) throw new Error('Failed to update stock');
      const result = await response.json();
      alert(`${type} stock updated successfully!`);
      clearInputFields(type);

  } catch (error) {
      alert(error.message);
  }
};


  return (
    <div style={containerStyle}>
      <h2>{pumpName} Stock Options</h2>

      {/* Petrol Section */}
      <div>
        <h3>Petrol</h3>
        <input
          type="date"
          placeholder="Enter Date"
          style={inputStyle}
          id="petrolDate"
        />
        <input
          type="number"
          placeholder="Enter Delivery (Litres)"
          style={inputStyle}
          id="petrolDelivery"
        />
        <input
          type="number"
          placeholder="Enter Sale (Litres)"
          style={inputStyle}
          id="petrolSale"
        />
        <button
          onClick={() => handleStockUpdate(
            'petrol',
            document.getElementById('petrolDate').value,
            document.getElementById('petrolDelivery').value,
            document.getElementById('petrolSale').value
          )}
          style={buttonStyle}
        >
          Update Petrol Stock
        </button>
        <div style={{ marginTop: '20px' }}>
          {petrolData.length > 0 && (
            <table style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Stock Original</th>
                  <th>Delivery (Litres)</th>
                  <th>Sale (Litres)</th>
                  <th>Balance (Litres)</th>
                </tr>
              </thead>
              <tbody>
                {petrolData.map((entry, index) => (
                  <tr key={index}>
                    <td>{entry.date}</td>
                    <td>{entry.stockOriginal}</td>
                    <td>{entry.delivery}</td>
                    <td>{entry.sale}</td>
                    <td>{entry.balance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Diesel Section */}
      <div>
        <h3>Diesel</h3>
        <input
          type="date"
          placeholder="Enter Date"
          style={inputStyle}
          id="dieselDate"
        />
        <input
          type="number"
          placeholder="Enter Delivery (Litres)"
          style={inputStyle}
          id="dieselDelivery"
        />
        <input
          type="number"
          placeholder="Enter Sale (Litres)"
          style={inputStyle}
          id="dieselSale"
        />
        <button
          onClick={() => handleStockUpdate(
            'diesel',
            document.getElementById('dieselDate').value,
            document.getElementById('dieselDelivery').value,
            document.getElementById('dieselSale').value
          )}
          style={buttonStyle}
        >
          Update Diesel Stock
        </button>
        <div style={{ marginTop: '20px' }}>
          {dieselData.length > 0 && (
            <table style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Stock Original</th>
                  <th>Delivery (Litres)</th>
                  <th>Sale (Litres)</th>
                  <th>Balance (Litres)</th>
                </tr>
              </thead>
              <tbody>
                {dieselData.map((entry, index) => (
                  <tr key={index}>
                    <td>{entry.date}</td>
                    <td>{entry.stockOriginal}</td>
                    <td>{entry.delivery}</td>
                    <td>{entry.sale}</td>
                    <td>{entry.balance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Mobile Oil Section (Updated to use packets instead of litres) */}
      <div>
        <h3>Mobile Oil</h3>
        <input
          type="date"
          placeholder="Enter Date"
          style={inputStyle}
          id="mobileOilDate"
        />
        <input
          type="number"
          placeholder="Enter Delivery (Packets)"  // Updated to 'Packets'
          style={inputStyle}
          id="mobileOilDelivery"
        />
        <input
          type="number"
          placeholder="Enter Sale (Packets)"  // Updated to 'Packets'
          style={inputStyle}
          id="mobileOilSale"
        />
        <button
          onClick={() => handleStockUpdate(
            'mobileOil',
            document.getElementById('mobileOilDate').value,
            document.getElementById('mobileOilDelivery').value,
            document.getElementById('mobileOilSale').value
          )}
          style={buttonStyle}
        >
          Update Mobile Oil Stock
        </button>
        <div style={{ marginTop: '20px' }}>
          {mobileOilData.length > 0 && (
            <table style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Stock Original</th>
                  <th>Delivery (Packets)</th>  {/* Updated to 'Packets' */}
                  <th>Sale (Packets)</th>  {/* Updated to 'Packets' */}
                  <th>Balance (Packets)</th>  {/* Updated to 'Packets' */}
                </tr>
              </thead>
              <tbody>
                {mobileOilData.map((entry, index) => (
                  <tr key={index}>
                    <td>{entry.date}</td>
                    <td>{entry.stockOriginal}</td>
                    <td>{entry.delivery}</td>
                    <td>{entry.sale}</td>
                    <td>{entry.balance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <button onClick={goBack} style={backButtonStyle}>Back</button>
    </div>
  );
};


// Udhar Section
const UdharSection = ({ pumpName, goBack }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [savedData, setSavedData] = useState(null);

  const handleSave = async () => {
    const data = {
      Date: new Date(date),
      pumpName: pumpName,
      Name: name,
      Amount: parseInt(amount, 10),
      Description: description,
    };

    try {
      const response = await fetch('https://backend-deploy-nu.vercel.app/pump/udhar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        alert('Udhar saved successfully!');
        setSavedData(data);
        setName('');
        setDate('');
        setDescription('');
        setAmount('');
      } else {
        alert('Failed to save udhar');
      }
    } catch (error) {
      console.error('Error saving udhar:', error);
      alert('Error saving udhar');
    }
  };

  return (
    <div style={containerStyle}>
      <h2>{pumpName} Udhar Section</h2>
      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={inputStyle}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={inputStyle}
      />
      <textarea
        placeholder="Enter Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ ...inputStyle, height: '100px' }}
      />
      <input
        type="number"
        placeholder="Enter Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={inputStyle}
      />
      <button onClick={handleSave} style={buttonStyle}>Save Udhar Info</button>
      {savedData && (
        <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
          <p><strong>Name:</strong> {savedData.name}</p>
          <p><strong>Date:</strong> {savedData.date}</p>
          <p><strong>Description:</strong> {savedData.description}</p>
          <p><strong>Amount:</strong> {savedData.amount}</p>
        </div>
      )}
      <button style={backButtonStyle} onClick={goBack}>Back</button>
    </div>
  );
};


// Pump Options (Stock, Amount, Udhar)
const PumpOptions = ({ pumpName, goBack }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  if (selectedOption === 'Stock') {
    return <StockOptions pumpName={pumpName} goBack={() => setSelectedOption(null)} />;
  } else if (selectedOption === 'Amount') {
    return <AmountSection pumpName={pumpName} goBack={() => setSelectedOption(null)} />;
  } else if (selectedOption === 'Udhar') {
    return <UdharSection pumpName={pumpName} goBack={() => setSelectedOption(null)} />;
  }

  return (
    <div style={containerStyle}>
      <h2>{pumpName} Options</h2>
      <button onClick={() => setSelectedOption('Stock')} style={buttonStyle}>Stock</button>
      <button onClick={() => setSelectedOption('Amount')} style={buttonStyle}>Amount</button>
      <button onClick={() => setSelectedOption('Udhar')} style={buttonStyle}>Udhar</button>
      <button onClick={goBack} style={backButtonStyle}>Back</button>
    </div>
  );
};

// Main Component
const PumpSelection = () => {
  const [mainOption, setMainOption] = useState(null);
  const [selectedPump, setSelectedPump] = useState(null);
  const navigate = useNavigate();
  const dashboard=() => {
    navigate('/dashboard');
  }
  const goBackToMain = () => {
    setMainOption(null);
    setSelectedPump(null);
  };

  const goBackToPumpSelection = () => {
    setSelectedPump(null);
  };

  return (
    <div style={containerStyle}>
      <h1>RAI PETROL PUMP</h1>

      {mainOption === null ? (
        <>
          <button onClick={() => setMainOption('Pump Selection')} style={buttonStyle}>Pump Selection</button>
          <button onClick={() => setMainOption('Balance')} style={buttonStyle}>Balance</button>
          <button onClick={dashboard} style={buttonStyle}>Dashboard</button>
        </>
      ) : mainOption === 'Balance' ? (
        <Balance goBack={goBackToMain} />
      ) : selectedPump === null ? (
        <>
          <button onClick={() => setSelectedPump('Salarwala')} style={buttonStyle}>Salarwala</button>
          <button onClick={() => setSelectedPump('Bhalair')} style={buttonStyle}>Bhalair</button>
          <button onClick={() => setSelectedPump('Chak Jhumra')} style={buttonStyle}>Chak Jhumra</button>
          <button onClick={goBackToMain} style={backButtonStyle}>Back</button>
        </>
      ) : (
        <PumpOptions pumpName={selectedPump} goBack={goBackToPumpSelection} />
      )}
    </div>
  );
};

// Shared Styles for Vertical Orientation
const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: '#f2f2f2',
};

const buttonStyle = {
  padding: '15px 30px',
  margin: '10px 0',
  fontSize: '16px',
  backgroundColor: '#3498db',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  width: '200px',
};

const backButtonStyle = {
  padding: '15px 30px',
  marginTop: '20px',
  fontSize: '16px',
  backgroundColor: '#e74c3c',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  width: '200px',
};

const inputStyle = {
  padding: '10px',
  margin: '10px 0',
  width: '200px',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

export default PumpSelection;
