# ARCHIVE-7

materials reference site i made for a structural engineering thing. looks like an old deep sea archive bc i thought that was cool.

theres 6 materials in it rn! steel, concrete, timber, brick, glass, aluminium. you can browse them, compare 2-3 at a time on a radar chart, see what works for different building types and look at a sortable table of physical properties.

## files

- `index.html` - this is the page that has all the sections and the nav
- `style.css` - main styles, colors, fonts, the big background
- `extend.css` - extra styles that load after that has the lighter color scheme and the project/compare/tech stuff. overrides some stuff from style.css
- `script.js` - the data (MATERIALS array), the boot screen, the dials, clicking stuff
- `extend.js` - more data, the projects, the radar chart, the table. also patches a couple functions from script.js

load order matters btw. its style.css then extend.css then script.js then extend.js and if you swap them around stuff breaks

## the nav

theres a bar at the top that looks like a pressure gauge with 5 marks on it. each one jumps to a section

- surface -> home
- compendium -> the materials list
- instrumentality -> projects (whats good for what)
- disparity -> compare 2-3 materials
- dossier -> the tech table

the names are a bit silly i know but hey i liked the vibe! the needle slides to whichever one youre on.

## fonts

loaded from google fonts via @import at the top of style.css

- cinzel - the fancy serif for headings and material names
- oswald - the main body font
- jetbrains mono - for codes, data, technical labels

if youre offline the @import just fails and it falls back to system fonts, it'd still be readable just less characterful.

## browser stuff

works on modern chrome/firefox/safari. uses css variables, backdrop-filter (the nav blur), grid, clip-path. nothing too exotic.. ie doesnt work obviously. older safari might look a bit off on the blur and the clipped shapes.



that's about it. it's a small project, mostly for fun. if you actually use this for real engineering work please talk to a licensed engineer first. the numbers here are typical/indicative values not design values!