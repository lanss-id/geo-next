import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';

interface PolygonInfo {
    "Muka Tanah": number;
    "Very Soft": number;
    "Soft": number;
    "Medium": number;
    "Stiff": number;
    "Hard": number;
}

interface PolygonInfoTableProps {
    info: PolygonInfo | null;
    index: string | null;
}

const TableInfo: React.FC<PolygonInfoTableProps> = ({ info, index }) => {
    if (!info) return null;
    const getRowClass = (key: string) => {
        switch (key) {
            case "Muka Tanah":
                return "muka-tanah";
            case "Very Soft":
                return "very-soft";
            case "Soft":
                return "soft";
            case "Medium":
                return "medium";
            case "Stiff":
                return "stiff";
            case "Hard":
                return "hard";
            default:
                return "";
        }
    };
    return (
      <div className='px-4'>
      <h1 className='my-2 text-xl'>Titik Pengujian: {index}</h1>
      <Table>
          <TableHeader>
              <TableRow>
                  <TableHead>Jenis Tanah</TableHead>
                  <TableHead>Kedalaman</TableHead>
              </TableRow>
          </TableHeader>
          <TableBody>
              {Object.entries(info).map(([key, value]) => (
                  <TableRow key={key} className={getRowClass(key)}>
                      <TableCell>{key}</TableCell>
                      <TableCell>{value}</TableCell>
                  </TableRow>
              ))}
          </TableBody>
      </Table>
  </div>
    );
};

export default TableInfo;
