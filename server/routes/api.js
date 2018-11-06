import uuid from 'uuid';
import sha256 from 'sha256'
import crypto from 'crypto'
import bcrypt from 'bcrypt'

const db_name = 'budget_db'

// Connection URL
import MongoDbHelper from './MongoDbHelper';
let url = 'mongodb://localhost:27017/'+db_name;
let mongoDbHelper = new MongoDbHelper(url);

const API_KEY = '__api_key__'

//global user ID set on login//
var loggedInID;

// start connection
mongoDbHelper.start(() => {
  console.log("mongodb ready")
});

// generate random string
function makeid (count) {
  if (!count){
    count = 5;
  }

  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for( var i=0; i < count; i++ )
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

// index
exports.echo = (req, res) => {

  const { login_token } = req.session

  res.json({
    status: 'OK',
    login_token: login_token
  });
}

// create user
exports.create_user = (req, res) => {

  let password =  req.body.password;
  let email =  req.body.email;
  let api_key =  req.headers.authorization

  if (api_key !== API_KEY){
    res.json({ status: 'error', detail: 'api key is invalid' });
    return;
  }

  let user_info = {}
  let login_token

  let find_param = {
    'emails.address':email
  }
  mongoDbHelper.collection("users").count(find_param)
  .then((results) => {
    return new Promise((resolve, reject) => {
      if (results != 0){
        reject("user already exist")
      }
      resolve()
    })
  })
  .then(() => {
    // bcrypt of password
    let password2 = sha256(password)
    var bcrypt_hash = bcrypt.hashSync(password2, 10);

    // login token which to use login
    login_token = makeid('4') + parseInt(new Date().getTime()).toString(36);
    const hashed_token = crypto.createHash('sha256').update(login_token).digest('base64');

    const token_object = {
      'when':new Date(),
      'hashedToken':hashed_token,
    };

    let insert_params = {
      createdAt: new Date(),
      services:{
        password : {
          bcrypt : bcrypt_hash
        },
        resume : {
          loginTokens : [token_object]
        },
        email : {
          verificationTokens : [
            {
              // nameHash : nameHash,
              address : email,
              when : new Date(),
            }
          ]
        },
      },
      emails : [
        {
          "address" : email,
          "verified" : false
        }
      ],
      profile : {},
    }

    // insert
    return mongoDbHelper.collection("users").insert(insert_params)
  })
  .then((results) => {

    if ( results === null ) {
      res.json({ status: 'error', detail: 'no such user' });
      return;
    }

    user_info._id = results._id;
    loggedInID = results._id;
    user_info.profile = results.profile;

    // req.session.userId = user_info._id
    req.session.login_token = login_token // maybe not necessary

    res.json({
      status: 'success',
      user: user_info,
      login_token: login_token,
    })

  })
  .catch((err) => {
    res.json({ status: 'error', detail: err });
  })
}

// login with email and password
exports.login_with_email_password = (req, res) => {

  let password =  req.body.password;
  let email =  req.body.email;
  let api_key =  req.headers.authorization

  if (api_key !== API_KEY){
    res.json({ status: 'error', detail: 'api key is invalid 2' });
    return;
  }

  let find_param = {
    'emails.address':email
  }

  let user_info = {};
  let login_token

  // insert
  mongoDbHelper.collection("users").findOne(find_param)
  .then((results) => {
    // check password

    return new Promise( (resolve, reject) => {

      if (!results){
        reject("no such user")
      }
      if (!results.services || !results.services.password || !results.services.password.bcrypt){
        reject("something must be wrong")
      }

      // set user info
      user_info._id = results._id;
      loggedInID = results._id
      user_info.profile = results.profile;

      let password2 = sha256(password)

      const saved_hash = results.services.password.bcrypt

      bcrypt.compare(password2, saved_hash, (err, res) => {
        if (err){
          reject(err)
        }

        if (res === true){
          resolve()
        } else {
          reject("password is not valid")
        }
      });
    } )
  })
  .then(() => {
    // issue token

    let find_param = {
      _id: user_info._id
    }

    // login token
    login_token = makeid('4') + parseInt(new Date().getTime()).toString(36);
    const hashed_token = crypto.createHash('sha256').update(login_token).digest('base64');

    const token_object = {
      'when':new Date(),
      'hashedToken':hashed_token,
    };

    let upd_param = {
      '$push':{
        'services.resume.loginTokens':token_object
      }
    };

    // update
    return mongoDbHelper.collection("users").update(find_param, upd_param)
  })
  .then((results) => {

    // set session
    req.session.login_token

    res.json({
      status: 'success',
      user: user_info,
      login_token: login_token,
    })

  })
  .catch((err) => {
    res.json({status: 'error', detail: err})
  })
}

// logout
exports.logout = (req, res) => {

  // let login_token = req.body.login_token;
  let login_token = req.session.login_token;
  if (!login_token){
    // user is not login
    res.json({status: 'success'})
    return;
  }

  let api_key =  req.headers.authorization


  if (api_key !== API_KEY){
    res.json({ status: 'error', detail: 'api key is invalid' });
    return;
  }

  const hashed_token = crypto.createHash('sha256').update(login_token).digest('base64');
  let find_param = {
    'services.resume.loginTokens':{
      '$elemMatch':{
        'hashedToken':hashed_token
      }
    }
  }

  // find user
  mongoDbHelper.collection("users").findOne(find_param)
  .then((results) => {

    if (results === null){
      return Promise.reject("no such token")
    }

    let find_param = {
      '_id':results._id
    };
    var upd_param = {
      '$pull':{
        'services.resume.loginTokens':{
          'type':'ios'
        }
      }
    };
    return mongoDbHelper.collection("users").update(find_param, upd_param)
  })
  .then(() => {
    return new Promise((resolve, reject) => {

    })
    req.session.destroy((err) => {
      if (err) {
        reject(err)
      }
      resolve()
    })
  })
  .then(() => {
    res.json({status: 'success'})
  })
  .catch((err) => {
     res.json({status: 'error', detail: err})
  })
}

// login_with_token
exports.login_with_token = (req, res) => {

  let login_token =  req.body.login_token;
  let api_key =  req.headers.authorization

  if (api_key !== API_KEY){
    res.json({ status: 'error', detail: 'api key is invalid' });
    return;
  }

  let user_info = {};

  const hashed_token = crypto.createHash('sha256').update(login_token).digest('base64');
  let find_param = {
    'services.resume.loginTokens':{
      '$elemMatch':{
        'hashedToken':hashed_token
      }
    }
  }

  // find user
  mongoDbHelper.collection("users").findOne(find_param)
  .then((results) => {
    // set user info

    if ( results === null ) {
      res.json({ status: 'error', detail: 'no such user' });
      return;
    }

    user_info._id = results._id;
    user_info.profile = results.profile;

    // set session
    req.session.login_token

    // return success
    res.json({
      status: 'success',
      user: user_info,
      login_token: login_token,
    })
  })
  .catch((err) => {
    res.json({status: 'error', detail: err})
    console.log("err:", err)
  })
}

exports.set_income = (req, res) => {
  let income = req.body.income

  let find_param = {_id: loggedInID}

  let upd_param = {
    '$push': {
      'income': income
    }
  }
  // update
  mongoDbHelper.collection("users").update(find_param, upd_param)

    .catch((err) => {
      res.json({status: 'error', detail: err})
  })

}

exports.set_expenses = (req, res) => {
  let housing =  req.body.housing;
  let utilities = req.body.utilities;
  let transportation = req.body.transportation;
  let food = req.body.food;
  let entertainment = req.body.entertainment;
  let debt = req.body.debt;
  let personal =  req.body.personal;
  let savings= req.body.savings;
  let expenses = {
    'housing': housing,
    'utilities': utilities,
    'transportation': transportation,
    'food': food,
    'entertainment': entertainment,
    'debt': debt,
    'personal': personal,
    'savings': savings
  }

  let find_param = {_id: loggedInID};

  let upd_param = {
    '$push':{
      'expenses': expenses
    }
  }
 
  // update
  mongoDbHelper.collection("users").update(find_param, upd_param)

    .catch((err) => {
      res.json({status: 'error', detail: err})
  })
}

//START PLAID API
import plaid from 'plaid'
import util from 'util'
import moment from 'moment'

var PLAID_CLIENT_ID = '5bccf13344fc260011e054b9';
var PLAID_SECRET = '1ed5257d83985b9fa3b21a8456745f';
var PLAID_PUBLIC_KEY = '0041305fbda5475f0b057587d99cff';
var PLAID_ENV = 'sandbox';

var ACCESS_TOKEN = null;
var PUBLIC_TOKEN = null;
var ITEM_ID = null;

var client = new plaid.Client(
  PLAID_CLIENT_ID,
  PLAID_SECRET,
  PLAID_PUBLIC_KEY,
  plaid.environments[PLAID_ENV],
  {version: '2018-05-22'}

  
);


exports.get_access_token = (req, res) => {
  PUBLIC_TOKEN = req.body.public_token;
  client.exchangePublicToken(PUBLIC_TOKEN, function(error, tokenResponse) {
    if(error != null) {
      console.log(error);
      return res.json({
        error: error,
        message: "here"
      });
    }
    ACCESS_TOKEN = tokenResponse.access_token;
    ITEM_ID = tokenResponse.item_id;
    console.log(tokenResponse);
    res.json({
      access_token: ACCESS_TOKEN,
      item_id: ITEM_ID,
      error: null
    });
  });
}


