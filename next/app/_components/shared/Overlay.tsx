'use client';

import Link from 'next/link';
import whatsappIcon from '@/public/whatsapp.svg';
import { SafeImage } from "@/components/safe-image";
import { useState } from 'react';
import type { ComponentType } from 'react'
import dynamic from 'next/dynamic'
import type { Webchat as WebchatType, Fab as FabType } from '@botpress/webchat'

const Webchat = dynamic(() => import('@botpress/webchat').then(m => m.Webchat as unknown as ComponentType<any>), { ssr: false })
const Fab = dynamic(() => import('@botpress/webchat').then(m => m.Fab as unknown as ComponentType<any>), { ssr: false })


const GAP_ABOVE_ICONS = 16
const PAGE_MARGIN = 20

function WhatsappOverlayIcon() {
  return (
    <Link
      className="flex items-center justify-center bg-[#25D366] rounded-full w-20 h-20 hover:scale-105 transition-transform"
      href={process.env.NEXT_PUBLIC_WHATSAPP_URL || '#'}
      aria-label="Open WhatsApp chat"
    >
      <SafeImage src={whatsappIcon} alt="WhatsApp" width={50} height={50} />
    </Link>
  )
}

export function Overlay() {
  const [isWebchatOpen, setIsWebchatOpen] = useState(false)
  const toggleWebchat = () => {
    setIsWebchatOpen((prevState) => !prevState)
  }
  const clientId = process.env.NEXT_PUBLIC_WEBCHAT_CLIENT_ID

  return (
    <div className="fixed flex flex-col items-end gap-3 z-50 bottom-4 right-4">
      {
        clientId && (
          <div className="order-0">
            <Webchat
              clientId={clientId}
              style={{
                display: isWebchatOpen ? 'flex' : 'none',
                width: '360px',
                maxWidth: '90vw',
                height: 'min(70vh, 640px)'
              }}
            />
          </div>
        )
      }
      <div className='order-1 flex flex-row gap-3 items-center relative'>
        <WhatsappOverlayIcon />
        {
          clientId && (
            <>
              {/* @ts-ignore */}
              <Fab
                onClick={toggleWebchat}
                aria-pressed={isWebchatOpen}
                style={{
                  width: 80,
                  height: 80,
                }}
              />
            </>
          )
        }
      </div>
    </div>
  );
}
