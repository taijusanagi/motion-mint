graph TD

A[MotionMint Platform]

B[DeepMotion API<br>Video-to-Motion Conversion]
C[OPStack Smart Contracts<br>Minting & Trading]
D[Zora Protocol<br>Marketplace]
G[Data Aggregation<br>Aggregated User & Market Data]
L[License Management]

H[Base Network<br>Contract Deployment]
I[Zora Network<br>Contract Deployment]
F[Hyperlane Cross-chain Messaging<br>Synchronization]
J[The Graph API<br>Data Source]
K[Covalent API<br>Data Source]
E[EAS<br>Attestation]
W[WorldCoin<br>Sign in with WorldCoin & Human Verification]

B --> A
A --> C
C --> H
C --> I
H --> F
I --> F
A --> D
A --> G
G --> J
G --> K
A --> L
L --> E
L --> W
