/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest } from 'next';

// Declarations for modules without types

// Declarations for global interfaces & types
declare global {
  interface RequestWithFile extends NextApiRequest {
    files?: any[];
    file: any;
  }

  interface Artwork {
    _id: string;
    url: string;
    thumbUrl: string;
    title: string;
    name: string;
    material: string;
    year?: number;
    width?: number;
    height?: number;
    created: Date;
    lastUpdated: Date;
  }
}
