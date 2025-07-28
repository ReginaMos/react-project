import { useOutletContext } from 'react-router-dom';
import DetailItem from '../components/DetailItem';
import type { OutletContext } from '../models/models';

export default function DetailPage() {
  const { selectedItem } = useOutletContext<OutletContext>();

  if (!selectedItem) return null;

  return <DetailItem item={selectedItem} />;
}
