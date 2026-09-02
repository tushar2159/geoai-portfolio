
const filters = [...document.querySelectorAll('.filter')];
const projects = [...document.querySelectorAll('.project-card')];

filters.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;

    filters.forEach(x =>
      x.classList.toggle('active', x === btn)
    );

    projects.forEach(card => {
      card.classList.toggle(
        'hidden',
        filter !== 'all' && card.dataset.category !== filter
      );
    });
  });
});


const caseStudies = {

  "farm-boundary": {
    title: "Farm Boundary Detection",
    summary:
      "A GeoAI workflow for converting satellite or aerial imagery into clean, GIS-ready agricultural field boundaries.",

    objective:
      "Automatically detect individual agricultural fields from imagery and transform raw model predictions into usable vector polygons for spatial analysis.",

    approach:
      "Imagery is standardized and tiled before being passed through a semantic segmentation model. The probability mask is thresholded and converted into vector geometries. Geospatial post-processing removes noise, closes small gaps, simplifies boundaries and applies topology checks before final export.",

    workflow: [
      "Imagery ingestion & normalization",
      "Spatial tiling / patch generation",
      "Semantic segmentation inference",
      "Probability-mask thresholding",
      "Raster-to-vector conversion",
      "Polygon cleaning & topology validation",
      "GIS-ready boundary export"
    ],

    stack: [
      "Python",
      "PyTorch",
      "Rasterio",
      "GeoPandas",
      "OpenCV",
      "Shapely",
      "GDAL",
      "QGIS"
    ],

    output:
      "Clean farm-boundary polygons that can support crop monitoring, field analytics, statistics, spatial indexing and downstream GeoAI applications."
  },


  "crop-intelligence": {
    title: "Crop Intelligence Dashboard",
    summary:
      "A field-level spatial intelligence interface combining Earth-observation signals, geospatial layers and temporal analytics.",

    objective:
      "Transform multi-date satellite observations into an interpretable field-level monitoring experience rather than exposing users to raw raster data.",

    approach:
      "Farm geometries act as the primary spatial unit. Satellite observations are processed into temporal indicators and summarized at field level. Backend APIs provide normalized spatial and time-series information while the frontend presents map layers, crop signals and contextual summaries.",

    workflow: [
      "Farm / AOI ingestion",
      "Satellite scene discovery",
      "Cloud & quality screening",
      "Spectral-index generation",
      "Field-level zonal statistics",
      "Temporal trend analysis",
      "API delivery",
      "Interactive map visualization"
    ],

    stack: [
      "Python",
      "Sentinel-1",
      "Sentinel-2",
      "GeoPandas",
      "Rasterio",
      "FastAPI",
      "PostGIS",
      "AWS"
    ],

    output:
      "A scalable spatial monitoring pattern that converts Earth-observation data into understandable field-level insights and decision-support layers."
  },


  "spatial-assistant": {
    title: "Multilingual Spatial Assistant",
    summary:
      "An LLM-powered architecture for interacting with spatial data, analytical services and domain knowledge through natural language.",

    objective:
      "Allow users to ask contextual questions about farms, imagery and analytical results without requiring direct interaction with GIS tools or complex APIs.",

    approach:
      "User queries pass through language-aware intent processing before relevant knowledge and spatial context are retrieved. A retrieval layer supplies grounded information while tool-routing logic can invoke analytical APIs. The LLM synthesizes the retrieved context and tool outputs into a user-friendly response.",

    workflow: [
      "Natural-language query",
      "Language & intent understanding",
      "Context / metadata retrieval",
      "RAG knowledge retrieval",
      "Spatial tool selection",
      "API / analytical execution",
      "Grounded LLM response",
      "Multilingual delivery"
    ],

    stack: [
      "Python",
      "LLMs",
      "RAG",
      "Vector Search",
      "FastAPI",
      "Tool Calling",
      "Multi-Agent Systems",
      "AWS"
    ],

    output:
      "A conversational interface capable of connecting users with spatial knowledge, analytical results and geospatial workflows through natural-language interaction."
  },


  "satellite-pipeline": {
    title: "Satellite Analytics Pipeline",
    summary:
      "A reusable cloud-oriented architecture for taking geospatial data from acquisition through preprocessing, inference and API-ready delivery.",

    objective:
      "Build repeatable geospatial processing workflows that can handle satellite imagery without coupling model logic directly to data acquisition or application layers.",

    approach:
      "The architecture separates imagery discovery, preprocessing, model inference, geospatial post-processing and serving. Configuration-driven components make individual stages replaceable while metadata and validation steps maintain reproducibility throughout the workflow.",

    workflow: [
      "AOI request",
      "Imagery catalogue search",
      "Acquisition & caching",
      "Preprocessing / reprojection",
      "Feature generation",
      "Model inference",
      "Spatial post-processing",
      "Validation",
      "Object storage",
      "API delivery"
    ],

    stack: [
      "Python",
      "GDAL",
      "Rasterio",
      "GeoPandas",
      "PyTorch",
      "FastAPI",
      "AWS S3",
      "Docker"
    ],

    output:
      "A modular GeoAI processing architecture capable of supporting repeatable satellite-based analytics and downstream application integration."
  },


  "segmentation-models": {
    title: "GeoAI Segmentation Models",
    summary:
      "Deep-learning architectures for converting Earth-observation imagery into structured pixel-level spatial information.",

    objective:
      "Identify land-cover classes, agricultural structures or other spatial features directly from multi-band imagery at pixel level.",

    approach:
      "Multi-band imagery and aligned segmentation masks are prepared as training patches. A configurable encoder-decoder model learns spatial and spectral representations. Validation uses segmentation metrics and visual QA, followed by tiled inference and geospatial reconstruction for large-area prediction.",

    workflow: [
      "Multi-band dataset preparation",
      "Image / mask alignment validation",
      "Training / validation split",
      "Patch sampling",
      "Encoder-decoder model training",
      "Loss & metric monitoring",
      "Visual QA",
      "Tiled inference",
      "Prediction mosaicking",
      "GIS layer generation"
    ],

    stack: [
      "Python",
      "PyTorch",
      "SegFormer",
      "U-Net",
      "Rasterio",
      "NumPy",
      "GeoPandas",
      "Computer Vision"
    ],

    output:
      "Pixel-level prediction layers and GIS-ready spatial products suitable for land-cover mapping, feature extraction and automated Earth-observation analysis."
  }
};


