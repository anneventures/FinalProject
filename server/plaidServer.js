const port = 4002

import express from 'express'

import plaid from 'plaid'

import util from 'util'





const CLIENT_ID = '5bccf13344fc260011e054b9';
const SECRET = '1ed5257d83985b9fa3b21a8456745f';
const PUBLIC_KEY = '0041305fbda5475f0b057587d99cff';
const ENV = 'sandbox';

var client = new plaid.Client(
  CLIENT_ID,
  SECRET,
  PUBLIC_KEY,
  plaid.environments[ENV],
);