const fs = require("fs")

fs.readdirSync("docs", {
  recursive: true
}).forEach((file) => {
  if (file.endsWith(".md")) {
    const content = fs.readFileSync(`docs/${file}`, "utf8")
    const newContent = content
      .replaceAll("(../README.md)", "(../../README.md)")
      .replaceAll("(README.md)", "(../README.md)")
    fs.writeFileSync(`docs/${file}`, newContent, "utf8")
  }
}
)
fs.rmSync("docs/README.md")
