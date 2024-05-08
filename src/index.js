const fs = require('fs');
const path = require('path');

/**
 * Logs the system architecture and platform.
 */
function logSystemInfo() {
  console.log(`Platform: ${process.platform}`);
  console.log(`Architecture: ${process.arch}`);
}

/**
 * Checks for the presence of optional dependency directories in node_modules.
 */
function checkDependencies() {
  const dependencies = [
    'envio-linux-x64',
    'envio-linux-arm64',
    'envio-darwin-x64',
    'envio-darwin-arm64'
  ];

  const targetDependencies = [

  ];

  console.log('\nChecking for dependency directories in node_modules:');
  dependencies.forEach(dep => {
    const depPath = path.join(__dirname, '../node_modules', dep);
    if (fs.existsSync(depPath)) {
      console.log(`Found: ${dep}`);
    } else {
      // console.log(`Not found: ${dep}`);
    }
  });

  console.log('\nChecking for dependencies that only target specific OS or CPU architectures:');
  dependencies.forEach(dep => {
    const depPath = path.join(__dirname, '../node_modules/', dep);
    if (fs.existsSync(depPath)) {
      console.log(`Found: ${dep}`);
    } else {
      // console.log(`Not found: ${dep}`);
    }
  });

}

/**
 * Main function to run diagnostics.
 */
function runDiagnostics() {
  logSystemInfo();
  checkDependencies();
}

runDiagnostics();
