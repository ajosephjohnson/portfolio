'use client'

import { useEffect } from 'react';

import TagManager from 'react-gtm-module';


const tagManagerArgs = {
  gtmId: "GTM-WGVQFSC",
};

export default function GoogleTagmManager() {
  useEffect(() => {
    TagManager.initialize(tagManagerArgs);
  }, []);
  return null;
}
