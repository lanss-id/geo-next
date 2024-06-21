import React from 'react'
import Nav from '@/components/Nav'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'

const page = () => {
  return (
      <>
        <Nav />
        <h1 className="text-5xl text-center">Anggota Kelompok</h1>
        <div className="mt-4 max-w-lg mx-auto">
          <Table className="text-[#000] text-lg">
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>NIM</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>Yafie Ikhsan Sasongko</TableCell>
                <TableCell>2035201004</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2</TableCell>
                <TableCell>Fadhilah Fahirannisa</TableCell>
                <TableCell>2035201006</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>3</TableCell>
                <TableCell>Luqmanul Hakim Isun</TableCell>
                <TableCell>20352012</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>4</TableCell>
                <TableCell>Dimas Misbahul Qolbi</TableCell>
                <TableCell>20352063</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>5</TableCell>
                <TableCell>Moch. Dimas Gumilang</TableCell>
                <TableCell>20352065</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </>
  )
}

export default page