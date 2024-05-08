const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Define arrays of os and cpu values
const osValues = ['darwin', 'linux', 'win32', 'aix', 'freebsd', 'openbsd', 'sunos', 'android'];
const cpuValues = ['x64', 'arm', 'arm64', 'ia32', 'mips', 'mipsel', 'ppc', 'ppc64', 's390', 's390x'];

/**
 * Creates a directory with package.json and index.js for the given name and value, and publishes it.
 */
function createAndPublishPackage(dirName, value, type) {
  const dirPath = path.join(__dirname, dirName);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  // Create package.json file
  const pkgJson = {
    name: dirName,
    version: "1.0.0",
    main: "index.js",
    scripts: {
      test: `echo "Error: no test specified" && exit 1`
    },
    os: type === 'os' ? [value] : undefined,
    cpu: type === 'cpu' ? [value] : undefined
  };
  fs.writeFileSync(path.join(dirPath, 'package.json'), JSON.stringify(pkgJson, null, 2));

  // Create index.js file
  const indexJsContent = `console.log("This package is for ${type} of value ${value}");`;
  fs.writeFileSync(path.join(dirPath, 'index.js'), indexJsContent);

  // Navigate to the directory and publish the package
  try {
    process.chdir(dirPath);
    console.log(`Publishing ${dirName}...`);
    execSync('npm publish --access public', { stdio: 'inherit' });
    console.log(`${dirName} published successfully.`);
  } catch (error) {
    console.error(`Failed to publish ${dirName}: ${error}`);
  } finally {
    process.chdir(__dirname); // Navigate back to the original directory
  }
}

// Create and publish packages for each os value
osValues.forEach(osValue => {
  const packageName = `@envio-dev/test-os-package-${osValue}`;
  createAndPublishPackage(packageName, osValue, 'os');
});

// Create and publish packages for each cpu value
cpuValues.forEach(cpuValue => {
  const packageName = `@envio-dev/test-cpu-package-${cpuValue}`;
  createAndPublishPackage(packageName, cpuValue, 'cpu');
});

console.log('All packages created and published successfully.');

