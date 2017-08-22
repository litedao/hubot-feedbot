// Description
//   A hubot script that does the things
//
// Configuration:
//   LIST_OF_ENV_VARS_TO_SET
//
// Commands:
//   hubot about - bot info
//   hubot balance <address> - show balance of <address> in ETH
//   hubot price - show current medianizer price
//
// Notes:
//   <optional notes required for the script>
//
// Author:
//   Mariano Conti <nanexcool@gmail.com>

const moment = require('moment');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

const EXPIRATION_CHECK_INTERVAL = 1000 * 60 * 30; // milliseconds
const EXPIRATION_ALERT_THRESHOLD = 60 * 30; //seconds
const BALANCE_ALERT_THERSHOLD = 0.1;
const BALANCE_CHECK_INTERVAL = 1000 * 60 * 30;
const ECHO_PRICE = false;

const data = require('./data/feeds.json');

const alerts = {};


var abiCache = [{ "constant": false, "inputs": [{ "name": "owner_", "type": "address" }], "name": "setOwner", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "wut", "type": "bytes32" }], "name": "poke", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "read", "outputs": [{ "name": "", "type": "bytes32" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "peek", "outputs": [{ "name": "", "type": "bytes32" }, { "name": "", "type": "bool" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "authority_", "type": "address" }], "name": "setAuthority", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "wut", "type": "bytes32" }, { "name": "Zzz", "type": "uint128" }], "name": "prod", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "zzz", "outputs": [{ "name": "", "type": "uint128" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "void", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "authority", "outputs": [{ "name": "", "type": "address" }], "payable": false, "type": "function" }, { "anonymous": true, "inputs": [{ "indexed": true, "name": "sig", "type": "bytes4" }, { "indexed": true, "name": "guy", "type": "address" }, { "indexed": true, "name": "foo", "type": "bytes32" }, { "indexed": true, "name": "bar", "type": "bytes32" }, { "indexed": false, "name": "wad", "type": "uint256" }, { "indexed": false, "name": "fax", "type": "bytes" }], "name": "LogNote", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "authority", "type": "address" }], "name": "LogSetAuthority", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "owner", "type": "address" }], "name": "LogSetOwner", "type": "event" }];
var abiMedianizer = [{ "constant": false, "inputs": [{ "name": "owner_", "type": "address" }], "name": "setOwner", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "", "type": "bytes32" }], "name": "poke", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "poke", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "compute", "outputs": [{ "name": "", "type": "bytes32" }, { "name": "", "type": "bool" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "wat", "type": "address" }], "name": "set", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "wat", "type": "address" }], "name": "unset", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "indexes", "outputs": [{ "name": "", "type": "bytes12" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "next", "outputs": [{ "name": "", "type": "bytes12" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "read", "outputs": [{ "name": "", "type": "bytes32" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "peek", "outputs": [{ "name": "", "type": "bytes32" }, { "name": "", "type": "bool" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "bytes12" }], "name": "values", "outputs": [{ "name": "", "type": "address" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "min_", "type": "uint96" }], "name": "setMin", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "authority_", "type": "address" }], "name": "setAuthority", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "void", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "pos", "type": "bytes12" }, { "name": "wat", "type": "address" }], "name": "set", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "authority", "outputs": [{ "name": "", "type": "address" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "pos", "type": "bytes12" }], "name": "unset", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "next_", "type": "bytes12" }], "name": "setNext", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "min", "outputs": [{ "name": "", "type": "uint96" }], "payable": false, "type": "function" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "val", "type": "bytes32" }], "name": "LogValue", "type": "event" }, { "anonymous": true, "inputs": [{ "indexed": true, "name": "sig", "type": "bytes4" }, { "indexed": true, "name": "guy", "type": "address" }, { "indexed": true, "name": "foo", "type": "bytes32" }, { "indexed": true, "name": "bar", "type": "bytes32" }, { "indexed": false, "name": "wad", "type": "uint256" }, { "indexed": false, "name": "fax", "type": "bytes" }], "name": "LogNote", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "authority", "type": "address" }], "name": "LogSetAuthority", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "owner", "type": "address" }], "name": "LogSetOwner", "type": "event" }];

var medAddress = '0x729d19f657bd0614b4985cf1d82531c67569197b';

var med = web3.eth.contract(abiMedianizer).at(medAddress);

var cache = web3.eth.contract(abiCache);

const toEtherscan = (address) => `https://etherscan.io/address/${address}`

const randomError = [
  'Oops, something went wrong! @mariano.conti get on it quick!',
  'There\'s been an error. Paging @mariano.conti'
]

