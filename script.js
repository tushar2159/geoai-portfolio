const filters=[...document.querySelectorAll('.filter')];
const projects=[...document.querySelectorAll('.project-card')];
filters.forEach(btn=>btn.addEventListener('click',()=>{const f=btn.dataset.filter;filters.forEach(x=>x.classList.toggle('active',x===btn));projects.forEach(c=>c.classList.toggle('hidden',f!=='all'&&c.dataset.category!==f));}));

const caseStudies = {
  "farm-boundary": {
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
    "title": "GeoAI Change Detection",
    "summary": "Bi-temporal computer-vision workflow for identifying where spatial conditions changed.",
    "objective": "Detect meaningful change between aligned Earth-observation acquisitions.",
    "approach": "Validate temporal pairs, normalize imagery, compute or infer a change score, threshold results and convert stable change regions into analysis-ready outputs.",
    "workflow": [
      "Temporal pair selection",
      "Co-registration checks",
      "Normalization",
      "Change scoring",
      "Thresholding",
      "Spatial filtering",
      "Vector/statistical output"
    ],
    "stack": [
      "Python",
      "NumPy",
      "PyTorch-ready",
      "Rasterio",
      "GeoPandas"
    ],
    "output": "Change masks and spatial summaries that can feed monitoring applications."
  },
  "timeseries": {
    "title": "Satellite Time-Series Intelligence",
    "summary": "Temporal feature engineering for field monitoring and anomaly discovery.",
    "objective": "Represent seasonal behavior instead of relying on a single satellite acquisition.",
    "approach": "Apply scene quality controls, derive spectral/radar features, aggregate by spatial unit and summarize amplitude, trend, seasonality and robust anomalies.",
    "workflow": [
      "Scene filtering",
      "Feature generation",
      "Spatial aggregation",
      "Temporal ordering",
      "Trend/amplitude",
      "Anomaly scoring",
      "Feature/API output"
    ],
    "stack": [
      "Python",
      "Sentinel-1/2",
      "NumPy",
      "GeoPandas",
      "Rasterio",
      "STAC"
    ],
    "output": "Compact temporal features for monitoring and ML."
  },
  "rag-assistant": {
    "title": "Geospatial RAG Assistant",
    "summary": "Grounded RAG architecture that combines retrieval with deterministic spatial tools.",
    "objective": "Answer spatial questions using traceable context instead of ungrounded generation.",
    "approach": "Retrieve relevant knowledge, inspect spatial intent, execute explicit tools for measurable operations and pass structured evidence to the response layer.",
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
      "Vector Search",
      "PostGIS-ready",
      "FastAPI",
      "LLMs"
    ],
    "output": "Grounded spatial question-answering with explicit tool outputs."
  },
  "geoai-mlops": {
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
    "title": "Earth Observation Data Engineering",
    "summary": "STAC-oriented architecture for reliable imagery selection and processing.",
    "objective": "Create reproducible data inputs before model inference begins.",
    "approach": "Filter catalogues by time/quality, select assets, cache and align data, tile rasters deterministically and preserve metadata through downstream stages.",
    "workflow": [
      "AOI",
      "STAC search",
      "Date/cloud filters",
      "Asset selection",
      "Cache",
      "Reproject/align",
      "Window tiling",
      "COG/features"
    ],
    "stack": [
      "Python",
      "STAC",
      "Rasterio",
      "GDAL",
      "Cloud Storage",
      "COG"
    ],
    "output": "Traceable, repeatable Earth-observation input datasets."
  },
  "spatial-agents": {
    "title": "Spatial AI Agents",
    "summary": "Explicit multi-agent orchestration for geospatial tasks with validation around tool calls.",
    "objective": "Use agent reasoning without delegating deterministic geometry checks to an LLM.",
    "approach": "A planner decomposes the request, validators check spatial inputs, tool executors run geospatial operations and a final validation stage checks outputs before response assembly.",
    "workflow": [
      "Request",
      "Planner",
      "AOI validator",
      "Data selector",
      "Tool executor",
      "Result validator",
      "Response"
    ],
    "stack": [
      "Python",
      "LLMs",
      "Tool Calling",
      "Multi-Agent Systems",
      "FastAPI-ready",
      "GIS APIs"
    ],
    "output": "Traceable agent workflows with deterministic spatial guardrails."
  }
};

const dialog=document.getElementById('caseDialog');
const E=id=>document.getElementById(id);
document.querySelectorAll('.case-btn').forEach(btn=>btn.addEventListener('click',()=>{const c=caseStudies[btn.dataset.case]; if(!c)return; E('modalTitle').textContent=c.title; E('modalSummary').textContent=c.summary; E('modalObjective').textContent=c.objective; E('modalApproach').textContent=c.approach; E('modalOutput').textContent=c.output; E('modalWorkflow').innerHTML=c.workflow.map((s,i)=>`<div class="workflow-step"><span>${String(i+1).padStart(2,'0')}</span><p>${s}</p></div>`).join(''); E('modalStack').innerHTML=c.stack.map(s=>`<span>${s}</span>`).join(''); if(typeof dialog.showModal==='function')dialog.showModal(); else dialog.setAttribute('open',''); }));
const closeDialog=()=>{if(typeof dialog.close==='function')dialog.close(); else dialog.removeAttribute('open');};
E('closeDialog').addEventListener('click',closeDialog); dialog.addEventListener('click',e=>{if(e.target===dialog)closeDialog();}); document.addEventListener('keydown',e=>{if(e.key==='Escape')closeDialog();});
