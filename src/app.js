const fs = require('fs');
const path = require('path');
const express = require('express');
const { accounts, users, writeJSON } = require('./data');

const app = express();
const port = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Account Summary',
    accounts: accounts,
  });
})
.get('/savings', (req, res) => {
  res.render('account', {
    account: accounts.savings,
  })
})
.get('/checking', (req, res) => {
  res.render('account', {
    account: accounts.checking,
  })
})
.get('/credit', (req, res) => {
  res.render('account', {
    account: accounts.credit,
  })
})
.get('/profile', (req, res) => {
  res.render('profile', {
    user: users[0],
  })
})
.get('/transfer', (req, res) => {
  res.render('transfer', {
  })
})
.post('/transfer', (req, res) => {
  const {from, to , amount} = req.body;
  console.log("the body", from, to, amount)
  accounts[from].balance -= parseInt(amount);
  accounts[to].balance += parseInt(amount);

  writeJSON();

  res.render('transfer', {
    message: "Transfer Completed",
  })
})
.get('/payment', (req, res) => {
  res.render('payment', {
    accounts: accounts.credit,
  })
})
.post('/payment', (req, res) => {
  const { amount } = req.body;
  accounts.credit.balance -= parseInt(amount);
  accounts.credit.available += parseInt(amount);

  writeJSON();

  res.render('payment', {
    message: "Payment Successful",
    account: accounts.credit
  })

})


app.listen(port, () => {
  console.log(`PS Project Running on port `, port);
});
