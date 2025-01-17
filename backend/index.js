const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const prisma = new PrismaClient();
const app = express();
app.use(bodyParser.json());
app.use(cors());
// Helper function for error handling
const handleError = (res, error) => res.status(500).json({ error: error.message });

// Routes for `Pump`
app.post('/pumps', async (req, res) => {
  try {
    const pump = await prisma.pump.create({
      data: {
        name: req.body.name,
        petrolDate: req.body.petrolDate ? new Date(req.body.petrolDate) : null,
        petrolDelivery: req.body.petrolDelivery || 0,
        petrolSale: req.body.petrolSale || 0,
        dieselDate: req.body.dieselDate ? new Date(req.body.dieselDate) : null,
        dieselDelivery: req.body.dieselDelivery || 0,
        dieselSale: req.body.dieselSale || 0,
        mobileOilDate: req.body.mobileOilDate ? new Date(req.body.mobileOilDate) : null,
        mobileOilDelivery: req.body.mobileOilDelivery || 0,
        mobileOilSale: req.body.mobileOilSale || 0
      }
    });
    res.status(201).json(pump);
  } catch (error) {
    console.error("Error creating pump:", error);
    res.status(500).json({ error: error.message });
  }
});


app.get('/pumps', async (req, res) => {
  const pumpNames = ['Salarwala', 'Bhalair', 'Chak Jhumra']; // List of pump names to fetch data for

  try {
    // Query the database for all pumps with the specified names
    const pumps = await prisma.pump.findMany({
      where: {
        name: {
          in: pumpNames,
        },
      },
    });

    if (pumps.length > 0) {
      // Group the pumps by their name
      const groupedPumps = pumpNames.map((name) => {
        const pumpData = pumps.filter((pump) => pump.name === name);
        // Remove fields with null or 0 values from each pump object
        const filteredPumpData = pumpData.map((pump) => {
          return Object.fromEntries(
            Object.entries(pump).filter(([_, value]) => value !== null && value !== 0)
          );
        });
        return {
          name,
          data: filteredPumpData,
        };
      });

      res.status(200).json(groupedPumps); // Send the grouped pump data
    } else {
      res.status(404).json({ message: 'No pump data found' }); // No pumps found
    }
  } catch (error) {
    console.error('Error fetching pump data:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message }); // Handle unexpected errors
  }
});



app.get('/pumps/:name', async (req, res) => {
  const { name } = req.params; // Extract name from params
  try {
    // Query the database for the pump with the specified name
    const pumps = await prisma.pump.findMany({ where: { name } });

    if (pumps.length > 0) {
      // Remove fields with null or 0 values from each pump object
      const filteredPumps = pumps.map((pump) => {
        return Object.fromEntries(
          Object.entries(pump).filter(([_, value]) => value !== null && value !== 0)
        );
      });

      res.status(200).json(filteredPumps); // Send the filtered pump details
    } else {
      res.status(404).json({ message: `Pump with name "${name}" not found` }); // Pump not found
    }
  } catch (error) {
    console.error('Error fetching pump:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message }); // Handle unexpected errors
  }
});




// Routes for `Amount`
app.post('/amounts', async (req, res) => {
  try {
    const amount = await prisma.amount.create({ 
      data:{
        name: req.body.name,
        Date: req.body.date,
        totalsale: req.body.totalsale,
        expenditure: req.body.expenditure
      }
    });
    res.status(201).json(amount);
  } catch (error) {
    console.log(error);
    handleError(res, error);
  }
});

app.get('/amounts', async (req, res) => {
  try {
    const amounts = await prisma.amount.findMany();
    res.json(amounts);
  } catch (error) {
    handleError(res, error);
  }
});

app.get('/amounts/:id', async (req, res) => {
  try {
    const amount = await prisma.amount.findUnique({ where: { id: req.params.id } });
    amount ? res.json(amount) : res.status(404).json({ message: 'Amount not found' });
  } catch (error) {
    handleError(res, error);
  }
});

app.put('/amounts/:id', async (req, res) => {
  try {
    const amount = await prisma.amount.update({ where: { id: req.params.id }, data: req.body });
    res.json(amount);
  } catch (error) {
    handleError(res, error);
  }
});

app.delete('/amounts/:id', async (req, res) => {
  try {
    await prisma.amount.delete({ where: { id: req.params.id } });
    res.json({ message: 'Amount deleted successfully' });
  } catch (error) {
    handleError(res, error);
  }
});

// Routes for `Udhar`
app.post('/udhars', async (req, res) => {
  try {
    const udhar = await prisma.udhar.create({ data: req.body });
    res.status(201).json(udhar);
  } catch (error) {
    handleError(res, error);
  }
});

app.get('/udhars', async (req, res) => {
  try {
    const udhars = await prisma.udhar.findMany();
    res.json(udhars);
  } catch (error) {
    handleError(res, error);
  }
});

app.get('/udhars/:id', async (req, res) => {
  try {
    const udhar = await prisma.udhar.findUnique({ where: { id: req.params.id } });
    udhar ? res.json(udhar) : res.status(404).json({ message: 'Udhar not found' });
  } catch (error) {
    handleError(res, error);
  }
});

app.put('/udhars/:id', async (req, res) => {
  try {
    const udhar = await prisma.udhar.update({ where: { id: req.params.id }, data: req.body });
    res.json(udhar);
  } catch (error) {
    handleError(res, error);
  }
});

app.delete('/udhars/:id', async (req, res) => {
  try {
    await prisma.udhar.delete({ where: { id: req.params.id } });
    res.json({ message: 'Udhar deleted successfully' });
  } catch (error) {
    handleError(res, error);
  }
});

// Routes for `Credit`
app.post('/credits', async (req, res) => {
  try {
    const credit = await prisma.credit.create({ data: req.body });
    res.status(201).json(credit);
  } catch (error) {
    console.log(error);
    handleError(res, error);
  }
});

app.get('/credits', async (req, res) => {
  try {
    const credits = await prisma.credit.findMany();
    res.json(credits);
  } catch (error) {
    handleError(res, error);
  }
});

app.get('/credits/:id', async (req, res) => {
  try {
    const credit = await prisma.credit.findUnique({ where: { id: req.params.id } });
    credit ? res.json(credit) : res.status(404).json({ message: 'Credit not found' });
  } catch (error) {
    handleError(res, error);
  }
});

app.put('/credits/:id', async (req, res) => {
  try {
    const credit = await prisma.credit.update({ where: { id: req.params.id }, data: req.body });
    res.json(credit);
  } catch (error) {
    handleError(res, error);
  }
});

app.delete('/credits/:id', async (req, res) => {
  try {
    await prisma.credit.delete({ where: { id: req.params.id } });
    res.json({ message: 'Credit deleted successfully' });
  } catch (error) {
    handleError(res, error);
  }
});

// Routes for `Debit`
app.post('/debits', async (req, res) => {
  try {
    const debit = await prisma.debit.create({ data: req.body });
    res.status(201).json(debit);
  } catch (error) {
    handleError(res, error);
  }
});

app.get('/debits', async (req, res) => {
  try {
    const debits = await prisma.debit.findMany();
    res.json(debits);
  } catch (error) {
    handleError(res, error);
  }
});

app.get('/debits/:id', async (req, res) => {
  try {
    const debit = await prisma.debit.findUnique({ where: { id: req.params.id } });
    debit ? res.json(debit) : res.status(404).json({ message: 'Debit not found' });
  } catch (error) {
    handleError(res, error);
  }
});

app.put('/debits/:id', async (req, res) => {
  try {
    const debit = await prisma.debit.update({ where: { id: req.params.id }, data: req.body });
    res.json(debit);
  } catch (error) {
    handleError(res, error);
  }
});

app.delete('/debits/:id', async (req, res) => {
  try {
    await prisma.debit.delete({ where: { id: req.params.id } });
    res.json({ message: 'Debit deleted successfully' });
  } catch (error) {
    handleError(res, error);
  }
});

// Start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