const dialog = document.getElementById("caseDialog");
const modalTitle = document.getElementById("modalTitle");
const modalSummary = document.getElementById("modalSummary");
const modalObjective = document.getElementById("modalObjective");
const modalApproach = document.getElementById("modalApproach");
const modalWorkflow = document.getElementById("modalWorkflow");
const modalStack = document.getElementById("modalStack");
const modalOutput = document.getElementById("modalOutput");


document.querySelectorAll(".case-btn").forEach(btn => {

  btn.addEventListener("click", () => {

    const caseStudy = caseStudies[btn.dataset.case];

    if (!caseStudy) return;

    modalTitle.textContent = caseStudy.title;
    modalSummary.textContent = caseStudy.summary;
    modalObjective.textContent = caseStudy.objective;
    modalApproach.textContent = caseStudy.approach;
    modalOutput.textContent = caseStudy.output;

    modalWorkflow.innerHTML = caseStudy.workflow
      .map(
        (step, index) =>
          `<div class="workflow-step">
             <span>${String(index + 1).padStart(2, "0")}</span>
             <p>${step}</p>
           </div>`
      )
      .join("");

    modalStack.innerHTML = caseStudy.stack
      .map(item => `<span>${item}</span>`)
      .join("");

    dialog.showModal();
  });

});


document
  .getElementById("closeDialog")
  .addEventListener("click", () => dialog.close());


dialog.addEventListener("click", e => {
  if (e.target === dialog) dialog.close();
});
