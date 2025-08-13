import { useParams } from 'react-router';
import SutraViewer from '../components/SutraViewer';

export default function SutraPage() {
  const { number } = useParams();
  
  return <SutraViewer sutraNumber={number} />;
}
