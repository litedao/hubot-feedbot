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
//   hubot status - display status of all feeds
//   hubot toggle - turn price change alerts on/off
//
// Notes:
//   <optional notes required for the script>
//
// Author:
//   Mariano Conti <nanexcool@gmail.com>

const data = [
  {
    cache: '0x82e727D640826cFbE0364d52481d79d6821FA39b',
    owner: '0x00DaA9a2D88BEd5a29A6ca93e0B7d860cd1d403F',
    user: 'mariano.conti',
  },
  {
    cache: '0xf12a2E2a1a1D714D6C7dB114806411596A09B10a',
    owner: '0x5E90E067242363bE0b4004E1a60b1D877D3D5877',
    user: 'mariano.conti',
  },
  {
    cache: '0xf3C13bB0A3E6Af67ba538a4B050496d90D5d6b24',
    owner: '0xd0148Dad63F73CE6f1B6c607e3413dCF1Ff5f030',
    user: 'mariano.conti',
  },
  {
    cache: '0x0E565764FEbDf7BCAfc5aB4223a09aBBA4F9345A',
    owner: '0x238a3f4c923b75f3ef8ca3473a503073f0530801',
    user: 'james',
  },
  {
    cache: '0x16928e240Ca91DC09053B20d2b909cc29F31bf54',
    owner: '0x326bde1246c0e42d9983868665b961bca8e647f1',
    user: 'james',
   },
  {
    cache: '0x975d88b5998b73b3ecf69a5ca6b196dafdb95530',
    owner: '0xb8bb9ef0a74651d141e798856a2575e7e577e9d7',
    user: 'james',
  },
  {
    cache: '0x4817856c38c3279fa561e28Af76Fd1743F2aD73b',
    owner: '0x00Cf06734732A2749f0b77dbA315Aad3A99906a0',
    user: 'equivrel',
  },
];

var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

var abiCache = [{ "constant": false, "inputs": [{ "name": "owner_", "type": "address" }], "name": "setOwner", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "wut", "type": "bytes32" }], "name": "poke", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "read", "outputs": [{ "name": "", "type": "bytes32" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "peek", "outputs": [{ "name": "", "type": "bytes32" }, { "name": "", "type": "bool" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "authority_", "type": "address" }], "name": "setAuthority", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "wut", "type": "bytes32" }, { "name": "Zzz", "type": "uint128" }], "name": "prod", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "zzz", "outputs": [{ "name": "", "type": "uint128" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "void", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "authority", "outputs": [{ "name": "", "type": "address" }], "payable": false, "type": "function" }, { "anonymous": true, "inputs": [{ "indexed": true, "name": "sig", "type": "bytes4" }, { "indexed": true, "name": "guy", "type": "address" }, { "indexed": true, "name": "foo", "type": "bytes32" }, { "indexed": true, "name": "bar", "type": "bytes32" }, { "indexed": false, "name": "wad", "type": "uint256" }, { "indexed": false, "name": "fax", "type": "bytes" }], "name": "LogNote", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "authority", "type": "address" }], "name": "LogSetAuthority", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "owner", "type": "address" }], "name": "LogSetOwner", "type": "event" }];
var abiMedianizer = [{ "constant": false, "inputs": [{ "name": "owner_", "type": "address" }], "name": "setOwner", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "", "type": "bytes32" }], "name": "poke", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "poke", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "compute", "outputs": [{ "name": "", "type": "bytes32" }, { "name": "", "type": "bool" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "wat", "type": "address" }], "name": "set", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "wat", "type": "address" }], "name": "unset", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "indexes", "outputs": [{ "name": "", "type": "bytes12" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "next", "outputs": [{ "name": "", "type": "bytes12" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "read", "outputs": [{ "name": "", "type": "bytes32" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "peek", "outputs": [{ "name": "", "type": "bytes32" }, { "name": "", "type": "bool" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "bytes12" }], "name": "values", "outputs": [{ "name": "", "type": "address" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "min_", "type": "uint96" }], "name": "setMin", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "authority_", "type": "address" }], "name": "setAuthority", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "void", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "pos", "type": "bytes12" }, { "name": "wat", "type": "address" }], "name": "set", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "authority", "outputs": [{ "name": "", "type": "address" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "pos", "type": "bytes12" }], "name": "unset", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "next_", "type": "bytes12" }], "name": "setNext", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "min", "outputs": [{ "name": "", "type": "uint96" }], "payable": false, "type": "function" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "val", "type": "bytes32" }], "name": "LogValue", "type": "event" }, { "anonymous": true, "inputs": [{ "indexed": true, "name": "sig", "type": "bytes4" }, { "indexed": true, "name": "guy", "type": "address" }, { "indexed": true, "name": "foo", "type": "bytes32" }, { "indexed": true, "name": "bar", "type": "bytes32" }, { "indexed": false, "name": "wad", "type": "uint256" }, { "indexed": false, "name": "fax", "type": "bytes" }], "name": "LogNote", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "authority", "type": "address" }], "name": "LogSetAuthority", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "owner", "type": "address" }], "name": "LogSetOwner", "type": "event" }];

