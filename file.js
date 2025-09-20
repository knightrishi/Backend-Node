const fs=require('fs')

fs.writeFileSync("./text.txt", "Use let (or const) → safer, block-scoped, no weird hoisting issues\n Avoid var unless you’re dealing with legacy code.")

