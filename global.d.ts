/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest } from 'next';

// Declarations for modules without types

// Declarations for global interfaces & types
declare global {
  interface RequestWithFile extends NextApiRequest {
    files?: any[];
    file: any;
  }

  interface ArtworkForm {
    title: string;
    name: string;
    material: string;
    year?: string;
    width?: string;
    height?: string;
  }

  interface Artwork extends ArtworkForm {
    _id: string;
    url: string;
    year?: number;
    width?: number;
    height?: number;
    thumbUrl: string;
    created: Date;
    lastUpdated: Date;
  }
}
