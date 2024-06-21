import React from 'react'
import Nav from '@/components/Nav'

const page = () => {
  return (
      <>
        <Nav />
        <h1 className="text-5xl text-center">Anggota Kelompok</h1>
        <div className="overflow-x-auto flex justify-center mt-4">
        <table className="table-lg text-[#000] text-lg">
            <thead>
                <tr>
                    <th></th>
                    <th>Nama</th>
                    <th>NIM</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th>1</th>
                    <td>Yafie Ikhsan Sasongko</td>
                    <td>2035201004</td>
                </tr>
                <tr>
                    <th>2</th>
                    <td>Fadhilah Fahirannisa</td>
                    <td>2035201006</td>
                </tr>
                <tr>
                    <th>3</th>
                    <td>Luqmanul Hakim Isun</td>
                    <td>20352012</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>Dimas Misbahul Qolbi</td>
                    <td>20352063</td>
                </tr>
                <tr>
                    <td>5</td>
                    <td>Moch. Dimas Gumilang</td>
                    <td>20352065</td>
                </tr>
                </tbody>
            </table>
        </div>
      </>
  )
}

export default page