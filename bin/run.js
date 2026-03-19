#!/usr/bin/env node
const { execSync } = require('child_process');
console.log("Starting Student Placement System...");
execSync('node backend/server.js', { stdio: 'inherit' });
