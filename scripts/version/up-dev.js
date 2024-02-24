const fs = require("fs")

// Path to your package.json file
const packageJsonPath = "package.json"

// Read package.json file
fs.readFile(packageJsonPath, "utf8", function(err, data) {
  if (err) {
    return console.log("Error reading package.json:", err)
  }

  // Parse the package.json content
  const packageObj = JSON.parse(data)

  // Extract the current version and increment the dev version
  const versionMatch = packageObj.version.match(/(.*-dev)(\d+)$/)
  if (versionMatch) {
    const baseVersion = versionMatch[1] // e.g., "0.0.1-dev"
    const devVersion = parseInt(versionMatch[2], 10) + 1 // increment dev version
    packageObj.version = `${baseVersion}${devVersion}` // e.g., "0.0.1-dev17"

    // Write the updated package.json back
    fs.writeFile(packageJsonPath, JSON.stringify(packageObj, null, 2), "utf8", function(err) {
      if (err) return console.log("Error writing package.json:", err)
      console.log("package.json version updated to:", packageObj.version)
    })
  } else {
    console.log("No matching dev version found in package.json")
  }
})
