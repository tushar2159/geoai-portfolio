# Portfolio ecosystem architecture

```mermaid
flowchart LR
  P[Portfolio] --> E[Cesium Earth Explorer]
  E -->|Encoded public AOI context| A[AI Analyst]
  A --> S[Static browser demo]
  A -. configurable .-> B[FastAPI backend]
  B --> C[STAC + EO processing]
  C --> R[Typed results]
  R --> V[Cesium / MapLibre / report]
```

The portfolio and Explorer are static GitHub Pages. They do not execute Python. The Explorer produces an EPSG:4326 point/radius analysis request and requires confirmation in the Analyst. No private token is required.
