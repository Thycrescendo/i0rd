// src/types/window.d.ts
import { ExternalProvider } from '@ethersproject/providers';

interface Window {
  ethereum?: ExternalProvider;
}