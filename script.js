const filters=[...document.querySelectorAll('.filter')];
const projects=[...document.querySelectorAll('.project-card')];
filters.forEach(btn=>btn.addEventListener('click',()=>{const f=btn.dataset.filter;filters.forEach(x=>x.classList.toggle('active',x===btn));projects.forEach(c=>c.classList.toggle('hidden',f!=='all'&&c.dataset.category!==f));}));

const caseStudies = {
  "farm-boundary": {
    "repo": "https://github.com/tushar2159/semantic-segmentation-pipeline",
    "title": "Farm Boundary Detection",
    "summary": "Imagery-to-vector GeoAI workflow for GIS-ready field boundaries.",
    "objective": "Extract individual agricultural fields and transform model output into usable polygon layers.",
    "approach": "Standardize imagery, tile it, run semantic segmentation, threshold probabilities, vectorize masks and apply geometry/topology cleanup.",
    "workflow": [
      "Imagery ingestion & normalization",
      "Patch generation",
      "Segmentation inference",
      "Mask thresholding",
      "Raster-to-vector conversion",
      "Topology cleanup",
      "GIS export"
    ],
    "stack": [
      "Python",
      "PyTorch",
      "Rasterio",
      "GeoPandas",
      "Shapely",
      "GDAL"
    ],
    "output": "Clean field polygons for downstream spatial analytics."
  },
  "crop-intelligence": {
    "repo": "https://github.com/tushar2159/satellite-timeseries-analytics",
    "title": "Crop Intelligence Dashboard",
    "summary": "Field-level EO monitoring architecture combining maps and temporal signals.",
    "objective": "Convert multi-date observations into an interpretable spatial monitoring experience.",
    "approach": "Use farm geometries as analysis units, compute EO indicators and temporal summaries, then expose normalized results through APIs and interactive maps.",
    "workflow": [
      "Farm/AOI ingestion",
      "Scene discovery",
      "Quality screening",
      "Index generation",
      "Zonal statistics",
      "Temporal analytics",
      "API delivery",
      "Map visualization"
    ],
    "stack": [
      "Python",
      "Sentinel-1",
      "Sentinel-2",
      "GeoPandas",
      "FastAPI",
      "PostGIS",
      "AWS"
    ],
    "output": "Decision-ready field-level spatial and temporal insights."
  },
  "spatial-assistant": {
    "repo": "https://github.com/tushar2159/geospatial-rag-assistant",
    "title": "Multilingual Spatial Assistant",
    "summary": "Natural-language interface over spatial context, retrieval and analytical tools.",
    "objective": "Make geospatial information accessible without direct interaction with GIS software.",
    "approach": "Resolve language and intent, retrieve grounded context, select deterministic tools/APIs and synthesize structured responses.",
    "workflow": [
      "Query",
      "Intent/language",
      "Context retrieval",
      "RAG",
      "Tool routing",
      "Spatial execution",
      "Grounded response"
    ],
    "stack": [
      "Python",
      "LLMs",
      "RAG",
      "Vector Search",
      "FastAPI",
      "Tool Calling",
      "AWS"
    ],
    "output": "Conversational access to geospatial knowledge and analytical workflows."
  },
  "satellite-pipeline": {
    "repo": "https://github.com/tushar2159/vision-model-serving-pipeline",
    "title": "Satellite Analytics Pipeline",
    "summary": "Modular architecture from imagery acquisition through inference and delivery.",
    "objective": "Keep acquisition, preprocessing, model logic and serving independently replaceable.",
    "approach": "Separate catalogue search, caching, reprojection, feature generation, inference, post-processing and API delivery with validation between stages.",
    "workflow": [
      "AOI request",
      "Catalogue search",
      "Acquisition/cache",
      "Preprocessing",
      "Features",
      "Inference",
      "Spatial post-processing",
      "Validation",
      "Storage/API"
    ],
    "stack": [
      "Python",
      "GDAL",
      "Rasterio",
      "GeoPandas",
      "PyTorch",
      "FastAPI",
      "AWS",
      "Docker"
    ],
    "output": "Repeatable cloud-ready Earth-observation analytics."
  },
  "segmentation-models": {
    "repo": "https://github.com/tushar2159/semantic-segmentation-pipeline",
    "title": "GeoAI Segmentation Models",
    "summary": "Pixel-level Earth-observation understanding using encoder-decoder models.",
    "objective": "Convert multi-band imagery into structured land-cover or feature masks.",
    "approach": "Prepare aligned image/mask patches, train configurable segmentation models, evaluate with spatial metrics and visual QA, then reconstruct tiled predictions.",
    "workflow": [
      "Dataset preparation",
      "Alignment validation",
      "Split",
      "Sampling",
      "Model training",
      "Metrics",
      "Visual QA",
      "Tiled inference",
      "Mosaic/export"
    ],
    "stack": [
      "Python",
      "PyTorch",
      "SegFormer",
      "U-Net",
      "Rasterio",
      "NumPy",
      "GeoPandas"
    ],
    "output": "GIS-ready pixel-level prediction layers."
  },
  "change-detection": {
    "repo": "https://github.com/tushar2159/geoai-change-detection-pipeline",
    "title": "GeoAI Change Detection",
    "summary": "Tested bi-temporal array workflow for identifying pixel-level differences.",
    "objective": "Produce a continuous change score and binary mask from aligned image arrays.",
    "approach": "Check equal shapes, apply robust percentile normalization, calculate absolute differences, average bands and threshold the score.",
    "workflow": [
      "Temporal pair selection",
      "Shape validation",
      "Normalization",
      "Change scoring",
      "Thresholding",
      "Binary mask",
      "Score and mask output"
    ],
    "stack": [
      "Python",
      "NumPy",
      "PyTest",
      "YAML"
    ],
    "output": "A NumPy score array and uint8 change mask."
  },
  "timeseries": {
    "repo": "https://github.com/tushar2159/satellite-timeseries-analytics",
    "title": "Satellite Time-Series Intelligence",
    "summary": "NumPy feature engineering for ordered reflectance observations.",
    "objective": "Represent temporal behavior with NDVI, summary statistics, trend and robust anomaly scores.",
    "approach": "Derive NDVI from NIR and red arrays, calculate compact statistics and score deviations using the median and MAD.",
    "workflow": [
      "NIR/red arrays",
      "NDVI",
      "Input validation",
      "Ordered series",
      "Trend/amplitude",
      "Anomaly scoring",
      "Feature output"
    ],
    "stack": [
      "Python",
      "NumPy",
      "PyTest",
      "YAML"
    ],
    "output": "Compact temporal features for monitoring and ML."
  },
  "rag-assistant": {
    "repo": "https://github.com/tushar2159/geospatial-rag-assistant",
    "title": "Geospatial RAG Assistant",
    "summary": "Inspectable lexical retrieval paired with deterministic spatial tool routing.",
    "objective": "Return relevant document IDs and explicit tool results for spatial questions.",
    "approach": "Rank documents by normalized token overlap, route supported intent, optionally calculate approximate bounding-box area and return structured evidence.",
    "workflow": [
      "Question",
      "Retriever",
      "Intent/tool router",
      "Spatial context",
      "Deterministic tool",
      "Evidence bundle",
      "Grounded answer"
    ],
    "stack": [
      "Python",
      "RAG",
      "Lexical Retrieval",
      "Spatial Tools",
      "Structured Output"
    ],
    "output": "Structured retrieval IDs, selected tool and optional area result."
  },
  "geoai-mlops": {
    "repo": "https://github.com/tushar2159/geoai-mlops-template",
    "title": "GeoAI MLOps",
    "summary": "Reproducibility and model-release practices designed for geospatial ML.",
    "objective": "Make experiments, candidate models and releases auditable and repeatable.",
    "approach": "Keep tunables in config, hash artifacts/configs, apply measurable quality gates, record release manifests and run regression tests in CI.",
    "workflow": [
      "Config lock",
      "Prepare",
      "Train/evaluate",
      "Quality gates",
      "Artifact hashing",
      "Release manifest",
      "CI regression"
    ],
    "stack": [
      "Python",
      "PyTest",
      "GitHub Actions",
      "YAML",
      "SHA-256",
      "Model Registry"
    ],
    "output": "A repeatable path from experiment to versioned model candidate."
  },
  "eo-data": {
    "repo": "https://github.com/tushar2159/earth-observation-data-pipeline",
    "title": "Earth Observation Data Engineering",
    "summary": "Deterministic filtering of STAC-style metadata and planning of overlapping raster windows.",
    "objective": "Make scene selection and tile geometry explicit before downstream raster processing.",
    "approach": "Filter item dictionaries by inclusive dates and cloud cover, sort them chronologically and calculate edge-aware windows from raster dimensions.",
    "workflow": [
      "Item metadata",
      "Date interval",
      "Date/cloud filters",
      "Chronological sort",
      "Raster dimensions",
      "Tile/overlap validation",
      "Window tiling",
      "Selected items/windows"
    ],
    "stack": [
      "Python",
      "Datetime",
      "PyTest",
      "YAML"
    ],
    "output": "Selected metadata records and deterministic (x, y, width, height) windows."
  },
  "spatial-agents": {
    "repo": "https://github.com/tushar2159/spatial-agent-workflows",
    "title": "Spatial AI Agents",
    "summary": "Explicit planner, validator and analyst orchestration with a deterministic trace.",
    "objective": "Demonstrate validation boundaries and inspectable state in a spatial agent workflow.",
    "approach": "A planner emits a fixed plan, validators check bounding-box structure before and after analysis, and the analyst calculates width and height in degrees.",
    "workflow": [
      "Request",
      "Planner",
      "AOI validator",
      "Data selector",
      "Analyst",
      "Result validator",
      "Response"
    ],
    "stack": [
      "Dataclasses",
      "PyTest",
      "YAML"
    ],
    "output": "A structured plan, ordered execution trace and bounding-box dimensions."
  }
};

const dialog=document.getElementById('caseDialog');
const E=id=>document.getElementById(id);
document.querySelectorAll('.case-btn').forEach(btn=>btn.addEventListener('click',()=>{const c=caseStudies[btn.dataset.case]; if(!c)return; E('modalTitle').textContent=c.title; E('modalSummary').textContent=c.summary; E('modalObjective').textContent=c.objective; E('modalApproach').textContent=c.approach; E('modalOutput').textContent=c.output; E('modalWorkflow').innerHTML=c.workflow.map((s,i)=>`<div class="workflow-step"><span>${String(i+1).padStart(2,'0')}</span><p>${s}</p></div>`).join(''); E('modalStack').innerHTML=c.stack.map(s=>`<span>${s}</span>`).join(''); E('modalRepo').href=c.repo; if(typeof dialog.showModal==='function')dialog.showModal(); else dialog.setAttribute('open',''); }));
const closeDialog=()=>{if(typeof dialog.close==='function')dialog.close(); else dialog.removeAttribute('open');};
E('closeDialog').addEventListener('click',closeDialog); dialog.addEventListener('click',e=>{if(e.target===dialog)closeDialog();}); document.addEventListener('keydown',e=>{if(e.key==='Escape')closeDialog();});
