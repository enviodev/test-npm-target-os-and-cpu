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
    "test-cpu-package-arm",
    "test-cpu-package-arm64",
    "test-cpu-package-ia32",
    "test-cpu-package-mips",
    "test-cpu-package-mipsel",
    "test-cpu-package-ppc",
    "test-cpu-package-ppc64",
    "test-cpu-package-s390",
    "test-cpu-package-s390x",
    "test-cpu-package-x64",
    "test-os-package-aix",
    "test-os-package-android",
    "test-os-package-darwin",
    "test-os-package-freebsd",
    "test-os-package-linux",
    "test-os-package-openbsd",
    "test-os-package-sunos",
    "test-os-package-win32",
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
  targetDependencies.forEach(dep => {
    const depPath = path.join(__dirname, '../node_modules/@envio-dev', dep);
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
