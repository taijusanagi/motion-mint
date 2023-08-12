graph TD

A[MotionMint Platform]

B[DeepMotion API<br>Video-to-Motion Conversion]
C[OPStack Smart Contracts<br>Optimism, Base, Zora]
D[Zora Protocol<br>Marketplace]
G[Data Aggregation<br>Aggregated User & Market Data]
L[License Management]

F[LayerZero Cross-chain Messaging<br>Synchronization]
J[The Graph API<br>Data Source]
K[Covalent API<br>Data Source]
E[EAS<br>Attestation]
W[WorldCoin<br>Sign in with WorldCoin & Human Verification]

C --> F
B --> A
A --> C
A --> D
A --> G
G --> J
G --> K
A --> L
L --> E
L --> W