var medianizer = '0x729d19f657bd0614b4985cf1d82531c67569197b';

var contract = web3.eth.contract(abiMedianizer);
var med = contract.at(medianizer);

var c1 = web3.eth.contract(abiCache);

var count = 0;

var ECHO_PRICE = false;

module.exports = (robot) => {
  var interval = null;

  med.LogNote({}, (e, r) => {
    if (!e && ECHO_PRICE) {
      med.read((e, r) => {
        if (!e) {
          var val = web3.fromWei(r);
          robot.messageRoom('feeds-test', val);
        }
      });
    }
  });

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

  robot.respond(/status/, res => {
    data.forEach(x => {
      var c = c1.at(x.cache);
        c.peek((e, r) => {
          if (!e) {
            var val = web3.fromWei(r[0]);
            res.send(`Feed ${x.cache} Owner ${x.user} Price ${val} ${r[1] ? 'Valid' : 'INVALID'}`);
          } else {
            res.reply(e);
          }
        });
    });
  });

  robot.hear(/test/, res => {
    var user = { user: { name: 'mariano.conti' } };
    robot.adapter.sendDirect(user, 'zomg!');
    // robot.messageRoom(user, 'zomg');
  });

  robot.respond(/price/, res => {
    med.read((e, r) => {
      if (!e) {
        var val = web3.fromWei(r);
        res.reply(val);
      } else {
        res.reply(e);
      }
    });
  });

  robot.respond(/read (.*)/i, res => {
    read(c, res.match[1]).then(r => res.reply(r));
  });

  robot.respond(/about/, res => {
    res.send("I read feeds.\nSend suggestions to `mariano.conti`\nhttps://github.com/nanexcool/hubot-feedbot");
  });

  // robot.respond(/status/, res => {
  //   count++;
  //   res.send(`${res.random(random)}. (${count})`);
  // });

  robot.respond(/balance(?:\s+(.*))?$/i, res => {
    if (res.match[1]) {
      const address = res.match[1].trim();
      getBalance(res, web3, address);
    } else {
      res.reply('HINT: try `feedbot balance <address>`');
    }
  });

  robot.respond(/toggle/i, res => {
    ECHO_PRICE = !ECHO_PRICE;
    const out = ECHO_PRICE ? 'on' : 'off';
    res.reply(`Price alerts are now ${out}.`);
  });
}

const random = [
  "zomg",
  "this is not normal",
  "whatever",
  "ermagherd"
];
const createContract = (web3, abi, address) => {
  return web3.eth.contract(abi).at(address);
};

const getBalance = (res, web3, address) => {
  if (web3.isAddress(address)) {
    web3.eth.getBalance(address, (error, result) => {
      if (!error) {
        res.reply(`${web3.fromWei(result)} ETH`);
      } else {
        res.reply('Error getting balance.');
      }
    });
  } else {
    res.reply('Incorrect address.');
  }
};

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
