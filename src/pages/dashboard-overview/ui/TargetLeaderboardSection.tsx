import { useTargetLeaderboard } from '../model/queries';
import { TargetLeaderboardCard } from './TargetLeaderboardCard';

type Props = { canViewTargets: boolean };

export function TargetLeaderboardSection({ canViewTargets }: Props) {
  const { data: response } = useTargetLeaderboard();
  return (
    <TargetLeaderboardCard
      rows={response.data!}
      canViewTargets={canViewTargets}
    />
  );
}
