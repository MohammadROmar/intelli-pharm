import { useTargetLeaderboard } from '../model/queries';
import { TargetLeaderboardCard } from './TargetLeaderboardCard';

export function TargetLeaderboardSection() {
  const { data: response } = useTargetLeaderboard();
  return <TargetLeaderboardCard rows={response.data!} />;
}
