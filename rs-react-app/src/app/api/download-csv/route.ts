import { NextRequest, NextResponse } from 'next/server';
import { ItemModel } from '../../../models/models';

export async function POST(req: NextRequest) {
  const { favourites } = await req.json();

  const csv = [
    [
      'ID',
      'Name',
      'Gender',
      'Skin color',
      'Eye color',
      'Hair color',
      'Birth year',
      'Height',
    ],
    ...favourites.map((p: ItemModel) => [
      p.id,
      p.name,
      p.gender,
      p.skin_color,
      p.eye_color,
      p.hair_color,
      p.birth_year,
      p.height,
    ]),
  ]
    .map((row) => row.join(','))
    .join('\n');

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="favourites.csv"`,
    },
  });
}
