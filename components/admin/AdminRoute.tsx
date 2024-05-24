"use client"
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type AdminRouteProps = {
    link: {
        url: string;
        text: string;
        blank: boolean;
        image: string;
    }
}

export default function AdminRoute({link}: AdminRouteProps) {
    const pathname = usePathname()
    const isActive = pathname.startsWith(link.url)
  return (
    <>
    <div
      className={`${isActive ? 'bg-violet-800 text-white' : ''} flex items-center gap-4 w-full border-t border-gray-200 p-3 last-of-type:border-b`}
    >
    <div className="w-16 h-16 relative">
        <Image src={link.image} alt="imagen categoria" fill />
      </div>

      <Link className="text-xl font-bold" href={link.url}>
        {link.text}
      </Link>
      </div>
    </>

    
  )
}
