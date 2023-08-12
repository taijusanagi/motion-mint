graph TD

A[MotionMint Platform]

B[DeepMotion API<br>Video-to-Motion Conversion]
C[OPStack Smart Contracts<br>Optimism, Base, Zora]
D[Zora Protocol<br>Marketplace]
L[Attestation with AI data]

F[LayerZero Cross-chain Messaging<br>Synchronization]
E[EAS<br>Attestation Manager]
W[WorldCoin<br>Human Verification]

C --> F
B --> A
A --> C
A --> D
A --> L
L --> E
L --> W
