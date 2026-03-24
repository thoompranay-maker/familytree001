// STEP 1: Create SVG
const width = 1000;
const height = 600;

const svg = d3.select("#tree-container")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", "translate(50,50)");


// STEP 2: Convert data to hierarchy
const root = d3.hierarchy(familyData);

// STEP 3: Create tree layout
const treeLayout = d3.tree().size([width - 200, height - 100]);

treeLayout(root);


// STEP 4: Draw links
svg.selectAll(".link")
  .data(root.links())
  .enter()
  .append("path")
  .attr("fill", "none")
  .attr("stroke", "#999")
  .attr("stroke-width", 2)
  .attr("d", d3.linkVertical()
    .x(d => d.x)
    .y(d => d.y)
  );


// STEP 5: Draw nodes

const nodes = svg.selectAll(".node")
  .data(root.descendants())
  .enter()
  .append("foreignObject")
  .attr("width", 140)
  .attr("height", 100)
  .attr("x", d => d.x - 70)
  .attr("y", d => d.y - 50)
  .html(d => `
    <div class="card">
      <img src="${d.data.image}" />
      <div class="name">${d.data.name}</div>
    </div>
  `);