module.exports = (robot) => {

  robot.respond(/about/, res => {
    res.send(`"What is my purpose?" "You read feeds." "...Oh my god."
    Send suggestions to \`mariano.conti\`
    https://github.com/makerdao/hubot-feedbot`);
  });

  robot.respond(/balance(?:\s+(.*))?$/i, res => {
    if (res.match[1]) {
      const address = res.match[1].trim();
      getBalance(address)
        .then(balance => res.reply(`${web3.fromWei(balance)} ETH`))
        .catch(error => res.reply(`${error}`));
    } else {
      res.reply('HINT: try `feedbot balance <address>`');
    }
  });

  robot.respond(/price/i, res => {
    med.read((error, price) => {
      if (!error) {
        res.reply(`${web3.fromWei(price)} ETH/USD`);
      } else {
        res.reply(res.random(randomError));
      }
    });
  });

  // robot.respond(/(details|status|info)/i, res => {
  //   const p = [];
  //   data.forEach(x => {
  //     cache.options.address = x.cache;
  //     p.push(cache.methods.peek().call());
  //   });
  //   const response = [];
  //   Promise.all(p).then(r => {
  //     for (let i = 0; i < data.length; i++) {
  //       const value = web3.utils.fromWei(r[i][0]);
  //       const valid = r[i][1] ? ':white_check_mark:' : ':negative_squared_cross_mark:';
  //       response.push(`${valid} ${data[i].cache} Owner ${data[i].user} Price ${value}`);
  //     }
  //     res.send(response.join("\n"));
  //   })
  // });


  robot.respond(/balances/i, res => {
    const p = [];
    data.forEach(x => {
      p.push(getBalance(x.owner));
    });
    Promise.all(p).then(r => {
      const response = [];
      r.forEach(balance => {
        response.push(`${web3.fromWei(balance)} ETH`);
      });
      res.send(response.join("\n"));
    });
  });

  // med.LogNote({}, (e, r) => {
  //   if (!e && ECHO_PRICE) {
  //     med.read((e, r) => {
  //       if (!e) {
  //         var val = web3.fromWei(r);
  //         robot.messageRoom('feeds-test', val);
  //       }
  //     });
  //   }
  // });

  // setInterval(() => {
  //   c.peek((e, r) => {
  //     if (!e) {
  //       var valid = r[1];
  //       if (!valid) {
  //         //robot.messageRoom('feeds-test', 'WARNING: Feed down! Please contact @mariano.conti');
  //       }
  //     }
  //   });
  // }, 60000);


  // robot.hear(/test/, res => {
  //   var user = { user: { name: 'mariano.conti' } };
  //   robot.adapter.sendDirect(user, 'zomg!');
  //   // robot.messageRoom(user, 'zomg');
  // });


  robot.respond(/read (.*)/i, res => {
    read(c, res.match[1]).then(r => res.reply(r));
  });


  robot.respond(/toggle/i, res => {
    ECHO_PRICE = !ECHO_PRICE;
    const out = ECHO_PRICE ? 'on' : 'off';
    res.reply(`Price alerts are now ${out}.`);
  });

  checkExpirations(robot);
  checkBalances(robot);

  setInterval(() => checkExpirations(robot), EXPIRATION_CHECK_INTERVAL);
  setInterval(() => checkBalances(robot), BALANCE_CHECK_INTERVAL);
}

const read = (contract, method) => {
  return new Promise((resolve, reject) => {
    contract[method]((error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

const getBalance = (address) => {
  return new Promise((resolve, reject) => {
    web3.eth.getBalance(address, (error, result) => {
      error ? reject(error) : resolve(result);
    })
  });
}

// getBalance('0x00Cf06734732A2749f0b77dbA315Aad3A99906a0').then(console.log)

const checkExpirations = (robot) => {

  data.forEach(feed => {
    read(web3.eth.contract(abiCache).at(feed.cache), 'zzz')
      .then(result => {
        const expiration = web3.toDecimal(result);
        const now = Math.floor(Date.now() / 1000);
        const diff = expiration - now;
        if (diff <= 0) {
          // expired
        } else if (diff < EXPIRATION_ALERT_THRESHOLD) {
          if (!alerts[feed.cache]) {
            const formatted = moment.duration(diff, 'seconds').humanize(true);
            const output = `Heads up! Feed ${toEtherscan(feed.cache)} expires ${formatted}`;
            var user = { user: { name: 'mariano.conti' } };
            robot.adapter.sendDirect(user, output);
            alerts[feed.cache] = true;
          }
        } else {
          alerts[feed.cache] = false;
        }
      })
  });
}

const checkBalances = (robot) => {
  data.forEach(feed => {
    getBalance(feed.owner)
      .then(balance => {
        if (web3.fromWei(balance) < BALANCE_ALERT_THERSHOLD) {
          if (!alerts[feed.owner]) {
            const output = `Heads up! Balance for your account ${toEtherscan(feed.owner)} is running low`;
            var user = { user: { name: 'mariano.conti' } };
            robot.adapter.sendDirect(user, output);
            alerts[feed.owner] = true;
          }
        } else {
          alerts[feed.owner] = false;
        }
      })
      .catch(error => console.log(`${error}`));
  });
}

