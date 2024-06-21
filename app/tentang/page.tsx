import React from 'react'
import Nav from '@/components/Nav'

const page = () => {
  return (
      <>
        <Nav />
        <div className="text-center">
            <h1 className="text-5xl mt-4">Tentang Website</h1>
            <p className="text-2xl mt-4">Website ini ditujukan untuk pemenuhan nilai matakuliah &quot;Wawasan dan Aplikasi Teknologi&quot;</p>
        </div>
      </>      
  )
}

export default page