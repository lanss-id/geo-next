"use client"

import React from 'react'

const Nav = () => {
  return (
    <nav className="h-16 flex items-center bg-[#333] text-white text-lg gap-6 px-14 mb-4">
      <a className="hover:text-blue-400 active:text-blue-400" href="/">Beranda</a>
      <a className="hover:text-blue-400 active:text-blue-400" href="/anggota">Anggota</a>
      <a className="hover:text-blue-400 active:text-blue-400" href="/tentang">Tentang</a>
    </nav>
  )
}

export default Nav